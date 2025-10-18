import React, { use, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { annaiBanner, bannerLuna1, bannerLuna2,annaiBanner1 } from "../../assets/assets";
import CustomHeader from "../Components/CustomHeader";
import CommonBanner from "../Components/CommonBanner";
import DownloadBanner from "../Components/DownloadBanner";
import { HomeScreenFlatlist } from "../Constants/CommonFlatlist";
import HomeScreenGameHeaders from "../Components/HomeScreenGameHeaders";
import CasinoScreen from "./CasinoScreen";
import LotteryScreen from "./Lottery/LotteryScreen";
import CustomLoader from "../Components/CustomLoader";
import { useDispatch, useSelector } from "react-redux";
import { getAllGamesList } from "../Redux/Slice/HomeSlice";
import { useContainerScale } from "../hooks/useContainerScale";
import { AppDispatch, RootState } from "../Redux/store";
import { getWalletBalance } from "../Redux/Slice/signInSlice";
import { useIsFocused } from "@react-navigation/native";
import { COLORS } from "../Constants/Theme";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [gameList, setGameList] = useState(HomeScreenFlatlist);

  const { isLoggedIn, walletBalanceLoader, userDetails } = useSelector(
    (state: RootState) => state.signInSlice
  );

  const scrollViewRef = useRef<ScrollView>(null);
  const [loader, setLoader] = useState(false);
  const banners = [
    { id: 1, name: annaiBanner },
    { id: 2, name: annaiBanner1 },
  ];

  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);

  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getAllGamesList());
    if (isLoggedIn) {
      if (!walletBalanceLoader) {
        // Run retries for race vs Redux persist
        const attemptWalletBalanceFetch = (attempt = 1) => {
          dispatch(getWalletBalance())
            .unwrap()
            .catch(() => {
              if (attempt <= 5) {
                setTimeout(
                  () => attemptWalletBalanceFetch(attempt + 1),
                  attempt * 250
                );
              }
            });
        };
        attemptWalletBalanceFetch();
      }
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (isFocused) {
      dispatch(getAllGamesList());

      if (isLoggedIn) {
        dispatch(getWalletBalance());
      }
    }
  }, [dispatch, isFocused, isLoggedIn]);

  const openDrawerdd = () => {
    navigation.toggleDrawer();
  };

  const [selectedGameId, setSelectedGameId] = useState(1);

  const handleSelectGameHeader = (id: number) => {
    const updatedList = gameList.map((item) => ({
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
        return <CasinoScreen showHeader={false} />;
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
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <CustomLoader visible={loader} />
      <CustomHeader
        onMenuPress={openDrawerdd}
        onLoginPress={() => {
          navigation.navigate("SignInScreen");
        }}
        registerPress={() => {
          navigation.navigate("SignUpScreen");
        }}
      />
      
      {/* Download Banner - Only show on web */}
      <DownloadBanner />
      
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
        <View style={{ paddingBottom: 100 }}>{renderGameContent()}</View>
      </ScrollView>
    </View>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
    container: { flex: 1 },
  });

export default HomeScreen;
