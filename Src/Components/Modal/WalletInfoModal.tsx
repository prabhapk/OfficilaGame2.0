import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { close } from "../../../assets/assets";
import { useContainerScale } from "../../hooks/useContainerScale";
import { COLORS } from "../../Constants/Theme";
import { Image } from "expo-image";

type WalletInfoModalProps = {
  isVisible: boolean;
  toggleModal: () => void;
  headerText: string;
  bodyText: string;
};

const WalletInfoModal: React.FC<WalletInfoModalProps> = ({
  isVisible,
  toggleModal,
  headerText,
  bodyText,
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
      style={{
        alignItems: "center",
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.headerTextView}>
          <Text style={styles.headerTextStyle}>{headerText}</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Image source={close} style={styles.closeImageStyle} />
          </TouchableOpacity>
        </View>

        <Text style={styles.bodyTextStyle}>{bodyText}</Text>
      </View>
    </Modal>
  );
};
const createStyles = (Scale: any) =>
  StyleSheet.create({
    modalContainer: {
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 20,
      marginBottom: 26,
      width: "95%",
      maxWidth: 380,
      marginHorizontal: Scale(10),
    },
    headerTextView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: Scale(20),
    },
    headerTextStyle: {
      color: COLORS.primary,
      fontWeight: "bold",
      fontSize: Scale(16),
      textAlign: "center",
    },
    closeImageStyle: {
      width: Scale(15),
      height: Scale(15),
      marginLeft: Scale(10),
    },
    bodyTextStyle: {
      color: COLORS.primary,
      fontWeight: "500",
      fontSize: Scale(14),
      lineHeight: Scale(22),
    },
  });

export default WalletInfoModal;
