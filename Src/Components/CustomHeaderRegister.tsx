import {StyleSheet, Text, View, TouchableOpacity, Image, GestureResponderEvent} from 'react-native';
import Scale from './Scale';
import React from 'react';

interface customHeaderProps {
  leftIconPress: (event: GestureResponderEvent) => void;
  rightIconPress:(event: GestureResponderEvent) => void;
  leftIcon?: Image;
  rightIcon?: Image;
  centerText?: string;
}

const CustomHeaderRegister: React.FC<customHeaderProps> = ({
  leftIconPress,
  rightIconPress,
  leftIcon,
  rightIcon,
  centerText,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{marginHorizontal: Scale(10)}}
        onPress={leftIconPress}>
        <Image
          source={leftIcon}
          style={{width: 30, height: 50, resizeMode: 'contain', }}
        />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            fontSize: Scale(22),
            color: 'black',
            fontWeight: 'bold',
            right: Scale(20),
          }}>
          {centerText}
        </Text>
      </View>
      <TouchableOpacity
        onPress={rightIconPress}
        style={{marginHorizontal: Scale(10)}}>
        <Image
          source={rightIcon}
          style={{width: 30, height: 30, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomHeaderRegister;
