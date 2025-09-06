import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Scale from './Scale';
import { useContainerScale } from '../hooks/useContainerScale';

interface Props {
  backgroundColor: string;
  innerText: string;
  borderColor: string;
}

const CommonBall: React.FC<Props> = ({ backgroundColor, innerText, borderColor}) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  return (
    <View
                    style={{
                      backgroundColor: backgroundColor,
                      width: Scale(35),
                      height: Scale(35),
                      borderRadius: Scale(17.5),
                      marginHorizontal: Scale(5),
                      marginTop: Scale(5),
                      borderColor:borderColor,
                      borderWidth: Scale(0.5)
                    }}>
                    <Text
                      style={styles.innerTextStyle}>
                      {innerText}
                    </Text>
                  </View>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
  innerTextStyle:{
    color: 'white',
    fontSize: Scale(16),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Scale(5),
  }
});

export default CommonBall;
