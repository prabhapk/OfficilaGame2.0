import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity,} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { amountIcon, hIcon, homeAppIcon, newHomeWallet, newHomeWallet1, newLogo } from "../../assets/assets";
import { Image } from 'expo-image';
import { LinearGradient } from "expo-linear-gradient";
import { formatToDecimal } from "../Utils/Common";
import { useContainerScale } from "../hooks/useContainerScale";
import { COLORS } from "../Constants/Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
interface CountdownTimerProps {
  onLoginPress: () => void;
  onMenuPress: () => void;
  registerPress: () => void;
}

const CustomHeader: React.FC<CountdownTimerProps> = ({
  onLoginPress,
  onMenuPress,
  registerPress,
}) => {
  const { isLoggedIn, mainWalletBalance, withdrawBalance } = useSelector(
    (state: RootState) => state.signInSlice
  );

  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);

  const totalBalance = mainWalletBalance + withdrawBalance;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" , }}>
        <TouchableOpacity
          style={styles.menuContainer}
          onPress={() => onMenuPress()}
        >
           <Ionicons
                          name={'reorder-three'}
                          size={Scale(30)}
                          color={'white'}
                        style={{  height: 30, }}
                        />

        </TouchableOpacity>
        <Image
          source={newLogo}
          // contentFit="contain"
          style={{
            width: 180,
            marginLeft: Scale(5),
            height: 35,
          }}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
       {isLoggedIn ? (
  <View style={styles.walletContainer}>
    {/* Top Row */}
    <View style={styles.walletTopRow}>
      <Image
        source={newHomeWallet1}
        contentFit="contain"
        style={styles.walletIcon}
        tintColor="white"
      />
      <Text style={styles.balanceLabel}>Balance</Text>
    </View>

    {/* Bottom Row */}
    <Text style={styles.balanceAmount}>
      ₹ {formatToDecimal(totalBalance)}
    </Text>
  </View>
) : (
          <>
            <TouchableOpacity onPress={onLoginPress} style={styles.loginButton}>
              <Text style={{ color: COLORS.buttonTextColor1 }}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={registerPress}
              style={styles.registerButton}
            >
              <LinearGradient
                colors={[COLORS.linearOne, COLORS.linearTwo]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.registerGradient}
              >
                <Text style={[styles.registerText, { color: COLORS.buttonTextColor2 }]}>REGISTER</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical:10,
      backgroundColor: COLORS.primary,
    },
    menuContainer: {
      flexDirection: "row",
      alignItems: "center",
      
    },
    loginButton: {
      padding: 5,
      paddingHorizontal: 20,
      backgroundColor: "transparent",
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      borderColor: COLORS.white,
      borderWidth: 1,
      // marginVertical: 5,
      marginHorizontal: Scale(5),
    },
    registerButton: {
      marginHorizontal: Scale(5),
    },

    registerGradient: {
      borderRadius: 50,
      paddingVertical: 8,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
    },

    registerText: {
      fontSize: 12,
      color: COLORS.buttonTextColor1,
      fontWeight: "600",
    },
    walletContainer: {
  alignItems: "flex-end",
},

walletTopRow: {
  flexDirection: "row",
  alignItems: "center",
},

walletIcon: {
  width: 18,
  height: 18,
  marginRight: 6,
},

balanceLabel: {
  fontSize: 13,
  fontWeight: "600",
  color: COLORS.buttonTextColor1,
},

balanceAmount: {
  fontSize: 16,
  fontWeight: "bold",
  color: COLORS.buttonTextColor1,
  marginTop: 2,
},

  });

export default CustomHeader;
