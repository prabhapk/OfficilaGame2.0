import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  View,
  Platform,
} from "react-native";
import { gameTypeAct } from "../../assets/assets";
import { Image } from "expo-image";
import { useContainerScale } from "../hooks/useContainerScale";

interface HeaderProps {
  onPress: () => void;
  headerList: any[];
  selectedId: number;
  onSelect: (id: number) => void;
}

const HomeScreenGameHeaders: React.FC<HeaderProps> = ({
  headerList,
  selectedId,
  onSelect,
}) => {
  const { Scale, verticalScale } = useContainerScale();

  return (
    <View
      style={{
        paddingHorizontal: Scale(10),
        paddingVertical: Scale(10),
      }}
    >
      <FlatList
        contentContainerStyle={{ alignItems: "center", gap: Scale(10) }}
        data={headerList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedId;

          return (
            <TouchableOpacity
              onPress={() => onSelect(item.id)}
              activeOpacity={0.8}
              style={styles.itemWrapper}
            >
              <ImageBackground
                source={isSelected ? gameTypeAct : undefined}
                style={{
                  width: Scale(75),
                  height: verticalScale(115),
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                  overflow: Platform.OS === "web" ? "hidden" : "visible",
                }}
                resizeMode="cover"
              >
                <Image
                  source={item.image}
                  style={{
                    width: Scale(70),
                    height: Scale(80),
                    resizeMode: "cover",
                  }}
                  contentFit="contain"
                />
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreenGameHeaders;
