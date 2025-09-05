import {
  View,
  Text,
  FlatList,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import {
  chipIcon,
  color,
  dice,
  digit,
  lotteryHeader,
} from '../../../assets/assets';
import Scale from '../../Components/Scale';
import { lotteryGamesList, ThreeDigits } from '../../Constants/CommonFlatlist';
import CommonDigits from '../../Components/CommonDigits';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const LotteryScreen = () => {
  const navigation = useNavigation();
  const { allGamesList } = useSelector((state: any) => state.homeSlice);
  console.log("allGamesList", allGamesList);
  
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={lotteryHeader}
          style={{ width: 150, height: 50 }}
          resizeMode="contain"
        />

        <FlatList
          data={lotteryGamesList}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Quick3DScreen', { gameData: item });
                }}
              >
                <Image
                  source={item.image}
                  style={{ width: Scale(100), height: Scale(100) }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopColor: 'yellow',
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: Scale(20),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: Scale(10),
          }}
        >
          <Image
            source={chipIcon}
            style={{ width: Scale(25), height: Scale(25) }}
            resizeMode="contain"
          />
          <Text
            style={{ fontSize: Scale(16), fontWeight: 'bold', color: 'white' }}
          >
            3 Digit Games
          </Text>
        </View>

        <FlatList
          data={allGamesList}
          keyExtractor={(subItem, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={{
            marginHorizontal: Scale(10),
            marginVertical: Scale(10),
          }}
          renderItem={({ item }) => {
            return (
              <CommonDigits
                data={item}
                onPress3Digits={() => {
                  // if (item.gameTye === 'Custom') {
                  //   navigation.navigate('ThreeDigitMain', { gameData: item });
                  // } else if (item.gameTye === 'RealGame') {
                  //   // navigation.navigate('ThreeDigitMain',{gameDat:item});
                  // }
                  navigation.navigate('ThreeDigitMain', { gameData: item.groupId});
                }}
              />
            );
          }}
        />
      </View>
    </>
  );
};

export default LotteryScreen;
