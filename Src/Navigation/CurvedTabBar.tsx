import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../Constants/Theme";

const { width } = Dimensions.get("window");

const TAB_BAR_HEIGHT = 70;
const CENTER_BUTTON_SIZE = 72;
const CURVE_WIDTH = 90;
const CURVE_HEIGHT = 30;


export default function CurvedTabBar({
  state,
  descriptors,
  navigation,
  iconSize = 24,
  fontSize = 11,
  insets,
}) {
    const [layoutWidth, setLayoutWidth] = React.useState(width);
  return (
    <View 
    style={[styles.container, { paddingBottom: insets?.bottom || 0 }]}
    onLayout={(e) => setLayoutWidth(e.nativeEvent.layout.width)}
    >
      {/* Background Curve */}
      <Svg
        width={layoutWidth}
        height={TAB_BAR_HEIGHT}
        style={styles.svg}
      >
        <Path
          d={`
            M0 0
            H${layoutWidth / 2 - CURVE_WIDTH}
            C${layoutWidth / 2 - 35} 0,
             ${layoutWidth / 2 - 35} ${CURVE_HEIGHT},
             ${layoutWidth / 2} ${CURVE_HEIGHT}
            C${layoutWidth / 2 + 35} ${CURVE_HEIGHT},
             ${layoutWidth / 2 + 35} 0,
             ${layoutWidth / 2 + CURVE_WIDTH} 0
            H${layoutWidth}
            V${TAB_BAR_HEIGHT}
            H0
            Z
          `}
          fill={COLORS.primary}
        />
      </Svg>

      {/* Tabs */}
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const isCenter = route.name === "Invite";

          if (isCenter) {
            return (
              <View
                key={route.key}
                style={{ width: CENTER_BUTTON_SIZE }}
                pointerEvents="none"
              />
            );
          }
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.8}
              style={styles.tabItem}
            >
              {options.tabBarIcon?.({
                focused: isFocused,
                color: isFocused ? "#2979FF" : "#999",
                size: iconSize,
              })}

              <Text
                style={[
                  styles.label,
                  {
                    fontSize,
                    color: isFocused ? "#2979FF" : "#999",
                  },
                ]}
                numberOfLines={1}
              >
                {options.title || route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Center Invite Button */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate("Invite")}
        style={styles.centerButton}
      >
        {descriptors[
          state.routes.find((r) => r.name === "Invite")?.key
        ]?.options?.tabBarIcon?.({
          focused: state.routes[state.index].name === "Invite",
          color: "#fff",
          size: 50,
        })}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: TAB_BAR_HEIGHT + CURVE_HEIGHT,
    // backgroundColor: COLORS.test,
    backgroundColor: 'transparent'
    
  },
  svg: {
    position: "absolute",
    bottom: 0,
  },
  row: {
    flexDirection: "row",
    height: TAB_BAR_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
   top: Platform.OS === 'android' ? CURVE_HEIGHT / 1 : CURVE_HEIGHT / 1.1, // 🔑 KEY FIX
  },
  label: {
    marginTop: 1,
    textAlign: "center",
    lineHeight: 13,
    fontWeight: Platform.OS === "android" ? "500" : "400",
  },
  centerButton: {
    position: "absolute",
    top: -(CENTER_BUTTON_SIZE / 2 - CURVE_HEIGHT / 2),
    alignSelf: "center",
    width: CENTER_BUTTON_SIZE,
    height: CENTER_BUTTON_SIZE,
    borderRadius: CENTER_BUTTON_SIZE / 2,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
});
