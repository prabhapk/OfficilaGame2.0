import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, ColorValue, Animated, Easing} from 'react-native';

interface Props {
  color: ColorValue;
  durationMs?: number;
}

const startRotationAnimation = (
  durationMs: number,
  rotationValue: Animated.Value,
): void => {
  Animated.loop(
    Animated.timing(rotationValue, {
      toValue: 1,
      duration: durationMs,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();
};

const LoadingSpinnerButton = ({color, durationMs = 1000}: Props): JSX.Element => {
  const rotationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotationAnimation(durationMs, rotationValue);
  }, [durationMs, rotationValue]);

  const rotate = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container} accessibilityRole="progressbar">
      <View style={[styles.background, {borderColor: color}]} />
      <Animated.View
        style={[
          styles.progress,
          {borderTopColor: color},
          {transform: [{rotateZ: rotate}]},
        ]}
      />
    </View>
  );
};

const height = 24;

const styles = StyleSheet.create({
  container: {
    width: height,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: height / 2,
    borderWidth: 4,
    opacity: 0.25,
  },
  progress: {
    width: '100%',
    height: '100%',
    borderRadius: height / 2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderWidth: 4,
    position: 'absolute',
  },
});

export default LoadingSpinnerButton;
