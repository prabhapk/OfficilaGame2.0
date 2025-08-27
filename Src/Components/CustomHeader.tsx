import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { hIcon, homeAppIcon } from "../../assets/assets";
import Scale from "./Scale";
import { LinearGradient } from "expo-linear-gradient";
interface CountdownTimerProps {
  onLoginPress: () => void;
  onMenuPress: () => void;
  registerPress: () => void;
}

const CustomHeader: React.FC<CountdownTimerProps> = ({
  onLoginPress,
  onMenuPress,
  registerPress,
}) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.signInSlice);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={styles.menuContainer}
          onPress={() => onMenuPress()}
        >
          <Image
            source={hIcon}
            style={{ width: 30, height: 30, resizeMode: "contain" }}
          />
        </TouchableOpacity>
        <Image
          source={homeAppIcon}
          resizeMode="contain"
          style={{
            width: 100,
            marginLeft: Scale(10),
          }}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={onLoginPress} style={styles.loginButton}>
          {/* <Text>{isLoggedIn ? 'Logout' : 'Login'}</Text> */}
          <Text
            style={{
              color: "#ff5f5f",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={registerPress} style={styles.registerButton}>
          <LinearGradient
            colors={["#FF4140", "#FFAD45"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.registerGradient}
          >
            <Text style={styles.registerText}>REGISTER</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    height: 60,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginButton: {
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ff5f5f",
    borderWidth: 1,
    // marginVertical: 5,
    marginHorizontal: Scale(5),
  },
  registerButton: {
    marginHorizontal: Scale(5),
  },

  registerGradient: {
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  registerText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
});

export default CustomHeader;
