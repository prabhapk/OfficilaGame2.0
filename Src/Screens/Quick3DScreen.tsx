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
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { cancel, lefArrow, sameClock } from '../../assets/assets';
import { useDispatch, useSelector } from 'react-redux';
import HowToPlayModal from '../Components/HowToPlayModal';
import GameFooter from '../Components/GameFooter';
import RBSheet from 'react-native-raw-bottom-sheet';
import GameHeader from '../Components/GameHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RootState } from '../Redux/store';
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
} from '../Redux/Slice/threeDigitSlice';
import { handleShowAlert, setInsufficientBalanceModalVisible, setPaymentSuccessModalVisible } from '../Redux/Slice/commonSlice';
import Show30SecondsModal from '../Components/Show30SecondsModal';
import DigitComponent from '../Components/DigitComponent';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../Constants/Theme';
import { useContainerScale } from '../hooks/useContainerScale';
import { fetchQuick3DGamesData } from '../Redux/Slice/Quick3DSlice';
import { formatToDecimal, formatToTime } from '../Utils/Common';
import { getWalletBalance } from '../Redux/Slice/signInSlice';
import { payNow } from '../Redux/Slice/HomeSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import PaymentSuccessModal from '../Components/Modal/PaymentSuccessModal';
import InsufficientBalanceModal from '../Components/Modal/InsufficientBalanceModal';


