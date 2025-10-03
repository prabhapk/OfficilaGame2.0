import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Platform, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { tabScreens } from "../Constants/CommonFlatlist";
import { COLORS } from "../Constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

  // Calculate responsive dimensions for web
  const isWeb = Platform.OS === "web";
  const isSmallScreen = screenData.width < 768;
  const isTabletScreen = screenData.width >= 768 && screenData.width < 1024;
  const isLaptopScreen = screenData.width >= 1024 && screenData.width < 1440;
  const isLargeScreen = screenData.width >= 1440;

  // Static sizes for both web and mobile
  const tabBarHeight = isWeb
    ? isSmallScreen
      ? 50
      : isTabletScreen
      ? 55
      : isLaptopScreen
      ? 60
      : 65
    : 60 + insets.bottom;

  const iconSize = isWeb
    ? isSmallScreen
      ? 20
      : isTabletScreen
      ? 22
      : isLaptopScreen
      ? 26
      : 28
    : 22;

  const fontSize = isWeb
    ? isSmallScreen
      ? 10
      : isTabletScreen
      ? 11
      : isLaptopScreen
      ? 13
      : 14
    : 11;

  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          height: tabBarHeight,
          paddingBottom:
            Platform.OS === "android" ? insets.bottom : isWeb ? 2 : 0,
          paddingTop: isWeb ? 2 : 0,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          // Web-specific styles
          ...(isWeb
            ? {
                position: "fixed" as any,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                minHeight: tabBarHeight,
                maxHeight: tabBarHeight,
                paddingHorizontal: isLaptopScreen ? 20 : 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }
            : {}),
        },
        tabBarItemStyle: {
          paddingVertical: 0,
          paddingHorizontal: 0,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
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
                  width: isWeb
                    ? isSmallScreen
                      ? 50
                      : isTabletScreen
                      ? 55
                      : isLaptopScreen
                      ? 70
                      : 80
                    : 60,
                  height: isWeb
                    ? isSmallScreen
                      ? 35
                      : isTabletScreen
                      ? 40
                      : isLaptopScreen
                      ? 45
                      : 50
                    : 50,
                  marginTop: 0,
                  paddingHorizontal: isLaptopScreen ? 8 : 4,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Image
                  source={focused ? tab.focusedIcon : tab.unfocusedIcon}
                  style={{
                    width: iconSize,
                    height: iconSize,
                    marginBottom: isWeb ? 2 : 2,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? "#fff" : "grey",
                    marginTop: isWeb ? 1 : 1,
                    textAlign: "center",
                    fontWeight: focused ? "bold" : "normal",
                    fontSize: fontSize,
                    lineHeight: fontSize * 1.1,
                    minHeight: fontSize * 1.2,
                    maxWidth: "100%",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {tab.label}
                </Text>
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
