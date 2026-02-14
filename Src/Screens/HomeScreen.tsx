import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import { annaiBanner, annaiBanner1, promotionBanner1 } from "../../assets/assets";
import { HomeScreenFlatlist } from "../Constants/CommonFlatlist";
import { COLORS } from "../Constants/Theme";
import { AppDispatch, RootState } from "../Redux/store";
import { getAllGamesList } from "../Redux/Slice/HomeSlice";
import { getWalletBalance } from "../Redux/Slice/signInSlice";
import { useContainerScale } from "../hooks/useContainerScale";

import CustomHeader from "../Components/CustomHeader";
import CommonBanner from "../Components/CommonBanner";
import CustomLoader from "../Components/CustomLoader";
import DownloadBanner from "../Components/DownloadBanner";
import HomeScreenGameHeaders from "../Components/HomeScreenGameHeaders";
import PromotionalModal from "../Components/PromotionalModal";
import LeaderboardList from "../Components/LeaderboardList";
import RecentWinnersList from "../Components/RecentWinnersList";

import CasinoScreen from "./CasinoScreen";
import LotteryScreen from "./Lottery/LotteryScreen";
import Quick3DigitsMenu from "./Lottery/Quick3DigitsMenu";

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const BANNERS = [
  { id: 1, name: annaiBanner },
  { id: 2, name: annaiBanner1 },
];

// Do not change this order: Quick3DigitsMenu → LotteryScreen → LeaderboardList → RecentWinnersList
const HOT_TAB_CONTENT = [
  { key: "quick3d", Component: Quick3DigitsMenu },
  { key: "lottery", Component: LotteryScreen },
  { key: "leaderboard", Component: LeaderboardList },
  { key: "recentWinners", Component: RecentWinnersList },
];

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const scrollViewRef = useRef<ScrollView>(null);
  const isFocused = useIsFocused();
  const { Scale } = useContainerScale();
  const styles = createStyles(Scale);

  const { isLoggedIn, walletBalanceLoader } = useSelector(
    (state: RootState) => state.signInSlice,
  );
  const { howScreenCommonLoader } = useSelector(
    (state: RootState) => state.homeSlice,
  );

  const [showPromotionalModal, setShowPromotionalModal] = useState(true);
  const [selectedGameId, setSelectedGameId] = useState(1);

  // ---------------------------------------------------------------------------
  // Effects
  // ---------------------------------------------------------------------------

  useEffect(() => {
    dispatch(getAllGamesList());
    if (isLoggedIn && !walletBalanceLoader) {
      const attemptWalletBalanceFetch = (attempt = 1) => {
        dispatch(getWalletBalance())
          .unwrap()
          .catch(() => {
            if (attempt <= 5) {
              setTimeout(
                () => attemptWalletBalanceFetch(attempt + 1),
                attempt * 250,
              );
            }
          });
      };
      attemptWalletBalanceFetch();
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (isFocused) {
      dispatch(getAllGamesList());
      if (isLoggedIn) dispatch(getWalletBalance());
    }
  }, [dispatch, isFocused, isLoggedIn]);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleMenuPress = () => navigation.toggleDrawer();
  const handleSelectGameHeader = (id: number) => setSelectedGameId(id);

  const renderGameContent = () => {
    switch (selectedGameId) {
      case 1:
        return HOT_TAB_CONTENT.map(({ key, Component }) => (
          <Component key={key} />
        ));
      case 2:
        return <LotteryScreen />;
      case 3:
        return <Text style={styles.placeholderText}>Sports</Text>;
      case 4:
        return <CasinoScreen showHeader={false} />;
      case 5:
        return <Text style={styles.placeholderText}>Live</Text>;
      default:
        return null;
    }
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <View style={styles.screen}>
      <CustomLoader visible={howScreenCommonLoader} />

      <PromotionalModal
        visible={showPromotionalModal}
        onClose={() => setShowPromotionalModal(false)}
        imageSource={promotionBanner1}
        title="Special Diwali Offer"
        subtitle="Get 3% Bonus on Every Recharge"
      />

      <View style={styles.headerWrapper}>
        <CustomHeader
          onMenuPress={handleMenuPress}
          onLoginPress={() => navigation.navigate("SignInScreen")}
          registerPress={() => navigation.navigate("SignUpScreen")}
        />
      </View>

      <DownloadBanner />

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <CommonBanner banners={BANNERS} />

        <HomeScreenGameHeaders
          headerList={HomeScreenFlatlist}
          selectedId={selectedGameId}
          onSelect={handleSelectGameHeader}
        />

        <View style={styles.gameContent}>{renderGameContent()}</View>
      </ScrollView>
    </View>
  );
};

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const createStyles = (Scale: (n: number) => number) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: COLORS.primaryBackground,
    },
    headerWrapper: {
      backgroundColor: COLORS.headerBackground,
    },
    scrollView: {
      flex: 1,
      backgroundColor: COLORS.gamesBackground,
    },
    scrollContent: {
      flexGrow: 1,
    },
    gameContent: {
      paddingBottom: Scale(100),
      backgroundColor: COLORS.gamesBackground,
    },
    placeholderText: {
      fontSize: Scale(14),
      color: COLORS.secondaryTextColor,
      padding: Scale(12),
    },
  });

export default HomeScreen;
