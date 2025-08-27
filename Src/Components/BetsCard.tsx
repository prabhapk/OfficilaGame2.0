import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Scale from './Scale';
import { betIconCard } from '../../assets/assets';

interface Props {
    betAmount: number;
    beforeBalance: number;
    afterBalance: number;
    orderTime: string;
    game: string;
    orderNumber: string;
}

const BetsCard : React.FC<Props> = (
    {betAmount, 
        beforeBalance, 
        afterBalance, 
        orderTime,
         game,
          orderNumber}
    : Props
) => {
  return (
    <View>
       <View style={styles.cardContainer}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.iconTextRow}>
          <Image source={betIconCard} style={styles.betIcon} />
          <Text style={styles.betTitle}>BETS</Text>
        </View>
        <Text style={styles.amountText}>-₹{betAmount} RS</Text>
      </View>

      {/* Info Rows */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>Before Balance</Text>
        <Text style={styles.label}>₹{beforeBalance}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Balance</Text>
        <Text style={styles.label}>-₹{betAmount}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>After Balance</Text>
        <Text style={styles.label}>₹{afterBalance}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Order Time</Text>
        <Text style={styles.label}>{orderTime}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Game</Text>
        <Text style={styles.label}>{game}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Order Number</Text>
        <Text style={styles.label}>{orderNumber}</Text>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: '#442727',
      borderRadius: Scale(10),
      borderWidth: 1,
      borderColor: '#442727',
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
      color: '#FF4C4C',
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

export default BetsCard