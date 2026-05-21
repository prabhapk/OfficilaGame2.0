/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
} from "react-native";
import React, { useRef } from "react";
import { FooterWallet } from "../../assets/assets";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useNavigation } from "@react-navigation/native";
import { useContainerScale } from "../hooks/useContainerScale";
import { COLORS } from "../Constants/Theme";
import { Image } from "expo-image";

interface Props {
  openSheet: (event: GestureResponderEvent) => void;
  totalAmount: number;
  totalCount: number;
  isDisabled: boolean;
  handlePayNow: () => void;
}

const GameFooter: React.FC<Props> = ({
  openSheet,
  totalAmount,
  totalCount,
  isDisabled,
  handlePayNow,
}) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  const { isLoggedIn, mainWalletBalance } = useSelector(
    (state: RootState) => state.signInSlice,
  );

  const navigation = useNavigation();
  // const handlePayNow = () => {
  //   if (isLoggedIn) {
  //     // navigation.navigate('WalletScreen');
  //   } else {
  //     navigation.navigate('SignInScreen');
  //   }
  // };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openSheet} style={styles.tocuhableStyle}>
        <Image
          source={FooterWallet}
          contentFit="contain"
          style={styles.footerImage}
        />
        <View style={styles.subContainer}>
          <Text style={styles.totalAmountTextStyle}>
            ₹ {totalAmount.toFixed(2)}
          </Text>
          <Text style={styles.totalCountTextStyle}>{totalCount} numbers</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.handlePayNowStyle}
        disabled={isDisabled}
        onPress={handlePayNow}
      >
        <LinearGradient
          colors={[COLORS.linearOne, COLORS.linearTwo]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.linerGradientStyle, { opacity: isDisabled ? 0.5 : 1 }]}
        >
          <Text style={styles.paynowTextStyle}>Pay now</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
const createStyles = (Scale: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: COLORS.primary,
      paddingHorizontal: Scale(12),
      paddingVertical: Scale(10),
    },
    tocuhableStyle: {
      flexDirection: "row",
      marginHorizontal: Scale(10),
    },
    footerImage: {
      width: 30,
      height: 30,
    },
    subContainer: {
      marginHorizontal: Scale(10),
    },
    totalAmountTextStyle: {
      fontSize: Scale(20),
      fontWeight: "bold",
      color: "#fff",
    },
    totalCountTextStyle: {
      fontSize: Scale(14),
      color: "#fff",
      paddingVertical: Scale(2),
      marginBottom: Scale(2),
    },
    handlePayNowStyle: {
      marginRight: 10,
    },
    linerGradientStyle: {
      borderRadius: Scale(16),
      padding: 3,
      height: Scale(40),
      width: Scale(85),
      alignItems: "center",
      justifyContent: "center",

      marginRight: 10,
    },
    paynowTextStyle: {
      textAlign: "center",
      fontSize: Scale(14),
      fontWeight: "500",
      color: "white",
    },
  });
export default GameFooter;
