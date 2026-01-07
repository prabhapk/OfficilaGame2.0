import React, { use, useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getAgentDailyStats, getAgentDashboardData } from '../Redux/Slice/agentSlice';
import { RootState } from '../Redux/store';
import { formatToDDMMYYYY } from '../Utils/Common';
import * as Clipboard from 'expo-clipboard';
import { agentActiveUser, agentCommission, agentNewUsers, agentRecharge, agentRechargeMonth, resetIcon } from '../../assets/assets';

const AgencyScreen = ({ navigation }: { navigation: any }) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  const [showShareModal, setShowShareModal] = useState(false);

  const dispatch = useDispatch();

  const [todayData] = useState({
    active: 0,
    rechargeUsers: 0,
    newUser: 0,
  });
  const [monthData] = useState({
    recharge: 0.00,
    commission: 0.00,
  });

  const { dashBoardUserDataActiveUser, dashBoardUserDataRechargeUser, dashBoardUserDataNewUser, dashBoardDailyDataRecharge, dashBoardDailyDataCommission, inviteCode,agentCreatedDate } = useSelector(
    (state: RootState) => state.agentSlice
  );
  const {mobileNumber } = useSelector(
    (state: RootState) => state.signInSlice
  );

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
    // Alert.alert('Team Report', 'Opening team report...');
    navigation.navigate('AgentTeamReport');
  };

  const handleCommissionDetail = () => {
    navigation.navigate('AgentCommissionDetail');
  };

  const handleInvitationRules = () => {
    navigation.navigate('InvitationRulesScreen');
  };

  const handleCustomerService = () => {
    Alert.alert('Customer Service', 'Opening customer service...');
  };

//   useEffect(() => {
// // dispatch(getAgentDailyStats({agentId: Number(11111), date: '2022-08-01'}))
// dispatch(getAgentDashboardData({agentId: Number(1)}))
//   },[])
useEffect(() => {
  dispatch(getAgentDashboardData({ agentId: 1 }));
}, []);


