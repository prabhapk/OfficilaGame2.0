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
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { cancel, lefArrow, quick3min, sameClock } from '../../assets/assets';
import CountdownTimer from '../Components/CountdownTimer';
import { useDispatch, useSelector } from 'react-redux';
import { showHowToPlay } from '../Redux/Slice/commonSlice';
import HowToPlayModal from '../Components/HowToPlayModal';
import CommonBall from '../Components/CommonBall';
import Scale from '../Components/Scale';
import SingleIntegerTextInput from '../Components/SingleIntegerTextInput';
import GameFooter from '../Components/GameFooter';
import RBSheet from 'react-native-raw-bottom-sheet';
import GameHeader from '../Components/GameHeader';
import ResultTable from '../Components/ResultTable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonAddButton from '../Components/CommonAddButton';
import CommonQuickGuess from '../Components/CommonQuickGuess';
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
  setMin1TargetDate,
  setMin3TargetDate,
  setMin5TargetDate,
} from '../Redux/Slice/threeDigitSlice';
import { handleShowAlert } from '../Redux/Slice/commonSlice';
import CountButtons from '../Components/CountButtons';
import Show30SecondsModal from '../Components/Show30SecondsModal';
import AnimatedText from '../Components/AnimatedText';
import { tableData } from '../Utils/Constants';
import DigitComponent from '../Components/DigitComponent';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../Constants/Theme';
import { getIndividualGameResult } from '../Redux/Slice/resultSlice';
import { getIndividualGameData, payNow } from '../Redux/Slice/HomeSlice';
import { formatTime24to12, formatToTime } from '../Utils/Common';
import { unwrapResult } from '@reduxjs/toolkit';
import CustomLoader from '../Components/CustomLoader';


