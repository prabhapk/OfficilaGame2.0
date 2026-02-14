import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Image } from "expo-image";
import {
  leaderboardHeading,
  leaderboardFireworks,
  leaderboardFirst,
  leaderboardSecond,
  leaderboardThird,
} from "../../assets/assets";
import { useContainerScale } from "../hooks/useContainerScale";
import { COLORS } from "../Constants/Theme";

const LEADERBOARD_DATA = [
  { rank: 1, name: "Player90*****78", amount: "₹1,25,386.20" },
  { rank: 2, name: "Player98*****97", amount: "₹32,380.00" },
  { rank: 3, name: "Player93*****50", amount: "₹11,580.00" },
  { rank: 4, name: "Player95*****90", amount: "₹10,041.60" },
  { rank: 5, name: "Ramkumar", amount: "₹9,226.49" },
  { rank: 6, name: "Player92*****11", amount: "₹5,885.29" },
  { rank: 7, name: "Player91*****22", amount: "₹5,562.00" },
  { rank: 8, name: "Player94*****33", amount: "₹5,189.70" },
  { rank: 9, name: "Player96*****44", amount: "₹4,900.00" },
  { rank: 10, name: "Player97*****55", amount: "₹4,626.45" },
];

const LeaderboardList = () => {
  const { Scale } = useContainerScale();
  const styles = createStyles(Scale);
  const topThree = LEADERBOARD_DATA.slice(0, 3);
  const listItems = LEADERBOARD_DATA.slice(3, 10);

  return (
    <View style={styles.outerWrap}>
      {/* Title - outside card so it's not cropped by border, sits on the border */}
      <View style={styles.titleWrap} pointerEvents="none">
        <Image
          source={leaderboardHeading}
          style={styles.titleImage}
          contentFit="contain"
        />
      </View>

      <View style={styles.card}>
      {/* Top 3 only - fireworks background constrained to this section */}
      <View style={styles.top3SectionWrap}>
        <ImageBackground
          source={leaderboardFireworks}
          style={styles.top3Section}
          resizeMode="cover"
        >
          <View style={styles.top3Row}>
            {/* #2 Left */}
            <View style={styles.top3Item}>
              <Image
                source={leaderboardSecond}
                style={styles.top3Avatar}
                contentFit="contain"
              />
              <Text style={styles.top3Name} numberOfLines={1}>
                {topThree[1].name}
              </Text>
              <View style={[styles.winningsPill, styles.winningsPillSilver]}>
                <Text style={styles.winningsText}>{topThree[1].amount}</Text>
              </View>
            </View>
            {/* #1 Center - elevated above #2 and #3 */}
            <View style={styles.top3ItemCenter}>
              <Image
                source={leaderboardFirst}
                style={styles.top3AvatarCenter}
                contentFit="contain"
              />
              <Text style={styles.top3Name} numberOfLines={1}>
                {topThree[0].name}
              </Text>
              <View style={[styles.winningsPill, styles.winningsPillGold]}>
                <Text style={styles.winningsTextGold}>{topThree[0].amount}</Text>
              </View>
            </View>
            {/* #3 Right */}
            <View style={styles.top3Item}>
              <Image
                source={leaderboardThird}
                style={styles.top3Avatar}
                contentFit="contain"
              />
              <Text style={styles.top3Name} numberOfLines={1}>
                {topThree[2].name}
              </Text>
              <View style={[styles.winningsPill, styles.winningsPillSilver]}>
                <Text style={styles.winningsText}>{topThree[2].amount}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Ranks #4–10 list - no fireworks, solid background */}
      <View style={styles.listSection}>
        {listItems.map((item) => (
          <View key={item.rank} style={styles.listRow}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankBadgeText}>#{item.rank}</Text>
            </View>
            <View style={styles.avatarPlaceholder} />
            <Text style={styles.listName} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.listWinningsPill}>
              <Text style={styles.listWinningsText}>{item.amount}</Text>
            </View>
          </View>
        ))}
      </View>
      </View>
    </View>
  );
};

