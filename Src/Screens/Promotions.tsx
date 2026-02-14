import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import CustomHeader from "../Components/CustomHeader";
import { useContainerScale } from "../hooks/useContainerScale";
import { COLORS } from "../Constants/Theme";
import { promotionBanner1, promotionBanner2, promotionBanner3, promotionBanner4 } from "../../assets/assets";

const { width } = Dimensions.get("window");

const Promotions = ({ navigation }: { navigation: any }) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale, verticalScale);

  const promotionCards = [
    {
      id: 1,
      images: {
        uri1: promotionBanner1,
        uri2: promotionBanner2,
      },
    },
    {
      id: 2,
      images: {
        uri1: promotionBanner1,
        uri2: promotionBanner2,
      },
    },
    {
      id: 3,
      images: {
        uri1: promotionBanner3,
        uri2: promotionBanner3,
      },
    },
    {
      id: 4,
      images: {
        uri1: promotionBanner4,
        uri2: promotionBanner4,
      },
    },
  ];
  

  const handleJoinPress = (cardId: number) => {
    // Handle join button press
    console.log(`Join pressed for card ${cardId}`);
  };

  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  const handleLoginPress = () => {
    navigation.navigate("SignIn");
  };

  const handleRegisterPress = () => {
    navigation.navigate("SignUp");
  };

  const renderPromotionCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("PromotionsMain", {
          bannerImage: item.images.uri2,
        })
      }
    >
      <View style={styles.cardContainer}>
        <Image
          source={item.images.uri1}
          style={styles.bannerImage}
          resizeMode="cover"
        />
  
        <View style={styles.buttonOverlay}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.joinButton}
            onPress={() =>
              navigation.navigate("PromotionsMain", {
                bannerImage: item.images.uri2,
              })
            }
          >
            <Text style={styles.joinButtonText}>Join Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  

  return (
    <View style={styles.container}>
   <View style={styles.headrrcontainer}>
          <Text style={styles.screenTitle}>Promotions</Text>
        </View>
      
        <FlatList
          data={promotionCards}
          renderItem={renderPromotionCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
    </View>
  );
};

const createStyles = (Scale: any, verticalScale: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primary,
    },
    flatListContent: {
      paddingHorizontal: Scale(15),
      paddingTop: verticalScale(20),
      paddingBottom: verticalScale(100), // Extra margin for last item visibility
    },
    screenTitle: {
      fontSize: Scale(24),
      fontWeight: "bold",
      color: COLORS.white,
      textAlign: "center",
    },
    cardContainer: {
      marginBottom: verticalScale(20),
      borderRadius: Scale(15),
      overflow: "hidden",
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      position: "relative",
    },
    bannerImage: {
      width: "100%",
      height: verticalScale(200),
      borderRadius: Scale(15),
    },
    buttonOverlay: {
      position: "absolute",
      bottom: Scale(15),
      right: Scale(15),
    },
    joinButton: {
      backgroundColor: COLORS.white,
      paddingHorizontal: Scale(20),
      paddingVertical: verticalScale(12),
      borderRadius: Scale(8),
      minWidth: Scale(100),
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    joinButtonText: {
      color: COLORS.primary,
      fontSize: Scale(14),
      fontWeight: "bold",
      textAlign: "center",
    },
    headrrcontainer: {
        backgroundColor: COLORS.primary, // Dark maroon
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
      },
  });

export default Promotions;