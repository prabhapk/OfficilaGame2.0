import { View, StyleSheet } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import NewAppHeader from "../Components/NewAppHeader";
import { Image } from "expo-image";
import { COLORS } from "../Constants/Theme";

const PromotionsMain = ({ navigation }: any) => {
  const route = useRoute<any>();

  const { bannerImage, bannerType } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <NewAppHeader
        leftIconPress={handleBackPress}
        centerText={bannerType}
      />

      <View style={styles.imageContainer}>
        <Image
          source={bannerImage}
          style={styles.image}
          contentFit="contain"
        />
      </View>
    </View>
  );
};

export default PromotionsMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },

  image: {
    width: "100%",
    height: "100%",
  },
});
