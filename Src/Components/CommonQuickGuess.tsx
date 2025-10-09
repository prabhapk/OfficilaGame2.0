/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native'
import React from 'react'
import { COLORS } from '../Constants/Theme';
import { useContainerScale } from '../hooks/useContainerScale';
interface Props {
  innerText: string;
  onPress: () => void;
}

const CommonQuickGuess: React.FC<Props> = ({ innerText, onPress }) => {
  const { Scale, verticalScale } = useContainerScale();
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: COLORS.gameDetailColor,
          borderRadius: 10,
          paddingVertical: Scale(10),
          paddingHorizontal: Scale(20),
          // elevation: 2,
          marginTop: Scale(5),
          marginBottom: Scale(5),
          bottom: 5,
          borderWidth: 0.1,
          borderColor: COLORS.white,
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: Scale(16),
          }}>
          {innerText}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default CommonQuickGuess