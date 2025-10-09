import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { close } from '../../../assets/assets';
import { betAlertImage } from '../../assets/assets';
import { useContainerScale } from '../hooks/useContainerScale';
import { COLORS } from '../Constants/Theme';


const show30SecondsModal = () => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
    const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <Modal
      isVisible={true}
      animationIn="flipInX" animationOut="flipOutX" 
      backdropOpacity={0.5}
      backdropTransitionInTiming={0.5}
      backdropTransitionOutTiming={0.5}
    >
      <View style={styles.modalContainer}>
  <View style ={{alignItems: 'center'}}> 
    <Image source={betAlertImage}
     style={{width: Scale(50), height: Scale(50)}} />
     </View>
        {/* Body */}
        <View style={styles.bodyWrapper}>
          <Text style={styles.bodyText}>Betting Closed!</Text>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (Scale: any) => StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: Scale(18),
    padding: Scale(20),
    marginBottom: Scale(16),
    position: 'relative',
    width: '80%',
    marginLeft: '10%',
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
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: Scale(16),
    textAlign: 'center',
    marginTop: Scale(10),
  },
});

export default show30SecondsModal;

