import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CasionHeaders from '../Components/CasionHeaders'
import { CasionGamesList, CasionHeadersList } from '../Constants/CommonFlatlist'
import CasionGames from '../Components/CasionGames'
import { COLORS } from '../Constants/Theme'

interface CasinoScreenProps {
  showHeader?: boolean;
}

const CasinoScreen: React.FC<CasinoScreenProps> = ({ showHeader = true }) => {
  const [selectedHeaderId, setSelectedHeaderId] = useState(1);
  const [gameList, setGameList] = useState(CasionHeadersList);

  const handleSelectCasinoHeader = (id: number) => {
    const updatedList = gameList.map((item) => ({
      ...item,
      isSelected: item.id === id,
    }));
    setGameList(updatedList);
    setSelectedHeaderId(id);
  };

  const renderCasinoGame = () => {
    switch (selectedHeaderId) {
      case 1:
        return <CasionGames onPress={() => {}} headerList={CasionGamesList} />;
      case 2:
        return <CasionGames onPress={() => {}} headerList={CasionGamesList} />;
      default:
        return <CasionGames onPress={() => {}} headerList={CasionGamesList} />;
    }
  };

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: COLORS.gamesBackground,
    },
    header: {
      backgroundColor: COLORS.headerBackground,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.gameCardBorder,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
    },
    headerText: {
      color: COLORS.primaryTextColor,
      fontSize: 20,
      fontWeight: 'bold',
      padding: 12,
      textAlign: 'center',
    },
  });

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      {showHeader && (
        <View style={styles.header}>
          <Text style={styles.headerText}>Casino</Text>
        </View>
      )}
      <View style={{ flex: 0.1 }} />
      {renderCasinoGame()}
    </ScrollView>
  );
}

export default CasinoScreen