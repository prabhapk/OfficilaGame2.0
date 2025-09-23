import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import LottieView from 'lottie-react-native';
import { useContainerScale } from '../hooks/useContainerScale';
import { rupeeCoinLoaderGif } from '../../assets/assets';
import { Image } from 'expo-image';

interface Props {
  visible: boolean;
}

const CustomLoader = ({visible}: Props): JSX.Element => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  return (
    <Spinner
      visible={visible}
      overlayColor="rgba(0,0,0,0.5)"
      textContent={""}     // disable default text
      color="transparent"  // hide default spinner
      customIndicator={
        <View style={styles.overlay}>
          <Image
            source={rupeeCoinLoaderGif}
            style={{ height: Scale(120), width: Scale(120) }}
          />
        </View>
      }
    />
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // fill full screen
    justifyContent: "center",
    alignItems: "center",
  },
});


export default CustomLoader;
