import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { close } from '../../../assets/assets';
import { useContainerScale } from '../../hooks/useContainerScale';
import { Image } from 'expo-image';
import { COLORS } from '../../Constants/Theme';

type AlertErrorModalProps = {
  isVisible: boolean;
  closeModal: () => void;
  headerText: string;
  bodyText: string;
};

const AlertErrorModal: React.FC<AlertErrorModalProps> = ({
  isVisible,
  closeModal,
  headerText,
  bodyText
}) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  return (
    <Modal
      isVisible={isVisible}
      animationIn="flipInX" animationOut="flipOutX" 
      backdropOpacity={0.5}
      backdropTransitionInTiming={0.5}
      backdropTransitionOutTiming={0.5}
    >
      <View style={styles.modalContainer}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <Image source={close} style={styles.closeIcon} />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>{headerText}</Text>
        </View>

        {/* Body */}
        <View style={styles.bodyWrapper}>
          <Text style={styles.bodyText}>{bodyText}</Text>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (Scale: any) => StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: Scale(10),
    padding: Scale(20),
    marginBottom: Scale(16),
    position: 'relative',
    
  },
  closeButton: {
    position: 'absolute',
    top: Scale(10),
    right: Scale(10),
    zIndex: 1,
    padding: Scale(5),
  },
  closeIcon: {
    width: Scale(15),
    height: Scale(15),
    // tintColor: '',
  },
  headerWrapper: {
    alignItems: 'center',
    marginBottom: Scale(20),
  },
  headerText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: Scale(16),
    textAlign: 'center',
  },
  bodyWrapper: {
    alignItems: 'center',
  },
  bodyText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Scale(16),
    textAlign: 'center',
  },
});

export default AlertErrorModal;

