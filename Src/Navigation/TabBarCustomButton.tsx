import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../Constants/Theme";

type Props = {
  accessibilityState?: { selected?: boolean };
  children: React.ReactNode;
  onPress?: () => void;
  label: string;
};

export const TabBarCustomButton = ({
  accessibilityState,
  children,
  onPress,
  label,
}: Props) => {
  const isSelected = accessibilityState?.selected ?? false;

  if (isSelected) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* Curved notch */}
        <View style={{ flexDirection: "row", position: "absolute", top: 0 }}>
          <View style={{ flex: 1, backgroundColor: "#fff" }} />
          <Svg width={70} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1z"
              fill="#fff"
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: "#fff" }} />
        </View>

        {/* Floating icon */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={{
            top: -22,
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </TouchableOpacity>

        {/* Label */}
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: COLORS.primary,
            position: "absolute",
            bottom: 6,
          }}
        >
          {label}
        </Text>
      </View>
    );
  }

  // Inactive tab
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 60,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
      activeOpacity={1}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};
