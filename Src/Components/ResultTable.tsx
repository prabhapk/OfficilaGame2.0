import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import TableCommonBall from "./TableCommonBall";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { COLORS } from "../Constants/Theme";
import MyBets3DigitsCard from "./MyBets3DigitsCard";
import { hot, noDataImage } from "../../assets/assets";
import { useContainerScale } from "../hooks/useContainerScale";
import { formatDateTime, groupByOrder } from "../Utils/Common";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import MyOrders from "./MyOrders";
import { setTableCurrentPage } from "../Redux/Slice/commonSlice";
interface ResultTableProps {
  tableData: any[];
  showHeader?: boolean;
  customStyle?: any;
  hidePages?: boolean;
  totalPage?: any;
  /** When true, use light theme row bg and text (e.g. on Result screen) */
  useLightTheme?: boolean;
}

const ResultTable: React.FC<ResultTableProps> = ({
  tableData,
  showHeader,
  customStyle,
  hidePages = false,
  totalPage = 1,
  useLightTheme = false,
}) => {
  const dispatch = useDispatch();
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  const [onTableSelect, setOnTableSelect] = useState("ResultHistory");
  // const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { myOrdersData, myOrdersLoader } = useSelector(
    (state: RootState) => state.threeDigit
  );
  const { tableCurrentPage } = useSelector(
    (state: RootState) => state.commonSlice
  );

  console.log("myOrdersData====>", myOrdersData);

  const rawData = myOrdersData;

  // Group bets into orders
  const groupedOrders = groupByOrder(rawData);
  console.log("groupedOrders===>", groupedOrders);

  // Calculate the total number of pages
  const totalPages = Math.ceil(tableData?.length / itemsPerPage);

  // Get data for the current page
  const currentData = tableData?.slice(
    (tableCurrentPage - 1) * itemsPerPage,
    tableCurrentPage * itemsPerPage
  );

  // Handle Page Change
  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPage) {
      dispatch(setTableCurrentPage(page));
    }
  };

  const tableRenderItem = ({ item, index }: { item: any; index: number }) => {
    const winningBalls = item.winningNumber.split("");
    const rowBg = useLightTheme
      ? (index % 2 === 0 ? COLORS.resultTableRowEven : COLORS.resultTableRowOdd)
      : (index % 2 === 0 ? COLORS.sectionHeaderBg : COLORS.listRowBg);
    const textColor = useLightTheme ? COLORS.resultTableText : COLORS.primaryTextColor;
    const borderColor = useLightTheme ? COLORS.resultTableBorder : COLORS.gameCardBorder;

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: Scale(5),
          backgroundColor: rowBg,
          borderBottomWidth: 1,
          borderColor,
          paddingHorizontal: Scale(10),
        }}
      >
        <View style={{ flex: 1.5 }}>
          <Text style={{ color: textColor }}>
            {item.uid} {item?.gamename.startsWith("QUICK3D") && item.gamename}
          </Text>
        </View>
        <View style={{ flex: 1.2, alignItems: "center" }}>
          <Text style={{ color: textColor }}>
            {formatDateTime(item.gameTime)}
          </Text>
        </View>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <TableCommonBall
            backgroundColor="#DE3C3F"
            innerText={winningBalls[0]}
            borderColor={"#DE3C3F"}
          />
          <TableCommonBall
            backgroundColor="#EC8204"
            innerText={winningBalls[1]}
            borderColor={"#EC8204"}
          />
          <TableCommonBall
            backgroundColor="#066FEA"
            innerText={winningBalls[2]}
            borderColor={"#066FEA"}
          />
        </View>
      </View>
    );
  };

  const getVisiblePages = (
    currentPage: number,
    totalPages: number,
    maxVisible: number = 5
  ) => {
    let start = Math.max(currentPage - 2, 1);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisible + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // const myOrderRenterItem = ({ item }: { item: any; index: number }) => {
  //   const winningStatus = item.isWinning ? "Won" : "No Won";

  //   // Build row per bet
  //   const myBetsTableData = [
  //     {
  //       type: item.betType,
  //       value: item.selectedNumber,
  //       payment: item.amount,
  //       result: winningStatus,
  //     },
  //   ];

  //   // Winning number split into balls
  //   const winningNumber = item.winningNumber;
  //   const bottomBalls =
  //     winningNumber && winningNumber.length > 0
  //       ? winningNumber.split("").map((digit, idx) => {
  //           let color =
  //             idx === 0 ? "#DE3C3F" :
  //             idx === 1 ? "#EC8204" :
  //             "#066FEA";
  //           return { text: digit, color };
  //         })
  //       : [
  //           { text: "?", color: "#DE3C3F" },
  //           { text: "?", color: "#EC8204" },
  //           { text: "?", color: "#066FEA" },
  //         ];

  //   return (
  //     <MyOrders
  //     headers={["A", "B", "C"]}
  //     myBetsTableData={item.bets}
  //     id={item.betUniqueId}
  //     bettingTime={item.betTime}
  //     paymentAmount={item.totalAmount}
  //     drawTime={
  //       item.nextDrawTime !== "0001-01-01T00:00:00"
  //         ? item.nextDrawTime
  //         : "-"
  //     }
  //     topBalls={[
  //       { text: "A", color: "#DE3C3F" },
  //       { text: "B", color: "#EC8204" },
  //       { text: "C", color: "#066FEA" },
  //     ]}
  //     bottomBalls={
  //       item.winningNumber
  //         ? item.winningNumber.split("").map((digit, idx) => {
  //             let color =
  //               idx === 0
  //                 ? "#DE3C3F"
  //                 : idx === 1
  //                 ? "#EC8204"
  //                 : "#066FEA";
  //             return { text: digit, color };
  //           })
  //         : [
  //             { text: "?", color: "#DE3C3F" },
  //             { text: "?", color: "#EC8204" },
  //             { text: "?", color: "#066FEA" },
  //           ]
  //     }
  //     date={item.betTime.split("T")[0]}
  //     status={item.isWinning ? "Won" : "No Won"}
  //     imageSource={hot}
  //     winOrLossId={item.betUniqueId}
  //     gameName={item.gameName || "AvisGaming"}
  //     totalWinningAmount={item.totalAmount}
  //   />
  //   );
  // };
  const myOrderRenterItem = ({ item }: { item: any; index: number }) => {
    let status: string;

    if (item.isWinning) {
      status = "Won";
    } else if (!item.isWinning && item.winningNumber !== null) {
      status = "No Won";
    } else {
      status = "To Be Drawn";
    }

    return (
      <MyOrders
        headers={["A", "B", "C"]}        
        myBetsTableData={item.bets.map((b) => ({
          // ✅ NORMALIZED FIELDS FOR UI
          type: b.betType,
          value: b.selectedNumber,
          payment: b.amount,
        
          betCount: b.betCount ?? 1,
          totalAmount: b.totalAmount,
        
          // ✅ result logic (already correct)
          result:
            b.isWinning === true
              ? "Won"
              : b.isWinning === false && item.winningNumber !== null
              ? "No Won"
              : "To Be Drawn",
        }))}
        
        
        
        id={item.betUniqueId}
        bettingTime={item.betTime.split("T")[0]}
        paymentAmount={item.totalAmount} // order total (used by MyOrders to show order total)
        drawTime={
          item.nextDrawTime !== "0001-01-01T00:00:00" ? item.nextDrawTime : "-"
        }
        topBalls={[
          { text: "A", color: "#DE3C3F" },
          { text: "B", color: "#EC8204" },
          { text: "C", color: "#066FEA" },
        ]}
        bottomBalls={
          item.winningNumber
            ? item.winningNumber.split("").map((d, idx) => ({
                text: d,
                color:
                  idx === 0 ? "#DE3C3F" : idx === 1 ? "#EC8204" : "#066FEA",
              }))
            : [
                { text: "?", color: "#DE3C3F" },
                { text: "?", color: "#EC8204" },
                { text: "?", color: "#066FEA" },
              ]
        }
        date={item.betTime.split("T")[0]}
        status={
          item.isWinning
            ? "Won"
            : item.winningNumber !== null
            ? "No Won"
            : "To Be Drawn"
        }
        imageSource={hot}
        winOrLossId={item.betUniqueId}
        gameName={item.gameName || "AvisGaming"}
        totalWinningAmount={item.totalAmount}
      />
    );
  };

  return (
    <View>
      <View style={{ marginTop: Scale(10), ...customStyle }}>
        {showHeader && (
          <View style={styles.tabsRow}>
            {["ResultHistory", "MyOrders"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setOnTableSelect(tab)}
                style={[
                  styles.tabButton,
                  onTableSelect === tab && styles.tabButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    onTableSelect === tab && styles.tabTextActive,
                  ]}
                >
                  {tab === "ResultHistory" ? "Result History" : "My Order"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={{ marginVertical: Scale(20) }}>
          {onTableSelect === "ResultHistory" ? (
            <>
              <View
                style={[
                  styles.tableHeaderRow,
                  { backgroundColor: useLightTheme ? COLORS.sectionHeaderBg : COLORS.sectionHeaderBg },
                ]}
              >
                <View style={{ flex: 1.5 }}>
                  <Text style={[styles.tableHeaderText, { color: useLightTheme ? COLORS.resultTableText : COLORS.sectionHeaderText }]}>
                    Issue
                  </Text>
                </View>
                <View style={{ flex: 1.3, alignItems: "center" }}>
                  <Text style={[styles.tableHeaderText, { color: useLightTheme ? COLORS.resultTableText : COLORS.sectionHeaderText }]}>
                    Time
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <TableCommonBall
                    backgroundColor="#DE3C3F"
                    innerText="A"
                    borderColor={"#DE3C3F"}
                  />
                  <TableCommonBall
                    backgroundColor="#EC8204"
                    innerText="B"
                    borderColor={"#EC8204"}
                  />
                  <TableCommonBall
                    backgroundColor="#066FEA"
                    innerText="C"
                    borderColor={"#066FEA"}
                  />
                </View>
              </View>

              <FlatList
                data={tableData}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={tableRenderItem}
              />

              {/* Pagination Controls */}
              {!hidePages && (
                <View style={styles.paginationWrap}>
                  <Text style={styles.paginationTotalText}>
                    Total {totalPage}
                  </Text>
                  {getVisiblePages(tableCurrentPage, totalPage).map((page) => (
                    <TouchableOpacity
                      key={page}
                      onPress={() => changePage(page)}
                      style={[
                        styles.pageButton,
                        tableCurrentPage === page && styles.pageButtonActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.pageButtonText,
                          tableCurrentPage === page && styles.pageButtonTextActive,
                        ]}
                      >
                        {page}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    onPress={() => changePage(tableCurrentPage - 1)}
                    disabled={tableCurrentPage === 1}
                    style={styles.arrowButton}
                  >
                    <FontAwesome5
                      name="chevron-left"
                      size={15}
                      color={tableCurrentPage === 1 ? COLORS.secondaryTextColor : COLORS.primaryTextColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => changePage(tableCurrentPage + 1)}
                    disabled={tableCurrentPage === totalPage}
                    style={styles.arrowButton}
                  >
                    <FontAwesome5
                      name="chevron-right"
                      size={15}
                      color={tableCurrentPage === totalPage ? COLORS.secondaryTextColor : COLORS.primaryTextColor}
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
                data={groupedOrders}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={myOrderRenterItem}
                ListEmptyComponent={
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={noDataImage}
                      style={{
                        width: 100,
                        height: 100,
                        marginVertical: Scale(20),
                      }}
                    />
                    <Text style={styles.emptyStateText}>
                      Please place the order to see your bets!
                    </Text>
                  </View>
                }
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const createStyles = (Scale: (n: number) => number) =>
  StyleSheet.create({
    tabsRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: COLORS.sectionHeaderBg,
    },
    tabButton: {
      padding: Scale(10),
      backgroundColor: "transparent",
      borderBottomWidth: 0,
    },
    tabButtonActive: {
      borderBottomWidth: Scale(5),
      borderBottomColor: COLORS.tabActiveBg,
    },
    tabText: {
      fontSize: 16,
      color: COLORS.sectionHeaderText,
      padding: Scale(10),
      fontWeight: "400",
    },
    tabTextActive: {
      color: COLORS.tabActiveBg,
      fontWeight: "bold",
    },
    tableHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Scale(5),
      paddingHorizontal: Scale(10),
    },
    tableHeaderText: {
      fontWeight: "bold",
    },
    paginationWrap: {
      flexDirection: "row",
      marginTop: Scale(10),
      alignSelf: "center",
      backgroundColor: COLORS.cardBg,
      width: "110%",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: Scale(10),
      marginVertical: Scale(20),
      borderWidth: 1,
      borderColor: COLORS.cardBorder,
      borderRadius: Scale(8),
    },
    paginationTotalText: {
      borderRadius: Scale(10),
      padding: Scale(10),
      borderColor: COLORS.cardBorder,
      borderWidth: 1,
      height: Scale(40),
      textAlign: "center",
      textAlignVertical: "center",
      fontWeight: "bold",
      color: COLORS.primaryTextColor,
    },
    pageButton: {
      backgroundColor: COLORS.listRowBg,
      borderRadius: Scale(10),
      padding: Scale(10),
      borderColor: COLORS.cardBorder,
      borderWidth: 1,
      marginHorizontal: Scale(5),
      alignItems: "center",
      justifyContent: "center",
    },
    pageButtonActive: {
      backgroundColor: COLORS.tabActiveBg,
      borderColor: COLORS.tabActiveBg,
    },
    pageButtonText: {
      color: COLORS.primaryTextColor,
    },
    pageButtonTextActive: {
      color: COLORS.white,
    },
    arrowButton: {
      backgroundColor: COLORS.sectionHeaderBg,
      borderRadius: Scale(10),
      padding: Scale(10),
      borderColor: COLORS.cardBorder,
      borderWidth: 1,
      height: Scale(40),
      width: Scale(40),
      marginHorizontal: Scale(5),
      alignItems: "center",
      justifyContent: "center",
    },
    emptyStateText: {
      color: COLORS.secondaryTextColor,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default ResultTable;
