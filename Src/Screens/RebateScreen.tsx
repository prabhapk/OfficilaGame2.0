import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useContainerScale } from '../hooks/useContainerScale';
import NewAppHeader from '../Components/NewAppHeader';
import { leftArrowHeader } from '../../assets/assets';
import { COLORS } from '../Constants/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { claimRebate, getRebateList, getRebateSummary } from '../Redux/Slice/rebateSlice';
import { RootState } from '../Redux/store';
import { formatDateTime, formatTime24to12, formatToTimeIST } from '../Utils/Common';
import { unwrapResult } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

interface RebateItem {
  id: string;
  date: string;
  status: 'Unclaimed' | 'Claimed' | 'Processing';
  estimatedBetting: number;
  estimatedRebate: number;
  canReceive: boolean;
  category: 'finished' | 'pending' | 'collected';
}

const RebateScreen = ({ navigation }: { navigation: any }) => {

  const dispatch = useDispatch();
  const {
    rebateListData,
    allRebateSummary,
    toBeCollectedList,
    receivedList,
    allRebateSummaryMaster,
    toBeCollectedListMaster,
    receivedListMaster,
  } = useSelector((state: RootState) => state.rebateSlice);

  const [claimed, setClaimed] = useState(false);
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);

  const [selectedTab, setSelectedTab] = useState('ALL');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState('ALL');

  const tabs = [
    { id: 'ALL', name: 'ALL' },
    { id: 'TO_BE_COLLECTED', name: 'To Be Collected' },
    { id: 'Received', name: 'Received' },
  ];

  // Helper to check if a date falls in today / this week / this month
  const isDateInFilter = (dateStr: string) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const now = new Date();

    switch (selectedDateFilter) {
      case 'TODAY':
        return date.toDateString() === now.toDateString();

      case 'THIS_WEEK': {
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return date >= weekStart && date <= weekEnd;
      }

      case 'THIS_MONTH':
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

      case 'ALL':
      default:
        return true;
    }
  };

  const getFilteredData = () => {
    let baseList: RebateItem[] = [];

    switch (selectedTab) {
      case 'ALL':
        baseList = allRebateSummaryMaster || [];
        break;

      case 'TO_BE_COLLECTED':
        baseList = toBeCollectedListMaster || [];
        break;

      case 'Received':
        baseList = receivedListMaster || [];
        break;

      default:
        baseList = [];
    }

    // Apply date filter
    return baseList.filter(item => isDateInFilter(item.date));
  };

  const rebateData = getFilteredData();

  const handleBackPress = () => navigation.goBack();
  const handleFilterPress = () => setShowFilterModal(!showFilterModal);
  const handleWalletPress = () => navigation.navigate('Profile');

  useEffect(() => {
    // Fetch all three datasets up front
    dispatch(getRebateSummary({}));
    dispatch(getRebateList({ claimed: false }));
    dispatch(getRebateList({ claimed: true }));
  }, [dispatch]);

  const handleReceivePress = async (item) => {
    try {
      await dispatch(claimRebate({ rebateId: item.id })).unwrap();
      await dispatch(getRebateList({ claimed: false }));
      await dispatch(getRebateList({ claimed: true }));
      await dispatch(getRebateSummary());

      Toast.show({
        type: 'success',
        text1: 'Rebate Claimed successfully',
        position: 'top',
      });
    } catch (error) {
      console.log('error', error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        position: 'top',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Unclaimed': return '#4A90E2';
      case 'Claimed': return '#4CAF50';
      case 'Processing': return '#FF9800';
      default: return '#666';
    }
  };

  const renderRebateItem = ({ item }) => (
    <View style={styles.rebateCard}>
      <View style={styles.rebateHeader}>
        <Text style={styles.dateText}>{formatDateTime(item?.date)}</Text>
        <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
      </View>

      <View style={styles.rebateContent}>
        <View style={styles.bettingInfo}>
          <View style={styles.infoRow}>
            <Image
              source={require('../../assets/wallet-icon.webp')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.infoText}>
              Estimated Recharge: ₹{item?.rebatePercentage?.toFixed(2)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Image
              source={require('../../assets/wallet-icon.webp')}
              style={[styles.icon, { tintColor: '#8B5CF6' }]}
              resizeMode="contain"
            />
            <Text style={styles.infoText}>
              Estimated Rebate: ₹{item?.rechargeAmount?.toFixed(2)}
            </Text>
          </View>
        </View>

        {item?.claimed === false ? (
          <LinearGradient
            colors={[COLORS.linearOne, COLORS.linearTwo]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.receiveButton}
          >
            <TouchableOpacity
              style={styles.receiveButtonTouchable}
              onPress={() => handleReceivePress(item)}
            >
              <Text style={styles.receiveButtonText}>Receive</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <View style={styles.disabledButton}>
            <Text style={styles.disabledButtonText}>Claimed</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderTab = (tab: { id: string; name: string }) => {
    const isSelected = selectedTab === tab.id;
    return (
      <TouchableOpacity
        key={tab.id}
        style={styles.tabContainer}
        onPress={() => setSelectedTab(tab.id)}
      >
        <Text style={[styles.tabText, isSelected && styles.selectedTabText]}>
          {tab.name}
        </Text>
        {isSelected && <View style={styles.tabUnderline} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      <NewAppHeader
        leftIconPress={handleBackPress}
        centerText="Rebate"
        rightIcon={require('../../assets/wallet-icon.webp')}
        rightIconPress={handleWalletPress}
      />

      <View style={styles.tabsContainer}>
        <View style={styles.tabsWrapper}>
          {tabs.map(renderTab)}
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
          <Text style={styles.filterText}>Filter</Text>
          <Image
            source={require('../../assets/leftArrow.png')}
            style={styles.filterIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      {showFilterModal && (
        <View style={styles.filterModal}>
          <View style={styles.filterModalContent}>
            <Text style={styles.filterModalTitle}>Filter by Date</Text>
            {['ALL', 'TODAY', 'THIS_WEEK', 'THIS_MONTH'].map(filter => (
              <TouchableOpacity
                key={filter}
                style={styles.filterOption}
                onPress={() => {
                  setSelectedDateFilter(filter);
                  setShowFilterModal(false);
                }}
              >
                <Text style={styles.filterOptionText}>
                  {filter === 'ALL' ? 'All Dates' : filter.replace('_', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeFilterButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.closeFilterText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={rebateData}
        renderItem={renderRebateItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {selectedDateFilter !== 'ALL'
                ? `No rebates found for ${selectedDateFilter.toLowerCase().replace('_', ' ')}`
                : 'No rebates found'}
            </Text>
          </View>
        )}
      />

      <Toast/>
    </View>
  );
};



const createStyles = (Scale: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primary,
    },
    tabsContainer: {
      flexDirection: 'row',
      backgroundColor: COLORS.primary,
      paddingHorizontal: Scale(20),
      paddingVertical: Scale(15),
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#fff',
    },
    tabsWrapper: {
      flexDirection: 'row',
      flex: 1,
    },
    tabContainer: {
      marginRight: Scale(20),
      alignItems: 'center',
    },
    tabText: {
      fontSize: Scale(16),
      color: '#fff',
      fontWeight: '500',
      opacity: 0.6,
    },
    selectedTabText: {
      color: '#fff',
      fontWeight: 'bold',
      opacity: 1,
    },
    tabUnderline: {
      width: '100%',
      height: Scale(3),
      backgroundColor: '#fff',
      marginTop: Scale(5),
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Scale(15),
      paddingVertical: Scale(8),
      backgroundColor: COLORS.primary,
      borderRadius: Scale(20),
      borderWidth: 1,
      borderColor: '#fff',
    },
    filterText: {
      fontSize: Scale(14),
      color: '#fff',
      marginRight: Scale(5),
    },
    filterIcon: {
      width: Scale(12),
      height: Scale(12),
      transform: [{ rotate: '90deg' }],
    },
    listContainer: {
      paddingHorizontal: Scale(20),
      paddingTop: Scale(10),
    },
    rebateCard: {
      backgroundColor: COLORS.primary,
      borderRadius: Scale(12),
      padding: Scale(15),
      marginBottom: Scale(15),
      borderWidth: 0.2,
      borderColor: '#fff',
      shadowColor: '#fff',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3.84,
      elevation: 5,
    },
    rebateHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Scale(15),
    },
    dateText: {
      fontSize: Scale(16),
      fontWeight: 'bold',
      color: '#fff',
    },
    statusText: {
      fontSize: Scale(14),
      color: '#4A90E2',
      fontWeight: '500',
    },
    rebateContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    bettingInfo: {
      flex: 1,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Scale(8),
    },
    icon: {
      width: Scale(16),
      height: Scale(16),
      marginRight: Scale(8),
      tintColor: '#FFD700',
    },
    infoText: {
      fontSize: Scale(14),
      color: '#fff',
    },
    receiveButton: {
      borderRadius: Scale(8),
      alignItems: 'center',
      justifyContent: 'center',
    },
    receiveButtonTouchable: {
      paddingHorizontal: Scale(20),
      paddingVertical: Scale(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
    receiveButtonText: {
      color: '#fff',
      fontSize: Scale(14),
      fontWeight: 'bold',
    },
    disabledButton: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: Scale(20),
      paddingVertical: Scale(10),
      borderRadius: Scale(8),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.1,
      borderColor: '#fff',
    },
    disabledButtonText: {
      color: '#fff',
      fontSize: Scale(14),
      fontWeight: 'bold',
      opacity: 0.6,
    },
    filterModal: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    filterModalContent: {
      backgroundColor: COLORS.primary,
      borderRadius: Scale(12),
      padding: Scale(20),
      width: '80%',
      maxWidth: Scale(300),
      borderWidth: 1,
      borderColor: '#fff',
    },
    filterModalTitle: {
      fontSize: Scale(18),
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: Scale(20),
      textAlign: 'center',
    },
    filterOption: {
      paddingVertical: Scale(15),
      paddingHorizontal: Scale(10),
      borderBottomWidth: 1,
      borderBottomColor: '#fff',
    },
    filterOptionText: {
      fontSize: Scale(16),
      color: '#fff',
      textAlign: 'center',
    },
    closeFilterButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: Scale(12),
      borderRadius: Scale(8),
      marginTop: Scale(20),
      borderWidth: 1,
      borderColor: '#fff',
    },
    closeFilterText: {
      color: '#fff',
      fontSize: Scale(16),
      fontWeight: 'bold',
      textAlign: 'center',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Scale(50),
    },
    emptyText: {
      fontSize: Scale(16),
      color: '#ff5f5f',
      textAlign: 'center',
    },
  });

export default RebateScreen;
