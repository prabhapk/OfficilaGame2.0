import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { greenTick } from "../../../assets/assets";
import { useContainerScale } from "../../hooks/useContainerScale";
import { COLORS } from "../../Constants/Theme";
import { Image } from "expo-image";

type PaymentSuccessModalProps = {
  isVisible: boolean;
  toggleModal: () => void;
  headerText: string;
  bodyText: string;
  headerImage: any;
};

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isVisible,
  toggleModal,
  headerText,
  bodyText,
  headerImage,
}) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  return (
    <Modal
      isVisible={isVisible}
      animationIn="flipInX"
      animationOut="flipOutX"
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      backdropOpacity={0.5}
    >
      <View style={styles.modalMainContainer}>
        <TouchableOpacity style={styles.touchableStyle} onPress={toggleModal}>
          <Image source={greenTick} style={styles.greenTickStyle} />
        </TouchableOpacity>
        <View style={styles.headerTextView}>
          <Text style={styles.headerTextStyle}>{headerText}</Text>
        </View>

        <Text style={styles.bodyTextStyle}>{bodyText}</Text>
      </View>
    </Modal>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
    modalMainContainer: {
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      padding: 20,
      marginBottom: 16,
    },
    touchableStyle: {
      alignItems: "center",
    },
    greenTickStyle: {
      width: Scale(50),
      height: Scale(50),
    },
    headerTextView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: Scale(20),
    },
    headerTextStyle: {
      color: "white",
      fontWeight: "bold",
      fontSize: Scale(16),
      textAlign: "center",
    },
    bodyTextStyle: {
      color: "white",
      fontWeight: "500",
      fontSize: Scale(14),
      lineHeight: Scale(22),
      textAlign: "center",
    },
  });
export default PaymentSuccessModal;
