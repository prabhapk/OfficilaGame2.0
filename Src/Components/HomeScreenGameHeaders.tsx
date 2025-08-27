import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Scale from './Scale';
import { gameTypeAct } from '../../assets/assets';
import { Image } from 'expo-image';
interface HeaderProps {
  onPress: () => void;
  headerList: any[];
  selectedId: number;
  onSelect: (id: number) => void;
}

const HomeScreenGameHeaders: React.FC<HeaderProps> = ({
  onPress,
  headerList,
  selectedId,
  onSelect,
}) => {
  return (
    <FlatList
      contentContainerStyle={{
        justifyContent: 'space-between',
        flex: 1,
        marginHorizontal: Scale(10),
        marginVertical: Scale(10),
      }}
      data={headerList}
      horizontal
      showsHorizontalScrollIndicator
      renderItem={({ item }) => {
        const isSelected = item.id === selectedId;

        return (
          <TouchableOpacity onPress={() => onSelect(item.id)}>
            <ImageBackground
              source={isSelected ? gameTypeAct : null}
              style={{
                width: Scale(75),
                height: Scale(115),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              resizeMode="cover"
            >
              <Image
                source={item.image}
                style={styles.refImage}
                contentFit="contain"
              />
            </ImageBackground>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
    },
    menuContainer: {
        flexDirection: 'row', alignItems: 'center'
    },
    loginButton: {
        padding: 8,
        paddingHorizontal: 20,
        backgroundColor: '#ccc',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    refImage: { width: Scale(70), height: Scale(80), resizeMode: 'cover' },

});

export default HomeScreenGameHeaders;
