import { View, Text, FlatList, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { chipIcon, multiUserIcon, quick3dMenu } from "../../../assets/assets";
import CommonDigits from "../../Components/CommonDigits";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useContainerScale } from "../../hooks/useContainerScale";
import { COLORS } from "../../Constants/Theme";

const LotteryScreen = () => {
  const navigation = useNavigation<any>();
  const { allGamesList } = useSelector((state: any) => state.homeSlice);
  const { Scale } = useContainerScale();
  const styles = createStyles(Scale);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* 3Digit Game header - same style as Quick3DigitsMenu */}
      <View style={styles.headerBar}>
        <Image
          source={quick3dMenu}
          style={styles.headerLogo}
          contentFit="contain"
        />
        <Text style={styles.headerTitle}>Lottery Games</Text>
        <Text style={styles.headerNumber}>179256</Text>
        <Image
          source={multiUserIcon}
          style={styles.headerPeopleIcon}
          contentFit="contain"
        />
      </View>
      <View style={styles.gameListWrap}>
        <FlatList
          data={allGamesList}
          keyExtractor={(subItem, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.gameListContent}
          renderItem={({ item }) => {
            return (
              <CommonDigits
                data={item}
                onPress3Digits={() => {
                  navigation.navigate("ThreeDigitMain", { gameData: item });
                }}
              />
            );
          }}
        />
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
    gameListWrap: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.gamesBackground,
    },
    gameListContent: {
      marginHorizontal: Scale(10),
      marginVertical: Scale(10),
    },
  });

export default LotteryScreen;
