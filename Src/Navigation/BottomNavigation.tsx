import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Platform, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { tabScreens } from "../Constants/CommonFlatlist";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CurvedTabBar from "./CurvedTabBar";

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  const insets = useSafeAreaInsets();
  const [screenData, setScreenData] = useState(Dimensions.get("window"));

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenData(window);
    });
    return () => subscription?.remove();
  }, []);

  const isWeb = Platform.OS === "web";
  const isSmallScreen = screenData.width < 768;
  const isTabletScreen = screenData.width >= 768 && screenData.width < 1024;
  const isLaptopScreen = screenData.width >= 1024 && screenData.width < 1440;

  const iconSize = isWeb
    ? isSmallScreen
      ? 20
      : isTabletScreen
      ? 22
      : isLaptopScreen
      ? 26
      : 28
    : Platform.OS === "android"
    ? 24
    : 22;

  const fontSize = isWeb
    ? isSmallScreen
      ? 10
      : isTabletScreen
      ? 11
      : isLaptopScreen
      ? 13
      : 14
    : Platform.OS === "android"
    ? 12
    : 11;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,

        // IMPORTANT: remove all tabBarStyle & background logic
        sceneContainerStyle:
          Platform.OS === "android"
            ? { paddingBottom: 70 + insets.bottom }
            : undefined,
      }}
      tabBar={(props) => (
        <CurvedTabBar
          {...props}
          iconSize={iconSize}
          fontSize={fontSize}
          insets={insets}
          isWeb={isWeb}
          isSmallScreen={isSmallScreen}
          isTabletScreen={isTabletScreen}
          isLaptopScreen={isLaptopScreen}
        />
      )}
    >
      {tabScreens.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarShowLabel: false,

            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={focused ? tab.focusedIcon : tab.unfocusedIcon}
                  style={{
                    width: iconSize,
                    height: iconSize,
                    marginBottom: 2,
                  }}
                  resizeMode="contain"
                />

                {/* <Text
                  style={{
                    color: focused ? "#2979FF" : "#999",
                    fontSize,
                    fontWeight: focused ? "600" : "400",
                    textAlign: "center",
                  }}
                  numberOfLines={1}
                >
                  {tab.label}
                </Text> */}
              </View>
            ),
            title: tab.label,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
