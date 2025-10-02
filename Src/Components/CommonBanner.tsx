import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-web-swiper';

interface Props {
  banners: { id: number; name: any }[]; // Ensure proper type for banners
}

const CommonBanner: React.FC<Props> = ({ banners }) => {
  return (
    <View style={styles.swiperContainer}>
      <Swiper
        controlsEnabled={false} // Disables pagination dots and navigation buttons
        loop // Enables continuous loop mode
        timeout={5} // Sets autoplay interval to 10 seconds
        containerStyle={styles.swiperContainer1}
      >
        {banners.map((banner) => (
          <View key={banner.id} style={styles.slide}>
            <Image source={banner.name} style={styles.bannerImage} resizeMode="stretch" />
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
