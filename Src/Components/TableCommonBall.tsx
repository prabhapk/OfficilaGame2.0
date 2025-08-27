import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Scale from './Scale';

interface Props {
  backgroundColor: string;
  innerText: string;
  borderColor: string;
}

const TableCommonBall: React.FC<Props> = ({ backgroundColor, innerText, borderColor}) => {

  return (
    <View
                    style={{
                      backgroundColor: backgroundColor,
                      width: Scale(25),
                      height: Scale(25),
                      borderRadius: Scale(12.5),
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

const styles = StyleSheet.create({
  innerTextStyle:{
    color: 'white',
    fontSize: Scale(12),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Scale(3),
  }
});

export default TableCommonBall;
