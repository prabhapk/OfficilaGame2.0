import React from 'react';
  import {useSelector, useDispatch} from 'react-redux';
  import {
    Modal,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView,
  } from 'react-native';
import { useContainerScale } from '../hooks/useContainerScale';
  import { hideHowToPlay } from '../Redux/Slice/commonSlice';
  import { cancel } from '../../assets/assets';
  import { Image } from 'expo-image';
type HowToPlayModalProps = {
  gameTitle: string;
  introText: string;
  timeText: string;
  exampleTicketText?: string;
  exampleCombinationText?: string;
  ticketPriceSingleDigit?: number;
  ticketPriceDoubleDigit?: number;
  ticketPriceThreeDigit?: number;
  winningAmountSingleDigit?: number;
  winningAmountDoubleDigit?: number;
  winningAmountThreeDigit: number;
};

  const HowToPlayModal = ({
    gameTitle,
    introText,
    timeText,
    exampleTicketText = 'An example of a first prize ticket is 834',
    exampleCombinationText = 'A=8 B=3 C=4, AB=83 BC=34 AC=84, ABC=834',
    ticketPriceSingleDigit,
    ticketPriceDoubleDigit,
    ticketPriceThreeDigit,
    winningAmountSingleDigit,
    winningAmountDoubleDigit,
    winningAmountThreeDigit,
  }: HowToPlayModalProps) => {
    const modalVisible = useSelector(
      (state: any) => state.commonSlice.howToPlayVisible,
    );
 
    const dispatch = useDispatch();
    const closeModal = () => {
      dispatch(hideHowToPlay());
    };
    const { Scale } = useContainerScale();
    const styles = createStyles(Scale);

  return (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={closeModal}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.ruleText}>Rules</Text>
          <TouchableOpacity onPress={closeModal}>
            <Image
              source={cancel}
              style={styles.closeStyle}
              tintColor={'#101012'}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          <Text style={styles.boldText}>{gameTitle}</Text>

          <Text style={styles.text}>
            {introText}
            {/* {'\n'}& Dear Lottery first prize result last three digit. */}
          </Text>

          <Text style={styles.text}>
            {timeText}
          </Text>

          <Text style={styles.text}>
            {exampleTicketText}
          </Text>

          <Text style={styles.text}>
            {exampleCombinationText}
          </Text>

          {/* Single Digit */}
          <Text style={styles.boldText}>
            Single Digit Game - A, B, C Board
          </Text>

          <Text style={styles.text}>
            Single digit games can be played on any board between A, B and C.
          </Text>

          <View style={styles.row}>
            <Text style={styles.priceLabel}>Ticket Price</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel1}>₹</Text>
              <Text style={styles.priceValue}>{ticketPriceSingleDigit}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.priceLabel}>Winning Amount</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel1}>₹</Text>
              <Text style={styles.priceValue}>{winningAmountSingleDigit}</Text>
            </View>
          </View>

          {/* Two Digit */}
          <Text style={styles.boldText}>
            Two Digit Game - AB, BC, AC
          </Text>

          <Text style={styles.text}>
            In a two-digit game, players can pick two numbers in the last three digits of the result in the combination of AB, BC and AC.
          </Text>

          <View style={styles.row}>
            <Text style={styles.priceLabel}>Ticket Price</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel1}>₹</Text>
              <Text style={styles.priceValue}>{ticketPriceDoubleDigit}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.priceLabel}>Winning Amount</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel1}>₹</Text>
              <Text style={styles.priceValue}>{winningAmountDoubleDigit}</Text>
            </View>
          </View>

          {/* Three Digit */}
          <Text style={styles.boldText}>
            Three Digit Game: ABC
          </Text>

          <Text style={styles.text}>
            If a player places a bet on an ABC 3-digit game in a particular lottery there is a three chance of winning.
          </Text>

          <View style={styles.row}>
            <Text style={styles.priceLabel}>Ticket Price</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel1}>₹</Text>
              <Text style={styles.priceValue}>{ticketPriceThreeDigit}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.priceLabel}>Winning Amount</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel1}>₹</Text>
              <Text style={styles.priceValue}>{winningAmountThreeDigit}</Text>
            </View>
          </View>

          {/* Winning Prizes */}
          <Text style={styles.boldText}>Winning Prizes:</Text>

          <View style={styles.row}>
            <Text style={styles.priceLabel}>(i) Match ABC</Text>
            <Text style={styles.priceValue}>₹{winningAmountThreeDigit}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.priceLabel}>(ii) Match BC</Text>
            <Text style={styles.priceValue}>₹500</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.priceLabel}>(iii) Match C</Text>
            <Text style={styles.priceValue}>₹50</Text>
          </View>

        </ScrollView>
      </View>
    </View>
  </Modal>
);

  };

  const createStyles = (Scale: any) =>
    StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },

      modalView: {
        width: '90%',
        maxHeight: '85%',
        backgroundColor: '#fff',
        borderRadius: Scale(12),
        paddingVertical: Scale(15),
        elevation: 5,
      },

      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Scale(15),
        marginBottom: Scale(10),
      },

      ruleText: {
        fontSize: Scale(18),
        fontWeight: 'bold',
        color: '#0D0C22',
      },

      closeStyle: {
        width: Scale(20),
        height: Scale(20),
      },

      scrollContent: {
        paddingHorizontal: Scale(15),
        paddingBottom: Scale(20),
      },

      text: {
        fontSize: Scale(13),
        color: '#0D0C22',
        marginBottom: Scale(8),
        textAlign: 'justify',
      },

      boldText: {
        fontSize: Scale(14),
        fontWeight: 'bold',
        marginTop: Scale(10),
        marginBottom: Scale(6),
        color: '#0D0C22',
      },

      row: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Scale(6),
        marginTop: Scale(10),
      },

      priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },

      priceLabel: {
        fontWeight: 'bold',
        color: '#0D0C22',
      },
      priceLabel1: {
        fontWeight: 'bold',
        color: '#0D0C22',
        marginLeft: Scale(10),
      },

      priceValue: {
        fontWeight: 'bold',
        color: 'red',
        marginLeft: Scale(4),
      },
    });


  export default HowToPlayModal;
