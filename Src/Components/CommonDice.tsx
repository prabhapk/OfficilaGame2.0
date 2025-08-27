import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

interface Props {
  data: any;
  onPressDice: () => void;
}

const CommonDice: React.FC<Props> = ({data, onPressDice}) => {
  return (
    <TouchableOpacity
    onPress={onPressDice}
      style={styles.container}>
      <ImageBackground
        source={data.image}
        resizeMode="cover"
        style={styles.BgImage}>
        <View style={{flex: 1}}>
          <Text style={[styles.contentItem, {marginTop: 10}]}>
            {'DICE'}
          </Text>
          <Text style={[styles.contentItem]}>
            {data.time}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.playNowBtn}
          onPress={onPressDice}
          >
          <View
            style={styles.playNowView}>
            <Text style={styles.playNowBtnText}>
              Play Now
            </Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin: 5,
    width: '100%',
    borderRadius: 10,
    marginTop: 5,
    height: 180,
  },
  BgImage:{
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  playNowBtn:{
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 5,
  },
  playNowView:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 8,
    height: 45,
    marginHorizontal: 5,
  },
  playNowBtnText:{color: 'white', fontWeight: 'bold', top: 3},
  contentItem: {fontSize: 16, color: 'white', fontWeight: 'bold', marginLeft: 10, },
});

export default CommonDice;
