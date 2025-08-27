import {View, GestureResponderEvent, StyleSheet} from 'react-native';
import React from 'react';
import Scale from './Scale';
import {CheckBox} from '@rneui/themed';
interface Props {
  checkvalue: boolean | undefined;
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  textColor?: string;
  checkIconStyle?: string;
  uncheckedIconStyle?: string;
  checkedColor?: string;
}

const CommonCheckBox: React.FC<Props> = ({
  checkvalue,
  onPress,
  title,
  textColor,
  checkIconStyle,
  uncheckedIconStyle,
  checkedColor,
}) => {
  return (
    <View style={{height: 38}}>
      <CheckBox
        title={title}
        checked={checkvalue}
        onPress={onPress}
        iconType="material-community"
        checkedIcon={checkIconStyle}
        uncheckedIcon={uncheckedIconStyle}
        checkedColor={checkedColor}
        size={18}
        containerStyle={{backgroundColor: 'transparent', height: '100%'}}
        textStyle={[styles.textStyle, {color: textColor}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: '400',
    fontSize: Scale(14),
    backgroundColor: 'transparent',
    width: '100%',
    textAlign: 'justify',
    fontFamily: 'Inter',
  },
});

export default CommonCheckBox;
