import { View, Image, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import NewAppHeader from "../Components/NewAppHeader";
import { COLORS } from "../Constants/Theme";

const PromotionsMain = ({navigation}: any) => {
  const route = useRoute<any>();
  const { bannerImage } = route.params;
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ 
        flex: 1,
        backgroundColor: COLORS.primary,
     }}>
        {/* <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" /> */}
        <NewAppHeader
        leftIconPress={handleBackPress}
        centerText="Agency Center"
        // rightIcon={require('../../assets/wallet-icon.webp')}
      />
        <Image
          source={bannerImage}
          style={{ width: "90%", height: 250, marginHorizontal: 20 }}
          resizeMode="cover"
        />

    </SafeAreaView>
  );
};

export default PromotionsMain;
