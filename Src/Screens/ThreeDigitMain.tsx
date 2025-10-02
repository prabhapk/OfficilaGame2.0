/* eslint-disable react-native/no-inline-styles */
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  SafeAreaView,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";
import React, { use, useEffect, useMemo, useRef, useState } from "react";
import { cancel, CustomerServiceIcon, customerServiceTopIcon, lefArrow, quick3min, sameClock } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  gameRules,
  setInsufficientBalanceModalVisible,
  setPaymentSuccessModalVisible,
  setTableCurrentPage,
  showHowToPlay,
} from "../Redux/Slice/commonSlice";
import HowToPlayModal from "../Components/HowToPlayModal";
import CommonBall from "../Components/CommonBall";
import SingleIntegerTextInput from "../Components/SingleIntegerTextInput";
import GameFooter from "../Components/GameFooter";
import RBSheet from "react-native-raw-bottom-sheet";
import GameHeader from "../Components/GameHeader";
import ResultTable from "../Components/ResultTable";
import AntDesign from "react-native-vector-icons/AntDesign";
import CommonAddButton from "../Components/CommonAddButton";
import CommonQuickGuess from "../Components/CommonQuickGuess";
import { RootState } from "../Redux/store";
import {
  setDoubleDigitA1,
  setDoubleDigitA2,
  setDoubleDigitB1,
  setDoubleDigitB2,
  setDoubleDigitC1,
  setDoubleDigitC2,
  setSingleACount,
  setSingleBCount,
  setSingleCCount,
  setSingleDigitA,
  setSingleDigitB,
  setSingleDigitC,
  setDoubleABCount,
  setDoubleACCount,
  setDoubleBCCount,
  setThreeDigitA,
  setThreeDigitB,
  setThreeDigitC,
  setThreeDigitCount,
  setMin1TargetDate,
  setMin3TargetDate,
  setMin5TargetDate,
  getMyOrders,
} from "../Redux/Slice/threeDigitSlice";
import { handleShowAlert } from "../Redux/Slice/commonSlice";
import CountButtons from "../Components/CountButtons";
import Show30SecondsModal from "../Components/Show30SecondsModal";
import { tableData } from "../Utils/Constants";
import DigitComponent from "../Components/DigitComponent";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../Constants/Theme";
import { getIndividualGameResult } from "../Redux/Slice/resultSlice";
import { getIndividualGameData, payNow } from "../Redux/Slice/HomeSlice";
import {
  convertToISO,
  formatToDecimal,
  formatToTime,
  formatToTimeIST,
  generateOptions,
} from "../Utils/Common";
import { unwrapResult } from "@reduxjs/toolkit";
import CustomLoader from "../Components/CustomLoader";
import { getWalletBalance } from "../Redux/Slice/signInSlice";
import PaymentSuccessModal from "../Components/Modal/PaymentSuccessModal";
import AlertSuccessModal from "../Components/Modal/AlertSuccessModal";
import InsufficientBalanceModal from "../Components/Modal/InsufficientBalanceModal";
import { useContainerScale } from "../hooks/useContainerScale";
import NewAppHeader from "../Components/NewAppHeader";

