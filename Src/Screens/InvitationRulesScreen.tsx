import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { useContainerScale } from '../hooks/useContainerScale';
import NewAppHeader from '../Components/NewAppHeader';
import { COLORS } from '../Constants/Theme';

interface RewardTier {
  id: number;
  people: number;
  deposit: number;
  bonus: number;
}

const InvitationRulesScreen = ({ navigation }: { navigation: any }) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);

  const rewardTiers: RewardTier[] = [
    { id: 1, people: 1, deposit: 500, bonus: 100 },
    { id: 2, people: 3, deposit: 500, bonus: 300 },
    { id: 3, people: 10, deposit: 500, bonus: 1000 },
    { id: 4, people: 30, deposit: 500, bonus: 3000 },
    { id: 5, people: 70, deposit: 500, bonus: 7000 },
    { id: 6, people: 200, deposit: 500, bonus: 20000 },
    { id: 7, people: 500, deposit: 500, bonus: 50000 },
    { id: 8, people: 1000, deposit: 500, bonus: 100000 },
    { id: 9, people: 5000, deposit: 500, bonus: 500000 },
    { id: 10, people: 10000, deposit: 500, bonus: 1000000 },
    { id: 11, people: 20000, deposit: 500, bonus: 2000000 },
  ];

  const rules = [
    "Only when the number of invited accounts is reached and each account can meet the recharge amount can you receive the bonus.",
    "The invitation account meets the requirements, but the recharge amount of the account does not meet the requirements, and the bonus cannot be claimed.",
    "Please claim the event bonus within the event period. All bonuses will be cleared after the event expires.",
    "Please complete the task within the event period. After the event expires, the task will be invalid.",
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCustomerService = () => {
    // Navigate to customer service or show help
    console.log('Customer service pressed');
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(0)},00,000`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(0)},00,000`;
    } else if (num >= 10000) {
      return `${(num / 10000).toFixed(0)},000`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)},000`;
    }
    return num.toString();
  };

  const renderRewardRow = (tier: RewardTier) => (
    <View key={tier.id} style={styles.tableRow}>
      <View style={styles.tableCell}>
        <Text style={styles.tableCellText}>{tier.people} People</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.tableCellText}>₹{tier.deposit}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.tableCellText}>₹{formatNumber(tier.bonus)}</Text>
      </View>
    </View>
  );

  const renderRule = (rule: string, index: number) => (
    <View key={index} style={styles.ruleItem}>
      <Text style={styles.bulletPoint}>•</Text>
      <Text style={styles.ruleText}>{rule}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      {/* Header */}
      <NewAppHeader
        leftIconPress={handleBackPress}
        centerText="Invitation Rules"
        rightIcon={require('../../assets/customer-service.webp')}
        rightIconPress={handleCustomerService}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Introductory Text */}
        <View style={styles.introSection}>
          <Text style={styles.introText}>
            Invite friends and recharge to get additional platform rewards!
          </Text>
          <Text style={styles.introSubText}>
            After being claimed, the rewards will be directly distributed to the wallet balance within 10 minutes.
          </Text>
        </View>

        {/* Rewards Table */}
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={styles.tableHeaderCell}>
              <Text style={styles.tableHeaderText}>Invite Account</Text>
            </View>
            <View style={styles.tableHeaderCell}>
              <Text style={styles.tableHeaderText}>Deposit Account</Text>
            </View>
            <View style={styles.tableHeaderCell}>
              <Text style={styles.tableHeaderText}>Bonus</Text>
            </View>
          </View>

          {/* Table Rows */}
          {rewardTiers.map(renderRewardRow)}
        </View>

        {/* Rules Section */}
        <View style={styles.rulesSection}>
          <View style={styles.rulesHeader}>
            <Text style={styles.rulesHeaderText}>Rules</Text>
          </View>
          <View style={styles.rulesContent}>
            {rules.map(renderRule)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#250f0fff',
    },
    scrollView: {
      flex: 1,
      backgroundColor: '#250f0fff',
    },
    introSection: {
      backgroundColor: '#360400',
      margin: Scale(20),
      padding: Scale(20),
      borderRadius: Scale(12),
      borderWidth: 1,
      borderColor: '#ff5f5f',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    introText: {
      fontSize: Scale(16),
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: Scale(10),
      lineHeight: Scale(22),
    },
    introSubText: {
      fontSize: Scale(14),
      color: '#ff5f5f',
      lineHeight: Scale(20),
    },
    tableContainer: {
      marginHorizontal: Scale(20),
      marginBottom: Scale(20),
      borderRadius: Scale(12),
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#5A1C1C',
    },
    tableHeaderCell: {
      flex: 1,
      paddingVertical: Scale(15),
      paddingHorizontal: Scale(10),
      alignItems: 'center',
      borderRightWidth: 1,
      borderRightColor: '#4A1515',
    },
    tableHeaderText: {
      fontSize: Scale(14),
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    },
    tableRow: {
      flexDirection: 'row',
      backgroundColor: '#F8F9FA',
      borderBottomWidth: 1,
      borderBottomColor: '#E9ECEF',
    },
    tableCell: {
      flex: 1,
      paddingVertical: Scale(12),
      paddingHorizontal: Scale(10),
      alignItems: 'center',
      borderRightWidth: 1,
      borderRightColor: '#E9ECEF',
    },
    tableCellText: {
      fontSize: Scale(13),
      color: '#333',
      textAlign: 'center',
      fontWeight: '500',
    },
    rulesSection: {
      marginHorizontal: Scale(20),
      marginBottom: Scale(20),
      borderRadius: Scale(12),
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    rulesHeader: {
      backgroundColor: '#5A1C1C',
      paddingVertical: Scale(15),
      paddingHorizontal: Scale(20),
    },
    rulesHeaderText: {
      fontSize: Scale(16),
      fontWeight: 'bold',
      color: '#fff',
    },
    rulesContent: {
      backgroundColor: '#360400',
      padding: Scale(20),
      borderWidth: 1,
      borderColor: '#ff5f5f',
    },
    ruleItem: {
      flexDirection: 'row',
      marginBottom: Scale(12),
      alignItems: 'flex-start',
    },
    bulletPoint: {
      fontSize: Scale(16),
      color: '#ff5f5f',
      marginRight: Scale(10),
      marginTop: Scale(2),
    },
    ruleText: {
      flex: 1,
      fontSize: Scale(14),
      color: '#fff',
      lineHeight: Scale(20),
    },
  });

export default InvitationRulesScreen;
