import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import LottieView from 'lottie-react-native';
import Scale from './Scale';
import { rupeeCoinLoaderGif } from '../../assets/assets';
import { Image } from 'expo-image';

interface Props {
  visible: boolean;
}

const CustomLoader = ({visible}: Props): JSX.Element => {
  return (
    <Spinner
      visible={visible}
      textContent={''}
      color={'white'}
      textStyle={{}}
      customIndicator={
        <View style={styles.container}>
          {/* <LottieView
            // source={require('../../assets/RupeeCoin.json')}
            source={rupeeCoinLoaderGif}
            style={{height: Scale(500), width: Scale(570)}}
            autoPlay
            loop
          /> */}
          <Image source={rupeeCoinLoaderGif} style={{height: Scale(150), width: Scale(150)}} /> 
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    // width: Scale(90),
    // height: Scale(50),
    borderRadius: 20 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: 'white',
  },
});

export default CustomLoader;