const ThreeDigitMain = ({ navigation, route }: any) => {
  const {
    threeDigitA,
    threeDigitB,
    threeDigitC,
    threeDigitCount,
    min1TargetDate,
    min3TargetDate,
    min5TargetDate,
  } = useSelector((state: RootState) => state.threeDigit);
  const {
    individualGameData,
    individualGameDataLoader
  } = useSelector((state: RootState) => state.homeSlice);
  const {
    isLoggedIn
  } = useSelector((state: RootState) => state.signInSlice);
  console.log("individualGameData==>", individualGameData);
  const dispatch = useDispatch();

  // const OPTIONS = [
  //   { id: 1, name: '01:00 PM', isSelected: true },
  //   { id: 2, name: '03:00 PM', isSelected: false },
  //   { id: 3, name: '05:00 PM', isSelected: false },
  //   { id: 4, name: '07:00 PM', isSelected: false },
  //   { id: 5, name: '09:00 PM', isSelected: false },
  //   { id: 6, name: '11:00 PM', isSelected: false },
  // ];




  const now = new Date();
  const [targetDate, setTargetDate] = useState(
    new Date(new Date().getTime() + 3 * 60 * 1000).toISOString(),
  );
  const [valueOne, setValueOne] = useState(null);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [islast30sec, setLast30sec] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [cartValues, setCartValues] = useState([]);
  const singleDigitPrice = 10.0;
  const doubleDigitPrice = 11.0;
  const threeDigitPrice = 21.0;

  const singleDigitWinningPrice = 110.0;
  const doubleDigitWinningPrice = 220.0;
  const threeDigitWinningPrice = 330.0;

  const [targetDateProp, setTargetDateProp] = useState(
    new Date(new Date().getTime() + 1 * 60 * 1000).toISOString(),
  );

  const handleChildStateChange = (updatedValue: any) => {
    console.log('Received from DigitComponent:', updatedValue);
    setCartValues(updatedValue);
  };
  const { allResultData, individualGameResults } = useSelector(
    (state: RootState) => state.resultSlice,
  );

  console.log('individualGameResults==> asasas', individualGameData);

  const OPTIONS: any = Object.values(
    individualGameData?.reduce((acc, item, index) => {
      if (!acc[item.groupId]) {
        acc[item.groupId] = {
          id: item.groupId, // ✅ use groupId as id
          name: formatTime24to12(item.endtime),
          isSelected: Object.keys(acc).length === 0, // first one true
        };
      }
      return acc;
    }, {} as Record<number, { id: number; name: string; isSelected: boolean }>)
  );



  const [selectedOption, setSelectedOption] = useState(OPTIONS[0]?.id);

  console.log('individualGameResults==>', individualGameResults);

  const transformedData = individualGameResults.map((item: any) => ({
    ...item,
    balls: item.winningNumber.split(''),
  }));
  console.log('transformedData==>', transformedData);


  const groupId = route.params.gameData?.groupId;
  const gameTypeId = route.params.gameData?.gameTypeId;
  console.log("groupId==>", groupId, gameTypeId);
  const WinningBalls = individualGameData[0]?.lastResult?.winningNumber.split('');
  // const WinningBalls = "123"

  const renderContent = () => {
    return (
      <>
        <DigitComponent
          lastGameWiiningId="12345678890"
          nextGameId={formatToTime(individualGameData[0]?.nextresulttime)}
          latGameWinningA={WinningBalls[0]}
          lastGameWinningB={WinningBalls[1]}
          lastGameWinningC={WinningBalls[2]}
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
          targetDateProp={individualGameData[0]?.nextresulttime}
          onTimerComplete={handleTimerComplete}
          gameName={individualGameData[0]?.name}
          singleDigitGameId={individualGameData[0]?.id}
          doubleDigitGameId={individualGameData[1]?.id}
          threeDigitGameId={individualGameData[2]?.id}
          groupId={groupId}

        />
      </>
    );
  };

  const handleTimerComplete = () => { };
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
  const onBlurOne = () => {
    setIsOnFocus(false);
  };
  const refRBSheet: any = useRef();
  // const navigation = useNavigation();
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
    gameId: number,
  ) => {
    console.log('testttt', label, value, count, selectedOption, price, groupId, gameId);


    if (value === '') {
      Alert.alert('Error', 'Please enter a value');
      return;
    }

    setNumbers(prevNumbers => [
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
    console.log('Label==>', label);

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
  };
  const handleHeader = (value: any) => {
    const isAdded = numbers.find((item: any) => item.type !== value.name);

    if (isAdded) {
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
              setNumbers([]), setSelectedOption(value);
            },
          },
        ],
        { cancelable: false },
      );

      return;
    }

    setSelectedOption(value.id);
  };

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

  useEffect(() => {
    console.log('Updated Numbers:', numbers);
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
    0,
  );
  const sum1 = numbers.reduce((acc: any, item: any) => acc + item.count, 0);
  console.log('sum==>', sum);
  console.log('sum1==>', sum1);

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

    console.log('Label==>', label);
  };

  // Handle button press
  const handleGenerate = () => {
    if (threeDigitA !== '' && threeDigitB !== '' && threeDigitC !== '') {
      const values = [threeDigitA, threeDigitB, threeDigitC];
      handleAddPermutations(
        'ABC',
        values,
        threeDigitCount,
        selectedOption,
        threeDigitPrice,
      );
      clearInputs('ABC');
    }
  };

  const renderHeader = ({ item }: any) => {
    return (
      <LinearGradient
        colors={[
          selectedOption === item.id ? '#FF4242' : COLORS.secondary, // fallback color
          selectedOption === item.id ? '#f6c976ff' : COLORS.secondary,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.headerBtn,
        ]}
      >
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => handleHeader(item)}
        >
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
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  };



  useEffect(() => {
    dispatch(
      getIndividualGameResult({
        groupId: groupId,
      }),
    );
    dispatch(
      getIndividualGameData({
        typeId: gameTypeId
      }),
    );
  }, []);

  const handlePayNow = () => {
    if (isLoggedIn) {
      try {
        const apiData = {
          bets: numbers.map(item => ({
            gameId: item.gameId,
            groupId: item.groupId,
            betType: item.label,
            selectedNumber: String(item.value), // ensure it's a string
            betCount: item.count,
            amount: item.price,
          }))
        };

        const resultAction = dispatch(payNow(apiData));  // 👈 no extra wrapper
        unwrapResult(resultAction);
      } catch (error: any) {
        console.log('error', error);
      }
    } else {
      navigation.navigate('SignInScreen');
    }
  };



  return (
    <View style={styles.mainContainer}>
      {islast30sec && <Show30SecondsModal />}
      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        nestedScrollEnabled
        contentContainerStyle={{ paddingBottom: Scale(100) }}
      >
        {/* <CustomLoader visible={individualGameDataLoader} /> */}
        <GameHeader
          HeaderText={individualGameData[0]?.name}// {gameData.name}
          leftonPress={goBack}
          leftImage={lefArrow}
          rightImage={lefArrow}
          onPressWithdraw={() => {
            navigation.navigate('Withdraw');
          }}
          onPressRecharge={() => {
            navigation.navigate('WalletScreen');
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
          <View style={styles.renderDataView}>{renderContent()}</View>
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
        }}
      >
        <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: Scale(16),
                color: 'black',
                marginHorizontal: Scale(10),
              }}
            >
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
                }}
              >
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
                    }}
                  >
                    <Text
                      style={{
                        fontSize: Scale(14),
                        fontWeight: 'bold',
                        color: '#000',
                      }}
                    >
                      {item.label} = {item.value}
                    </Text>

                    <View
                      style={{
                        backgroundColor: '#F27842',
                        borderRadius: Scale(5),
                        paddingHorizontal: Scale(5),
                        marginLeft: Scale(5),
                      }}
                    >
                      <Text
                        style={{
                          fontSize: Scale(12),
                          fontWeight: 'bold',
                          color: 'white',
                        }}
                      >
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
                      }}
                    >
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
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
      >
        <View
          style={{
            backgroundColor: '#3e0d0d',
            height: Scale(80),
            elevation: 10,
          }}
        >
          <GameFooter
            openSheet={() => refRBSheet.current.open()}
            totalAmount={sum}
            totalCount={sum1}
            isDisabled={sum1 === 0 || islast30sec}
            handlePayNow={handlePayNow}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
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
    // justifyContent: 'center',
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
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  headerImg: { width: 30, height: 30 },
});
export default ThreeDigitMain;