const Quick3DScreen = ({ navigation, route }: any) => {
  const { Scale } = useContainerScale();
  const styles = createStyles(Scale);
  const gameData = route.params.gameData;
  const dispatch = useDispatch();
  const refRBSheet: any = useRef();


  const [selectedOption, setSelectedOption] = useState('1 Mins');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [islast30sec, setLast30sec] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [cartValues, setCartValues] = useState([]);

  const {
    threeDigitA,
    threeDigitB,
    threeDigitC,
    threeDigitCount,
  } = useSelector((state: RootState) => state.threeDigit);

  const { allResultData, individualGameResults } = useSelector((state: RootState) => state.resultSlice);
  const { quick3dGamesList } = useSelector((state: RootState) => state.quick3DSlice);
  const { isLoggedIn, mainWalletBalance } = useSelector(
    (state: RootState) => state.signInSlice
  );
  const {paymentSuccessModalVisible, InsufficientBalanceModalVisible} = useSelector(
    (state: RootState) => state.commonSlice
  );

  const transformedResultData = individualGameResults.map((item: any) => ({
    ...item,
    balls: item.winningNumber
      .split(''),
  }));

  const handleChildStateChange = (updatedValue: any) => {
    setCartValues(updatedValue);
  };


  useEffect(() => {
    if (gameData.name === "1minGame") {
      setSelectedOption("1 Mins");
      dispatch(
        fetchQuick3DGamesData({
          quickythree: "Q3D-1M",
        })
      );
    }
    else if (gameData.name === "3minGame") {
      setSelectedOption("3 Mins");
      dispatch(
        fetchQuick3DGamesData({
          quickythree: "Q3D-3M",
        })
      );
    }
    else if (gameData.name === "5minGame") {
      setSelectedOption("5 Mins");
      dispatch(
        fetchQuick3DGamesData({
          quickythree: "Q3D-5M",
        })
      );
    }
  }, [gameData])



  const transformApiResponse = (response: any) => {
    const key = Object.keys(response)[0]; // "23:59:59"
    const games = response[key];

    const single = games?.find((g: any) => g.sectiontype === "Single");
    const double = games?.find((g: any) => g.sectiontype === "Double");
    const triple = games?.find((g: any) => g.sectiontype === "Triple");

    const lastWinningNumber = triple?.lastResult?.winningNumber || "";
    const [a = "", b = "", c = ""] = lastWinningNumber.split("");

    return {
      lastGameWiiningId: triple?.lastResult?.winningNumber || "",
      nextGameId:formatToTime( triple?.nextresulttime )|| 0,
      lastGameWinningA: a,
      lastGameWinningB: b,
      lastGameWinningC: c,

      // Prices
      singleDigitPrice: Number(single?.ticketprize) || 0,
      doubleDigitPrice: Number(double?.ticketprize) || 0,
      threeDigitPrice: Number(triple?.ticketprize) || 0,

      // Winning amounts
      singleDigitWinningPrice: Number(single?.prizeamount) || 0,
      doubleDigitWinningPrice: Number(double?.prizeamount) || 0,
      threeDigitWinningPrice: Number(triple?.prizeamount) || 0,

      // IDs
      groupId: triple?.groupId || 0,
      singleDigitGameId: single?.id || 0,
      doubleDigitGameId: double?.id || 0,
      threeDigitGameId: triple?.id || 0,

      // Timer
      targetDateProp: triple?.nextresulttime || null,

      // Raw data if needed
      tableData: games,
      gameName: "Quick 3D"
    };
  };



  const filterNumericInput = (value: string) => {
    return value.replace(/[^0-9]/g, '');
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


  const goBack = () => {
    navigation.navigate('DrawerNavigation');
  };



  const handleAdd = (
    label: string,
    value: string,
    count: number,
    selectedOption: string,
    price: number,
    groupId: number,
    gameId: number
  ) => {
    if (value === '') {
      Alert.alert('Error', 'Please enter a value');
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
      },
    ]);


    // Clear input after adding data
    clearInputs(label);
  };

  const clearInputs = (label: string) => {
    if (label === 'A') {
      onChangeSingleDigitA(''), dispatch(setSingleACount(3));
    } else if (label === 'B') {
      onChangeSingleDigitB(''), dispatch(setSingleBCount(3));
    } else if (label === 'C') {
      onChangeSingleDigitC(''), dispatch(setSingleCCount(3));
    } else if (label === 'AB') {
      doubleDigitA1OnChange(''), dispatch(setDoubleABCount(3));
      doubleDigitB1OnChange('');
    } else if (label === 'AC') {
      doubleDigitA2OnChange(''), dispatch(setDoubleACCount(3));
      doubleDigitC1OnChange('');
    } else if (label === 'BC') {
      doubleDigitB2OnChange(''), dispatch(setDoubleBCCount(3));
      doubleDigitC2OnChange('');
    } else if (label === 'ABC') {
      onChangeThreeDigitA(''), dispatch(setThreeDigitCount(3));
      onChangeThreeDigitB(''), onChangeThreeDigitC('');
    }
  }
  const handleHeader = (value: any) => {
    const isAdded = numbers.some((item: any) => item.type === value.name);

    if (!isAdded && numbers.length > 0) {
      Alert.alert(
        'Confirmation Reminder',
        `You have placed an order for the Text\n${selectedOption} time.\nAre you sure you want to remove your previous selections?`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => {
              setNumbers([]);
              setSelectedOption(value.name);

              triggerAPI(value.name);
            },
          },
        ],
        { cancelable: false },
      );
      return;
    }

    setSelectedOption(value.name);
    triggerAPI(value.name);

  };

  const triggerAPI = (selectedOption: string) => {
    
    if (selectedOption == "1 Mins") {
      dispatch(
        fetchQuick3DGamesData({
          quickythree: "Q3D-1M",
        })
      );
    }
    else if (selectedOption == "3 Mins") {
      dispatch(
        fetchQuick3DGamesData({
          quickythree: "Q3D-3M",
        })
      );
    }
    else if (selectedOption == "5 Mins") {
      dispatch(
        fetchQuick3DGamesData({
          quickythree: "Q3D-5M",
        })
      );
    }
    setLast30sec(false);
  }

  const getRandomNumber = () => Math.floor(Math.random() * 10);
  const removeNumber = (id: number) => {
    setNumbers(prevNumbers => prevNumbers.filter(item => item.id !== id));
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



  const toggleSheet = () => {
    if (isSheetOpen) {
      refRBSheet.current?.close();
    } else {
      refRBSheet.current?.open();
    }
  };

  const sum = numbers.reduce(
    (acc: any, item: any) => acc + item.count * item.price,
    0,
  );
  const sum1 = numbers.reduce((acc: any, item: any) => acc + item.count, 0);


  const handleAddPermutations = (
    label: string,
    values: string[],
    count: number,
    selectedOption: string,
    price: number,
  ) => {
    if (values.length === 0) {
      Alert.alert('Error', 'Please enter a value');
      return;
    }

    // Generate permutations
    const results: Set<string> = new Set();

    const permute = (arr: string[], m: string[] = []) => {
      if (arr.length === 0) {
        results.add(m.join(''));
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
    setNumbers(prevNumbers => [
      ...prevNumbers,
      ...Array.from(results).map((value, index) => ({
        id: prevNumbers.length + index + 1, // Unique ID based on array length
        label,
        value,
        count,
        type: selectedOption,
        price,
      })),
    ]);
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
  }, []);

  // Handle button press
  const handleGenerate = (threeDigitPrice: any) => {
    console.log("threeDigitPrice==>",threeDigitPrice);
    
    if (threeDigitA !== '' && threeDigitB !== '' && threeDigitC !== '') {
      const values = [threeDigitA, threeDigitB, threeDigitC];
      handleAddPermutations(
        'ABC',
        values,
        threeDigitCount,
        selectedOption,
        threeDigitPrice,
      )
      clearInputs('ABC');
    }
  }
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
          })),
        };
        console.log("apiData==>",apiData);
        
        const resultAction = await dispatch(payNow(apiData));
        const data = unwrapResult(resultAction);
        console.log("data==>",data);
        if (data.success === true) {
         resetState();
        dispatch(getWalletBalance());
        }
      }
       catch (error: any) {
        console.log("handlePayNowError", error);
      }
    } 
    else {
      navigation.navigate("SignInScreen");
    }
  };

  const OPTIONS = [{ id: 1, name: '1 Mins', isSelected: true },
  { id: 2, name: '3 Mins', isSelected: false },
  { id: 3, name: '5 Mins', isSelected: false }];

  const renderHeader = ({ item }: any) => {
    return (

      <LinearGradient
        colors={[
          selectedOption === item.name ? '#FF4242' : COLORS.secondary, // fallback color
          selectedOption === item.name ? '#f6c976ff' : COLORS.secondary,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.headerBtn, { backgroundColor: selectedOption === item.name ? 'pink' : 'white', }]}>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => handleHeader(item)}>

          <Image
            source={sameClock}
            resizeMode="contain"
            style={styles.headerImg}
          />
          <Text
            style={{
              color: 'white',
              marginLeft: 5,
              fontSize: Scale(14),
              fontWeight: 'bold',
              marginTop: Scale(5),
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </LinearGradient>

    )
  }

  const renderContent = () => {
    const transformedGameData = transformApiResponse(quick3dGamesList);
    switch (selectedOption) {
      case '1 Mins':
        return (
          <>
            <DigitComponent
              lastGameWiiningId={transformedGameData.lastGameWiiningId}
              nextGameId={transformedGameData.nextGameId}
              latGameWinningA={transformedGameData.lastGameWinningA}
              lastGameWinningB={transformedGameData.lastGameWinningB}
              lastGameWinningC={transformedGameData.lastGameWinningC}
              singleDigitPrice={transformedGameData.singleDigitPrice}
              singleDigitWinningPrice={transformedGameData.singleDigitWinningPrice}
              handleAdd={handleAdd}
              selectedOption={selectedOption}
              doubleDigitPrice={transformedGameData.doubleDigitPrice}
              doubleDigitWinningPrice={transformedGameData.doubleDigitWinningPrice}
              tableData={transformedResultData}
              handleGenerate={()=> handleGenerate(
                Number(transformedGameData.threeDigitPrice)
              )}
              threeDigitWinningPrice={transformedGameData.threeDigitWinningPrice}
              threeDigitPrice={transformedGameData.threeDigitPrice}
              onStateChange={handleChildStateChange}
              targetDateProp={transformedGameData.targetDateProp}
              onTimerComplete={() => triggerAPI(selectedOption)}
              onThirtySecondsRemaining={() => setLast30sec(true)}
              gameName={transformedGameData.gameName}
              groupId={transformedGameData.groupId}
              singleDigitGameId={transformedGameData.singleDigitGameId}
              doubleDigitGameId={transformedGameData.doubleDigitGameId}
              threeDigitGameId={transformedGameData.threeDigitGameId} />
          </>)
      case '3 Mins':
        return (
          <>
            <DigitComponent
              lastGameWiiningId={transformedGameData.lastGameWiiningId}
              nextGameId={transformedGameData.nextGameId}
              latGameWinningA={transformedGameData.lastGameWinningA}
              lastGameWinningB={transformedGameData.lastGameWinningB}
              lastGameWinningC={transformedGameData.lastGameWinningC}
              singleDigitPrice={transformedGameData.singleDigitPrice}
              singleDigitWinningPrice={transformedGameData.singleDigitWinningPrice}
              handleAdd={handleAdd}
              selectedOption={selectedOption}
              doubleDigitPrice={transformedGameData.doubleDigitPrice}
              doubleDigitWinningPrice={transformedGameData.doubleDigitWinningPrice}
              tableData={transformedResultData}
              handleGenerate={()=> handleGenerate(
                Number(transformedGameData.threeDigitPrice)
              )}
              threeDigitWinningPrice={transformedGameData.threeDigitWinningPrice}
              threeDigitPrice={transformedGameData.threeDigitPrice}
              onStateChange={handleChildStateChange}
              targetDateProp={transformedGameData.targetDateProp}
              onTimerComplete={() => triggerAPI(selectedOption)}
              onThirtySecondsRemaining={() => setLast30sec(true)}
              gameName={transformedGameData.gameName}
              groupId={transformedGameData.groupId}
              singleDigitGameId={transformedGameData.singleDigitGameId}
              doubleDigitGameId={transformedGameData.doubleDigitGameId}
              threeDigitGameId={transformedGameData.threeDigitGameId} />
          </>
        )
      case '5 Mins':
        return (
          <>
            <DigitComponent
              lastGameWiiningId={transformedGameData.lastGameWiiningId}
              nextGameId={transformedGameData.nextGameId}
              latGameWinningA={transformedGameData.lastGameWinningA}
              lastGameWinningB={transformedGameData.lastGameWinningB}
              lastGameWinningC={transformedGameData.lastGameWinningC}
              singleDigitPrice={transformedGameData.singleDigitPrice}
              singleDigitWinningPrice={transformedGameData.singleDigitWinningPrice}
              handleAdd={handleAdd}
              selectedOption={selectedOption}
              doubleDigitPrice={transformedGameData.doubleDigitPrice}
              doubleDigitWinningPrice={transformedGameData.doubleDigitWinningPrice}
              tableData={transformedResultData}
              handleGenerate={()=> handleGenerate(
                Number(transformedGameData.threeDigitPrice)
              )}
              threeDigitWinningPrice={transformedGameData.threeDigitWinningPrice}
              threeDigitPrice={transformedGameData.threeDigitPrice}
              onStateChange={handleChildStateChange}
              targetDateProp={transformedGameData.targetDateProp}
              onTimerComplete={() => triggerAPI(selectedOption)}
              onThirtySecondsRemaining={() => setLast30sec(true)}
              gameName={transformedGameData.gameName}
              groupId={transformedGameData.groupId}
              singleDigitGameId={transformedGameData.singleDigitGameId}
              doubleDigitGameId={transformedGameData.doubleDigitGameId}
              threeDigitGameId={transformedGameData.threeDigitGameId} />
          </>
        )
      default:
        return <Text style={{ color: 'red' }}>Invalid Option</Text>;
    }
  }



  return (
    <View style={styles.mainContainer}>

      {/* {islast30sec && <Show30SecondsModal />} */}
      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        nestedScrollEnabled
        contentContainerStyle={{ paddingBottom: Scale(100) }}>
        <GameHeader
          HeaderText={"Quick 3Digit Games"}
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
        <View style={styles.subContainer}>
          <FlatList
            data={OPTIONS}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.startView}
            renderItem={renderHeader}
          />

          {/* Conditionally Render UI Based on Selection */}
          <View style={styles.renderDataView}>
            {renderContent()}

          </View>
          <View>
            <HowToPlayModal />
          </View>
        </View>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        height={Platform.OS === 'ios' ? Scale(400) : Scale(350)} // Reduced height
        draggable={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
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
            backgroundColor: '#D9D9D9',
            borderRadius: Scale(2.5),
            marginVertical: Scale(10),
          },
        }}>
        <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: Scale(16),
                color: 'black',
                marginHorizontal: Scale(10),
              }}>
              My Numbers
            </Text>
            <TouchableOpacity onPress={() => setNumbers([])}>
              <AntDesign
                name={'delete'}
                size={Scale(18)}
                color={'black'}
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
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: Scale(10),
                }}>
                {numbers.map(item => (
                  <View
                    key={item.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#F1F1F3',
                      borderRadius: Scale(20),
                      paddingHorizontal: Scale(15),
                      paddingVertical: Scale(8),
                      position: 'relative',
                    }}>
                    <Text
                      style={{
                        fontSize: Scale(14),
                        fontWeight: 'bold',
                        color: '#000',
                      }}>
                      {item.label} = {item.value}
                    </Text>

                    <View
                      style={{
                        backgroundColor: '#F27842',
                        borderRadius: Scale(5),
                        paddingHorizontal: Scale(5),
                        marginLeft: Scale(5),
                      }}>
                      <Text
                        style={{
                          fontSize: Scale(12),
                          fontWeight: 'bold',
                          color: 'white',
                        }}>
                        x{item.count}
                      </Text>
                    </View>

                    {/* Remove Button */}
                    <TouchableOpacity
                      onPress={() => removeNumber(item.id)}
                      style={{
                        position: 'absolute',
                        top: Scale(-5),
                        right: Scale(-5),
                        backgroundColor: 'white',
                        width: Scale(18),
                        height: Scale(18),
                        borderRadius: Scale(9),
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        elevation: 3, // Android shadow
                      }}>
                      <Image
                        source={cancel}
                        style={{ width: Scale(10), height: Scale(10) }}
                        tintColor={'black'}
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
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <View
          style={{ backgroundColor: '#3e0d0d', height: Scale(80), elevation: 10 }}>
          <GameFooter
            openSheet={() => refRBSheet.current.open()}
            totalAmount={sum}
            totalCount={sum1}
            isDisabled={sum1 === 0 || islast30sec}
            handlePayNow={handlePayNow}
          />
        </View>
        <PaymentSuccessModal
            headerImage
            isVisible={paymentSuccessModalVisible}
            toggleModal={() =>
              dispatch(setPaymentSuccessModalVisible(false))
            }
            headerText="Paid successfully!"
            bodyText="Your tickets have been successfully purchased. Please take note of the draw time and check the results
            Three Digits promptly."
          />
          <InsufficientBalanceModal
            isVisible={InsufficientBalanceModalVisible}
            headerText="Insufficient Balance!"
            bodyText="Please add funds to your wallet to continue" 
            />
      </SafeAreaView>
    </View>
  );
};
const createStyles = (Scale: any) =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: '#3e0d0d',
      flex: 1,
      marginBottom: Scale(0),
    },
    subContainer: {
      flex: 1,
      marginHorizontal: 10,
    },
    container: {
      flex: 1,
    },
    card: {
      marginTop: Scale(20),
      backgroundColor: '#5A1C1C',
      width: '100%',
      borderRadius: 10,
      shadowColor: '#000',
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
      // flexDirection: 'row',
      // borderRadius: 10,
      // width: '100%',
      justifyContent: 'center',
      flex: 1,
    },
    renderDataView: {
      padding: 10,
      backgroundColor: '#3e0d0d',
      flex: 1,
      borderRadius: 10,
    },
    gameDetailView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginTop: 10,
      backgroundColor: '#DBCEFB',
      overflow: 'hidden',
    },
    showCountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#EEF0F6',
      borderRadius: 30,
      paddingHorizontal: 5,
      height: 40,
      marginLeft: 30,
    },
    button: {
      backgroundColor: '#F5F7FB',
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      // marginHorizontal: 20,
    },
    symbol: {
      fontSize: 15,
      color: 'black',
    },
    input: {
      width: 50, // Set an explicit width to ensure visibility
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000', // Ensure text is visible
      textAlign: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    valueText: {
      marginTop: 20,
      fontSize: 18,
      fontWeight: 'bold',
    },
    boxButton: {
      backgroundColor: '#007AFF',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    DigitTitleText: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: Scale(16),
    },
    DigitTitleText1: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: Scale(14),
      top: 1,
    },
    headerBtn: {
      alignItems: 'center',
      borderRadius: Scale(10),
      padding: Scale(10),
      justifyContent: 'center',
      marginHorizontal: Scale(5),
    },
    headerImg: { width: Scale(30), height: Scale(30) }
  });
export default Quick3DScreen;
