import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CommonBall from './CommonBall';
import SingleIntegerTextInput from './SingleIntegerTextInput';
import CountButtons from './CountButtons';
import CommonAddButton from './CommonAddButton';
import CommonQuickGuess from './CommonQuickGuess';
import ResultTable from './ResultTable';
import CountdownTimer from './CountdownTimer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { useContainerScale } from '../hooks/useContainerScale';
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
import { handleShowAlert, showHowToPlay } from '../Redux/Slice/commonSlice';
import Show30SecondsModal from './Show30SecondsModal';
import { COLORS } from '../Constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';

export interface IDigitProps {
  handleAdd: (
    label: any,
    value: string,
    count: number,
    selectedOption: any,
    price: number,
    groupId: number,
    gameId: number,
  ) => void;
  selectedOption: any;

  tableData: any[];
  lastGameWiiningId: string;
  nextGameId: string;
  latGameWinningA: string;
  lastGameWinningB: string;
  lastGameWinningC: string;

  singleDigitPrice: number;
  singleDigitWinningPrice: number;

  doubleDigitPrice: number;
  doubleDigitWinningPrice: number;

  threeDigitPrice: number;
  threeDigitWinningPrice: number;
  handleGenerate: () => void;
  onStateChange: any;
  targetDateProp?: any;
  onTimerComplete?: any;
  gameName: string;
  groupId: number,
  singleDigitGameId: number,
  doubleDigitGameId: number,
  threeDigitGameId: number,
}

