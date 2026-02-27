import React from 'react';
import { View, StyleSheet,Linking, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-web-swiper';
import { Image } from 'expo-image';

interface Props {
  banners: { 
    id: number; 
    name: any; 
    url: string;
  }[];
}
const handleBannerPress = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    console.warn("Cannot open URL:", url);
  }
};

const CommonBanner: React.FC<Props> = ({ banners }) => {
  return (
    <View style={styles.swiperContainer}>
      <Swiper
        controlsEnabled={false}
        loop 
        timeout={5}
        containerStyle={styles.swiperContainer1}
      >
       {banners.map((banner) => (
  <View key={banner.id} style={styles.slide}>
    <TouchableOpacity
      activeOpacity={0.9}
      style={{ width: '100%', height: '100%' }}
      onPress={() => handleBannerPress(banner.url)}
    >
      <Image
        source={banner.name}
        style={styles.bannerImage}
        contentFit="fill"
      />
    </TouchableOpacity>
  </View>
))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  swiperContainer: { 
    height: 180, 
    marginTop: 5 
  },
  swiperContainer1: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default CommonBanner;
