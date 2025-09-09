import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { greenTick } from '../../../assets/assets';
import Scale from '../Scale';

type PaymentSuccessModalProps = {
  isVisible: boolean;
  toggleModal: () => void;
  headerText: string;
  bodyText: string;
  headerImage:any
};

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isVisible,
  toggleModal,
  headerText,
  bodyText,
  headerImage
}) => {
  return (
    <Modal 
    isVisible={isVisible}
    animationIn="flipInX"
    animationOut="flipOutX"
    backdropTransitionInTiming={0}
    backdropTransitionOutTiming={0}
    backdropOpacity={0.5}
    >
      <View
        style={{
          backgroundColor: '#360400',
          borderRadius: 10,
          padding: 20,
          marginBottom: 16,
        }}>
             <TouchableOpacity 
             style={{alignItems: 'center'}}
             onPress={toggleModal}>
            <Image
              source={greenTick}
              style={{
                width: Scale(50),
                height: Scale(50),
              }}
            />
          </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Scale(20),
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: Scale(16),
              textAlign: 'center',
            }}>
            {headerText}
          </Text>
        </View>

        <Text
          style={{
            color: 'white',
            fontWeight: '500',
            fontSize: Scale(14),
            lineHeight: Scale(22),
            textAlign: 'center',
          }}>
          {bodyText}
        </Text>
      </View>
    </Modal>
  );
};

export default PaymentSuccessModal;
