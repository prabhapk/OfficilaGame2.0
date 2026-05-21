import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { useContainerScale } from "../hooks/useContainerScale";
import React from "react";
import { Image } from "expo-image";

interface customHeaderProps {
  leftIconPress: (event: GestureResponderEvent) => void;
  rightIconPress: (event: GestureResponderEvent) => void;
  leftIcon?: Image;
  rightIcon?: Image;
  centerText?: string;
}

const CustomHeaderRegister: React.FC<customHeaderProps> = ({
  leftIconPress,
  rightIconPress,
  leftIcon,
  rightIcon,
  centerText,
}) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchableStyle} onPress={leftIconPress}>
        <Image
          source={leftIcon}
          style={styles.leftIconStyle}
          contentFit="contain"
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.centerTextStyle}>{centerText}</Text>
      </View>
      <TouchableOpacity
        onPress={rightIconPress}
        style={styles.rightIconTouchable}
      >
        <Image
          source={rightIcon}
          contentFit="contain"
          style={styles.rightIconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      alignItems: "center",
      backgroundColor: "transparent",
    },
    menuContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    touchableStyle: {
      marginHorizontal: Scale(10),
    },
    leftIconStyle: {
      width: Scale(30),
      height: Scale(50),
    },
    rightIconStyle: {
      width: Scale(30),
      height: Scale(30),
    },
    centerTextStyle: {
      fontSize: Scale(22),
      color: "black",
      fontWeight: "bold",
      right: Scale(20),
    },
    rightIconTouchable: {
      marginHorizontal: Scale(10),
    },
  });

export default CustomHeaderRegister;
