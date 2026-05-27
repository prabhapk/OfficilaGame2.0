import React, { useEffect } from "react";
import { View, StyleSheet,} from "react-native";
import { updatedSplashscreen } from "../../assets/assets";
import { Image } from "expo-image";
import { COLORS } from "../Constants/Theme";
import { StatusBar } from "expo-status-bar";

const SplashScreen = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("AgentTeamReport");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
     <StatusBar
  style="light"
  backgroundColor='black'
/>
      <Image 
      contentFit='fill'
      source={updatedSplashscreen} style={styles.logoImg} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  logoImg: {
    flex: 1,
    width: "100%",
  },
});


export default SplashScreen;
