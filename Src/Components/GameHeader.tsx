/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { customerService, CustomerServiceIcon, customerServiceTopIcon, headerWallet, refreshIcon, walletIcon } from '../../assets/assets';
import { LinearGradient } from 'expo-linear-gradient';
import Theme, { COLORS, Fonts } from '../Constants/Theme';
import { Image } from 'expo-image';
import CommonAddButton from './CommonAddButton';
import { useContainerScale } from '../hooks/useContainerScale';
import { initFreshchat, setFreshchatUser, openFreshchat } from '../Utils/freshchat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();
  const styles = createStyles(Scale, insets);
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    initFreshchat();
  }, []);

  const onPressChat = useCallback(async () => {
    // Show loading state
    console.log("Opening Freshchat...");
    setIsChatLoading(true);
    
    try {
      // Pass real user details here
      await setFreshchatUser({
        name: "Demo User",
        email: "demo@example.com",
        phoneCountryCode: "+91",
        phone: "9876543210",
        externalId: "user-123",
        properties: { tier: "gold" },
      });
      
      // Open chat (will auto-open on web, no second click needed)
      openFreshchat();
      
      // Hide loading after a delay to allow chat to open
      setTimeout(() => {
        setIsChatLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error("Error opening chat:", error);
      setIsChatLoading(false);
    }
  }, []);

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
                contentFit='contain' 
                tintColor={'white'}
                style={styles.leftImageSize}
              />
            </TouchableOpacity>

            <View style={{ marginTop: 10, }}>
              <Text style={styles.headerTextStyle}>{HeaderText}</Text>
            </View>
            <TouchableOpacity
              onPress={onPressChat}
              style={{ flexDirection: 'row', alignItems: 'center' }}
              disabled={isChatLoading}>

              <View style={{ position: 'relative' }}>
                <Image
                  source={CustomerServiceIcon}
                  contentFit='contain' 
                  style={{ width: 30, height: 30, marginLeft: Scale(10) }}
                />
                {isChatLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="small" color="#fff" />
                  </View>
                )}
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


const createStyles = (Scale: any, insets: any) =>
  StyleSheet.create({
  mainContainer: {
    height: Scale(270),
    paddingTop: Platform.OS === 'android' ? insets.top : 0,
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
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: Scale(15),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: Scale(10),
  },
});

export default GameHeader;
