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
  Alert,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
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
import { getMyOrders, myOrdersLoader } from "../Redux/Slice/threeDigitSlice";
import { groupByOrderNew, groupByOrder } from "../Utils/Common";
import MyOrders from "../Components/MyOrders";
import { Image } from "expo-image";
import CustomLoader from "../Components/CustomLoader";
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
  const { gamesNameWithGroupId } = useSelector(
    (state: RootState) => state.homeSlice,
  );
  console.log("gamesNameWithGroupId==>", gamesNameWithGroupId);

  const dispatch = useDispatch();

  // API call function with groupId
  const fetchMyBetsData = async (groupId: string) => {
    try {
      dispatch(
        getMyOrders({
          userId: userId,
          groupId: groupId,
        }),
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
    const isSelected = item.id === selectedFilerId;

    return (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => setSelectedFilerId(item.id)}
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
    [setOpen, setRange],
  );

  const { allResultData } = useSelector(
    (state: RootState) => state.resultSlice,
  );
  console.log("allResultData==>", allResultData);

  const { myOrdersData, myOrdersLoader } = useSelector(
    (state: RootState) => state.threeDigit,
  );

  // const resultHeaderList = [
  //   ...Object.keys(allResultData).map((key, index) => {
  //     let displayName = key;
  //     if (key.startsWith("QUICK3D")) {
  //       displayName = "Quick 3D";
  //     }
  //     const groupId = allResultData[key]?.[0]?.groupId ?? null;
  //     return {
  //       id: index + 2,
  //       name: displayName,
  //       groupId: groupId,
  //     };
  //   }),
  // ];

  // Call API on component mount with initial groupId

  const resultHeaderList = useMemo(() => {
    const quick3dTabs = Object.keys(allResultData || {})
      .filter((key) => key.startsWith("QUICK3D"))
      .map((key, index) => ({
        id: 100 + index,
        name: "Quick 3D",
        groupId: allResultData[key]?.[0]?.groupId ?? null,
      }));

    const filteredGames = (gamesNameWithGroupId || []).filter(
      (g) => !g.name.toLowerCase().includes("quick3d"),
    );

    return [...quick3dTabs, ...filteredGames];
  }, [allResultData, gamesNameWithGroupId]);

  // useEffect(() => {
  //   if (
  //     resultHeaderList.length > 0 &&
  //     resultHeaderList[selectedIndex]?.groupId
  //   ) {
  //     const initialGroupId = resultHeaderList[selectedIndex].groupId;
  //     setSelectedGroupId(initialGroupId);
  //     fetchMyBetsData(initialGroupId);
  //   }
  // }, [allResultData, selectedIndex]);
  useEffect(() => {
    if (resultHeaderList.length > 0) {
      const groupId = resultHeaderList[selectedIndex]?.groupId;

      if (groupId) {
        setSelectedGroupId(groupId);
        fetchMyBetsData(groupId);
      }
    }
  }, [selectedIndex, resultHeaderList]);

  const groupedOrders = groupByOrder(myOrdersData);

  console.log("groupedOrdersBetScreen===>", groupedOrders);
  console.log("myOrdersDataBetsScreen===>", myOrdersData);
  // const filteredOrders = useMemo(() => {
  //   return groupedOrders.filter((item: any) => {
  //     if (selectedFilerId === 1) return true;
  //     if (selectedFilerId === 2) return !item.winningNumber;
  //     if (selectedFilerId === 3) return item.winningNumber && !item.isWinning;
  //     if (selectedFilerId === 4) return item.isWinning;
  //     return true;
  //   });
  // }, [groupedOrders, selectedFilerId]);
  const filteredOrders = groupedOrders.filter((item: any) => {
    const betDate = new Date(item.betTime);

    const start = range.startDate ? new Date(range.startDate) : null;
    const end = range.endDate ? new Date(range.endDate) : null;

    // DATE FILTER
    if (start && betDate < start) return false;
    if (end && betDate > end) return false;

    // STATUS FILTER
    if (selectedFilerId === 1) return true;

    if (selectedFilerId === 2) {
      return !item.winningNumber; // To Be Drawn
    }

    if (selectedFilerId === 3) {
      return item.winningNumber && !item.isWinning; // Drawn
    }

    if (selectedFilerId === 4) {
      return item.isWinning; // Won
    }

    return true;
  });

  const myOrderRenterItem = ({ item }: { item: any }) => {
    console.log("ORDER ITEM:", item);
    console.log("BETS:", item.bets);
    const betDate = new Date(item.betTime);
    const formattedBetDate = betDate.toLocaleDateString();
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
        bettingTime={formattedBetDate}
        paymentAmount={item.totalAmount}
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
        gameName={item.gameName || "AnnaiGaming"}
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
      <CustomLoader visible={myOrdersLoader} />
      <View style={{ backgroundColor: COLORS.primary, elevation: 10 }}>
        <View style={styles.headrrcontainer}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              paddingVertical: 5,
            }}
            onPress={() => navigation.pop()}
          >
            <Entypo
              name="chevron-left"
              size={Scale(30)}
              color={COLORS.white}
              style={{
                width: Scale(24),
                height: Scale(34),
                marginTop: Scale(10),
                marginLeft: Scale(10),
              }}
            />
            {/* <Image
              source={lefArrow}
              tintColor={"#fff"}
              contentFit="contain"
              style={{ width: Scale(20), height: Scale(20) }}
            /> */}
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
              flex: 1,
            }}
            renderItem={renderHeader}
          />
        </View>
      </View>

      <View style={{ marginHorizontal: 15, paddingBottom: 20 }}>
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.betUniqueId}
          showsVerticalScrollIndicator={false}
          renderItem={myOrderRenterItem}
          scrollEnabled={false}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: Scale(100),
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
    headerText: { fontSize: Scale(16), color: "grey", top: 3 },
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
