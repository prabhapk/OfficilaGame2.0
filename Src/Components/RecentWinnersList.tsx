import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const winnersData = [
  {
    id: "1",
    name: "Arun",
    amount: "₹12,500",
    game: "Lucky 7",
    image: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
  {
    id: "2",
    name: "Meena",
    amount: "₹8,300",
    game: "Dragon Tiger",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPx5Ngn3BqU_b1o4MO5-90QnJXVEdVLYmaA&s",
  },
  {
    id: "3",
    name: "Suresh",
    amount: "₹25,000",
    game: "Teen Patti",
    image: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
  {
    id: "4",
    name: "Divya",
    amount: "₹7,800",
    game: "Poker",
    image: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
  {
    id: "5",
    name: "Vikram",
    amount: "₹15,300",
    game: "Andar Bahar",
    image: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
  {
    id: "6",
    name: "Karan",
    amount: "₹31,000",
    game: "Rummy",
    image: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
  {
    id: "7",
    name: "Anjali",
    amount: "₹18,500",
    game: "Roulette",
    image: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
  },
];

const RecentWinnersList = () => {
  const [expanded, setExpanded] = useState(false);

  const initialUsers = useMemo(
    () => winnersData.slice(0, 5),
    []
  );

  const remainingUsers = useMemo(
    () => winnersData.slice(5),
    []
  );

  const toggleViewAll = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );
    setExpanded(!expanded);
  };

  const renderWinnerCard = (item: any) => {
    return (
      <LinearGradient
        colors={["#24003D", "#120020"]}
        style={styles.card}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.avatar}
        />

        <View style={{ marginLeft: 8 }}>
          <Text style={styles.name}>
            {item.name}
          </Text>

          <Text style={styles.gameName}>
            {item.game}
          </Text>

          {/* <Text style={styles.wonText}>
            won
          </Text> */}

          <Text style={styles.amount}>
            {item.amount}
          </Text>
        </View>
      </LinearGradient>
    );
  };

  return (
    <View>
      {/* TOP BAR */}
      <LinearGradient
        colors={["#2C004D", "#140020"]}
        style={styles.container}
      >
        {/* LEFT TITLE */}
        <View style={styles.liveContainer}>
          <Text style={styles.liveText}>
            LIVE
          </Text>

          <Text style={styles.winnerText}>
            WINNERS
          </Text>
        </View>

        {/* USERS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingRight: 10,
          }}
        >
          {initialUsers.map((item) => (
            <View key={item.id}>
              {renderWinnerCard(item)}
            </View>
          ))}

          {/* VIEW ALL BUTTON */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleViewAll}
            style={styles.viewAllButton}
          >
            <Text style={styles.viewAllText}>
              {expanded
                ? "VIEW LESS"
                : "VIEW ALL"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>

      {/* EXPANDED USERS */}
      {expanded && (
        <FlatList
          data={remainingUsers}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{
            paddingHorizontal: 12,
            marginTop: 10,
          }}
          renderItem={({ item }) => (
            <LinearGradient
              colors={["#3A005D", "#180026"]}
              style={styles.expandedCard}
            >
              <View style={styles.row}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.expandedAvatar}
                />

                <View style={{ flex: 1 }}>
                  <Text style={styles.expandedName}>
                    {item.name}
                  </Text>

                  <Text
                    style={styles.expandedGame}
                  >
                    {item.game}
                  </Text>
                </View>

                <View>
                  <Text
                    style={
                      styles.expandedWon
                    }
                  >
                    Won
                  </Text>

                  <Text
                    style={
                      styles.expandedAmount
                    }
                  >
                    {item.amount}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          )}
        />
      )}
    </View>
  );
};

export default RecentWinnersList;

const styles = StyleSheet.create({
  container: {
    margin: 12,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#B300FF",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  liveContainer: {
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  liveText: {
    color: "#FFEB3B",
    fontSize: 16,
    fontWeight: "900",
  },

  winnerText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#6820A8",
    minWidth: 140,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "#FFD700",
  },

  name: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  gameName: {
    color: "#C98FFF",
    fontSize: 11,
    marginTop: 1,
  },

  wonText: {
    color: "#FFFFFF",
    fontSize: 11,
    marginTop: 2,
  },

  amount: {
    color: "#FFD54F",
    fontSize: 15,
    fontWeight: "800",
  },

  viewAllButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: "#7B1FFF",
    marginRight: 12,
  },

  viewAllText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 13,
  },

  expandedCard: {
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#7B1FFF",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  expandedAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#FFD54F",
  },

  expandedName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  expandedGame: {
    color: "#C98FFF",
    marginTop: 4,
    fontSize: 13,
  },

  expandedWon: {
    color: "#FFFFFF",
    textAlign: "right",
    fontSize: 12,
  },

  expandedAmount: {
    color: "#FFD54F",
    fontWeight: "800",
    fontSize: 18,
    marginTop: 4,
  },
});