const DigitComponent: React.FC<IDigitProps> = ({
  handleAdd,
  selectedOption,
  tableData,
  lastGameWiiningId,
  nextGameId,
  latGameWinningA,
  lastGameWinningB,
  lastGameWinningC,

  singleDigitPrice,
  singleDigitWinningPrice,
  doubleDigitPrice,
  doubleDigitWinningPrice,
  threeDigitPrice,
  handleGenerate,
  threeDigitWinningPrice,
  onStateChange,
  targetDateProp,
  onTimerComplete,
  gameName,
  groupId,
  singleDigitGameId,
  doubleDigitGameId,
  threeDigitGameId,
}) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  const [targetDate, setTargetDate] = useState('2025-07-03T18:35:27.123Z');

  const [showAlert, setShowAlert] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const {
    singleDigitA,
    singleDigitB,
    singleDigitC,
    singleACount,
    singleBCount,
    singleCCount,
    doubleDigitA1,
    doubleDigitA2,
    doubleDigitB1,
    doubleDigitB2,
    doubleDigitC1,
    doubleDigitC2,
    doubleABCount,
    doubleACCount,
    doubleBCCount,
    threeDigitA,
    threeDigitB,
    threeDigitC,
    threeDigitCount,
  } = useSelector((state: RootState) => state.threeDigit);

  const dispatch = useDispatch();

  const getRandomNumber = () => Math.floor(Math.random() * 10);

  useEffect(() => {
    console.log('Received from DigitComponent:==>', onStateChange);
    if (onStateChange) {
      onStateChange(numbers);
      console.log('Received from DigitComponent:==>', onStateChange);
    }
  }, [numbers]);

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

  const filterNumericInput = (value: string) => {
    return value.replace(/[^0-9]/g, '');
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

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }, [showAlert]);

  useEffect(() => {
    console.log('Target Date Prop', targetDateProp);
    if (targetDateProp) {
      console.log('targetDatePropasas', targetDateProp);
      setTargetDate(targetDateProp);
    }
  }, [targetDateProp]);

  console.log('targetDate', targetDate);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.gameDetailView}>
          <View
            style={{
              paddingHorizontal: Scale(10),
              paddingVertical: Scale(20),
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Text style={styles.gameNameText}>{gameName}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.gameNameText, { flex:1, flexWrap:'wrap'}]}>{lastGameWiiningId}</Text>
              <TouchableOpacity
                onPress={() => {
                  dispatch(showHowToPlay());
                }}
                style={styles.howtoplayBtn}
              >
                <Text style={styles.howtoPlayTxt}>How to Play</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ballsView}>
              <CommonBall
                backgroundColor="#DE3C3F"
                innerText={latGameWinningA}
                borderColor="#DE3C3F"
              />
              <CommonBall
                backgroundColor="#EC8204"
                innerText={lastGameWinningB}
                borderColor="#EC8204"
              />
              <CommonBall
                backgroundColor="#066FEA"
                innerText={lastGameWinningC}
                borderColor="#066FEA"
              />
            </View>
          </View>

          <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
            <Text style={styles.gameNameText}>Time Remaining</Text>
            <CountdownTimer
              targetDate={targetDate}
              onThirtySecondsLeft={() => {
                setShowAlert(true);
              }}
              onComplete={onTimerComplete}
            />
            <Text style={styles.gameNameText}>{nextGameId}</Text>
          </View>
        </View>

        {/* SINGLE DIGIT BLOCK */}
        <View style={styles.card}>
          <View style={styles.gameHeader}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.DigitTitleText}>Single Digit</Text>
              </View>

              <Text
                style={[styles.DigitTitleText, { marginVertical: Scale(5) }]}
              >
                ${singleDigitPrice.toFixed(2)}
              </Text>
            </View>

            <LinearGradient
              colors={['#FF4242', '#f6c976ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderBottomLeftRadius: 10,
                padding: 3,
                height: 30,
                bottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.DigitTitleText1}>
                {' '}
                Win{' '}
                <Text style={{ fontSize: Scale(16) }}>
                  ₹{singleDigitWinningPrice.toFixed(2)}
                </Text>
              </Text>
            </LinearGradient>
            <CommonQuickGuess
              innerText={'Quick Guess'}
              onPress={() => {
                generateRandomNumbers();
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={{ flexDirection: 'row' }}>
              <CommonBall
                backgroundColor="#DE3C3F"
                innerText="A"
                borderColor={'#DE3C3F'}
              />
              <SingleIntegerTextInput
                isDisabled={false}
                value={singleDigitA?.toString()}
                placeholderText={'-'}
                onChange={onChangeSingleDigitA}
                keyboardType={'numeric'}
                maxChar={1}
              />
            </View>
            {singleDigitA !== '' && (
              <CountButtons
                count={singleACount}
                setCount={value => dispatch(setSingleACount(value))}
                onHide={() => dispatch(setSingleDigitA(''))}
                minValue={1}
                maxValue={10}
              />
            )}
            <CommonAddButton
              innerText="ADD"
              opacity={singleDigitA !== '' ? 1 : 0.5}
              isDisabled={singleDigitA !== '' ? false : true}
              onPress={() =>
                handleAdd(
                  'A',
                  singleDigitA,
                  singleACount,
                  selectedOption,
                  singleDigitPrice,
                  groupId,
                  singleDigitGameId,

                )
              }
            />
          </View>
          <View style={[styles.inputContainer]}>
            <View style={{ flexDirection: 'row' }}>
              <CommonBall
                backgroundColor="#EC8204"
                innerText="B"
                borderColor={'#EC8204'}
              />
              <SingleIntegerTextInput
                isDisabled={false}
                value={singleDigitB?.toString()}
                placeholderText={'-'}
                onChange={onChangeSingleDigitB}
                onBlur={undefined}
                keyboardType={'numeric'}
                maxChar={1}
              />
            </View>
            {singleDigitB !== '' && (
              <CountButtons
                count={singleBCount}
                setCount={value => dispatch(setSingleBCount(value))}
                onHide={() => dispatch(setSingleDigitB(''))} // Hide only B
                minValue={1}
                maxValue={10}
              />
            )}
            <CommonAddButton
              innerText="ADD"
              opacity={singleDigitB !== '' ? 1 : 0.5}
              isDisabled={singleDigitB !== '' ? false : true}
              onPress={() =>
                handleAdd(
                  'B',
                  singleDigitB,
                  singleBCount,
                  selectedOption,
                  singleDigitPrice,
                  groupId,
                  singleDigitGameId,
                )
              }
            />
          </View>
          <View style={[styles.inputContainer]}>
            <View style={{ flexDirection: 'row' }}>
              <CommonBall
                backgroundColor="#066FEA"
                innerText="C"
                borderColor={'#066FEA'}
              />
              <SingleIntegerTextInput
                isDisabled={false}
                value={singleDigitC?.toString()}
                placeholderText={'-'}
                onChange={onChangeSingleDigitC}
                onBlur={undefined}
                keyboardType={'numeric'}
                maxChar={1}
              />
            </View>
            {singleDigitC !== '' && (
              <CountButtons
                count={singleCCount}
                setCount={value => dispatch(setSingleCCount(value))}
                onHide={() => dispatch(setSingleDigitC(''))} // Hide only C
                minValue={1}
                maxValue={10}
              />
            )}
            <CommonAddButton
              innerText="ADD"
              opacity={singleDigitC !== '' ? 1 : 0.5}
              isDisabled={singleDigitC !== '' ? false : true}
              onPress={() =>
                handleAdd(
                  'C',
                  singleDigitC,
                  singleCCount,
                  selectedOption,
                  singleDigitPrice,
                  groupId,
                  singleDigitGameId,
                )
              }
            />
          </View>
        </View>

        {/* Double Digit Start */}
        <View style={styles.card}>
          <View style={styles.gameHeader}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.DigitTitleText}>Double Digit</Text>
              </View>

              <Text
                style={[styles.DigitTitleText, { marginVertical: Scale(5) }]}
              >
                ${doubleDigitPrice.toFixed(2)}
              </Text>
            </View>

            <LinearGradient
              colors={['#FF4242', '#f6c976ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderBottomLeftRadius: 10,
                padding: 3,
                height: 30,
                bottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.DigitTitleText1}>
                {' '}
                Win{' '}
                <Text style={{ fontSize: Scale(16) }}>
                  ₹{doubleDigitWinningPrice.toFixed(2)}
                </Text>
              </Text>
            </LinearGradient>
            <CommonQuickGuess
              innerText={'Quick Guess'}
              onPress={() => {
                generateDoubleDigitRandomNumbers();
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={{ flexDirection: 'row' }}>
              <CommonBall
                backgroundColor="#DE3C3F"
                innerText="A"
                borderColor={'#DE3C3F'}
              />
              <CommonBall
                backgroundColor="#EC8204"
                innerText="B"
                borderColor={'#EC8204'}
              />
              <SingleIntegerTextInput
                isDisabled={false}
                value={doubleDigitA1?.toString()}
                placeholderText={'-'}
                onChange={doubleDigitA1OnChange}
                onBlur={undefined}
                keyboardType={'numeric'}
                maxChar={1}
              />
              <SingleIntegerTextInput
                isDisabled={false}
                value={doubleDigitB1?.toString()}
                placeholderText={'-'}
                onChange={doubleDigitB1OnChange}
                onBlur={undefined}
                keyboardType={'numeric'}
                maxChar={1}
              />
            </View>
            {doubleDigitA1 !== '' && doubleDigitB1 !== '' && (
              <View style={{ right: Scale(10) }}>
                <CountButtons
                  count={doubleABCount}
                  setCount={value => dispatch(setDoubleABCount(value))}
                  onHide={() => {
                    dispatch(setDoubleDigitA1(''));
                    dispatch(setDoubleDigitB1(''));
                  }}
                  minValue={1}
                  maxValue={10}
                />
              </View>
            )}
            <CommonAddButton
              innerText="ADD"
              opacity={doubleDigitA1 !== '' && doubleDigitB1 !== '' ? 1 : 0.5}
              isDisabled={
                doubleDigitA1 !== '' && doubleDigitB1 !== '' ? false : true
              }
              onPress={() =>
                handleAdd(
                  'AB',
                  doubleDigitA1.toString() + doubleDigitB1.toString(),
                  doubleABCount,
                  selectedOption,
                  doubleDigitPrice,
                  groupId,
                  doubleDigitGameId,
                )
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={{ flexDirection: 'row' }}>
              <CommonBall
                backgroundColor="#DE3C3F"
                innerText="A"
                borderColor={'#DE3C3F'}
              />
              <CommonBall
                backgroundColor="#066FEA"
                innerText="C"
                borderColor={'#066FEA'}
              />
              <SingleIntegerTextInput
                isDisabled={false}
                value={doubleDigitA2?.toString()}
                placeholderText={'-'}
                onChange={doubleDigitA2OnChange}
                onBlur={undefined}
                keyboardType={'numeric'}
                maxChar={1}
              />
              <SingleIntegerTextInput
                isDisabled={false}
                value={doubleDigitC1?.toString()}
                placeholderText={'-'}
                onChange={doubleDigitC1OnChange}
                onBlur={undefined}
                keyboardType={'numeric'}
                maxChar={1}
              />
            </View>
            {doubleDigitA2 !== '' && doubleDigitC1 !== '' && (
              <View style={{ right: Scale(10) }}>
                <CountButtons
                  count={doubleACCount}
                  setCount={value => dispatch(setDoubleACCount(value))}
                  onHide={() => {
                    dispatch(setDoubleDigitA2(''));
                    dispatch(setDoubleDigitC1(''));
                  }}
                  minValue={1}
                  maxValue={10}
                />
              </View>
            )}
            <CommonAddButton
              innerText="ADD"
              opacity={doubleDigitA2 !== '' && doubleDigitC1 !== '' ? 1 : 0.5}
              isDisabled={
                doubleDigitA2 !== '' && doubleDigitC1 !== '' ? false : true
              }
              onPress={() =>
                handleAdd(
                  'AC',
                  doubleDigitA2.toString() + doubleDigitC1.toString(),
                  doubleACCount,
                  selectedOption,
                  doubleDigitPrice,
                  groupId,
                  doubleDigitGameId,
                )
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={{ flexDirection: 'row' }}>
              <CommonBall
                backgroundColor="#EC8204"
                innerText="B"
                borderColor={'#EC8204'}
              />
              <CommonBall
                backgroundColor="#066FEA"
                innerText="C"
                borderColor={'#066FEA'}
              />
              <SingleIntegerTextInput
                isDisabled={false}
                value={doubleDigitB2?.toString()}
                placeholderText={'-'}
                onChange={doubleDigitB2OnChange}
                onBlur={undefined}
                keyboardType={'numeric'}
                maxChar={1}
              />
              <SingleIntegerTextInput
                isDisabled={false}
                value={doubleDigitC2?.toString()}
                placeholderText={'-'}
                onChange={doubleDigitC2OnChange}
                onBlur={undefined}
                keyboardType={'numeric'}
                maxChar={1}
              />
            </View>
            {doubleDigitB2 !== '' && doubleDigitC2 !== '' && (
              <View style={{ right: Scale(10) }}>
                <CountButtons
                  count={doubleBCCount}
                  setCount={value => dispatch(setDoubleBCCount(value))}
                  onHide={() => {
                    dispatch(setDoubleDigitB2(''));
                    dispatch(setDoubleDigitC2(''));
                  }}
                  minValue={1}
                  maxValue={10}
                />
              </View>
            )}
            <CommonAddButton
              innerText="ADD"
              opacity={doubleDigitB2 !== '' && doubleDigitC2 !== '' ? 1 : 0.5}
              isDisabled={
                doubleDigitB2 !== '' && doubleDigitC2 !== '' ? false : true
              }
              onPress={() =>
                handleAdd(
                  'BC',
                  doubleDigitB2.toString() + doubleDigitC2.toString(),
                  doubleBCCount,
                  selectedOption,
                  doubleDigitPrice,
                  groupId,
                  doubleDigitGameId,
                )
              }
            />
          </View>
        </View>

        {/* Three Digit Start */}

        <View style={styles.card}>
          <View style={styles.gameHeader}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.DigitTitleText}>Three Digit</Text>
              </View>

              <Text
                style={[styles.DigitTitleText, { marginVertical: Scale(5) }]}
              >
                ${threeDigitPrice.toFixed(2)}
              </Text>
            </View>

            <LinearGradient
              colors={['#FF4242', '#f6c976ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderBottomLeftRadius: 10,
                padding: 3,
                height: 30,
                bottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.DigitTitleText1}>
                {' '}
                Win{' '}
                <Text style={{ fontSize: Scale(16) }}>
                  ₹{threeDigitWinningPrice.toFixed(2)}
                </Text>
              </Text>
            </LinearGradient>
            <CommonQuickGuess
              innerText={'Quick Guess'}
              onPress={() => {
                generateThreeDigitRandomNumbers();
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={{ flexDirection: 'row' }}>
              <CommonBall
                backgroundColor="#DE3C3F"
                innerText="A"
                borderColor={'#DE3C3F'}
              />
              <CommonBall
                backgroundColor="#EC8204"
                innerText="B"
                borderColor={'#EC8204'}
              />
              <CommonBall
                backgroundColor="#066FEA"
                innerText="C"
                borderColor={'#066FEA'}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <SingleIntegerTextInput
                isDisabled={false}
                value={threeDigitA?.toString()}
                placeholderText={'-'}
                onChange={onChangeThreeDigitA}
                onBlur={undefined}
                keyboardType={'numeric'}
                maxChar={1}
              />
              <SingleIntegerTextInput
                isDisabled={false}
                value={threeDigitB?.toString()}
                placeholderText={'-'}
                onChange={onChangeThreeDigitB}
                onBlur={undefined}
                keyboardType={'numeric'}
                maxChar={1}
              />
              <SingleIntegerTextInput
                isDisabled={false}
                value={threeDigitC?.toString()}
                placeholderText={'-'}
                onChange={onChangeThreeDigitC}
                onBlur={undefined}
                keyboardType={'numeric'}
                maxChar={1}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: Scale(20),
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
              }}
            >
              {threeDigitA !== '' &&
                threeDigitB !== '' &&
                threeDigitC !== '' && (
                  <CountButtons
                    count={threeDigitCount}
                    setCount={value => dispatch(setThreeDigitCount(value))}
                    onHide={() => {
                      dispatch(setThreeDigitA(''));
                      dispatch(setThreeDigitB(''));
                      dispatch(setThreeDigitC(''));
                    }}
                    minValue={1}
                    maxValue={10}
                  />
                )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                flex: 0.7,
              }}
            >
              <CommonAddButton
                innerText={'BOX'}
                opacity={
                  threeDigitA !== '' && threeDigitB !== '' && threeDigitC !== ''
                    ? 1
                    : 0.5
                }
                isDisabled={
                  threeDigitA !== '' && threeDigitB !== '' && threeDigitC !== ''
                    ? false
                    : true
                }
                onPress={handleGenerate}
              />
              <CommonAddButton
                innerText="ADD"
                opacity={
                  threeDigitA !== '' && threeDigitB !== '' && threeDigitC !== ''
                    ? 1
                    : 0.5
                }
                isDisabled={
                  threeDigitA !== '' && threeDigitB !== '' && threeDigitC !== ''
                    ? false
                    : true
                }
                onPress={() =>
                  handleAdd(
                    'ABC',
                    threeDigitA.toString() +
                      threeDigitB.toString() +
                      threeDigitC.toString(),
                    threeDigitCount,
                    selectedOption,
                    threeDigitPrice,
                    groupId,
                    threeDigitGameId,
                  )
                }
              />
            </View>
          </View>
        </View>

        <ResultTable tableData={tableData} showHeader={true} />
      </View>
      {showAlert && <Show30SecondsModal />}
    </>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
  mainContainer: {
    backgroundColor: '#f7fbff',
    flex: 1,
    marginBottom: Scale(0),
  },
  subContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 20,
  },
  container: {
    flex: 1,
  },
  card: {
    marginTop: Scale(20),
    backgroundColor: '#362020',
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
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  renderDataView: {
    padding: 10,
    backgroundColor: '#f7fbff',
    flex: 1,
    borderRadius: 10,
  },
  gameDetailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: '#5A1C1C',
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: Scale(18),
  },
  DigitTitleText1: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: Scale(12),
    top: 1,
  },
  howtoplayBtn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 10,
    borderRadius: 5,
    bottom: 10,
  },
  howtoPlayTxt: {
    fontSize: 14,
    fontWeight: '400',
    paddingHorizontal: 5,
    paddingVertical: 5,
    color: '#fff',
  },
  gameNameText: { fontSize: 14, fontWeight: 'bold', color: 'white' },
  ballsView: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 5,
    padding: 5,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Scale(20),
    marginHorizontal: Scale(10),
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Scale(5),
    marginVertical: Scale(5),
  },
});

export default DigitComponent;
