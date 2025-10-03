import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import { chipIcon, lotteryHeader } from "../../../assets/assets";
import { ThreeDigitsLottery } from "../../Constants/CommonFlatlist";
import CommonDigits from "../../Components/CommonDigits";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useContainerScale } from "../../hooks/useContainerScale";

const LotteryScreen = () => {
  const navigation = useNavigation();
  const { allGamesList } = useSelector((state: any) => state.homeSlice);
  const { Scale, verticalScale } = useContainerScale();
  return (
    <ScrollView>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={lotteryHeader}
          style={{ width: 150, height: 30 }}
          contentFit="contain"
        />

        <FlatList
          data={ThreeDigitsLottery}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "center",
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Quick3DScreen", { gameData: item });
                }}
              >
                <Image
                  source={item.image}
                  style={{ width: Scale(70), height: Scale(80) }}
                  contentFit="contain"
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopColor: "yellow",
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: Scale(20),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: Scale(10),
          }}
        >
          <Image
            source={chipIcon}
            style={{ width: Scale(25), height: Scale(25) }}
            contentFit="contain"
          />
          <Text
            style={{ fontSize: Scale(16), fontWeight: "bold", color: "white" }}
          >
            3 Digit Games
          </Text>
        </View>
        <FlatList
          data={allGamesList}
          keyExtractor={(subItem, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={{
            marginHorizontal: Scale(10),
            marginVertical: Scale(10),
          }}
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

export default LotteryScreen;
