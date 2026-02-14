import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useContainerScale } from "../../hooks/useContainerScale";
import { ThreeDigitsLottery } from "../../Constants/CommonFlatlist";
import CommonDigits from "../../Components/CommonDigits";
import { chipIcon, multiUserIcon, quick3dMenu } from "../../../assets/assets";
import { COLORS } from "../../Constants/Theme";

const Quick3DigitsMenu = () => {
  const navigation = useNavigation<any>();
  const { allGamesList } = useSelector((state: any) => state.homeSlice);
  const { Scale } = useContainerScale();
  const styles = createStyles(Scale);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* 3Digit Game header - light purple bar with logo, title, number, people icon */}
      <View style={styles.headerBar}>
        <Image
          source={quick3dMenu}
          style={styles.headerLogo}
          contentFit="contain"
        />
        <Text style={styles.headerTitle}>3Digit Game</Text>
        <Text style={styles.headerNumber}>179256</Text>
        <Image
          source={multiUserIcon}
          style={styles.headerPeopleIcon}
          contentFit="contain"
        />
      </View>

      {/* Quick 3D cards (1min, 3min, 5min) - alignment like HomeScreenGameHeaders */}
      <View style={styles.quick3Section}>
        <View style={styles.listContent}>
          {ThreeDigitsLottery.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => {
                navigation.navigate("Quick3DScreen", { gameData: item });
              }}
              activeOpacity={0.85}
            >
              <Image
                source={item.image}
                style={styles.image}
                contentFit="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const createStyles = (Scale: (n: number) => number) =>
  StyleSheet.create({
    headerBar: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.sectionHeaderBg,
      marginHorizontal: Scale(12),
      marginTop: Scale(8),
      marginBottom: Scale(4),
      paddingVertical: Scale(10),
      paddingHorizontal: Scale(12),
      borderRadius: Scale(10),
    },
    headerLogo: {
      width: Scale(36),
      height: Scale(36),
      marginRight: Scale(8),
    },
    headerTitle: {
      fontSize: Scale(16),
      fontWeight: "bold",
      color: COLORS.sectionHeaderText,
      flex: 1,
    },
    headerNumber: {
      fontSize: Scale(14),
      fontWeight: "600",
      color: COLORS.sectionHeaderSubtext,
      marginRight: Scale(8),
    },
    headerPeopleIcon: {
      width: Scale(28),
      height: Scale(28),
    },
    quick3Section: {
      paddingVertical: Scale(12),
    },
    listContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: Scale(12),
    },
    card: {
      flex: 1,
      height: Scale(120),
      borderRadius: Scale(12),
      overflow: "hidden",
      marginHorizontal: Scale(4),
      backgroundColor: COLORS.gameCardBg,
      borderWidth: 1,
      borderColor: COLORS.gameCardBorder,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    digitGamesSection: {
      marginTop: Scale(20),
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderWidth: 1,
      borderColor: COLORS.gameCardBorder,
      alignItems: "center",
      paddingBottom: Scale(20),
    },
    digitGamesHeader: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: Scale(10),
    },
    chipIcon: {
      width: Scale(25),
      height: Scale(25),
    },
    digitGamesTitle: {
      fontSize: Scale(16),
      fontWeight: "bold",
      color: COLORS.primaryTextColor,
      marginLeft: Scale(6),
    },
    digitGamesList: {
      marginHorizontal: Scale(10),
      marginVertical: Scale(10),
    },
  });

export default Quick3DigitsMenu;
