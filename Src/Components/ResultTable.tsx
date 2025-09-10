import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import TableCommonBall from './TableCommonBall';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../Constants/Theme';
import MyBets3DigitsCard from './MyBets3DigitsCard';
import { hot } from '../../assets/assets';
import { useContainerScale } from '../hooks/useContainerScale';
import { formatDateTime } from '../Utils/Common';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
interface ResultTableProps {
  tableData: any[];
  showHeader?: boolean;
  customStyle?: any;
  hidePages?: boolean;
}

const ResultTable: React.FC<ResultTableProps> = ({ tableData, showHeader, customStyle, hidePages = false }) => {
  const { Scale, verticalScale } = useContainerScale();
  const [onTableSelect, setOnTableSelect] = useState('ResultHistory');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
    const {
    myOrdersData,
    myOrdersLoader,
  } = useSelector((state: RootState) => state.threeDigit);

  // Calculate the total number of pages
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  // Get data for the current page
  const currentData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle Page Change
  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const tableRenderItem = ({ item, index }: { item: any; index: number }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Scale(5),
        backgroundColor: index % 2 === 0 ? '#540000' : '#5C1818',
        borderBottomWidth: 1,
        borderColor: '#5C1818',
        paddingHorizontal: Scale(10),
      }}>
      <View style={{ flex: 1.5, }}>
        <Text style={{ color: COLORS.white }}>{item.uid}</Text>
      </View>
      <View style={{ flex: 1.2, alignItems: 'center' }}>
        <Text style={{ color: COLORS.white }}>{formatDateTime(item.gameTime)}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <TableCommonBall backgroundColor="#DE3C3F" innerText={item.balls[0]} borderColor={'#DE3C3F'} />
        <TableCommonBall backgroundColor="#EC8204" innerText={item.balls[1]} borderColor={'#EC8204'} />
        <TableCommonBall backgroundColor="#066FEA" innerText={item.balls[2]} borderColor={'#066FEA'} />
      </View>
    </View>
  );

  const getVisiblePages = (currentPage: number, totalPages: number, maxVisible: number = 5) => {
    let start = Math.max(currentPage - 2, 1);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisible + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };



    const myOrderRenterItem = ({ item, index }: { item: any; index: number }) => {
      
      const winningStatus = item.isWinning === true ? "Won" : "No Won";
      const myBetsTableData = [
        {
          type: item.betType,
          value: item.selectedNumber,  
          payment: item.amount,      
          result: winningStatus        
        }
      ];
      return(
      <View>

<MyBets3DigitsCard
      headers={["A", "B", "C"]} // Keep static for now (since API doesn't return this)
      myBetsTableData={myBetsTableData}
      id={`PK${10000000 + index}`} // Temporary ID placeholder
      bettingTime={item.betTime}
      paymentAmount={item.totalAmount}
      drawTime="-" // Placeholder until API sends
      topBalls={[
        { text: "A", color: "#DE3C3F" },
        { text: "B", color: "#EC8204" },
        { text: "C", color: "#066FEA" }
      ]}
      bottomBalls={[
        { text: "2", color: "#DE3C3F" }, // Show selected num
        { text: "4", color: "#EC8204" },
        { text: "6", color: "#066FEA" }
      ]}
      date={item.betTime.split("T")[0]} // take date part only
      status={winningStatus}
      imageSource={hot}
    />

      </View>
      )};
    


  return (
    <View>
      <View style={{ marginTop: Scale(10), ...customStyle }}>
        {showHeader && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              backgroundColor: '#360400',
            }}>
            {['ResultHistory', 'MyOrders'].map(tab => (
              <TouchableOpacity
                key={tab}
                onPress={() => setOnTableSelect(tab)}
                style={{
                  padding: Scale(10),
                  backgroundColor: '#360400',
                  borderBottomWidth: onTableSelect === tab ? Scale(5) : 0,
                  borderBottomColor: onTableSelect === tab ? '#ff5f5f' : 'transparent',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                    padding: Scale(10),
                    fontWeight: onTableSelect === tab ? 'bold' : '400',
                  }}>
                  {tab === 'ResultHistory' ? 'Result History' : 'My Order'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={{ marginVertical: Scale(20) }}>
          {onTableSelect === 'ResultHistory' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#812B2B',
                  paddingVertical: Scale(5),
                  paddingHorizontal: Scale(10),
                }}>
                <View style={{ flex: 1.5, }}>
                  <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Issue</Text>
                </View>
                <View style={{ flex: 1.3, alignItems: 'center' }}>
                  <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Time</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                  <TableCommonBall backgroundColor="#DE3C3F" innerText="A" borderColor={'#DE3C3F'} />
                  <TableCommonBall backgroundColor="#EC8204" innerText="B" borderColor={'#EC8204'} />
                  <TableCommonBall backgroundColor="#066FEA" innerText="C" borderColor={'#066FEA'} />
                </View>
              </View>

              <FlatList
                data={currentData}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={tableRenderItem}
              />

              {/* Pagination Controls */}
              {!hidePages && (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: Scale(10),
                    alignSelf: 'center',
                    backgroundColor: '#812B2B',
                    width: '110%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: Scale(10),
                    marginVertical: Scale(20),
                  }}>

                  <Text
                    style={{
                      borderRadius: Scale(10),
                      padding: Scale(10),
                      borderColor: '#812B2B',
                      borderWidth: 1,
                      height: Scale(40),
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      fontWeight: 'bold',
                    }}>
                    Total {tableData.length}
                  </Text>

                  {/* Page Numbers */}
                  {getVisiblePages(currentPage, totalPages).map((page) => (
                    <TouchableOpacity
                      key={page}
                      onPress={() => changePage(page)}
                      style={{
                        backgroundColor: currentPage === page ? 'gold' : '#812B2B',
                        borderRadius: Scale(10),
                        padding: Scale(10),
                        borderColor: '#812B2B',
                        borderWidth: 1,
                        marginHorizontal: Scale(5),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text>{page}</Text>
                    </TouchableOpacity>
                  ))}

                  {/* Left Arrow */}
                  <TouchableOpacity
                    onPress={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                      backgroundColor: '#5F1616',
                      borderRadius: Scale(10),
                      padding: Scale(10),
                      borderColor: '#812B2B',
                      borderWidth: 1,
                      height: Scale(40),
                      width: Scale(40),
                      marginHorizontal: Scale(5),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <FontAwesome5
                      name={'chevron-left'}
                      size={15}
                      color={currentPage === 1 ? 'grey' : 'white'}
                    />
                  </TouchableOpacity>

                  {/* Right Arrow */}
                  <TouchableOpacity
                    onPress={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                      backgroundColor: '#5F1616',
                      borderRadius: Scale(10),
                      padding: Scale(10),
                      borderColor: '#812B2B',
                      borderWidth: 1,
                      height: Scale(40),
                      width: Scale(40),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <FontAwesome5
                      name={'chevron-right'}
                      size={15}
                      color={currentPage === totalPages ? 'grey' : 'white'}
                    />
                  </TouchableOpacity>
                </View>
              )}

            </>
          ) : (
            <>
              {/* <MyBets3DigitsCard
                headers={["A", "B", "C"]}
                myBetsTableData={[
                  { type: "A", value: 2, payment: 33, result: "No Won" },
                  { type: "B", value: 3, payment: 33, result: "No Won" },
                  { type: "C", value: 4, payment: 33, result: "No Won" }
                ]}
                id="PK56283947"
                bettingTime="01-08-2022 12:00 PM"
                paymentAmount={33}
                drawTime="01-08-2022 12:00 PM"
                topBalls={[
                  { text: "A", color: "#DE3C3F" },
                  { text: "B", color: "#EC8204" },
                  { text: "C", color: "#066FEA" }
                ]}
                bottomBalls={[
                  { text: "2", color: "#DE3C3F" },
                  { text: "3", color: "#EC8204" },
                  { text: "4", color: "#066FEA" }
                ]}
                date="01-08-2022"
                
                status="NO WON"
                imageSource={hot}
              /> */}
               <FlatList
                data ={myOrdersData}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={myOrderRenterItem}
              />

            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ResultTable;
