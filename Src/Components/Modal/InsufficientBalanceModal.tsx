import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { close } from '../../../assets/assets';
import Scale from '../Scale';

type InsufficientBalanceModalProps = {
  isVisible: boolean;
  headerText: string;
  bodyText: string;
};

const InsufficientBalanceModal: React.FC<InsufficientBalanceModalProps> = ({
  isVisible,
  headerText,
  bodyText
}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="flipInX" animationOut="flipOutX" 
      backdropOpacity={0.5}
      backdropTransitionInTiming={0.5}
      backdropTransitionOutTiming={0.5}
    >
      <View style={styles.modalContainer}>
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

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#360400',
    borderRadius: Scale(10),
    padding: Scale(20),
    marginBottom: Scale(16),
    position: 'relative',
    
  },

  headerWrapper: {
    alignItems: 'center',
    marginBottom: Scale(20),
  },
  headerText: {
    color: 'orange',
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

export default InsufficientBalanceModal;