const handleCopyLink = async () => {
  try {
    await Clipboard.setStringAsync(shareUrl);
    Alert.alert('Copied!', 'Link copied to clipboard');
    setShowShareModal(false);
  } catch (error) {
    console.log('Error copying link:', error);
    Alert.alert('Error', 'Unable to copy link');
  }
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
            <Text style={styles.userId}>{mobileNumber}</Text>
            <Text style={styles.registerDate}>Register Date: {formatToDDMMYYYY(agentCreatedDate)}</Text>
          </View>
        </View>

        {/* Today's User Data Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's User Data</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                {/* <Text style={styles.statIconText}>👥</Text> */}
                <Image source={agentActiveUser} style={{
                  width: Scale(25),
                  height: Scale(25),
                }} />
              </View>
              <Text style={styles.statNumber}>{dashBoardUserDataActiveUser}</Text>
              <Text style={styles.statLabel}>ACTIVE</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                {/* <Text style={styles.statIconText}>💳</Text> */}
                <Image source={agentRecharge} style={{
                  width: Scale(25),
                  height: Scale(25),
                }} />
              </View>
              <Text style={styles.statNumber}>{dashBoardUserDataRechargeUser}</Text>
              <Text style={styles.statLabel}>RECHARGE</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
              <Image source={agentNewUsers} style={{
                  width: Scale(30),
                  height: Scale(30),
                }} />
              </View>
              <Text style={styles.statNumber}>{dashBoardUserDataNewUser}</Text>
              <Text style={styles.statLabel}>NEW USER</Text>
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
                <Image source={agentRechargeMonth} style={{
                  width: Scale(25),
                  height: Scale(25),
                }} />
                </View>
                <Text style={styles.monthStatLabel}>RECHARGE</Text>
              </View>
              <Text style={styles.monthStatAmount}>₹{dashBoardDailyDataRecharge.toFixed(2)}</Text>
              <View style={styles.monthStatChange}>
                <Text style={styles.monthStatChangeText}>₹{monthData.recharge.toFixed(2)}</Text>
                <Text style={styles.monthStatArrow}>↗</Text>
              </View>
            </View>
            <View style={styles.monthStatItem}>
              <View style={styles.monthStatHeader}>
                <View style={styles.monthStatIcon}>
                <Image source={agentCommission} style={{
                  width: Scale(25),
                  height: Scale(25),
                }} />
                </View>
                <Text style={styles.monthStatLabel}>COMMISSION</Text>
              </View>
              <Text style={styles.monthStatAmount}>₹{dashBoardDailyDataCommission.toFixed(2)}</Text>
              <View style={styles.monthStatChange}>
                <Text style={styles.monthStatChangeText}>₹{dashBoardDailyDataCommission.toFixed(2)}</Text>
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
              <Image source={resetIcon} style={{
                width: Scale(20),
                height: Scale(20),
                marginRight: Scale(5),
              }} />
              <Text style={styles.resetButtonText}>Reset Link</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.invitationCodeContainer}>
            <View style={styles.invitationCodeBox}>
              <Text style={styles.invitationCodeText}>{inviteCode}</Text>
              <Text style={styles.invitationCodeLabel}>My invitation code</Text>
            </View>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopyCode}>
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
          
          <LinearGradient
            colors={[COLORS.linearOne, COLORS.linearTwo]}
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

          {/* <TouchableOpacity style={styles.navigationItem} onPress={handleCustomerService}>
            <View style={styles.navigationLeft}>
              <View style={[styles.navigationIcon, { backgroundColor: '#9C27B0' }]}>
                <Text style={styles.navigationIconText}>🎧</Text>
              </View>
              <Text style={styles.navigationText}>Agent line customer service</Text>
            </View>
            <Text style={styles.navigationArrow}>›</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primary,
    },
    scrollView: {
      flex: 1,
      backgroundColor: COLORS.primary,
    },
    profileCard: {
      backgroundColor: COLORS.primary,
      margin: Scale(20),
      borderRadius: Scale(16),
      padding: Scale(20),
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#fff',
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
      marginTop: Scale(10),
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
      backgroundColor: COLORS.primary,
      borderRadius: Scale(12),
      padding: Scale(20),
      borderWidth: 1,
      borderColor: '#fff',
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
      marginBottom: Scale(5),
    },
    statLabel: {
      fontSize: Scale(14),
      color: '#ff5f5f',
    },
    monthStatsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    monthStatItem: {
      flex: 1,
      backgroundColor: COLORS.primary,
      borderRadius: Scale(12),
      padding: Scale(15),
      marginHorizontal: Scale(5),
      borderWidth: 1,
      borderColor: '#fff',
    },
    monthStatHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Scale(10),
    },
    monthStatIcon: {
      width: Scale(40),
      height: Scale(40),
      borderRadius: Scale(20),
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
      backgroundColor: COLORS.primary,
      paddingHorizontal: Scale(12),
      paddingVertical: Scale(6),
      borderRadius: Scale(16),
      borderWidth: 1,
      borderColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
    },
    resetButtonText: {
      fontSize: Scale(12),
      color: '#fff',
      fontWeight: '500',
    },
    invitationCodeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Scale(15),
      marginTop: Scale(10),
    },
    invitationCodeBox: {
      flex: 1,
      backgroundColor: COLORS.gameDetailColor,
      borderWidth: 2,
      borderColor: '#fff',
      borderStyle: 'dashed',
      borderRadius: Scale(12),
      padding: Scale(15),
      marginRight: Scale(30),
    },
    invitationCodeText: {
      fontSize: Scale(20),
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: Scale(4),
    },
    invitationCodeLabel: {
      fontSize: Scale(12),
      color: '#fff',
    },
    copyButton: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: Scale(20),
      paddingVertical: Scale(12),
      borderRadius: Scale(8),
      borderWidth: 1,
      borderColor: '#fff',
    },
    copyButtonText: {
      fontSize: Scale(14),
      fontWeight: 'bold',
      color: '#fff',
    },
    invitationLinkButton: {
      borderRadius: Scale(12),
      alignItems: 'center',
      marginTop: Scale(20),
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
      backgroundColor: COLORS.primary,
      padding: Scale(20),
      borderRadius: Scale(12),
      marginBottom: Scale(12),
      borderWidth: 0.5,
      borderColor: '#fff',
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
      color: '#fff',
      fontWeight: 'bold',
    },
  });

export default AgencyScreen;