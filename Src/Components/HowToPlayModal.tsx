import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Scale from './Scale';
import { hideHowToPlay } from '../Redux/Slice/commonSlice';
import { cancel } from '../../assets/assets';

const HowToPlayModal = () => {
  const modalVisible = useSelector(
    (state: any) => state.commonSlice.howToPlayVisible,
  );
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(hideHowToPlay());
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={styles.ruleTextView}>
            <Text
              style={styles.ruleText}>
           Rule
            </Text>
            <TouchableOpacity onPress={() => closeModal()}>
              <Image
                source={cancel}
                style={styles.closeStyle}
                tintColor={'#0D0C22'} />
            </TouchableOpacity>
          </View>
          <ScrollView
          scrollEnabled
          showsVerticalScrollIndicator = {false}
          keyboardShouldPersistTaps="always">
          <Text style={styles.textCenter}>Quick3D 3min</Text>
          <Text style={styles.textCenter}>Quick3D 3min is an exhilarating lottery game.The lottery game mode that opens every 3 minutes has increased fun and excitement,and more frequent bonus opportunities \n&Dear Lottery first prize result last three digit.</Text>
          <Text style={styles.textCenter}>Time:24-hour drawing,once every 3 minutes</Text>
          <Text style={styles.textCenter}>An example of a first prize ticket is 834</Text>
          <Text style={styles.textCenter}>A=8 B=3 C-4,AB=83 BC=34 AC=84,ABC=834</Text>
          <Text style={[styles.textCenterBold, {marginTop: Scale(10)}]}>Single Digit Game-A,B,C Board</Text>
          <Text style={styles.textCenter}>Single digit games can be played on any board between A,B and C.</Text>
          <View style ={styles.flexRow}>
          <Text style={[styles.textCenterBold, {marginTop: Scale(10)}]}>Ticket Price:</Text>
          <View style ={styles.flexRow}>
          <Text style={[styles.textCenterBoldLeft, {marginTop: Scale(10)}]}>Rs</Text>
          <Text style={[styles.textCenterBoldRed, {marginTop: Scale(10)}]}>11</Text>
          </View>
          </View>
          <View style ={styles.flexRow}>
          <Text style={styles.textCenterBold}>Winning Amount:</Text>
          <View style ={styles.flexRow}>
          <Text style={styles.textCenterBoldLeft}>Rs</Text>
          <Text style={styles.textCenterBoldRed}>100</Text>
          </View>
          </View>
          <Text style={[styles.textCenterBold, {marginTop: Scale(10)}]}>Two Digit Game-AB,BC,AC</Text>
          <Text style={[styles.textCenter, {marginTop: Scale(20)}]}>In a two-digit game,players can pick two numbers in the last three digits of the result in the combination of AB,BC and AC.</Text>
          <View style ={styles.flexRow}>
          <Text style={[styles.textCenterBold, {marginTop: Scale(10)}]}>Ticket Price:</Text>
          <View style ={styles.flexRow}>
          <Text style={[styles.textCenterBoldLeft, {marginTop: Scale(10)}]}>Rs</Text>
          <Text style={[styles.textCenterBoldRed, {marginTop: Scale(10)}]}>11</Text>
          </View>
          </View>
          <View style ={styles.flexRow}>
          <Text style={styles.textCenterBold}>Winning Amount:</Text>
          <View style ={styles.flexRow}>
          <Text style={styles.textCenterBoldLeft}>Rs</Text>
          <Text style={styles.textCenterBoldRed}>100</Text>
          </View>
          </View>
          <Text style={[styles.textCenterBold, {marginTop: Scale(10)}]}>Three Digit Game: ABC</Text>
          <Text style={styles.textCenter}>If a player places a bet on an ABC 3-digit game in a particular lottery there is a three chance of winning.</Text>
          <View style ={styles.flexRow}>
          <Text style={[styles.textCenterBold, {marginTop: Scale(10)}]}>Ticket Price:</Text>
          <View style ={styles.flexRow}>
          <Text style={[styles.textCenterBoldLeft, {marginTop: Scale(10)}]}>Rs</Text>
          <Text style={[styles.textCenterBoldRed, {marginTop: Scale(10)}]}>21</Text>
          </View>
          </View>
          <View style ={styles.flexRow}>
          <Text style={styles.textCenterBold}>Winning Amount:</Text>
          <View style ={styles.flexRow}>
          <Text style={styles.textCenterBoldLeft}>Rs</Text>
          <Text style={styles.textCenterBoldRed}>10000,500,50</Text>
          </View>
          </View>
         <Text style={[styles.textCenterBold, {marginTop: Scale(10)}]}>Winning Prizes:</Text>
         <View style ={styles.flexRow}>
          <Text style={styles.textCenterBold}>(i) Match ABC:</Text>
          <Text style={styles.textCenterBoldRed}>10000</Text>
          </View>
         <View style ={styles.flexRow}>
          <Text style={styles.textCenterBold}>(ii)Match BC :</Text>
          <Text style={styles.textCenterBoldRed}>500</Text>
          </View>
         <View style ={styles.flexRow}>
          <Text style={styles.textCenterBold}>(iii)Match C :</Text>
          <Text style={styles.textCenterBoldRed}>50</Text>
          </View>
          </ScrollView>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // top: Scale(100),
  },
  modalView: {
    flex:1,
    backgroundColor: 'white',
    borderRadius: Scale(8),
    padding: Scale(20),
    // alignItems: 'center',
    elevation: 5,
    width: '90%',
    marginTop: Scale(30),
  },
  modalText: {
    marginBottom: Scale(15),
    marginHorizontal: Scale(10),
    color: '#243E88',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#AF7D43',
    borderRadius: Scale(5),
    paddingVertical: Scale(10),
    paddingHorizontal: Scale(20),
    elevation: 2,
    marginTop: Scale(10),
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnText: {
    color: '#AF7D43',
    paddingVertical: Scale(10),
    paddingHorizontal: Scale(20),
    elevation: 2,
    marginTop: Scale(10),
  },
  text: {
    marginBottom: Scale(15),
    marginHorizontal: Scale(30),
    color: '#0D0C22',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  textCenter: {
    marginBottom: Scale(10),
    marginHorizontal: Scale(10),
    color: '#0D0C22',
    textAlign: 'justify',
    fontWeight: '400',
  },
  textCenterBold: {
    marginBottom: Scale(10),
    marginHorizontal: Scale(10),
    color: '#0D0C22',
    textAlign: 'justify',
    fontWeight: 'bold',
  },
  textCenterBoldLeft: {
    marginBottom: Scale(10),
    color: '#0D0C22',
    textAlign: 'left',
    fontWeight: 'bold',
    right: Scale(5),
  },
  textCenterBoldRed: {
    marginBottom: Scale(10),
    color: 'red',
    textAlign: 'left',
    fontWeight: 'bold',
    right: Scale(3),
  },
  closeStyle: {
    // left: Scale(100),
  },
  flexRow:{
    flexDirection:'row'
  },
  ruleTextView:{
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 30,
  },
  ruleText:{
    fontWeight: 'bold',
    fontSize: Scale(20),
    color: '#0D0C22',
  }
});

export default HowToPlayModal;
