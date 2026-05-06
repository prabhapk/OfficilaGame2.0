import React, { useState, useEffect } from 'react';
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
import { RootState } from '../Redux/store';
  const HowToPlayModal = () => {
    const modalVisible = useSelector(
      (state: any) => state.commonSlice.howToPlayVisible,
    );
  const {gameRulesData} = useSelector((state: any) => state.commonSlice);
    console.log("gameRulesDataHowToPlay===>", gameRulesData);
    
    const dispatch = useDispatch();
    const closeModal = () => {
      dispatch(hideHowToPlay());
    };
    const { Scale, verticalScale } = useContainerScale();
    const styles = createStyles(Scale);

    const { quick3dGamesGroupId} = useSelector(
          (state: RootState) => state.quick3DSlice
        );
    
        console.log('quick3dGamesGroupIdHowToPlay==>', quick3dGamesGroupId);
    
    const [selectedOption, setSelectedOption] = useState("1 Mins");

useEffect(() => {
  switch (quick3dGamesGroupId) {
    case 2:
      setSelectedOption("1 Mins");
      break;
    case 3:
      setSelectedOption("3 Mins");
      break;
    case 4:
      setSelectedOption("5 Mins");
      break;
    default:
      setSelectedOption("1 Mins");
  }
}, [quick3dGamesGroupId]);

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

          <Text style={styles.boldText}>Quick3D {selectedOption}</Text>

          <Text style={styles.text}>
            Quick3D {selectedOption} is an exhilarating lottery game. The lottery game mode that opens every {selectedOption} minutes has increased fun and excitement, and more frequent bonus opportunities.
            {/* {'\n'}& Dear Lottery first prize result last three digit. */}
          </Text>

          <Text style={styles.text}>
            Time: 24-hour drawing, once every {selectedOption} minutes
          </Text>

          <Text style={styles.text}>
            An example of a first prize ticket is 834
          </Text>

          <Text style={styles.text}>
            A=8 B=3 C=4, AB=83 BC=34 AC=84, ABC=834
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
              <Text style={styles.priceLabel}>₹</Text>
              <Text style={styles.priceValue}>11</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.priceLabel}>Winning Amount</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>₹</Text>
              <Text style={styles.priceValue}>100</Text>
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
              <Text style={styles.priceLabel}>₹</Text>
              <Text style={styles.priceValue}>11</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.priceLabel}>Winning Amount</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>₹</Text>
              <Text style={styles.priceValue}>100</Text>
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
              <Text style={styles.priceLabel}>₹</Text>
              <Text style={styles.priceValue}>21</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.priceLabel}>Winning Amount</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>₹</Text>
              <Text style={styles.priceValue}>10000, 500, 50</Text>
            </View>
          </View>

          {/* Winning Prizes */}
          <Text style={styles.boldText}>Winning Prizes:</Text>

          <View style={styles.row}>
            <Text style={styles.priceLabel}>(i) Match ABC</Text>
            <Text style={styles.priceValue}>10000</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.priceLabel}>(ii) Match BC</Text>
            <Text style={styles.priceValue}>500</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.priceLabel}>(iii) Match C</Text>
            <Text style={styles.priceValue}>50</Text>
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
        justifyContent: 'space-between',
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

      priceValue: {
        fontWeight: 'bold',
        color: 'red',
        marginLeft: Scale(4),
      },
    });


  export default HowToPlayModal;
