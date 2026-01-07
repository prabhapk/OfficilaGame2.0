import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import { useContainerScale } from "../hooks/useContainerScale";

interface PromotionalModalProps {
  visible: boolean;
  onClose: () => void;
  imageSource: any; // Static image from assets
  title?: string;
  subtitle?: string;
}

const PromotionalModal: React.FC<PromotionalModalProps> = ({
  visible,
  onClose,
  imageSource,
  title = "Special Offer",
  subtitle = "Limited Time Offer",
}) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale, verticalScale);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          {/* Modal Content */}
          <View style={styles.contentContainer}>
            {/* Title */}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>

            {/* Image */}
            <View style={styles.imageContainer}>
              <Image
                source={imageSource}
                style={styles.modalImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (Scale: any, verticalScale: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      // width: Dimensions.get('window').width * 0.9,
      // maxHeight: Dimensions.get('window').height * 0.8,
      width: "90%",
      maxWidth: 380,
      maxHeight: "80%",
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 20,
      position: "relative",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    closeButton: {
      position: "absolute",
      top: 15,
      right: 15,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
    },
    closeButtonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#666",
    },
    contentContainer: {
      alignItems: "center",
      paddingTop: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: "#666",
      textAlign: "center",
      marginBottom: 20,
    },
    imageContainer: {
      width: "100%",
      alignItems: "center",
    },
    modalImage: {
      width: "100%",
      height: 300,
      borderRadius: 10,
    },
  });

export default PromotionalModal;
