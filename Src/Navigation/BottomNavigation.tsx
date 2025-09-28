import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Platform, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import React from "react";
import { tabScreens } from "../Constants/CommonFlatlist";
import { COLORS } from "../Constants/Theme";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          height: Platform.OS === "web" ? scale(40) : scale(60) + insets.bottom,
          paddingBottom: Platform.OS === "android" ? insets.bottom : 0,
        },
        tabBarItemStyle: {
          paddingVertical: verticalScale(2),
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
                  width: Platform.OS === "web" ? scale(40) : scale(60),
                  marginTop: scale(10),
                }}
              >
                <Image
                  source={focused ? tab.focusedIcon : tab.unfocusedIcon}
                  style={{
                    width: scale(22),
                    height: scale(22),
                    marginTop: Platform.OS === "web" ? scale(10) : scale(0),
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: focused ? "#fff" : "grey",
                    marginTop: verticalScale(3),
                    textAlign: "center",
                    fontWeight: focused ? "bold" : "normal",
                    fontSize: moderateScale(11),
                  }}
                  numberOfLines={1} // truncate if too long
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
