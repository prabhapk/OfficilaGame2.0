/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../Constants/Theme';
import { useContainerScale } from '../hooks/useContainerScale';
interface Props {
  innerText: string;
  onPress: () => void;
}

const CommonQuickGuess: React.FC<Props> = ({ innerText, onPress }) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={styles.container}>
        <Text
          style={styles.innerTextStyle}>
          {innerText}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
const createStyles = (Scale: any) =>
  StyleSheet.create({
    container: {
          backgroundColor: COLORS.gameDetailColor,
          borderRadius: Scale(10),
          paddingVertical: Scale(10),
          paddingHorizontal: Scale(20),
          marginTop: Scale(5),
          marginBottom: Scale(5),
          bottom:  Scale(5),
          borderWidth: 0.5,
          borderColor: COLORS.white,
        },
        innerTextStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: Scale(16),
          },

  })

export default CommonQuickGuess