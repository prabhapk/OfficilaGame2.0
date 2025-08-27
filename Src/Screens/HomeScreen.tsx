import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { bannerLuna1, bannerLuna2 } from "../../assets/assets";
import CustomHeader from "../Components/CustomHeader";
import CommonBanner from "../Components/CommonBanner";
import { scale } from "react-native-size-matters";
import { HomeScreenFlatlist } from "../Constants/CommonFlatlist";
import HomeScreenGameHeaders from "../Components/HomeScreenGameHeaders";
import CasinoScreen from "./CasinoScreen";
import LotteryScreen from "./Lottery/LotteryScreen";
import CustomLoader from "../Components/CustomLoader";

const HomeScreen = ({ navigation }: { navigation: any }) => {
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

  const openDrawerdd = () => {
    console.log("openDrawerdd", navigation.toggleDrawer);
    navigation.toggleDrawer();
  };

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
          <View style={{ marginTop: scale(10) }}>
            <CasinoScreen showHeader={false} />
          </View>
        );
      case 2:
        return (
          <>
            <LotteryScreen />
          </>
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
    <View style={{ flex: 1, backgroundColor: "#560303" }}>
      <CustomHeader
        onMenuPress={openDrawerdd}
        onLoginPress={() => {
          navigation.navigate("SignInScreen");
        }}
        registerPress={() => {
          navigation.navigate("SignUpScreen");
        }}
      />
      <CustomLoader visible={loader} />
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        scrollEventThrottle={16}
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

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default HomeScreen;
