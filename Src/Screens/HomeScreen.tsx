import React, { use, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { bannerLuna1, bannerLuna2 } from '../../assets/assets';
import CustomHeader from '../Components/CustomHeader';
import CommonBanner from '../Components/CommonBanner';
import Scale from '../Components/Scale';
import { HomeScreenFlatlist } from '../Constants/CommonFlatlist';
import HomeScreenGameHeaders from '../Components/HomeScreenGameHeaders';
import CasinoScreen from './CasinoScreen';
import LotteryScreen from './Lottery/LotteryScreen';
import CustomLoader from '../Components/CustomLoader';
import { useDispatch } from 'react-redux';
import { getAllGamesList } from '../Redux/Slice/HomeSlice';
import { useContainerScale } from '../hooks/useContainerScale';
import { AppDispatch } from '../Redux/store';
import { getWalletBalance } from '../Redux/Slice/signInSlice';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({ navigation }: { navigation: any }) => {
const dispatch = useDispatch<AppDispatch>();
  const [gameList, setGameList] = useState(HomeScreenFlatlist);
  const [selectedGameId, setSelectedGameId] = useState(1);

  const scrollViewRef = useRef<ScrollView>(null);
  const [loader, setLoader] = useState(false);
  const banners = [
    { id: 1, name: bannerLuna1 },
    { id: 2, name: bannerLuna2 },
    // {id: 3, name: banner3},
    // {id: 4, name: banner4},
  ];

  const { Scale, verticalScale } = useContainerScale();
    const styles = createStyles(Scale);
    
    const isFocused = useIsFocused();
  useEffect(() => {
    // always fetch on mount
    dispatch(getAllGamesList());
    dispatch(getWalletBalance());
  }, [dispatch]);
  
  useEffect(() => {
    if (isFocused) {
      dispatch(getAllGamesList());
      dispatch(getWalletBalance());
    }
  }, [dispatch, isFocused]);

  const openDrawerdd = () => {
    console.log('openDrawerdd', navigation.toggleDrawer);
    navigation.toggleDrawer();
  };

  const handleSelectGameHeader = (id: number) => {
    const updatedList = gameList.map(item => ({
      ...item,
      isSelected: item.id === id,
    }));
    setGameList(updatedList);
    setSelectedGameId(id);
  };

  const renderGameContent = () => {
    switch (selectedGameId) {
      case 1:
        return (
           <>
            <LotteryScreen />
          </>
        );
      case 2:
        return (
          <View style={{ marginTop: Scale(10) }}>
            <CasinoScreen showHeader={false} />
          </View>
        );
      case 3:
        return (
          <>
            <Text>scratch</Text>
          </>
        );
      case 4:
        return (
          <>
            <Text>rummy</Text>
          </>
        );
      case 5:
        return (
          <>
            <Text>sports</Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#250f0fff' }}>
       <CustomLoader visible={loader} />
      <CustomHeader
        onMenuPress={openDrawerdd}
        onLoginPress={() => {
          navigation.navigate('SignInScreen');
        }}
        registerPress={() => {
          navigation.navigate('SignUpScreen');
        }}
      />
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <CommonBanner banners={banners} />

        <HomeScreenGameHeaders
          headerList={gameList}
          selectedId={selectedGameId}
          onPress={() => {}}
          onSelect={handleSelectGameHeader}
        />
        {renderGameContent()}
      </ScrollView>
    </View>
  );
};

const createStyles = (Scale: any) => StyleSheet.create({
  container: { flex: 1 },
});

export default HomeScreen;
