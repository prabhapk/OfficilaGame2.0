import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CasionHeaders from '../Components/CasionHeaders'
import { CasionGamesList, CasionHeadersList } from '../Constants/CommonFlatlist'
import CasionGames from '../Components/CasionGames'
import { COLORS } from '../Constants/Theme'


interface CasinoScreenProps {
  showHeader?: boolean;
}

const CasinoScreen: React.FC<CasinoScreenProps> = ({ showHeader =true}) => {
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
                return (
                    <CasionGames onPress={() => { }}
                        headerList={CasionGamesList}
                    />
                )
            case 2:
                return (
                    <CasionGames onPress={() => { }}
                        headerList={CasionGamesList}
                    />
                )
            default:
                return (
                    <CasionGames onPress={() => { }}
                        headerList={CasionGamesList}
                    />
                )
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#560303' }}>
           {showHeader&& <View style={{ backgroundColor: COLORS.primary, elevation: 10, }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', padding: 10, textAlign: 'center' }}>Casino</Text>
            </View>}
            <View style={{ flex: 0.1, }}>
                <CasionHeaders
                    headerList={gameList}
                    selectedId={selectedHeaderId}
                    onPress={() => { }}
                    onSelect={handleSelectCasinoHeader}
                />
            </View>
            {renderCasinoGame()}
        </ScrollView>
    )
}

export default CasinoScreen