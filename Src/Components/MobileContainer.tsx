// components/MobileContainer.tsx
import React from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const MobileContainerContext = React.createContext<number>(414); // default iPhone width

export default function MobileContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const containerWidth = Platform.OS === "web" ? Math.min(width, 450) : width;

  return (
    <MobileContainerContext.Provider value={containerWidth}>
      {Platform.OS === "web" ? (
        <View style={[styles.webWrapper, { minHeight: "100vh" } as any]}>
          <View
            style={[
              styles.webContainer,
              {
                width: containerWidth,
                boxShadow: "0 0 12px rgba(0,0,0,0.1)",
                borderRadius: 12,
                overflow: "hidden",
              } as any,
            ]}
          >
            {children}
          </View>
        </View>
      ) : (
        <SafeAreaView style={[styles.nativeContainer, { paddingTop: Platform.OS === 'android' ? insets.top : 0, paddingBottom: Platform.OS === 'android' ? insets.bottom : 0 }]}>
          {children}
        </SafeAreaView>
      )}
    </MobileContainerContext.Provider>
  );
}

const styles = StyleSheet.create({
  webWrapper: {
    flex: 1,
    backgroundColor: "#250f0fff",
    alignItems: "center",
    justifyContent: "center",
  },
  webContainer: {
    flex: 1,
    backgroundColor: "#fff",
    minHeight: "100vh" as any,
  },
  nativeContainer: {
    flex: 1,
  },
});
