/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React, { useRef } from 'react';
import { FooterWallet } from '../../assets/assets';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { useNavigation } from '@react-navigation/native';
import { useContainerScale } from '../hooks/useContainerScale';

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
    <View
      style={{
        flex: 1,
        marginVertical: Scale(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#3e0d0d',
        paddingVertical: Scale(20),
      }}
    >
      <TouchableOpacity
        onPress={openSheet}
        style={{ flexDirection: 'row', marginHorizontal: Scale(10) }}
      >
        <Image
          source={FooterWallet}
          style={{ width: 30, height: 30, resizeMode: 'contain' }}
        />
        <View style={{ marginHorizontal: Scale(10) }}>
          <Text
            style={{ fontSize: Scale(20), fontWeight: 'bold', color: '#fff' }}
          >
            ₹ {totalAmount.toFixed(2)}
          </Text>
          <Text style={{ fontSize: Scale(14), color: '#fff' }}>
            {totalCount} numbers
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginRight: 10 }}
        disabled={isDisabled}
        onPress={handlePayNow}
      >
        <LinearGradient
          colors={['#FF4242', '#f6c976ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: Scale(16),
            padding: 3,
            height: Scale(40),
            width: Scale(85),
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isDisabled ? 0.5 : 1,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: Scale(14),
              fontWeight: '500',
              color: 'white',
            }}
          >
            Pay now
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default GameFooter;
