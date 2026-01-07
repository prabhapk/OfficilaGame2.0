import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { rechargeIconCard } from '../../assets/assets';
import { useContainerScale } from '../hooks/useContainerScale';
import { COLORS } from '../Constants/Theme';
interface Props {
    rechargeAmount: number;
    beforeBalance: number;
    afterBalance: number;
    rechargeTime: string;
    rechargeNumber: string;
    // ssr: string;
    type: string;
    channelName: string;
    description: string;
    paymentType: string;

}

const RechargeCard : React.FC<Props> = (
    {rechargeAmount, 
        beforeBalance, 
        afterBalance, 
        rechargeTime,
        rechargeNumber,
        // ssr,
        type,
        channelName,
        description,
        paymentType
        }
    : Props
) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  return (
    <View>
       <View style={styles.cardContainer}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.iconTextRow}>
          <Image source={rechargeIconCard} style={styles.betIcon} />
          <Text style={styles.betTitle}>RECHARGE</Text>
        </View>
        <Text style={styles.amountText}>+₹{rechargeAmount}</Text>
      </View>

      {/* Info Rows */}
      {/* <View style={styles.infoRow}>
        <Text style={styles.label}>Before Balance</Text>
        <Text style={styles.label}>₹{beforeBalance}</Text>
      </View> */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>Balance</Text>
        <Text style={styles.label}> ₹{rechargeAmount}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>After Balance</Text>
        <Text style={styles.label}>₹{afterBalance}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Type</Text>
        <Text style={styles.label}>₹{type}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Channel Name</Text>
        <Text style={styles.label}>{channelName}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.label}>{description}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Payment Type</Text>
        <Text style={styles.label}>{paymentType}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Order Time</Text>
        <Text style={styles.label}>{rechargeTime}</Text>
      </View>
      {/* <View style={styles.infoRow}>
        <Text style={styles.label}>Game</Text>
        <Text style={styles.label}>{rechargeNumber}</Text>
      </View> */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>Order Number</Text>
        <Text style={styles.label}>{rechargeNumber}</Text>
      </View>
    </View>
    </View>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor: 'transparent',
      borderRadius: Scale(10),
      borderWidth: 1,
      borderColor: COLORS.white,
      padding: Scale(12),
      marginVertical: Scale(8),
      marginHorizontal: Scale(10),
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    iconTextRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    betIcon: {
      width: Scale(36),
      height: Scale(36),
      resizeMode: 'contain',
      marginRight: Scale(10),
    },
    betTitle: {
      fontSize: Scale(18),
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginLeft: Scale(5),
    },
    amountText: {
      fontSize: Scale(20),
      fontWeight: 'bold',
      color: 'green',
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: Scale(2),
      marginTop: Scale(20),
    },
    label: {
      fontSize: Scale(16),
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
  });

export default RechargeCard;