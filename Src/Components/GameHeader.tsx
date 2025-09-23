/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { customerService, CustomerServiceIcon, customerServiceTopIcon, headerWallet, refreshIcon, walletIcon } from '../../assets/assets';
import { LinearGradient } from 'expo-linear-gradient';
import Theme, { COLORS, Fonts } from '../Constants/Theme';
import { Image } from 'expo-image';
import CommonAddButton from './CommonAddButton';
import { useContainerScale } from '../hooks/useContainerScale';
interface Props {
  HeaderText: string;
  leftonPress: (event: GestureResponderEvent) => void;
  leftImage: any;
  rightImage: any;
  onPressWithdraw: (event: GestureResponderEvent) => void;
  onPressRecharge: (event: GestureResponderEvent) => void;
  onPressRefresh: (event: GestureResponderEvent) => void;
  walletBalance: any;
}

const GameHeader: React.FC<Props> = ({
  HeaderText,
  leftonPress,
  leftImage,
  rightImage,
  onPressWithdraw,
  onPressRecharge,
  walletBalance,
  onPressRefresh
}) => {

  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={['#FF4242', '#f6c976ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}>

        <View
          style={{

            marginTop: Scale(15),
            width: "100%",
            marginHorizontal: 20
          }}>
          <View style={{
            marginHorizontal: 10, flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <TouchableOpacity style={styles.leftImageStyle} onPress={leftonPress}>
              <Image
                source={leftImage}
                resizeMode="contain"
                tintColor={'white'}
                style={styles.leftImageSize}
              />
            </TouchableOpacity>

            <View style={{ marginTop: 10, }}>
              <Text style={styles.headerTextStyle}>{HeaderText}</Text>
            </View>
            <TouchableOpacity
              onPress={() => Alert.alert('Will show the wallet screen soon')}
              style={{ flexDirection: 'row', alignItems: 'center' }}>

              <View>
                <Image
                  source={CustomerServiceIcon}
                  resizeMode="contain"
                  style={{ width: 30, height: 30, marginLeft: Scale(10) }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          marginTop: Scale(30), width: "90%", backgroundColor: COLORS.secondary,
          borderRadius: 10, padding: Scale(10), zIndex: 100,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginTop: Scale(10) }}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Image source={walletIcon} style={{ width: Scale(30), height: Scale(30), }} />
                <Text style={{ marginLeft: Scale(5), color: "#fff", fontSize: Scale(14) }}>Total Wallet</Text>
              </View>
              <Text style={{ marginLeft: Scale(5), fontSize: Scale(26), color: "#fff", fontWeight: "bold", }}>{walletBalance}</Text>
            </View>
            <TouchableOpacity 
            onPress={onPressRefresh}
            >
              <Image source={refreshIcon} style={{ width: Scale(40), height: Scale(40), }} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginTop: Scale(20) }}>
            <TouchableOpacity
            onPress={onPressWithdraw}
              style={{
                borderColor: "#ff493a", borderWidth: 1, borderRadius: 30, paddingVertical: Scale(10),
                paddingHorizontal: Scale(20), marginRight: Scale(10)
              }}

            >
              <Text
                style={{
                  color: '#ff493a',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: Scale(14),
                }}>
                {"Withdraw"}
              </Text>
            </TouchableOpacity>
            <LinearGradient
              colors={[
                '#FF4242', '#f6c976ff'
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderRadius: 30,
                paddingVertical: Scale(8),
                paddingHorizontal: Scale(18),
                marginTop: Scale(5),
                marginBottom: Scale(5),
                bottom: 5, alignItems: "center", justifyContent: "center"
              }}>

              <TouchableOpacity
              onPress={onPressRecharge}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: Scale(14),
                  }}>
                  {"Recharge"}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

        </View>
      </LinearGradient>
    </View>
  );
};


const createStyles = (Scale: any) =>
  StyleSheet.create({
  mainContainer: {
    height: Scale(270),
  },
  leftImageStyle: {
    // backgroundColor: 'white',
    // height: 33,
    // width: 33,
    // padding: 8,
    // marginVertical: 5,
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: 'white',
  },
  leftImageSize: {
    alignItems: 'center',
    marginHorizontal: 4,
    marginVertical: 2,
    resizeMode: 'contain',
    height: 20,
    width: 20,
    marginTop: 10,
  },
  headerTextStyle: {
    textAlign: 'center',
    fontSize: Scale(18),
    fontWeight: 'bold',
    color: 'white',
  },
  rightImageStyle: {
    backgroundColor: 'transparent',
    height: 33,
    width: 33,
    padding: 8,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  logo: {
    marginLeft: Scale(40),
  },
  button: {
    height: Scale(170),
    alignItems: 'center',
  },
});

export default GameHeader;
