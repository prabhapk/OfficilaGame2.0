import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useContainerScale } from '../hooks/useContainerScale';
import { COLORS } from '../Constants/Theme';

interface HeaderProps {
  onPress?: () => void;
  headerList: { id: number; name: string; image: any }[];
  selectedId: number;
  onSelect: (id: number) => void;
}

const HomeScreenGameHeaders: React.FC<HeaderProps> = ({
  headerList,
  selectedId,
  onSelect,
}) => {
  const { Scale } = useContainerScale();
  const styles = createStyles(Scale);

  return (
    <View style={styles.listContent}>
      {headerList.map((item) => {
        const isSelected = item.id === selectedId;

        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.tab,
              isSelected && styles.tabSelected,
            ]}
            onPress={() => onSelect(item.id)}
            activeOpacity={0.8}
          >
            <Image
              source={item.image}
              style={styles.icon}
              contentFit="fill"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const createStyles = (Scale: (n: number) => number) =>
  StyleSheet.create({
    listContent: {
      paddingHorizontal: Scale(12),
      paddingVertical: Scale(10),
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: Scale(20),
    },

    tab: {
    flex: 1,
      height: Scale(130),
      overflow: "hidden",
      marginHorizontal: Scale(4),
      borderWidth: 1,
      borderColor: 'transparent',
      borderRadius: Scale(12),
    },

    tabSelected: {
      borderColor: COLORS.winningsPillGoldBg,
    },

    icon: {
      width: '100%',
      height: Scale(130),
      // height: '100%',
      bottom: Scale(1),
    },
  });

export default HomeScreenGameHeaders;
