import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { useContainerScale } from '../hooks/useContainerScale';
import { COLORS } from '../Constants/Theme';

interface TabItem {
  id: number | string;
  name: string;
}

interface CustomTabsProps {
  tabs: TabItem[];
  index: number;
  onIndexChange: (idx: number) => void;
  style?: any;
  onSelectGroupId?: (groupId: string) => void;
  /** When true, use dark text and purple accent (for light backgrounds) */
  lightTheme?: boolean;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  index,
  onIndexChange,
  style,
  onSelectGroupId,
  lightTheme = false,
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const [tabLayouts, setTabLayouts] = useState<{ x: number; width: number }[]>([]);
  const { Scale } = useContainerScale();

  const textColor = lightTheme ? COLORS.sectionHeaderText : '#fff';
  const borderColor = lightTheme ? COLORS.check : '#fff';

  useEffect(() => {
    if (tabLayouts[index] && scrollRef.current) {
      scrollRef.current.scrollTo({
        x: Math.max(tabLayouts[index].x - 50, 0),
        animated: true,
      });
    }
  }, [index, tabLayouts]);

  return (
    <View style={[{ backgroundColor: lightTheme ? COLORS.sectionHeaderBg : COLORS.primary }, style]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {tabs.map((tab: any, idx) => (
          <TouchableOpacity
            key={tab.id}
            style={{
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              borderBottomWidth: 3,
              borderBottomColor: idx === index ? borderColor : 'transparent',
            }}
            onPress={() => {
              onIndexChange(idx);
              onSelectGroupId?.(tab?.groupId);
            }}
            onLayout={(e) => {
              const { x, width } = e.nativeEvent.layout;
              setTabLayouts((prev) => {
                const updated = [...prev];
                updated[idx] = { x, width };
                return updated;
              });
            }}
          >
            <Text
              style={{
                color: textColor,
                fontWeight: idx === index ? '700' : '500',
              }}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CustomTabs;
