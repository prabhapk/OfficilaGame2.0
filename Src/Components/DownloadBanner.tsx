import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../Constants/Theme';
import { useContainerScale } from '../hooks/useContainerScale';
import { annaiIcon } from '../../assets/assets';
import { Image } from 'expo-image';

interface DownloadBannerProps {
  onClose?: () => void;
}

const DownloadBanner: React.FC<DownloadBannerProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale, verticalScale);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  // const handleDownload = async () => {
  //   // APK download URL - you can update this later
  //   const downloadUrl = 'https://expo.dev/artifacts/eas/nWTKeCvNAj13jWFXUUH6K8.apk';
    
  //   try {
  //     if (Platform.OS === 'web') {
  //       // Check if it's a mobile browser
  //       const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
  //       if (isMobile) {
  //         // For mobile browsers, open in new tab
  //         window.open(downloadUrl, '_blank');
  //       } else {
  //         // For desktop browsers, trigger direct download
  //         const link = document.createElement('a');
  //         link.href = downloadUrl;
  //         link.download = 'AnnaiLotteryApp.apk'; // Set the filename
  //         link.target = '_blank';
  //         document.body.appendChild(link);
  //         link.click();
  //         document.body.removeChild(link);
  //       }
  //     } else {
  //       // For React Native mobile apps (if needed)
  //       const supported = await Linking.canOpenURL(downloadUrl);
  //       if (supported) {
  //         await Linking.openURL(downloadUrl);
  //       } else {
  //         console.log('Cannot open URL:', downloadUrl);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Download failed:', error);
  //     // Fallback: open URL in new tab
  //     if (Platform.OS === 'web') {
  //       window.open(downloadUrl, '_blank');
  //     }
  //   }
  // };
  
  const handleDownload = () => {
    const downloadUrl = 'https://expo.dev/artifacts/eas/nWTKeCvNAj13jWFXUUH6K8.apk';
  
    if (Platform.OS === 'web') {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'AnnaiLotteryApp.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      Linking.openURL(downloadUrl);
    }
  };

  // Only show on web platform
  if (Platform.OS !== 'web' || !isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#8B5CF6', '#7C3AED']} // Purple gradient similar to reference
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        {/* Shield Icon */}
        <View style={styles.shieldContainer}>
          <View style={styles.shield}>
           <Image source={annaiIcon} style={styles.shield} />
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Annai Lottery APP</Text>
          <Text style={styles.subtitle}>Unleash Your Luck, Embrace Big Wins</Text>
        </View>

        {/* Download Button */}
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
          <Text style={styles.downloadText}>DOWNLOAD</Text>
        </TouchableOpacity>

        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const createStyles = (Scale: any, verticalScale: any) =>
  StyleSheet.create({
    container: {
      marginHorizontal: Scale(10),
      marginVertical: verticalScale(5),
      borderRadius: Scale(8),
      overflow: 'hidden',
    },
    gradientContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: verticalScale(12),
      paddingHorizontal: Scale(16),
      borderRadius: Scale(8),
    },
    shieldContainer: {
      marginRight: Scale(12),
    },
    shield: {
      width: Scale(40),
      height: Scale(40),
      backgroundColor: '#10B981', // Green color
      borderRadius: Scale(8),
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    shieldText: {
      color: 'white',
      fontSize: Scale(14),
      fontWeight: 'bold',
    },
    crown: {
      position: 'absolute',
      top: -Scale(4),
      width: Scale(12),
      height: Scale(8),
      backgroundColor: '#F59E0B', // Gold color
      borderRadius: Scale(2),
    },
    contentContainer: {
      flex: 1,
      marginRight: Scale(12),
    },
    title: {
      color: 'white',
      fontSize: Scale(16),
      fontWeight: 'bold',
      marginBottom: verticalScale(2),
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: Scale(12),
    },
    downloadButton: {
      backgroundColor: '#3B82F6', // Blue color
      paddingVertical: verticalScale(8),
      paddingHorizontal: Scale(16),
      borderRadius: Scale(20),
      marginRight: Scale(8),
    },
    downloadText: {
      color: 'white',
      fontSize: Scale(12),
      fontWeight: 'bold',
    },
    closeButton: {
      width: Scale(24),
      height: Scale(24),
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeText: {
      color: 'white',
      fontSize: Scale(18),
      fontWeight: 'bold',
    },
  });

export default DownloadBanner;
