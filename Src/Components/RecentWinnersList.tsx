import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { recentWinnersHeading } from "../../assets/assets";
import { useContainerScale } from "../hooks/useContainerScale";
import { COLORS } from "../Constants/Theme";

const RECENT_WINNERS_DATA = [
  {
    id: "1",
    playerName: "Player93******76",
    gameName: "Fortune Gems 2",
    amount: "₹8.00",
  },
  {
    id: "2",
    playerName: "Player90******78",
    gameName: "PokerKing",
    amount: "₹19.50",
  },
  {
    id: "3",
    playerName: "Player95******90",
    gameName: "Moneycoming",
    amount: "₹15.00",
  },
  {
    id: "4",
    playerName: "Player92******11",
    gameName: "StockMarket",
    amount: "₹6.63",
  },
  {
    id: "5",
    playerName: "Player91******22",
    gameName: "Fortune Gems 2",
    amount: "₹10.00",
  },
];

const RecentWinnersList = () => {
  const { Scale } = useContainerScale();
  const styles = createStyles(Scale);

  return (
    <View style={styles.outerWrap}>
      {/* Header - RECENT WINNERS banner + WIN BIG & amount (single image, no separate text) */}
      <View style={styles.titleWrap} pointerEvents="none">
        <Image
          source={recentWinnersHeading}
          style={styles.headerImage}
          contentFit="contain"
        />
      </View>

      <View style={styles.card}>
        <View style={styles.listSection}>
          {RECENT_WINNERS_DATA.map((item) => (
            <View key={item.id} style={styles.listRow}>
              <View style={styles.gameIconPlaceholder} />
              <View style={styles.details}>
                <Text style={styles.playerName} numberOfLines={1}>
                  {item.playerName}
                </Text>
                <Text style={styles.gameName} numberOfLines={1}>
                  {item.gameName}
                </Text>
              </View>
              <View style={styles.amountPill}>
                <Text style={styles.amountText}>{item.amount}</Text>
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
      top: Scale(-50),
      left: 0,
      right: 0,
      alignItems: "center",
      zIndex: 10,
    },
    headerImage: {
      width: "100%",
      maxWidth: Scale(320),
      height: Scale(120),
    },
    listSection: {
      backgroundColor: COLORS.leaderboardListBg,
      paddingHorizontal: Scale(12),
      paddingTop: Scale(90),
      paddingBottom: Scale(16),
    },
    listRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.listRowBg,
      borderRadius: Scale(12),
      paddingVertical: Scale(10),
      paddingHorizontal: Scale(10),
      marginBottom: Scale(8),
      borderWidth: 1,
      borderColor: COLORS.listRowBorder,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    gameIconPlaceholder: {
      width: Scale(44),
      height: Scale(44),
      borderRadius: Scale(8),
      backgroundColor: COLORS.sectionHeaderBg,
      marginRight: Scale(10),
    },
    details: {
      flex: 1,
    },
    playerName: {
      fontSize: Scale(14),
      fontWeight: "700",
      color: COLORS.sectionHeaderText,
      marginBottom: Scale(2),
    },
    gameName: {
      fontSize: Scale(12),
      fontWeight: "400",
      color: COLORS.secondaryTextColor,
    },
    amountPill: {
      paddingVertical: Scale(6),
      paddingHorizontal: Scale(14),
      borderRadius: Scale(20),
      backgroundColor: COLORS.cardBg,
      borderWidth: 1,
      borderColor: COLORS.gameCardBorder,
    },
    amountText: {
      fontSize: Scale(13),
      fontWeight: "700",
      color: COLORS.sectionHeaderText,
    },
  });

export default RecentWinnersList;
