import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { useContainerScale } from "../hooks/useContainerScale";
import { Image } from "expo-image";
import { COLORS } from "../Constants/Theme";

interface PromotionalModalProps {
  visible: boolean;
  onClose: () => void;
  images: any[];
  title?: string;
  subtitle?: string;
}

const PromotionalModal: React.FC<PromotionalModalProps> = ({
  visible,
  onClose,
  images,
}) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale, verticalScale);

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleClose = () => {
    if (currentIndex < images.length - 1) {
      // Show next image
      setCurrentIndex(currentIndex + 1);
    } else {
      // All images shown → reset + close modal
      setCurrentIndex(0);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <View style={styles.contentContainer}>
            <Image
              source={images[currentIndex]}
              style={styles.modalImage}
              contentFit="contain"
            />
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
      backgroundColor: "transparent",
      borderRadius: 20,
      padding: 20,
      position: "relative",
      shadowColor: "transparent",
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
      backgroundColor: COLORS.white,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
    },
    closeButtonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: 'black',
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
      height: 200
    },
    modalImage: {
      width: "100%",
      height: 500,
      borderRadius: 10,
    },
  });

export default PromotionalModal;