const ThreeDigitMain = ({ navigation, route }: any) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);

  const {
    threeDigitA,
    threeDigitB,
    threeDigitC,
    threeDigitCount,
    min1TargetDate,
    min3TargetDate,
    min5TargetDate,
    myOrdersData,
    myOrdersLoader,
  } = useSelector((state: RootState) => state.threeDigit);
  const { individualGameData, individualGameDataLoader } = useSelector(
    (state: RootState) => state.homeSlice
  );
  const { isLoggedIn, mainWalletBalance, userId } = useSelector(
    (state: RootState) => state.signInSlice
  );
  const { paymentSuccessModalVisible, InsufficientBalanceModalVisible, tableCurrentPage } =
    useSelector((state: RootState) => state.commonSlice);
  console.log("individualGameData==>", individualGameData);
  const dispatch = useDispatch();

  const now = new Date();
  const [targetDate, setTargetDate] = useState(
    new Date(new Date().getTime() + 3 * 60 * 1000).toISOString()
  );
  const [valueOne, setValueOne] = useState(null);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [islast30sec, setLast30sec] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [cartValues, setCartValues] = useState([]);
  const [last30SecStates, setLast30SecStates] = useState<{
    [key: string]: boolean;
  }>({});

  const handleChildStateChange = (updatedValue: any) => {
    console.log("Received from DigitComponent:", updatedValue);
    setCartValues(updatedValue);
  };
  const { allResultData, individualGameResults } = useSelector(
    (state: RootState) => state.resultSlice
  );

  // helper: convert "HH:mm:ss" → total minutes
  function timeToMinutes(time: string) {
    const [h, m, s] = time.split(":").map(Number);
    return h * 60 + m + (s > 0 ? 1 : 0);
  }

  // helper: convert minutes → "hh:mm AM/PM"
  function minutesTo12Hr(mins: number) {
    const h = Math.floor(mins / 60) % 24;
    const m = mins % 60;
    const period = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")} ${period}`;
  }

  function buildOptions(individualGameData: any[]) {
    if (!individualGameData?.length) return [];

    const first = individualGameData[0];

    // ✅ CASE 1: no interval
    if (first.intervaltime === "00:00:00") {
      return Object.values(
        individualGameData.reduce((acc, item) => {
          if (!acc[item.groupId]) {
            acc[item.groupId] = {
              id: item.groupId,
              groupedId: item.groupedId,
              name: minutesTo12Hr(timeToMinutes(item.endtime)),
              isSelected: Object.keys(acc).length === 0,
            };
          }
          return acc;
        }, {} as Record<number, { id: number; name: string; isSelected: boolean }>)
      );
    }

    // ✅ CASE 2: interval available
    const end = timeToMinutes(first.endtime);
    const step = timeToMinutes(first.intervaltime);

    // ⏰ Use nextresulttime instead of starttime
    const nextResult = new Date(first.nextresulttime);
    const nowMinutes = nextResult.getHours() * 60 + nextResult.getMinutes(); // convert to minutes

    const slots: {
      id: number;
      groupedId: number;
      name: string;
      isSelected: boolean;
    }[] = [];

    for (let t = nowMinutes, i = 0; t <= end; t += step, i++) {
      slots.push({
        id: i + 1,
        groupedId: first.groupId,
        name: minutesTo12Hr(t),
        isSelected: i === 0, // first slot = upcoming game
      });
    }

    return slots;
  }

  const OPTIONS: any = useMemo(
    () => buildOptions(individualGameData),
    [individualGameData]
  );

  const [selectedOption, setSelectedOption] = useState<number | null>(
    OPTIONS.length > 0 ? OPTIONS[0].id : null
  );
  const [selectedTime, setSelectedTime] = useState<any | null>(
    OPTIONS.length > 0 ? OPTIONS[0].name : null
  );
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  // Handle scroll to show/hide sticky header
  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const threshold = 200; // Show sticky header after scrolling 200px (halfway point)
    
    if (scrollY > threshold && !showStickyHeader) {
      setShowStickyHeader(true);
    } else if (scrollY <= threshold && showStickyHeader) {
      setShowStickyHeader(false);
    }
  };

  // If OPTIONS change (new API response), update selectedOption
  useEffect(() => {
    if (OPTIONS.length > 0) {
      setSelectedOption(OPTIONS[0].id);
    }
  }, [OPTIONS]);

  console.log("individualGameResults==>", individualGameResults);

  const transformedData = individualGameResults?.results?.map((item: any) => ({
    ...item,
    balls: item.winningNumber.split(""),
  }));
  console.log("transformedData==>", transformedData);

  const totalPages = individualGameResults.totalPages
  console.log("totalPages==>", totalPages);
  
  const groupId = route.params.gameData?.groupId;
  const gameTypeId = route.params.gameData?.gameTypeId;
  console.log("groupId==>", groupId, gameTypeId);
  const WinningBalls = individualGameData[0]?.lastResult?.winningNumber.split(
    ""
  ) || ["1", "2", "3"];
  console.log("WinningBalls==>", WinningBalls, individualGameData);
  // const WinningBalls = "123"

