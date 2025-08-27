import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

interface TabItem {
  id: number | string;
  name: string;
}

interface CustomTabsProps {
  tabs: TabItem[];
  index: number;
  onIndexChange: (idx: number) => void;
  style?: any;
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs, index, onIndexChange, style }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [tabLayouts, setTabLayouts] = useState<{ x: number; width: number }[]>([]);

  useEffect(() => {
    if (tabLayouts[index] && scrollRef.current) {
      scrollRef.current.scrollTo({
        x: Math.max(tabLayouts[index].x - 50, 0), // Keep selected tab in view
        animated: true,
      });
    }
  }, [index, tabLayouts]);

  return (
    <View style={[{ backgroundColor: '#481616', }, style]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {tabs.map((tab, idx) => (
          <TouchableOpacity
            key={tab.id}
            style={{
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              borderBottomWidth: 3,
              borderBottomColor: idx === index ? '#fff' : 'transparent',
            }}
            onPress={() => onIndexChange(idx)}
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
                color:  '#fff',
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
