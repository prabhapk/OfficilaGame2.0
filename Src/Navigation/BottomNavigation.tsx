import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Platform, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { tabScreens } from "../Constants/CommonFlatlist";
import { COLORS } from "../Constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

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
    : Platform.OS === "android" 
      ? 56  // Base height without safe area padding
      : 60 + insets.bottom;

  const iconSize = isWeb
    ? isSmallScreen
      ? 20
      : isTabletScreen
      ? 22
      : isLaptopScreen
      ? 26
      : 28
    : Platform.OS === "android" ? 24 : 22; // Optimized for Android Material Design

  const fontSize = isWeb
    ? isSmallScreen
      ? 10
      : isTabletScreen
      ? 11
      : isLaptopScreen
      ? 13
      : 14
    : Platform.OS === "android" ? 12 : 11; // Optimized for Android readability

  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => (
          <LinearGradient
            colors={[COLORS.linearOne, COLORS.linearTwo]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
        // Add content padding for Android to prevent content from being hidden behind tab bar
        ...(Platform.OS === "android" ? {
          sceneContainerStyle: {
            paddingBottom: 56 + insets.bottom,
          }
        } : {}),
        tabBarStyle: {
          backgroundColor: 'transparent', // Make background transparent for gradient
          height: Platform.OS === "android" ? 60 : tabBarHeight,
          paddingBottom: 0,
          paddingTop: Platform.OS === "android" ? 0 : isWeb ? 2 : 0,
          borderTopWidth: 0,
          // Android-specific optimizations
          ...(Platform.OS === "android"
            ? {
                paddingHorizontal: 8,
                justifyContent: "space-around",
              }
            : {}),
          // Clean Android styling - minimal design
          ...(Platform.OS === "android"
            ? {
                elevation: 0,
                shadowOpacity: 0,
                borderTopWidth: 0,
              }
            : {
                elevation: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }),
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
            : {
                // Ensure proper positioning for mobile platforms
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
              }),
        },
        tabBarItemStyle: {
          paddingVertical: Platform.OS === "android" ? 8 : 0,
          paddingHorizontal: Platform.OS === "android" ? 1 : 0,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          // Android-specific tab item styling
          ...(Platform.OS === "android"
            ? {
                minHeight: 40,
                marginBottom: insets.bottom,
              }
            : {}),
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
            tabBarIcon: ({ focused }) => {
              return (
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
                    : Platform.OS === "android" ? 64 : 60,
                  height: isWeb
                    ? isSmallScreen
                      ? 35
                      : isTabletScreen
                      ? 40
                      : isLaptopScreen
                      ? 45
                      : 50
                    : Platform.OS === "android" ? 48 : 50,
                  marginTop: 0,
                  paddingHorizontal: isLaptopScreen ? 8 : 4,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  // Clean design - no background styling
                  ...(Platform.OS === "android"
                    ? {
                        paddingVertical: 4,
                        paddingHorizontal: 6,
                      }
                    : {}),
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
                    color: focused ? "#fff" :  "rgba(255, 255, 255, 0.7)",
                    marginTop: isWeb ? 1 : 1,
                    textAlign: "center",
                    fontWeight: focused ? "bold" : Platform.OS === "android" ? "400" : "normal",
                    fontSize: fontSize,
                    lineHeight: fontSize * 1.2,
                    minHeight: fontSize * 1.3,
                    maxWidth: "100%",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {tab.label}
                </Text>
                </View>
              );
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
