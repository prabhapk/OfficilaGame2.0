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

/* -------------------------------------------------------------------------- */
/*                                  AVATARS                                   */
/* -------------------------------------------------------------------------- */

const maleAvatar =
  "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png";

const femaleAvatar =
  "https://t4.ftcdn.net/jpg/09/61/69/75/360_F_961697523_EFd1m8P4tdcwB0TYvlQAagqKR1xHSuwk.jpg";

/* -------------------------------------------------------------------------- */
/*                                   USERS                                    */
/* -------------------------------------------------------------------------- */

const users = [
  { name: "Rahul", gender: "male" },
  { name: "Arun", gender: "male" },
  { name: "Karthik", gender: "male" },
  { name: "Vijay", gender: "male" },
  { name: "Ajith", gender: "male" },
  { name: "Suresh", gender: "male" },
  { name: "Mani", gender: "male" },
  { name: "Yuvi", gender: "male" },
  { name: "Harish", gender: "male" },
  { name: "Ravi", gender: "male" },
  { name: "Sanjay", gender: "male" },
  { name: "Kumar", gender: "male" },

  { name: "Priya", gender: "female" },
  { name: "Meera", gender: "female" },
  { name: "Anjali", gender: "female" },
  { name: "Deepa", gender: "female" },
  { name: "Kavya", gender: "female" },
  { name: "Nisha", gender: "female" },
  { name: "Divya", gender: "female" },
  { name: "Sneha", gender: "female" },
  { name: "Keerthi", gender: "female" },
  { name: "Swathi", gender: "female" },
  { name: "Ramya", gender: "female" },
  { name: "Pooja", gender: "female" },
];

/* -------------------------------------------------------------------------- */
/*                        DAILY RANDOM LEADERBOARD DATA                       */
/* -------------------------------------------------------------------------- */

const generateLeaderboard = () => {
  const today = new Date().getDate();

  const shuffledUsers = [...users].sort((a, b) => {
    return (
      (a.name.charCodeAt(0) + today) % 10 -
      ((b.name.charCodeAt(0) + today) % 10)
    );
  });

  const selectedUsers = shuffledUsers.slice(0, 10);

  const leaderboard = selectedUsers.map((user, index) => {
    const amount =
      Math.floor(Math.random() * 90000) + 15000;

    return {
      id: `${index + 1}`,
      rank: index + 1,
      name: user.name,
      gender: user.gender,
      amount,
      image:
        user.gender === "male"
          ? maleAvatar
          : femaleAvatar,
    };
  });

  leaderboard.sort((a, b) => b.amount - a.amount);

  return leaderboard.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));
};

const LeaderboardList = () => {
  const [showAll, setShowAll] = useState(false);

  const leaderboardData = useMemo(
    () => generateLeaderboard(),
    []
  );

  const topThree = useMemo(
    () => leaderboardData.slice(0, 3),
    [leaderboardData]
  );

  const remainingUsers = useMemo(
    () => leaderboardData.slice(3),
    [leaderboardData]
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
          ₹{item.amount.toLocaleString("en-IN")}
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
        ₹{item.amount.toLocaleString("en-IN")}
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

      {/* USER LIST */}

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

export default LeaderboardList;