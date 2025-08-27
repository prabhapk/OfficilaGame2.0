import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { close } from '../../../assets/assets';
import Scale from '../Scale';

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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: Scale(20),
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: Scale(16),
            }}>
            {headerText}
          </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Image
              source={close}
              style={{
                width: Scale(15),
                height: Scale(15),
                marginLeft: Scale(10),
              }}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: 'white',
            fontWeight: '500',
            fontSize: Scale(14),
            lineHeight: Scale(22),
          }}>
          {bodyText}
        </Text>
      </View>
    </Modal>
  );
};

export default WalletInfoModal;
