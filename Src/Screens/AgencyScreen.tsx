import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useContainerScale } from '../hooks/useContainerScale';
import NewAppHeader from '../Components/NewAppHeader';
import { COLORS } from '../Constants/Theme';

const AgencyScreen = ({ navigation }: { navigation: any }) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);

  const [invitationCode] = useState('FYLAMNNS');
  const [todayData] = useState({
    active: 0,
    rechargeUsers: 0,
    newUser: 0,
  });
  const [monthData] = useState({
    recharge: 0.00,
    commission: 0.00,
  });

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleWalletPress = () => {
    navigation.navigate('Profile');
  };

  const handleCopyCode = () => {
    // In a real app, you would copy to clipboard
    Alert.alert('Copied', 'Invitation code copied to clipboard');
  };

  const handleResetLink = () => {
    Alert.alert('Reset Link', 'Invitation link has been reset');
  };

  const handleInvitationLink = () => {
    Alert.alert('Invitation Link', 'Opening invitation link...');
  };

  const handleTeamReport = () => {
    Alert.alert('Team Report', 'Opening team report...');
  };

  const handleCommissionDetail = () => {
    Alert.alert('Commission Detail', 'Opening commission details...');
  };

  const handleInvitationRules = () => {
    navigation.navigate('InvitationRulesScreen');
  };

  const handleCustomerService = () => {
    Alert.alert('Customer Service', 'Opening customer service...');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      {/* Header */}
      <NewAppHeader
        leftIconPress={handleBackPress}
        centerText="Agency Center"
        rightIcon={require('../../assets/wallet-icon.webp')}
        rightIconPress={handleWalletPress}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../assets/ProfileScreen/wallet3DImage.webp')}
              style={styles.avatar}
              resizeMode="cover"
            />
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Lv.1</Text>
            </View>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userId}>8618110673</Text>
            <Text style={styles.registerDate}>Register Date: 19/08 2025</Text>
          </View>
        </View>

        {/* Today's User Data Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's User Data</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Text style={styles.statIconText}>👥</Text>
              </View>
              <Text style={styles.statNumber}>{todayData.active}</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Text style={styles.statIconText}>💳</Text>
              </View>
              <Text style={styles.statNumber}>{todayData.rechargeUsers}</Text>
              <Text style={styles.statLabel}>Recharge Users</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Text style={styles.statIconText}>👤+</Text>
              </View>
              <Text style={styles.statNumber}>{todayData.newUser}</Text>
              <Text style={styles.statLabel}>New User</Text>
            </View>
          </View>
        </View>

        {/* Total Month Data Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total Month Data</Text>
          <View style={styles.monthStatsContainer}>
            <View style={styles.monthStatItem}>
              <View style={styles.monthStatHeader}>
                <View style={styles.monthStatIcon}>
                  <Text style={styles.monthStatIconText}>💳</Text>
                </View>
                <Text style={styles.monthStatLabel}>Recharge</Text>
              </View>
              <Text style={styles.monthStatAmount}>₹{monthData.recharge.toFixed(2)}</Text>
              <View style={styles.monthStatChange}>
                <Text style={styles.monthStatChangeText}>₹{monthData.recharge.toFixed(2)}</Text>
                <Text style={styles.monthStatArrow}>↗</Text>
              </View>
            </View>
            <View style={styles.monthStatItem}>
              <View style={styles.monthStatHeader}>
                <View style={styles.monthStatIcon}>
                  <Text style={styles.monthStatIconText}>💰</Text>
                </View>
                <Text style={styles.monthStatLabel}>Commission</Text>
              </View>
              <Text style={styles.monthStatAmount}>₹{monthData.commission.toFixed(2)}</Text>
              <View style={styles.monthStatChange}>
                <Text style={styles.monthStatChangeText}>₹{monthData.commission.toFixed(2)}</Text>
                <Text style={styles.monthStatArrow}>↗</Text>
              </View>
            </View>
          </View>
        </View>

        {/* My Invitation Code Section */}
        <View style={styles.section}>
          <View style={styles.invitationHeader}>
            <View style={styles.invitationTitleContainer}>
              <View style={styles.redBar} />
              <Text style={styles.invitationTitle}>My invitation code</Text>
            </View>
            <TouchableOpacity style={styles.resetButton} onPress={handleResetLink}>
              <Text style={styles.resetButtonText}>Reset Link</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.invitationCodeContainer}>
            <View style={styles.invitationCodeBox}>
              <Text style={styles.invitationCodeText}>{invitationCode}</Text>
              <Text style={styles.invitationCodeLabel}>My invitation code</Text>
            </View>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopyCode}>
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
          
          <LinearGradient
            colors={['#FF4242', '#f6c976']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.invitationLinkButton}
          >
            <TouchableOpacity
              style={styles.invitationLinkTouchable}
              onPress={handleInvitationLink}
            >
              <Text style={styles.invitationLinkText}>INVITATION LINK</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Navigation Items */}
        <View style={styles.navigationSection}>
          <TouchableOpacity style={styles.navigationItem} onPress={handleTeamReport}>
            <View style={styles.navigationLeft}>
              <View style={[styles.navigationIcon, { backgroundColor: '#FF8C00' }]}>
                <Text style={styles.navigationIconText}>📊</Text>
              </View>
              <Text style={styles.navigationText}>Team report</Text>
            </View>
            <Text style={styles.navigationArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationItem} onPress={handleCommissionDetail}>
            <View style={styles.navigationLeft}>
              <View style={[styles.navigationIcon, { backgroundColor: '#4CAF50' }]}>
                <Text style={styles.navigationIconText}>$</Text>
              </View>
              <Text style={styles.navigationText}>Commission detail</Text>
            </View>
            <Text style={styles.navigationArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationItem} onPress={handleInvitationRules}>
            <View style={styles.navigationLeft}>
              <View style={[styles.navigationIcon, { backgroundColor: '#2196F3' }]}>
                <Text style={styles.navigationIconText}>📖</Text>
              </View>
              <Text style={styles.navigationText}>Invitation rules</Text>
            </View>
            <Text style={styles.navigationArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationItem} onPress={handleCustomerService}>
            <View style={styles.navigationLeft}>
              <View style={[styles.navigationIcon, { backgroundColor: '#9C27B0' }]}>
                <Text style={styles.navigationIconText}>🎧</Text>
              </View>
              <Text style={styles.navigationText}>Agent line customer service</Text>
            </View>
            <Text style={styles.navigationArrow}>›</Text>
          </TouchableOpacity>
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
    profileCard: {
      backgroundColor: '#360400',
      margin: Scale(20),
      borderRadius: Scale(16),
      padding: Scale(20),
      flexDirection: 'row',
      alignItems: 'center',
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
    avatarContainer: {
      position: 'relative',
      marginRight: Scale(15),
    },
    avatar: {
      width: Scale(60),
      height: Scale(60),
      borderRadius: Scale(30),
    },
    levelBadge: {
      position: 'absolute',
      top: -Scale(5),
      left: -Scale(5),
      backgroundColor: '#FFD700',
      borderRadius: Scale(12),
      paddingHorizontal: Scale(8),
      paddingVertical: Scale(4),
    },
    levelText: {
      fontSize: Scale(12),
      fontWeight: 'bold',
      color: '#333',
    },
    userInfo: {
      flex: 1,
    },
    userId: {
      fontSize: Scale(20),
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: Scale(4),
    },
    registerDate: {
      fontSize: Scale(14),
      color: '#ff5f5f',
    },
    section: {
      marginHorizontal: Scale(20),
      marginBottom: Scale(20),
    },
    sectionTitle: {
      fontSize: Scale(18),
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: Scale(15),
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#360400',
      borderRadius: Scale(12),
      padding: Scale(20),
      borderWidth: 1,
      borderColor: '#ff5f5f',
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statIcon: {
      width: Scale(40),
      height: Scale(40),
      borderRadius: Scale(20),
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Scale(8),
    },
    statIconText: {
      fontSize: Scale(20),
    },
    statNumber: {
      fontSize: Scale(24),
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: Scale(4),
    },
    statLabel: {
      fontSize: Scale(12),
      color: '#ff5f5f',
    },
    monthStatsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    monthStatItem: {
      flex: 1,
      backgroundColor: '#360400',
      borderRadius: Scale(12),
      padding: Scale(15),
      marginHorizontal: Scale(5),
      borderWidth: 1,
      borderColor: '#ff5f5f',
    },
    monthStatHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Scale(10),
    },
    monthStatIcon: {
      width: Scale(30),
      height: Scale(30),
      borderRadius: Scale(15),
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Scale(8),
    },
    monthStatIconText: {
      fontSize: Scale(16),
    },
    monthStatLabel: {
      fontSize: Scale(14),
      color: '#ff5f5f',
    },
    monthStatAmount: {
      fontSize: Scale(20),
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: Scale(8),
    },
    monthStatChange: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    monthStatChangeText: {
      fontSize: Scale(12),
      color: '#4CAF50',
      marginRight: Scale(4),
    },
    monthStatArrow: {
      fontSize: Scale(12),
      color: '#4CAF50',
    },
    invitationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Scale(15),
    },
    invitationTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    redBar: {
      width: Scale(4),
      height: Scale(20),
      backgroundColor: '#ff5f5f',
      marginRight: Scale(8),
    },
    invitationTitle: {
      fontSize: Scale(16),
      fontWeight: 'bold',
      color: '#fff',
    },
    resetButton: {
      backgroundColor: '#5A1C1C',
      paddingHorizontal: Scale(12),
      paddingVertical: Scale(6),
      borderRadius: Scale(16),
      borderWidth: 1,
      borderColor: '#ff5f5f',
    },
    resetButtonText: {
      fontSize: Scale(12),
      color: '#ff5f5f',
      fontWeight: '500',
    },
    invitationCodeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Scale(15),
    },
    invitationCodeBox: {
      flex: 1,
      backgroundColor: '#FFD700',
      borderWidth: 2,
      borderColor: '#9C27B0',
      borderStyle: 'dashed',
      borderRadius: Scale(12),
      padding: Scale(15),
      marginRight: Scale(10),
    },
    invitationCodeText: {
      fontSize: Scale(20),
      fontWeight: 'bold',
      color: '#8B4513',
      marginBottom: Scale(4),
    },
    invitationCodeLabel: {
      fontSize: Scale(12),
      color: '#fff',
    },
    copyButton: {
      backgroundColor: '#FFD700',
      paddingHorizontal: Scale(20),
      paddingVertical: Scale(12),
      borderRadius: Scale(8),
    },
    copyButtonText: {
      fontSize: Scale(14),
      fontWeight: 'bold',
      color: '#333',
    },
    invitationLinkButton: {
      borderRadius: Scale(12),
      alignItems: 'center',
    },
    invitationLinkTouchable: {
      paddingVertical: Scale(15),
      alignItems: 'center',
      justifyContent: 'center',
    },
    invitationLinkText: {
      fontSize: Scale(16),
      fontWeight: 'bold',
      color: '#fff',
    },
    navigationSection: {
      marginHorizontal: Scale(20),
      marginBottom: Scale(20),
    },
    navigationItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#360400',
      padding: Scale(20),
      borderRadius: Scale(12),
      marginBottom: Scale(12),
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
    navigationLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    navigationIcon: {
      width: Scale(40),
      height: Scale(40),
      borderRadius: Scale(20),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Scale(15),
    },
    navigationIconText: {
      fontSize: Scale(18),
      color: '#fff',
      fontWeight: 'bold',
    },
    navigationText: {
      fontSize: Scale(16),
      color: '#fff',
      fontWeight: '500',
      flex: 1,
    },
    navigationArrow: {
      fontSize: Scale(20),
      color: '#ff5f5f',
      fontWeight: 'bold',
    },
  });

export default AgencyScreen;