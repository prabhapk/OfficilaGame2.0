import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
            style={[styles.tab, isSelected && styles.tabSelected]}
            onPress={() => onSelect(item.id)}
            activeOpacity={0.8}
          >
           
              <Image
                source={item.image}
                style={styles.icon}
                contentFit="contain"
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
    },
    tab: {
      flex: 1,
      backgroundColor: COLORS.tabInactiveBg,
      borderRadius: Scale(12),
      paddingVertical: Scale(10),
      paddingHorizontal: Scale(6),
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: Scale(4),
      borderWidth: 1,
      borderColor: COLORS.tabInactiveBorder,
    },
    tabSelected: {
      backgroundColor: COLORS.tabActiveBg,
      borderColor: COLORS.tabActiveBg,
    },
    iconWrap: {
      width: Scale(56),
      height: Scale(56),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Scale(4),
    },
    icon: {
      width: Scale(54),
      height: Scale(54),
    },
    label: {
      fontSize: Scale(12),
      fontWeight: '600',
      color: COLORS.tabInactiveText,
    },
    labelSelected: {
      color: COLORS.tabActiveText,
    },
  });

export default HomeScreenGameHeaders;
