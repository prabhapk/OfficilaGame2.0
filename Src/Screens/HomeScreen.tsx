import React from "react";
import { Button, Text, View } from "react-native";

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate("Details");
        }}
      />
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