const renderContent = () => {
  // Add safety check for individualGameData
  if (!individualGameData || individualGameData.length === 0) {
    return null;
  }
  
  const first = individualGameData[0];
  
  // Add safety check for first item
  if (!first) {
    return null;
  }
  
  let matchedGame;
  
  // Handle different cases based on interval time
  if (first?.intervaltime === "00:00:00") {
    // Case 1: No interval - selectedOption corresponds to groupId
    matchedGame = individualGameData?.find(
      (game) => game.groupId === selectedOption
    );
  } else {
    // Case 2: With interval - selectedOption is sequential (1, 2, 3...)
    // All slots use the same groupId (first.groupId)
    matchedGame = individualGameData?.find(
      (game) => game.groupId === first.groupId
    );
  }
  
  console.log("matchedGame==>", selectedOption, individualGameData, selectedTime, "matchedGame:", matchedGame);

  let nextResultTime = "N/A";

  if (first?.intervaltime === "00:00:00") {
    nextResultTime = matchedGame?.nextresulttime || "N/A";
  } else {
    // Get the selected header index (0-based)
    const selectedHeaderIndex = OPTIONS.findIndex(option => option.id === selectedOption);
    
    // If selectedHeader is 0th index, no need to add interval time
    // Otherwise, multiply interval by the selected header index
    const intervalMultiplier = selectedHeaderIndex === 0 ? 0 : selectedHeaderIndex;
    
    if (intervalMultiplier === 0) {
      nextResultTime = first?.nextresulttime || "N/A";
    } else {
      // Add safety checks for required properties
      if (!first?.nextresulttime || !first?.intervaltime) {
        nextResultTime = "N/A";
      } else {
        // Parse the existing date string (e.g., "2025-10-02T15:00:00")
        const [datePart, timePart] = first.nextresulttime.split('T');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        
        // Parse interval time (e.g., "00:30:00")
        const [intervalHours, intervalMinutes, intervalSeconds] = first.intervaltime
          .split(":")
          .map(Number);
        
        // Calculate total minutes to add
        const totalMinutesToAdd = intervalMultiplier * (intervalHours * 60 + intervalMinutes);
        
        // Add minutes to the existing time
        const totalMinutes = hours * 60 + minutes + totalMinutesToAdd;
        
        // Convert back to hours and minutes
        const newHours = Math.floor(totalMinutes / 60) % 24;
        const newMinutes = totalMinutes % 60;
        
        // Format back to the same string format
        nextResultTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }
    
    console.log("nextResultTime==>123", nextResultTime, first.nextresulttime, first.intervaltime, "selectedHeaderIndex:", selectedHeaderIndex, "intervalMultiplier:", intervalMultiplier);
  }
  
  console.log("nextResultTime==>", nextResultTime);
    return (
      <>
        <DigitComponent
          lastGameWiiningId={"12455"}
          nextGameId={formatToTimeIST(nextResultTime)}
          latGameWinningA={WinningBalls[0] || "1"}
          lastGameWinningB={WinningBalls[1] || "2"}
          lastGameWinningC={WinningBalls[2] || "3"}
          singleDigitPrice={Number(individualGameData[0]?.ticketprize)}
          singleDigitWinningPrice={Number(individualGameData[0]?.prizeamount)}
          handleAdd={handleAdd}
          selectedOption={selectedOption}
          doubleDigitPrice={Number(individualGameData[1]?.ticketprize)}
          doubleDigitWinningPrice={Number(individualGameData[1]?.prizeamount)}
          tableData={transformedData}
          handleGenerate={handleGenerate}
          threeDigitWinningPrice={Number(individualGameData[2]?.prizeamount)}
          threeDigitPrice={Number(individualGameData[2]?.ticketprize)}
          onStateChange={handleChildStateChange}
          targetDateProp={nextResultTime}
          // onTimerComplete={handleTimerComplete}
          gameName={individualGameData[0]?.name}
          singleDigitGameId={individualGameData[0]?.id}
          doubleDigitGameId={individualGameData[1]?.id}
          threeDigitGameId={individualGameData[2]?.id}
          groupId={groupId}
          totalPage ={totalPages}
          onThirtySecondsRemaining={() => {
            setLast30SecStates((prev) => ({
              ...prev,
              [groupId]: true, // mark this group as <30s
            }));
          }}
          onTimerComplete={() => {
            setLast30SecStates((prev) => ({
              ...prev,
              [groupId]: false, // reset when timer completes
            }));
            handleTimerComplete(); // your other reset logic
          }}
        />
      </>
    );
  };
  console.log("userId==>", userId);
  console.log("groupId==>", groupId);

  const handleTimerComplete = () => {
    dispatch(
      getIndividualGameData({
        typeId: gameTypeId,
      })
    );
    dispatch(
      getMyOrders({
        userId: userId,
        groupId: groupId,
      })
    );

    setLast30sec(false);
  };
  const filterNumericInput = (value: string) => {
    return value.replace(/[^0-9]/g, "");
  };
  const onChangeSingleDigitA = (value: any) => {
    const filteredValue = filterNumericInput(value);
    dispatch(setSingleDigitA(filteredValue));
  };
  const onChangeSingleDigitB = (value: any) => {
    const filteredValue = filterNumericInput(value);
    dispatch(setSingleDigitB(filteredValue));
  };
  const onChangeSingleDigitC = (value: any) => {
    const filteredValue = filterNumericInput(value);
    dispatch(setSingleDigitC(filteredValue));
  };
  const doubleDigitA1OnChange = (value: any) => {
    const filteredValue = filterNumericInput(value);
    dispatch(setDoubleDigitA1(filteredValue));
  };
  const doubleDigitA2OnChange = (value: any) => {
    const filteredValue = filterNumericInput(value);
    dispatch(setDoubleDigitA2(filteredValue));
  };
  const doubleDigitB1OnChange = (value: any) => {
    const filteredValue = filterNumericInput(value);
    dispatch(setDoubleDigitB1(filteredValue));
  };
  const doubleDigitB2OnChange = (value: any) => {
    const filteredValue = filterNumericInput(value);
    dispatch(setDoubleDigitB2(filteredValue));
  };
  const doubleDigitC1OnChange = (value: any) => {
    const filteredValue = filterNumericInput(value);
    dispatch(setDoubleDigitC1(filteredValue));
  };
  const doubleDigitC2OnChange = (value: any) => {
    const filteredValue = filterNumericInput(value);
    dispatch(setDoubleDigitC2(filteredValue));
  };
  const onChangeThreeDigitA = (value: any) => {
    const filteredValue = filterNumericInput(value);
    dispatch(setThreeDigitA(filteredValue));
  };
  const onChangeThreeDigitB = (value: any) => {
    const filteredValue = filterNumericInput(value);
    dispatch(setThreeDigitB(filteredValue));
  };
  const onChangeThreeDigitC = (value: any) => {
    const filteredValue = filterNumericInput(value);
    dispatch(setThreeDigitC(filteredValue));
  };
  const onBlurOne = () => {
    setIsOnFocus(false);
  };
  const refRBSheet: any = useRef();
  // const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const handleAdd = (
    label: string,
    value: string,
    count: number,
    selectedOption: string,
    price: number,
    groupId: number,
    gameId: number,
    targetDateProp: any
  ) => {
    console.log(
      "testttt",
      label,
      value,
      count,
      selectedOption,
      price,
      groupId,
      gameId,
      selectedTime
    );

    if (value === "") {
      Alert.alert("Error", "Please enter a value");
      return;
    }

    setNumbers((prevNumbers) => [
      ...prevNumbers,
      {
        id: prevNumbers.length + 1,
        label,
        value,
        count,
        type: selectedOption,
        price,
        groupId,
        gameId,
        bettingTime: targetDateProp,
      },
    ]);
    console.log("Label==>", label);

    // Clear input after adding data
    clearInputs(label);
  };

  const clearInputs = (label: string) => {
    if (label === "A") {
      onChangeSingleDigitA(""), dispatch(setSingleACount(3));
    } else if (label === "B") {
      onChangeSingleDigitB(""), dispatch(setSingleBCount(3));
    } else if (label === "C") {
      onChangeSingleDigitC(""), dispatch(setSingleCCount(3));
    } else if (label === "AB") {
      doubleDigitA1OnChange(""), dispatch(setDoubleABCount(3));
      doubleDigitB1OnChange("");
    } else if (label === "AC") {
      doubleDigitA2OnChange(""), dispatch(setDoubleACCount(3));
      doubleDigitC1OnChange("");
    } else if (label === "BC") {
      doubleDigitB2OnChange(""), dispatch(setDoubleBCCount(3));
      doubleDigitC2OnChange("");
    } else if (label === "ABC") {
      onChangeThreeDigitA(""), dispatch(setThreeDigitCount(3));
      onChangeThreeDigitB(""), onChangeThreeDigitC("");
    }
  };
  const handleHeader = (value: any) => {
    const isAdded = numbers.find((item: any) => item.type !== value.name);

    if (isAdded) {
      Alert.alert(
        "Confirmation Reminder",
        `You have placed an order for the Text\n${selectedOption} time.\nAre you sure you want to remove your previous selections?`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Confirm",
            onPress: () => {
              setNumbers([]);
              setSelectedOption(value.id);
              setSelectedTime(value.name);
            },
          },
        ],
        { cancelable: false }
      );

      return;
    }

    setSelectedOption(value.id);
    setSelectedTime(value.name);
  };

  const getRandomNumber = () => Math.floor(Math.random() * 10);
  const removeNumber = (id: number) => {
    setNumbers((prevNumbers) => prevNumbers.filter((item) => item.id !== id));
  };

  const generateRandomNumbers = () => {
    dispatch(setSingleDigitA(getRandomNumber()));
    dispatch(setSingleDigitB(getRandomNumber()));
    dispatch(setSingleDigitC(getRandomNumber()));
  };
  const generateDoubleDigitRandomNumbers = () => {
    dispatch(setDoubleDigitA1(getRandomNumber()));
    dispatch(setDoubleDigitA2(getRandomNumber()));
    dispatch(setDoubleDigitB1(getRandomNumber()));
    dispatch(setDoubleDigitB2(getRandomNumber()));
    dispatch(setDoubleDigitC1(getRandomNumber()));
    dispatch(setDoubleDigitC2(getRandomNumber()));
  };
  const generateThreeDigitRandomNumbers = () => {
    dispatch(setThreeDigitA(getRandomNumber()));
    dispatch(setThreeDigitB(getRandomNumber()));
    dispatch(setThreeDigitC(getRandomNumber()));
  };

  const resetState = () => {
    console.log("resetState");
    setNumbers([]);
    setCartValues([]);
    // setSelectedOption(null);
    setSingleACount(3);
    setSingleBCount(3);
    setSingleCCount(3);
    setDoubleABCount(3);
    setDoubleACCount(3);
    setDoubleBCCount(3);
    setThreeDigitCount(3);
    dispatch(setSingleDigitA(""));
    dispatch(setSingleDigitB(""));
    dispatch(setSingleDigitC(""));
    dispatch(setDoubleDigitA1(""));
    dispatch(setDoubleDigitA2(""));
    dispatch(setDoubleDigitB1(""));
    dispatch(setDoubleDigitB2(""));
    dispatch(setDoubleDigitC1(""));
    dispatch(setDoubleDigitC2(""));
    dispatch(setThreeDigitA(""));
    dispatch(setThreeDigitB(""));
    dispatch(setThreeDigitC(""));
  };
  useEffect(() => {
    resetState();
    dispatch(setTableCurrentPage(1))
  }, []);

  useEffect(() => {
    console.log("Updated Numbers:", numbers);
  }, [numbers]);

  const toggleSheet = () => {
    if (isSheetOpen) {
      refRBSheet.current?.close();
    } else {
      refRBSheet.current?.open();
    }
  };

  const sum = numbers.reduce(
    (acc: any, item: any) => acc + item.count * item.price,
    0
  );
  const sum1 = numbers.reduce((acc: any, item: any) => acc + item.count, 0);
  console.log("sum==>", sum);
  console.log("sum==> 1", sum1);

  const handleAddPermutations = (
    label: string,
    values: string[],
    count: number,
    selectedOption: string,
    price: number,
    groupId: number,
    gameId: number,
    bettingTime: any
  ) => {
    if (values.length === 0) {
      Alert.alert("Error", "Please enter a value");
      return;
    }
    console.log("testttt", groupId, gameId);

    // Generate permutations
    const results: Set<string> = new Set();

    const permute = (arr: string[], m: string[] = []) => {
      if (arr.length === 0) {
        results.add(m.join(""));
      } else {
        for (let i = 0; i < arr.length; i++) {
          const current = [...arr];
          const next = current.splice(i, 1);
          permute(current, [...m, ...next]);
        }
      }
    };

    permute(values);

    // Add generated values with ID to state
    setNumbers((prevNumbers) => [
      ...prevNumbers,
      ...Array.from(results).map((value, index) => ({
        id: prevNumbers.length + index + 1, // Unique ID based on array length
        label,
        value,
        count,
        type: selectedOption,
        price,
        groupId,
        gameId,
        bettingTime,
      })),
    ]);

    console.log("Label==>", label);
  };

  // Handle button press
  const handleGenerate = (
    threeDigitPrice: number,
    groupId: number,
    threeDigitGameId: number,
    targetDateProp: string
  ) => {
    if (threeDigitA !== "" && threeDigitB !== "" && threeDigitC !== "") {
      const values = [threeDigitA, threeDigitB, threeDigitC];
      handleAddPermutations(
        "ABC",
        values,
        threeDigitCount,
        selectedOption,
        threeDigitPrice,
        groupId,
        threeDigitGameId,
        targetDateProp
      );
      clearInputs("ABC");
    }
  };
  //   const handleGenerate = (
  //   threeDigitPrice: number,
  //   groupId: number,
  //   threeDigitGameId: number,
  //   targetDateProp: string
  // ) => {
  //   console.log("📌 From child BOX button:", {
  //     threeDigitPrice,
  //     groupId,
  //     threeDigitGameId,
  //     targetDateProp,
  //   });

  //   // 👉 Here you can call API, set state, etc.
  // };

  const renderHeader = ({ item }: any) => {
    console.log("item==>asasa", item);
    return (
      <LinearGradient
        colors={[
          selectedOption === item.id ? "#FF4242" : COLORS.secondary, // fallback color
          selectedOption === item.id ? "#f6c976ff" : COLORS.secondary,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.headerBtn]}
      >
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => handleHeader(item)}
        >
          <Image
            source={sameClock}
            resizeMode="contain"
            style={styles.headerImg}
          />
          <Text
            style={{
              color: "white",
              marginLeft: 5,
              fontSize: Scale(14),
              fontWeight: "bold",
              marginTop: Scale(5),
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  console.log('tableCurrentPage==>', tableCurrentPage );
  
  useEffect(() => {
    dispatch(
      getIndividualGameResult({
        // groupId: groupId,
        GametypeId: groupId,
        page: tableCurrentPage,
        pageSize: 10,
      })
    );
    dispatch(
      getIndividualGameData({
        typeId: gameTypeId,
      })
    );
    dispatch(
      getMyOrders({
        userId: userId,
        groupId: groupId,
      })
    );
  }, [gameTypeId, groupId, tableCurrentPage]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (paymentSuccessModalVisible) {
      timer = setTimeout(() => {
        dispatch(setPaymentSuccessModalVisible(false));
      }, 3000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [paymentSuccessModalVisible, dispatch]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (InsufficientBalanceModalVisible) {
      timer = setTimeout(() => {
        dispatch(setInsufficientBalanceModalVisible(false));
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [InsufficientBalanceModalVisible, dispatch]);

  const handlePayNow = async () => {
    console.log("numbers==>", numbers);
    if (isLoggedIn) {
      try {
        const apiData = {
          bets: numbers.map((item) => ({
            gameId: item.gameId,
            groupId: item.groupId,
            betType: item.label,
            selectedNumber: String(item.value),
            betCount: item.count,
            amount: item.price,
            gameTime: item.bettingTime,
          })),
        };

        const resultAction = await dispatch(payNow(apiData));
        const data = unwrapResult(resultAction);
        console.log("data==>", data);
        if (data.success === true) {
          resetState();
          dispatch(getWalletBalance());
          dispatch(
            getMyOrders({
              userId: userId,
              groupId: groupId,
            })
          );
        }
      } catch (error: any) {
        console.log("handlePayNowError", error);
      }
    } else {
      navigation.navigate("SignInScreen");
    }
  };

  console.log("islast30sec==>", islast30sec);

  useEffect(() => {
    dispatch(gameRules({gameTypeId: groupId} ));
  }, [groupId]);

  return (
    <View style={styles.mainContainer}>
      {/* {islast30sec && <Show30SecondsModal />} */}
      <CustomLoader
        visible={Boolean(individualGameDataLoader) && Boolean(myOrdersLoader)}
      />
      
      {/* Sticky Header - Only shows when scrolled halfway */}
      {showStickyHeader && (
       <NewAppHeader 
       leftIconPress={goBack}
       rightIconPress={() => navigation.navigate('SignUpScreen')}
       centerText={individualGameData[0]?.name}
       rightIcon={CustomerServiceIcon}
       />
       
      )}
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          flexGrow: 1, 
          paddingBottom: Scale(100),
          paddingTop: showStickyHeader ? Scale(80) : 0 // Only add padding when sticky header is visible
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <CustomLoader
          visible={
            Boolean(individualGameDataLoader) && Boolean(myOrdersLoader)
          }
        />
        <GameHeader
          HeaderText={individualGameData[0]?.name}
          leftonPress={goBack}
          leftImage={lefArrow}
          rightImage={lefArrow}
          onPressWithdraw={() => {
            navigation.navigate("Withdraw");
          }}
          onPressRecharge={() => {
            navigation.navigate("WalletScreen");
          }}
          walletBalance={formatToDecimal(mainWalletBalance)}
          onPressRefresh={() => {
            dispatch(getWalletBalance());
          }}
        />
        <FlatList
          data={OPTIONS}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.startView}
          renderItem={renderHeader}
          nestedScrollEnabled={true}
          scrollEnabled={true}
        />
        
        <View style={styles.subContainer}>
          {/* Conditionally Render UI Based on Selection */}
          <View style={styles.renderDataView}>{renderContent()}</View>
          <View>
            <HowToPlayModal />
          </View>
        </View>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        height={Platform.OS === "ios" ? Scale(400) : Scale(350)} // Reduced height
        draggable={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            borderTopLeftRadius: Scale(20),
            borderTopRightRadius: Scale(20),
            paddingHorizontal: Scale(10),
            marginBottom: Scale(80),
          },
          draggableIcon: {
            width: Scale(75),
            height: Scale(5),
            backgroundColor: "#D9D9D9",
            borderRadius: Scale(2.5),
            marginVertical: Scale(10),
          },
        }}
      >
        <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: Scale(16),
                color: "black",
                marginHorizontal: Scale(10),
              }}
            >
              My Numbers
            </Text>
            <TouchableOpacity onPress={() => setNumbers([])}>
              <AntDesign
                name={"delete"}
                size={Scale(18)}
                color={"black"}
                style={{ marginRight: Scale(10) }}
              />
            </TouchableOpacity>
          </View>
          {/* inside */}
          {islast30sec ? (
            <View>
              <Text>Empty</Text>
            </View>
          ) : (
            <View style={{ marginHorizontal: Scale(10), marginTop: Scale(20) }}>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: Scale(10),
                }}
              >
                {numbers.map((item) => (
                  <View
                    key={item.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#F1F1F3",
                      borderRadius: Scale(20),
                      paddingHorizontal: Scale(15),
                      paddingVertical: Scale(8),
                      position: "relative",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: Scale(14),
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      {item.label} = {item.value}
                    </Text>

                    <View
                      style={{
                        backgroundColor: "#F27842",
                        borderRadius: Scale(5),
                        paddingHorizontal: Scale(5),
                        marginLeft: Scale(5),
                      }}
                    >
                      <Text
                        style={{
                          fontSize: Scale(12),
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        x{item.count}
                      </Text>
                    </View>

                    {/* Remove Button */}
                    <TouchableOpacity
                      onPress={() => removeNumber(item.id)}
                      style={{
                        position: "absolute",
                        top: Scale(-5),
                        right: Scale(-5),
                        backgroundColor: "white",
                        width: Scale(18),
                        height: Scale(18),
                        borderRadius: Scale(9),
                        justifyContent: "center",
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        elevation: 3, // Android shadow
                      }}
                    >
                      <Image
                        source={cancel}
                        style={{ width: Scale(10), height: Scale(10) }}
                        tintColor={"black"}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </RBSheet>
      <SafeAreaView
        style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
      >
        <View
          style={{
            backgroundColor: "#3e0d0d",
            height: Scale(80),
            elevation: 10,
          }}
        >
          <GameFooter
            openSheet={() => refRBSheet.current.open()}
            totalAmount={sum}
            totalCount={sum1}
            isDisabled={sum1 === 0 || last30SecStates[groupId]}
            handlePayNow={handlePayNow}
          />
          <PaymentSuccessModal
            headerImage
            isVisible={paymentSuccessModalVisible}
            toggleModal={() => dispatch(setPaymentSuccessModalVisible(false))}
            headerText="Paid successfully!"
            bodyText="Your tickets have been successfully purchased. Please take note of the draw time and check the results
            Three Digits promptly."
          />
          <InsufficientBalanceModal
            isVisible={InsufficientBalanceModalVisible}
            headerText="Insufficient Balance!"
            bodyText="Please add funds to your wallet to continue"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
const createStyles = (Scale: any) =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: "#3e0d0d",
      flex: 1,
      marginBottom: Scale(0),
    },
    subContainer: {
      marginTop: Scale(10),
      marginHorizontal: 10,
    },
    container: {
      flex: 1,
    },
    card: {
      marginTop: Scale(20),
      backgroundColor: "#5A1C1C",
      width: "100%",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
    cancelImage: {
      height: Scale(24),
      width: Scale(24),
      marginTop: Scale(10),
    },
    startView: {
      paddingHorizontal: 10,
      alignItems: 'center',
    },
    renderDataView: {
      padding: 10,
      backgroundColor: "#3e0d0d",
      borderRadius: 10,
    },
    gameDetailView: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      marginTop: 10,
      backgroundColor: "#DBCEFB",
      overflow: "hidden",
    },
    showCountContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#EEF0F6",
      borderRadius: 30,
      paddingHorizontal: 5,
      height: 40,
      marginLeft: 30,
    },
    button: {
      backgroundColor: "#F5F7FB",
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      // marginHorizontal: 20,
    },
    symbol: {
      fontSize: 15,
      color: "black",
    },
    input: {
      width: 50, // Set an explicit width to ensure visibility
      fontSize: 18,
      fontWeight: "bold",
      color: "#000", // Ensure text is visible
      textAlign: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
    },
    valueText: {
      marginTop: 20,
      fontSize: 18,
      fontWeight: "bold",
    },
    boxButton: {
      backgroundColor: "#007AFF",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    DigitTitleText: {
      color: "#000",
      fontWeight: "bold",
      fontSize: Scale(16),
    },
    DigitTitleText1: {
      color: "#000",
      fontWeight: "bold",
      fontSize: Scale(14),
      top: 1,
    },
    headerBtn: {
      alignItems: "center",
      borderRadius: 10,
      padding: 10,
      justifyContent: "center",
      marginHorizontal: 5,
      height: Scale(100),
    },
    headerImg: { width: 30, height: 30 },
    
    // Sticky Header Styles
    stickyHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: '#FF4242',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Scale(15),
      paddingTop: Scale(50), // Account for status bar
      paddingBottom: Scale(10),
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      transform: [{ translateY: 0 }],
    },
    stickyBackButton: {
      padding: Scale(5),
      marginRight: Scale(10),
    },
    stickyBackIcon: {
      width: Scale(20),
      height: Scale(20),
      tintColor: 'white',
    },
    stickyHeaderTitle: {
      flex: 1,
      color: 'white',
      fontSize: Scale(16),
      fontWeight: 'bold',
      textAlign: 'center',
    },
    stickyHeaderSpacer: {
      width: Scale(30), // Same width as back button to center the title
    },
  });
export default ThreeDigitMain;
