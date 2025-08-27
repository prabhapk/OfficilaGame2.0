import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gift, Home, HelpCircle, Grid } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const height = 70;

const CurvedBottomBar = ({ state, descriptors, navigation }:any) => {
  const insets = useSafeAreaInsets();

  const tabIcons = [<Grid />, <HelpCircle />, <Gift color="white" />, <HelpCircle />, <Grid />];

  return (
    <View style={{ position: 'absolute', bottom: 0, width, height: height + insets.bottom }}>
      <Svg width={width} height={height + 20} style={{ position: 'absolute', bottom: 0 }}>
        <Path
          d={`
            M0 0
            H${width / 2 - 40}
            C${width / 2 - 20} 0, ${width / 2 - 20} 70, ${width / 2} 70
            C${width / 2 + 20} 70, ${width / 2 + 20} 0, ${width / 2 + 40} 0
            H${width}
            V${height}
            H0
            Z
          `}
          fill="#f57c00"
        />
      </Svg>

      <View style={styles.tabContainer}>
        {state.routes.map((route: { name: any; key: React.Key | null | undefined; }, index: number) => {
          const isFocused = state.index === index;
          const onPress = () => navigation.navigate(route.name);

          const isMiddle = index === 2;
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[
                styles.tabButton,
                isMiddle && styles.middleButton,
              ]}
            >
              {React.cloneElement(tabIcons[index], {
                size: isMiddle ? 30 : 24,
                color: isFocused ? '#fff' : isMiddle ? '#fff' : '#333',
              })}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    height,
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  middleButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: -30,
    backgroundColor: '#f57c00',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default CurvedBottomBar;
