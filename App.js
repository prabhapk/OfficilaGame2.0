import { StyleSheet, Text, View } from "react-native";
import MobileContainer from "./Src/Components/MobileContainer";
import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from "./Src/Screens/DetailsScreen";
import HomeScreen from "./Src/Screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MobileContainer>
     <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </MobileContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
