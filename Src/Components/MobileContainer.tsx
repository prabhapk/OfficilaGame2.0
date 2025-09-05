// components/MobileContainer.tsx
import React from "react";
import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";

export const MobileContainerContext = React.createContext<number>(414); // default iPhone width

export default function MobileContainer({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions();
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
        <View style={styles.nativeContainer}>{children}</View>
      )}
    </MobileContainerContext.Provider>
  );
}

const styles = StyleSheet.create({
  webWrapper: {
    flex: 1,
    backgroundColor: "#f2f2f2",
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
