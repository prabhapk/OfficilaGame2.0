import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { gameTypeAct } from '../../assets/assets';
import { Image } from 'expo-image';
import { useContainerScale } from '../hooks/useContainerScale';
import { COLORS } from '../Constants/Theme';

interface HeaderProps {
  onPress: () => void;
  headerList: any[];
  selectedId: number;
  onSelect: (id: number) => void;
}

const CasionHeaders: React.FC<HeaderProps> = ({
  onPress,
  headerList,
  selectedId,
  onSelect,
}) => {

    const { Scale, verticalScale } = useContainerScale();
    const styles = createStyles(Scale);
  return (
    <FlatList
      contentContainerStyle={{
        
        marginHorizontal: Scale(10),
        marginVertical: Scale(10),
      }}
      data={headerList}
      horizontal
      renderItem={({ item }) => {
        const isSelected = item.id === selectedId;
        return (
          <TouchableOpacity onPress={() => onSelect(item.id)} style={[styles.container, isSelected && styles.selectedContainer]}>
            <Image
              source={item.image}
              style={styles.refImage}
              contentFit="contain"
            />
            <Text style={[styles.headerText, isSelected && styles.selectedHeaderText]}>{item.name}</Text>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};


const createStyles = (Scale: any) => StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center', marginHorizontal: Scale(10),
    padding: 5, justifyContent: "center", paddingHorizontal: Scale(12),
  },
  selectedContainer: {
    backgroundColor: COLORS.casinoHeaderBg,
    borderBottomColor: COLORS.check,
    borderTopLeftRadius: Scale(5),
    borderTopRightRadius: Scale(5),
    borderBottomWidth: Scale(2),
  },
  headerText: {
    fontSize: Scale(12),
    color: COLORS.casinoHeaderSubtext,
    marginLeft: Scale(5),
    top: 3,
  },
  selectedHeaderText: {
    color: COLORS.casinoHeaderText,
    fontWeight: 'bold',
    fontSize: Scale(14),
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    padding: 8,
    paddingHorizontal: 20,
    backgroundColor: COLORS.gameCardBorder,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refImage: { width: Scale(30), height: Scale(30) },

});

export default CasionHeaders;
