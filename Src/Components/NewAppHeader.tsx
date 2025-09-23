import {StyleSheet, Text, View, TouchableOpacity, Image, GestureResponderEvent} from 'react-native';
import React from 'react';
import { lefArrow } from '../../assets/assets';
import { useContainerScale } from '../hooks/useContainerScale';
interface customHeaderProps {
  leftIconPress: (event: GestureResponderEvent) => void;
  rightIconPress?:(event: GestureResponderEvent) => void;
  rightIcon?: Image;
  centerText?: string;
}

const NewAppHeader: React.FC<customHeaderProps> = ({
  leftIconPress,
  rightIconPress,
  rightIcon,
  centerText,
}) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{marginHorizontal: Scale(10),}}
        onPress={leftIconPress}>
        <Image
          source={lefArrow}
          tintColor={'#fff'}
          resizeMode="contain"
          style={{width: Scale(20), height: Scale(20)}} 
        />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            fontSize: Scale(20),
            color: '#fff',
            fontWeight: 'bold',
            
          }}>
          {centerText}
        </Text>
      </View>
      <TouchableOpacity
        onPress={rightIconPress}
        style={{marginHorizontal: Scale(10)}}>
        <Image
          source={rightIcon}
          style={{width: Scale(30), height: Scale(30)}}
        />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: Scale(10),
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NewAppHeader;
