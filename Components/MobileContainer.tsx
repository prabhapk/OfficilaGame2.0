// components/MobileContainer.tsx
import React from 'react';
import {
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

export default function MobileContainer({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions();

  if (Platform.OS === 'web') {
    return (
      <View
        style={[
          styles.webWrapper,
          { minHeight: '100vh' } as any, // Web-only style
        ]}
      >
        <View
          style={[
            styles.webContainer,
            {
              width: Math.min(width, 390),
              boxShadow: '0 0 12px rgba(0,0,0,0.1)',
              borderRadius: 12,
              overflow: 'hidden',
            } as any,
          ]}
        >
          {children}
        </View>
      </View>
    );
  }

  return <View style={styles.nativeContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  webWrapper: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webContainer: {
  flex: 1,
  backgroundColor: '#fff',
  minHeight: '100vh' as any,  // ✅ instead of height
},

  nativeContainer: {
    flex: 1,
  },
});
