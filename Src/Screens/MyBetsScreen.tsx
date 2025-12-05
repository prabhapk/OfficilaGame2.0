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
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  myBetsFilterList,
  myBetsHeaderList,
  myBetsTableData,
  resultFilterList,
  resultHeaderList,
} from "../Constants/CommonFlatlist";
import { COLORS } from "../Constants/Theme";
import ResultTable from "../Components/ResultTable";
import { tableData } from "../Utils/Constants";
import Icon from "react-native-vector-icons/Feather"; // for filter icon
import Entypo from "react-native-vector-icons/Entypo";
import {
  checked,
  hot,
  lefArrow,
  noDataImage,
  unchecked,
} from "../../assets/assets";
import CustomTabs from "../Components/CustomTabsHeader";
import CommonBall from "../Components/CommonBall";
import TableCommonBall from "../Components/TableCommonBall";
import MyBets3DigitsCard from "../Components/MyBets3DigitsCard";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useContainerScale } from "../hooks/useContainerScale";
import * as Clipboard from "expo-clipboard";
import { DatePickerModal } from "react-native-paper-dates";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { getMyOrders } from "../Redux/Slice/threeDigitSlice";
import { groupByOrder } from "../Utils/Common";
import MyOrders from "../Components/MyOrders";
const MyBetsScreen = ({ navigation }: any) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  const [selectedHeaderId, setSelectedHeaderId] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedFilerId, setSelectedFilerId] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const onClose = () => setShowFilter(false);
  const [selectedDate, setSelected] = useState<any>("");
  const headers = ["A", "B", "C"];

  const { isLoggedIn, mainWalletBalance, userId, withdrawBalance } =
    useSelector((state: RootState) => state.signInSlice);
  const dispatch = useDispatch();

  // API call function with groupId
  const fetchMyBetsData = async (groupId: string) => {
    try {
      dispatch(
        getMyOrders({
          userId: userId,
          groupId: groupId,
        })
      );
      console.log("API call made with groupId:", groupId);
    } catch (error) {
      console.error("Error fetching my bets data:", error);
    }
  };

  // Handle groupId selection
  const handleGroupIdSelect = (groupId: string) => {
    setSelectedGroupId(groupId);
    if (groupId) {
      fetchMyBetsData(groupId);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setSelected(selectedDate); // update state with selected date
    }
    setShowFilter(false);
  };
  const renderHeader = ({ item }: any) => {
    const isSelected = item.id === selectedHeaderId;
    return (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => setSelectedHeaderId(item.id)}
          style={[styles.container]}
        >
          <Text
            style={[styles.headerText, isSelected && styles.selectedHeaderText]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
        <View style={[isSelected && styles.selectedContainer]} />
      </View>
    );
  };
  const [copiedId, setCopiedId] = useState(null);
  const gameID = "PK5321";

  const handleCopyLink = async () => {
    try {
      await Clipboard.setStringAsync(gameID);
      Alert.alert("Copied!", "ID copied to clipboard");
    } catch (error) {
      console.log("Error copying id:", error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const [range, setRange] = React.useState({
    startDate: undefined,
    endDate: undefined,
  });

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );

  const { allResultData } = useSelector(
    (state: RootState) => state.resultSlice
  );

  const { myOrdersData, myOrdersLoader } = useSelector(
    (state: RootState) => state.threeDigit
  );

  const resultHeaderList = [
    ...Object.keys(allResultData).map((key, index) => {
      let displayName = key;
      if (key.startsWith("QUICK3D")) {
        displayName = "Quick 3D";
      }
      const groupId = allResultData[key]?.[0]?.groupId ?? null;
      return {
        id: index + 2,
        name: displayName,
        groupId: groupId,
      };
    }),
  ];

  // Call API on component mount with initial groupId
  useEffect(() => {
    if (
      resultHeaderList.length > 0 &&
      resultHeaderList[selectedIndex]?.groupId
    ) {
      const initialGroupId = resultHeaderList[selectedIndex].groupId;
      setSelectedGroupId(initialGroupId);
      fetchMyBetsData(initialGroupId);
    }
  }, [allResultData, selectedIndex]);

  const groupedOrders = groupByOrder(myOrdersData);

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
      <MyBets3DigitsCard
        headers={["A", "B", "C"]}
        myBetsTableData={item.bets.map((b) => ({
          ...b,
          betCount: b.betCount ?? item.betCount,
          totalAmount:
            b.totalAmount ??
            (item.bets.length === 1 ? item.totalAmount : undefined),
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
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.primary }}
      stickyHeaderIndices={[0]}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={{ backgroundColor: COLORS.primary, elevation: 10 }}>
        <View style={styles.headrrcontainer}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              paddingVertical: 5,
            }}
            onPress={() => navigation.pop()}
          >
            <Image
              source={lefArrow}
              tintColor={"#fff"}
              resizeMode="contain"
              style={{ width: Scale(20), height: Scale(20) }}
            />
          </TouchableOpacity>

          <Text style={styles.resultText}>My Bets</Text>
          <TouchableOpacity
            style={styles.filterButton}
            // onPress={() => setShowFilter(!showFilter)}
            onPress={() => setOpen(true)}
          >
            <Icon name="filter" size={16} color="white" />
            <Text style={styles.filterText}> {"Filter"}</Text>
            <Entypo name="chevron-down" size={14} color="white" />
          </TouchableOpacity>

          <DatePickerModal
            locale="en"
            mode="range"
            visible={open}
            onDismiss={onDismiss}
            startDate={range.startDate}
            endDate={range.endDate}
            onConfirm={onConfirm}
            startYear={2025}
            endYear={2028}
          />
        </View>
        
        <View style={{ flex: 1 }}>
          <CustomTabs
            tabs={resultHeaderList}
            index={selectedIndex}
            onIndexChange={setSelectedIndex}
            onSelectGroupId={handleGroupIdSelect}
          />
          
          <FlatList
            data={myBetsFilterList}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: COLORS.primary,
              paddingVertical: Scale(10),
              flex: 1
            }}
            renderItem={renderHeader}
          />
        </View>
      </View>

      <View style={{ marginHorizontal: 15, paddingBottom: 20 }}>
        <FlatList
          data={groupedOrders}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={myOrderRenterItem}
          scrollEnabled={false}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: Scale(50),
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
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Please place the order to see your bets!
              </Text>
            </View>
          }
        />
      </View>

      {showFilter && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(e, date) => handleDateChange(e, date)}
        />
      )}
    </ScrollView>
  );
};

