import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  NativeModules,
} from "react-native";
import React, { useEffect, useMemo, useRef } from "react";

// Defer requiring the SDK to runtime to avoid crashes when native module isn't loaded (e.g., Expo Go)
const hasNativeFreshchat = Boolean((NativeModules as any)?.RNFreshchatSdk);
const FreshchatRef = { current: null as any };
let freshchatConfig: any = null;
if (hasNativeFreshchat) {
  const { Freshchat, FreshchatConfig } = require("react-native-freshchat-sdk");
  FreshchatRef.current = Freshchat;
  freshchatConfig = new FreshchatConfig(
    "e0bae991-98a0-457d-a501-1015d6d9734e",
    "c73a6bd8-73dc-4cf0-a1cf-04a657c94d70"
  );
  freshchatConfig.domain = "msdk.me.freshchat.com";
}
const App = () => {
  useEffect(() => {
    if (hasNativeFreshchat && freshchatConfig && FreshchatRef.current) {
      try {
        FreshchatRef.current.init(freshchatConfig);
      } catch (e) {}
    }
  }, []);

  const openFreshchat = () => {
    console.log('openFreshchat', hasNativeFreshchat, FreshchatRef.current);
    if (hasNativeFreshchat && FreshchatRef.current) {
      FreshchatRef.current.showConversations();
    }
  };

  return (
    <View style={styles.container}>
      <Text>App</Text>
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={openFreshchat}
      >
        <Text style={styles.fabText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 24,
    height: 56,
    minWidth: 56,
    paddingHorizontal: 16,
    borderRadius: 28,
    backgroundColor: "#0A84FF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999,
  },
  fabText: { color: "#fff", fontWeight: "600" },
});
