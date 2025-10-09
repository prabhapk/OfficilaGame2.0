import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useContainerScale } from '../hooks/useContainerScale';
import { COLORS } from '../Constants/Theme';

type VipCardProps = {
  headerText: string;
  bottomText: string;
  badgeImage: any;
};

const VipCard = ({headerText, bottomText, badgeImage}: VipCardProps) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.linearOne, COLORS.linearTwo]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.walletCard}>
        {/* Header */}
        <View style={styles.rowHeader}>
          <View style={styles.headerLeft}>
            <Text style={styles.walletTitle}>{headerText}</Text>
            <View style={styles.toBeFinishedContainer}>
              <Text style={styles.toBeFinishedText}>To be Finished</Text>
            </View>
          </View>
          <Image 
          resizeMode='contain'
          source={badgeImage} style={styles.badgeImage} />
        </View>

        {/* Amount Status */}
        <LinearGradient
          colors={['#edf0f2', '#bdbebf']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0.5}}
          style={styles.walletRow}>
          <Text style={styles.walletSub}>₹0/₹300(V1)</Text>
        </LinearGradient>

        {/* Level Dots */}
        <View style={styles.vipLevelRow}>
          <View style={styles.vipDot}>
            <Text style={styles.vipDotText}>V0</Text>
          </View>
          <View style={styles.vipDot}>
            <Text style={styles.vipDotText}>V1</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBar} />

        {/* Bottom Text */}
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>{bottomText}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};
const createStyles = (Scale: any) =>
  StyleSheet.create({
    container: {
      marginTop: Scale(20),
      marginHorizontal: Scale(10),
    },
    walletCard: {
      borderRadius: Scale(12),
      paddingVertical: Scale(10),
    },
    rowHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: Scale(20),
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    walletTitle: {
      color: '#fff',
      fontSize: Scale(18),
      fontWeight: 'bold',
    },
    toBeFinishedContainer: {
      backgroundColor: 'transparent',
      borderRadius: Scale(16),
      borderColor: 'white',
      borderWidth: Scale(1),
      marginLeft: Scale(20),
      paddingVertical: Scale(5),
      paddingHorizontal: Scale(5),
    },
    toBeFinishedText: {
      fontSize: Scale(12),
      fontWeight: 'bold',
      color: '#fff',
    },
    badgeImage: {
      width: Scale(60),
      height: Scale(60),
      marginHorizontal: Scale(5),
      marginVertical: Scale(10),
    },
    walletRow: {
      borderRadius: Scale(8),
      marginTop: Scale(10),
      padding: Scale(8),
      marginHorizontal: Scale(20),
    //   alignItems: 'center',
    },
    walletSub: {
      fontSize: Scale(14),
      fontWeight: '600',
      color: '#000',
    },
    vipLevelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: Scale(20),
      marginTop: Scale(10),
    },
    vipDot: {
      backgroundColor: '#851701',
      width: Scale(20),
      height: Scale(20),
      borderRadius: Scale(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
    vipDotText: {
      fontSize: Scale(12),
      fontWeight: 'bold',
      color: '#fff',
    },
    progressBar: {
      width: '88%',
      height: Scale(5),
      backgroundColor: '#fff',
      borderRadius: Scale(5),
      marginTop: Scale(10),
      alignSelf: 'center',
    },
    bottomTextContainer: {
      marginHorizontal: Scale(20),
      marginTop: Scale(10),
    },
    bottomText: {
      fontSize: Scale(16),
      fontWeight: '300',
      color: '#fff',
      marginVertical: Scale(10),
    },
  });
  
export default VipCard;