export default MyBetsScreen;

const createStyles = (Scale: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: Scale(10),
      padding: 5,
      justifyContent: "center",
      paddingHorizontal: Scale(12),
    },
    selectedContainer: {
      borderTopColor: "#FF5A5A",
      borderTopLeftRadius: Scale(5),
      borderTopRightRadius: Scale(5),
      borderTopWidth: Scale(3),
      width: Scale(30),
    },
    headerText: { fontSize: Scale(16), color: 'grey', top: 3 },
    selectedHeaderText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: Scale(16),
    },
    menuContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    loginButton: {
      padding: 8,
      paddingHorizontal: 20,
      backgroundColor: "#ccc",
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    refImage: { width: Scale(30), height: Scale(30) },
    headrrcontainer: {
      backgroundColor: COLORS.primary,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    resultText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
    },
    filterButton: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "white",
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    filterText: {
      color: "white",
      fontSize: 14,
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    modalContainer: {
      position: "absolute",
      top: Scale(100), // Adjust based on your layout
      width: "100%",
      alignSelf: "center",
      maxHeight: Scale(250),
      backgroundColor: "#481616",
      borderRadius: Scale(5),
      paddingVertical: Scale(10),
    },
    scrollContent: {
      marginHorizontal: Scale(5),
    },
    optionItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Scale(5),
      backgroundColor: "#481616",
      justifyContent: "space-between",
    },
    optionText: {
      fontSize: 16,
      color: "white",
      padding: Scale(10),
      fontWeight: "400",
    },
    selectedText: {
      fontWeight: "bold",
    },
  });
