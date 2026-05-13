import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Scale from "./Scale";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const leaderboardData = [
  {
    id: "1",
    rank: 1,
    name: "Rahul K.",
    amount: "₹1,25,000",
    image:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
  {
    id: "2",
    rank: 2,
    name: "Priya S.",
    amount: "₹95,000",
    image:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
  {
    id: "3",
    rank: 3,
    name: "Arun M.",
    amount: "₹75,000",
    image:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
  {
    id: "4",
    rank: 4,
    name: "Karthik",
    amount: "₹65,000",
    image:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
  {
    id: "5",
    rank: 5,
    name: "Anjali",
    amount: "₹58,000",
    image:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
  {
    id: "6",
    rank: 6,
    name: "Vijay",
    amount: "₹51,000",
    image:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
  {
    id: "7",
    rank: 7,
    name: "Meera",
    amount: "₹49,000",
    image:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
  {
    id: "8",
    rank: 8,
    name: "lal",
    amount: "₹35,000",
    image:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
  {
    id: "9",
    rank: 9,
    name: "yuvi",
    amount: "₹30,000",
    image:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
  {
    id: "10",
    rank: 10,
    name: "Mani",
    amount: "₹17,000",
    image:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
];

const LeaderboardList = () => {
const [showAll, setShowAll] = useState(false);

  const topThree = useMemo(() => leaderboardData.slice(0, 3), []);
  const remainingUsers = useMemo(
    () => leaderboardData.slice(3),
    []
  );

  const toggleViewAll = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );
    setShowAll(!showAll);
  };

  const renderTopCard = (
    item: any,
    index: number
  ) => {
    const isFirst = item.rank === 1;

    return (
      <LinearGradient
        colors={
          isFirst
            ? ["#F9D976", "#B8860B"]
            : index === 1
            ? ["#535353", "#1E1E1E"]
            : ["#9C5B32", "#3D1F12"]
        }
        style={[
          styles.topCard,
          isFirst && styles.firstCard,
        ]}
      >
        <Text style={styles.rankText}>
          {item.rank}
        </Text>

        <Image
          source={{ uri: item.image }}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.amount}>
          {item.amount}
        </Text>
      </LinearGradient>
    );
  };

  const renderUser = ({ item }: any) => (
    <LinearGradient
      colors={["#5B1A83", "#2B0B45"]}
      style={styles.userRow}
    >
      <View style={styles.leftContainer}>
        <Text style={styles.rowRank}>
          {item.rank}
        </Text>

        <Image
          source={{ uri: item.image }}
          style={styles.rowAvatar}
        />

        <Text style={styles.rowName}>
          {item.name}
        </Text>
      </View>

      <Text style={styles.rowAmount}>
        {item.amount}
      </Text>
    </LinearGradient>
  );

  return (
    <LinearGradient
      colors={["#2B0047", "#170021"]}
      style={styles.container}
    >
      {/* HEADER */}
      <Text style={styles.heading}>
        LEADERBOARD
      </Text>

      <Text style={styles.subHeading}>
        TODAY'S BIGGEST WINNERS
      </Text>

      {/* TOP 3 */}
      <View style={styles.topContainer}>
        {topThree.map((item, index) =>
          renderTopCard(item, index)
        )}
      </View>

      {/* EXPANDED LIST */}
      {showAll && (
        <FlatList
          data={remainingUsers}
          keyExtractor={(item) => item.id}
          renderItem={renderUser}
          scrollEnabled={false}
          contentContainerStyle={{
            marginTop: 18,
          }}
        />
      )}

      {/* BUTTON */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleViewAll}
      >
        <LinearGradient
          colors={["#D66BFF", "#7A00CC"]}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {showAll ? "VIEW LESS" : "VIEW ALL"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 24,
    padding: 18,
    overflow: "hidden",
      borderWidth: 1,
    borderColor: "#FFD86B",
    marginTop: Scale(30),
  },

  heading: {
    color: "#FFD86B",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },

  subHeading: {
    color: "#FFFFFF",
    fontSize: 12,
    textAlign: "center",
    marginTop: 6,
    opacity: 0.8,
  },

  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },

  topCard: {
    width: "31%",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD86B",
  },

  firstCard: {
    marginTop: -10,
  },

  rankText: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "900",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#FFF",
  },

  name: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 14,
  },

  amount: {
    color: "#FFE16B",
    fontWeight: "800",
    fontSize: 16,
    marginTop: 6,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#B96DFF",
  },

  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowRank: {
    color: "#FFD86B",
    fontSize: 20,
    fontWeight: "800",
    width: 35,
  },

  rowAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },

  rowName: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  rowAmount: {
    color: "#FFE16B",
    fontSize: 18,
    fontWeight: "800",
  },

  button: {
    alignSelf: "center",
    marginTop: 18,
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 40,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
  },
});

export default LeaderboardList