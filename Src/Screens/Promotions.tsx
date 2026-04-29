import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import CustomHeader from "../Components/CustomHeader";
import { useContainerScale } from "../hooks/useContainerScale";
import { COLORS } from "../Constants/Theme";
import { agentBonus, attendanceBonus, comeBackBanner, insideAttendanceBonus, insideBannerAgent, insideBannerComeBack, insideBannerMegaRecharge, insideBannerVip, megaRechargeBonus, promotionBanner4, vipWeeklySalary } from "../../assets/assets";
import { Image } from "expo-image";

const { width } = Dimensions.get("window");

const Promotions = ({ navigation }: { navigation: any }) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale, verticalScale);

  const promotionCards = [
    {
      id: 1,
      type: "ComeBack Bonus",
      images: {
        uri1: comeBackBanner,
        uri2: insideBannerComeBack,
      },
    },
    {
      id: 2,
      type: "Mega Recharge",
      images: {
        uri1: megaRechargeBonus,
        uri2: insideBannerMegaRecharge,
      },
    },
    {
      id: 3,
      type: "VIP Weekly Salary",
      images: {
        uri1: vipWeeklySalary,
        uri2: insideBannerVip,
      },
    },
    {
      id: 4,
      type: "Agent Bonus",
      images: {
        uri1: agentBonus,
        uri2: insideBannerAgent,
      },
    },
    {
      id: 5,
      type: "Attendance Bonus",
      images: {
        uri1: attendanceBonus,
        uri2: insideAttendanceBonus,
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
           bannerType:item.type
        })
      }
    >
      <View style={styles.cardContainer}>
        <Image
          source={item.images.uri1}
          style={styles.bannerImage}
         contentFit='fill'
        />
  
        <View style={styles.buttonOverlay}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.joinButton}
            onPress={() =>
              navigation.navigate("PromotionsMain", {
                bannerImage: item.images.uri2,
                bannerType:item.type
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