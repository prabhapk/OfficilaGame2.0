import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useContainerScale } from "../hooks/useContainerScale";
import { COLORS } from "../Constants/Theme";

const CASINO_LEADERBOARD_MOCK = [
  { rank: 1, gameName: "FortuneGems3", user: "player93******50", winning: "₹1,48,980.00" },
  { rank: 2, gameName: "Aviator", user: "player90******78", winning: "₹98,520.00" },
  { rank: 3, gameName: "DragonTiger", user: "player95******90", winning: "₹72,150.00" },
  { rank: 4, gameName: "Crazy777", user: "player92******11", winning: "₹55,200.00" },
  { rank: 5, gameName: "MegaFishing", user: "player91******22", winning: "₹42,880.00" },
  { rank: 6, gameName: "Fortune Gems 2", user: "player94******33", winning: "₹38,500.00" },
  { rank: 7, gameName: "Money Pot", user: "player96******44", winning: "₹28,900.00" },
  { rank: 8, gameName: "CrashXFootballEdition", user: "player97******55", winning: "₹22,100.00" },
  { rank: 9, gameName: "Gladiator'sGlory", user: "player98******66", winning: "₹18,750.00" },
  { rank: 10, gameName: "FortuneGems3", user: "player99******77", winning: "₹15,200.00" },
  { rank: 11, gameName: "Aviator", user: "player89******88", winning: "₹12,400.00" },
  
];

const getRankBadgeColor = (rank: number) => {
  if (rank === 1) return "#C9A227";
  if (rank === 2) return "#9E9E9E";
  if (rank === 3) return "#CD7F32";
  return COLORS.rankBadgeBg;
};

const CasinoResult = () => {
  const { Scale } = useContainerScale();
  const styles = createStyles(Scale);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Leaderboard</Text>

      <View style={styles.card}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.colRank]}>Rank</Text>
          <Text style={[styles.headerCell, styles.colGame]}>Game</Text>
          <Text style={[styles.headerCell, styles.colUser]}>User</Text>
          <Text style={[styles.headerCell, styles.colWinning]}>Winning</Text>
        </View>
        <ScrollView
          style={styles.tableBody}
          contentContainerStyle={styles.tableBodyContent}
          showsVerticalScrollIndicator={false}
        >
          {CASINO_LEADERBOARD_MOCK.map((row) => (
            <View key={row.rank} style={styles.row}>
              <View
                style={[
                  styles.rankBadge,
                  { backgroundColor: getRankBadgeColor(row.rank) },
                ]}
              >
                <Text style={styles.rankText}>{row.rank}</Text>
              </View>
              <Text style={[styles.cell, styles.colGame]} numberOfLines={1}>
                {row.gameName}
              </Text>
              <Text style={[styles.cell, styles.colUser]} numberOfLines={1}>
                {row.user}
              </Text>
              <Text style={[styles.cell, styles.colWinning]} numberOfLines={1}>
                {row.winning}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const createStyles = (Scale: (n: number) => number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.gamesBackground,
      paddingHorizontal: Scale(12),
      paddingTop: Scale(16),
      paddingBottom: Scale(24),
    },
    title: {
      fontSize: Scale(18),
      fontWeight: "bold",
      color: COLORS.sectionHeaderText,
      marginBottom: Scale(12),
    },
    card: {
      flex: 1,
      backgroundColor: COLORS.leaderboardCardBg,
      borderRadius: Scale(12),
      borderWidth: 1,
      borderColor: COLORS.cardBorder,
      overflow: "hidden",
    },
    tableHeader: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.sectionHeaderBg,
      paddingVertical: Scale(10),
      paddingHorizontal: Scale(10),
      borderBottomWidth: 1,
      borderBottomColor: COLORS.gameCardBorder,
    },
    headerCell: {
      fontSize: Scale(13),
      fontWeight: "700",
      color: COLORS.sectionHeaderText,
    },
    colRank: { width: Scale(44), textAlign: "center" },
    colGame: { flex: 1.2, marginLeft: Scale(6) },
    colUser: { flex: 1, marginLeft: Scale(4) },
    colWinning: { flex: 1, marginLeft: Scale(4), textAlign: "right" },
    tableBody: {
      flex: 1,
    },
    tableBodyContent: {
      paddingBottom: Scale(24),
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Scale(10),
      paddingHorizontal: Scale(10),
      borderBottomWidth: 1,
      borderBottomColor: COLORS.gameCardBorder,
      backgroundColor: COLORS.listRowBg,
    },
    rankBadge: {
      width: Scale(32),
      height: Scale(32),
      borderRadius: Scale(16),
      alignItems: "center",
      justifyContent: "center",
    },
    rankText: {
      fontSize: Scale(13),
      fontWeight: "700",
      color: COLORS.white,
    },
    cell: {
      fontSize: Scale(12),
      color: COLORS.sectionHeaderText,
    },
  });

export default CasinoResult;
