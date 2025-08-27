import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

interface Props {
  banners: { id: number; name: any }[]; // Ensure proper type for banners
}

const CommonBanner: React.FC<Props> = ({ banners }) => {
  return (
    <View style={styles.swiperContainer}>
      <Swiper
        autoplay
        autoplayTimeout={3}
        showsPagination
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        containerStyle={styles.swiperContainer1}>
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
  swiperContainer: { height: 180, marginTop: 20 },
  dot: {
    backgroundColor: '#ccc',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    top: 10,
  },
  activeDot: {
    backgroundColor: '#ff5aaf',
    width: 30,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 3,
    top: 10,
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
