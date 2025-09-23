import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Image,
} from 'react-native';
import React, { useState, useMemo, use, useEffect } from 'react';
import {
  resultFilterList,
} from '../Constants/CommonFlatlist';
import { COLORS } from '../Constants/Theme';
import ResultTable from '../Components/ResultTable';
import { tableData } from '../Utils/Constants';
import Icon from 'react-native-vector-icons/Feather'; // for filter icon
import Entypo from 'react-native-vector-icons/Entypo';
import { checked, hot, lottery1, unchecked } from '../../assets/assets';
import CustomTabs from '../Components/CustomTabsHeader';
import { useContainerScale } from '../hooks/useContainerScale';
import { useDispatch, useSelector } from 'react-redux';
import { getAllResults } from '../Redux/Slice/resultSlice';
import { RootState } from '../Redux/store';
const ResultScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { allResultData } = useSelector((state: RootState) => state.resultSlice);
  console.log("allResultData==>", allResultData);

  const [selectedHeaderId, setSelectedHeaderId] = useState(1);
  const [selectedFilerId, setSelectedFilerId] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const onClose = () => setShowFilter(false);

  const resultHeaderList = [
    { id: 1, name: "All" },
    ...Object.keys(allResultData).map((key, index) => ({
      id: index + 2,
      name: key,
    }))
  ];

  const selectedTabName = resultHeaderList[selectedIndex].name;
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);


  const filteredData = useMemo(() => {
    const allCategories: any = allResultData; // since your array has 1 main object
    if (selectedTabName === 'All') {
      // Show all categories
      return Object.keys(allCategories).map(key => ({
        category: key,
        data: allCategories[key],
      }));
    } else {
      // Show only selected category with first 5 items
      const categoryKey = Object.keys(allCategories).find(
        key => key.toLowerCase() === selectedTabName.toLowerCase(),
      );
      if (categoryKey) {
        return [
          {
            category: categoryKey,
            data: allCategories[categoryKey]?.slice(0, 15),
          },
        ];
      }
      return [];
    }
  }, [selectedTabName]);
  console.log("filteredData==>", filteredData);

  useEffect(() => {
    dispatch(getAllResults());
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#560303' }}
      stickyHeaderIndices={[0]}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={{ backgroundColor: COLORS.primary, elevation: 10 }}>
        <View style={styles.headrrcontainer}>
          <Text style={styles.resultText}>Result</Text>
        </View>
        <View>
          <CustomTabs
            tabs={resultHeaderList}
            index={selectedIndex}
            onIndexChange={setSelectedIndex}
          />
        </View>
      </View>
      {/* <ResultTable tableData={tableData} /> */}
      <ScrollView>
        {filteredData.map(({ category, data }) => (
          <View key={category}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image source={hot} style={{ width: 20, height: 20 }} />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: 'white',
                    marginLeft: 10,
                  }}
                >
                  {category}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ParticularGameResult', {
                    category,
                    data,
                  });
                }}
                style={{
                  backgroundColor: '#360400',
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 16, color: 'white' }}>View All</Text>
              </TouchableOpacity>
            </View>
            <ResultTable
              tableData={data}
              customStyle={{ marginTop: -10 }}
              hidePages
            />
          </View>
        ))}
      </ScrollView>
      <Modal
        transparent
        visible={showFilter}
        animationType="fade"
        onRequestClose={onClose}
      >
        {/* Semi-transparent backdrop */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          <ScrollView
            nestedScrollEnabled={true}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {resultFilterList.map(item => (
              <TouchableOpacity
                key={item.id.toString()}
                style={styles.optionItem}
                onPress={() => {
                  setSelectedFilerId(item.id);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    item.id === selectedFilerId && styles.selectedText,
                  ]}
                >
                  {item.name}
                </Text>
                <Image
                  source={item.id === selectedFilerId ? checked : unchecked}
                  style={{ width: Scale(25), height: Scale(25) }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ResultScreen;

const createStyles = (Scale: any) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Scale(10),
    padding: 5,
    justifyContent: 'center',
    paddingHorizontal: Scale(12),
  },
  selectedContainer: {
    borderTopColor: '#FF5A5A',
    borderTopLeftRadius: Scale(5),
    borderTopRightRadius: Scale(5),
    borderTopWidth: Scale(3),
    width: Scale(30),
  },
  headerText: { fontSize: Scale(16), color: '#987E7E', top: 3 },
  selectedHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: Scale(16),
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    padding: 8,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refImage: { width: Scale(30), height: Scale(30) },
  headrrcontainer: {
    backgroundColor: '#3C0D0D', // Dark maroon
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  filterText: {
    color: 'white',
    fontSize: 14,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    position: 'absolute',
    top: Scale(100), // Adjust based on your layout
    width: '100%',
    alignSelf: 'center',
    maxHeight: Scale(250),
    backgroundColor: '#481616',
    borderRadius: Scale(5),
    paddingVertical: Scale(10),
  },
  scrollContent: {
    marginHorizontal: Scale(5),
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Scale(5),
    backgroundColor: '#481616',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    color: 'white',
    padding: Scale(10),
    fontWeight: '400',
  },
  selectedText: {
    fontWeight: 'bold',
  },
});
