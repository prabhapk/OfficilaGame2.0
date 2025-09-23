/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, GestureResponderEvent, StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import { COLORS } from '../Constants/Theme';
import { useContainerScale } from '../hooks/useContainerScale';

interface Props {
  innerText: string;
  onPress: (event: GestureResponderEvent) => void;
  opacity?: any;
  isDisabled?: boolean;
  customStyle?: ViewStyle;
}

const CommonAddButton: React.FC<Props> = ({ innerText, onPress, opacity, isDisabled, customStyle }) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.btnContainer, customStyle, {backgroundColor:COLORS.secondary, opacity }]}
        disabled={isDisabled}
      >
        <Text
          style={styles.buttonTxt}>
          {innerText}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default CommonAddButton


const createStyles = (Scale: any) =>
  StyleSheet.create({
  btnContainer: {
    
    // backgroundColor: isDisabled ? '#D9D9D9' : '#9800F5',
    borderRadius: 5,
    paddingVertical: Scale(8),
    paddingHorizontal: Scale(18),
    // elevation: 2,
    marginTop: Scale(5),
    marginBottom: Scale(5),
    bottom: 5,

  },
  buttonTxt: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Scale(14),
  }
});