const createStyles = (Scale: (n: number) => number) =>
  StyleSheet.create({
    outerWrap: {
      marginHorizontal: Scale(12),
      marginTop: Scale(16),
      marginBottom: Scale(8),
      position: "relative",
    },
    card: {
      backgroundColor: COLORS.leaderboardCardBg,
      borderRadius: Scale(16),
      borderWidth: 2,
      borderColor: COLORS.cardBorderAccent,
      overflow: "hidden",
    },
    titleWrap: {
      position: "absolute",
      top: Scale(-40),
      left: 0,
      right: 0,
      alignItems: "center",
      zIndex: 10,
    },
    titleImage: {
      height: Scale(100),
      width: Scale(260),
    },
    top3SectionWrap: {
      height: Scale(200),
      width: "100%",
      overflow: "hidden",
      marginTop:Scale(30),

    },
    top3Section: {
      flex: 1,
      paddingVertical: Scale(16),
      paddingHorizontal: Scale(8),
      justifyContent: "center",
      alignItems: "center",
      width:"100%",
      height:"100%",
    },
    top3Row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingHorizontal: Scale(4),
    },
    top3Item: {
      alignItems: "center",
      flex: 1,
    },
    top3ItemCenter: {
      alignItems: "center",
      flex: 1,
      marginBottom: Scale(28),
      marginHorizontal:Scale(20)
    },
    top3Avatar: {
      width: Scale(70),
      height: Scale(85),
      marginBottom: Scale(4),
    },
    top3AvatarCenter: {
      width: Scale(90),
      height: Scale(110),
      marginBottom: Scale(4),
    },
    top3Rank: {
      fontSize: Scale(14),
      fontWeight: "bold",
      color: COLORS.black,
      marginBottom: Scale(2),
    },
    top3Name: {
      fontSize: Scale(10),
      fontWeight: "600",
      color: COLORS.black,
      maxWidth: Scale(75),
      textAlign: "center",
      marginBottom: Scale(4),
    },
    winningsPill: {
      paddingVertical: Scale(4),
      paddingHorizontal: Scale(10),
      borderRadius: Scale(20),
      borderWidth: 1,
    },
    winningsPillGold: {
      backgroundColor: COLORS.winningsPillGoldBg,
      borderColor: COLORS.white,
    },
    winningsPillSilver: {
      backgroundColor: COLORS.winningsPillSilverBg,
      borderColor: "#E91E63",
    },
    winningsText: {
      fontSize: Scale(10),
      fontWeight: "700",
      color: COLORS.black,
    },
    winningsTextGold: {
      fontSize: Scale(11),
      fontWeight: "700",
      color: COLORS.black,
    },
    listSection: {
      backgroundColor: COLORS.leaderboardListBg,
      paddingHorizontal: Scale(12),
      paddingTop: Scale(8),
      paddingBottom: Scale(16),
    },
    listRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.listRowBg,
      borderRadius: Scale(12),
      paddingVertical: Scale(8),
      paddingHorizontal: Scale(10),
      marginBottom: Scale(6),
      borderWidth: 1,
      borderColor: COLORS.listRowBorder,
    },
    rankBadge: {
      backgroundColor: COLORS.rankBadgeBg,
      borderRadius: Scale(8),
      paddingVertical: Scale(4),
      paddingHorizontal: Scale(8),
      marginRight: Scale(8),
    },
    rankBadgeText: {
      fontSize: Scale(12),
      fontWeight: "bold",
      color: COLORS.white,
    },
    avatarPlaceholder: {
      width: Scale(32),
      height: Scale(32),
      borderRadius: Scale(16),
      backgroundColor: COLORS.rankBadgeBg,
      opacity: 0.8,
      marginRight: Scale(8),
    },
    listName: {
      flex: 1,
      fontSize: Scale(13),
      fontWeight: "600",
      color: COLORS.sectionHeaderText,
    },
    listWinningsPill: {
      backgroundColor: COLORS.rankBadgeBg,
      paddingVertical: Scale(6),
      paddingHorizontal: Scale(12),
      borderRadius: Scale(16),
    },
    listWinningsText: {
      fontSize: Scale(12),
      fontWeight: "700",
      color: COLORS.white,
    },
  });

export default LeaderboardList;
