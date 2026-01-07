import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DatePickerModal } from 'react-native-paper-dates';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import NewAppHeader from '../Components/NewAppHeader';
import HeaderButtonList from '../Components/HeaderButtonList';

import BetsCard from '../Components/BetsCard';
import RechargeCard from '../Components/RechargeCard';
import WinningCard from '../Components/WinningCard';
import WithdrawCard from '../Components/WithdrawCard';
import CommissionCard from '../Components/CommissionCard';
import RebateCard from '../Components/RebateCard';
import TransferCard from '../Components/TransferCard';
import VipTransactionCard from '../Components/VipTransactionCard';

import { leftArrowHeader } from '../../assets/assets';
import { COLORS } from '../Constants/Theme';

import {
  getAllTransactionsData,
  getTransferData,
  getWinsData,
  getBetsData,
  getWalletData,
  getWithdrawalsData,
  getVipsData,
  getRebateData,
  getCommissionData,
} from '../Redux/Slice/TransactionSlice';

console.log('getAllTransactionsData==>', getAllTransactionsData);
console.log('getTransferData==>', getTransferData);
console.log('getWinsData==>', getWinsData);
console.log('getBetsData==>', getBetsData);
console.log('getWalletData==>', getWalletData);
console.log('getWithdrawalsData==>', getWithdrawalsData);
console.log('getVipsData==>', getVipsData);
console.log('getRebateData==>', getRebateData);  
console.log('getCommissionData==>', getCommissionData);



import { RootState } from '../Redux/store';
import { TransactionType } from '../types/transaction.types';

const Transactions = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state: RootState) => state.signInSlice);

  const {
    allTransactionsData,
    transferData,
    walletData,
    withdrawalsData,
    betsData,
    winsData,
    vipsData,
    rebateData,
    commissionData,
    transactionLoader,
  } = useSelector((state: RootState) => state.TransactionSlice);

  const buttons = [
    { id: 1, name: 'All' },
    { id: 2, name: 'WIN' },
    { id: 3, name: 'RECHARGE' },
    { id: 4, name: 'BETS' },
    { id: 5, name: 'WITHDRAW' },
    { id: 6, name: 'COMMISSION' },
    { id: 7, name: 'REBATE' },
    { id: 8, name: 'TRANSFER' },
    { id: 9, name: 'VIP' },
  ];



  const [selectedButton, setSelectedButton] = useState(buttons[0]);
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<{ startDate?: Date; endDate?: Date }>({});

  /* -------------------- Date Params -------------------- */
  const dateParams = useMemo(
    () => ({
      FromDate: range.startDate
        ? format(range.startDate, 'yyyy-MM-dd')
        : '',
      ToDate: range.endDate
        ? format(range.endDate, 'yyyy-MM-dd')
        : '',
      UserId: userId,
      Page: 1,
      PageSize: 20,
    }),
    [range.startDate, range.endDate, userId]
  );
  // ======> 
    const fetchBySelectedTab = (params: any) => {
      switch (selectedButton.id) {
        case 1:
          dispatch(getAllTransactionsData(params));
          break;
        case 2:
          dispatch(getWinsData(params));
          break;
        case 3:
          dispatch(getWalletData(params));
          break;
        case 4:
          dispatch(getBetsData(params));
          break;
        case 5:
          dispatch(getWithdrawalsData(params));
          break;
        case 6:
          dispatch(getCommissionData(params));
          break;
        case 7:
          dispatch(getRebateData(params));
          break;
        case 8:
          dispatch(getTransferData(params));
          break;
        case 9:
          dispatch(getVipsData(params));
          break;
      }
    };
    useEffect(() => {
      fetchBySelectedTab({
        ...dateParams,
        Page: 1,
      });
    }, [dateParams]);
    
  /* -------------------- Button Handler -------------------- */
  const handleButtonPress = (button: any) => {
    setSelectedButton(button);

    switch (button.id) {
      case 1:
        dispatch(getAllTransactionsData(dateParams));
        break;
      case 2:
        dispatch(getWinsData(dateParams));
        break;
      case 3:
        dispatch(getWalletData(dateParams));
        break;
      case 4:
        dispatch(getBetsData(dateParams));
        break;
      case 5:
        dispatch(getWithdrawalsData(dateParams));
        break;
        case 6:
        dispatch(getCommissionData(dateParams));
        break;
        case 7:
        dispatch(getRebateData(dateParams));
        break;
      case 8:
        dispatch(getTransferData(dateParams));
        break;
      case 9:
        dispatch(getVipsData(dateParams));
        break;
    }
  };

  useEffect(() => {
    console.log('ALL TRANSACTIONS SAMPLE', allTransactionsData[0]);
  }, [allTransactionsData]);

  const normalizedData = useMemo(() => {
    switch (selectedButton.id) {
      case 2: return winsData;
      case 3: return walletData;
      case 4: return betsData;
      case 5: return withdrawalsData;
      case 6: return commissionData;
      case 7: return rebateData;
      case 8: return transferData;
      case 9: return vipsData;
      default: return allTransactionsData;
    }
  }, [
    selectedButton,
    winsData,
    walletData,
    betsData, 
    withdrawalsData,
    transferData,
    vipsData,
    allTransactionsData,
    commissionData,
    rebateData,
  ]);
  
 

  /* -------------------- Card Renderer -------------------- */
  const renderItem = ({ item }: any) => {
    switch (item?.transactionType) {
      case TransactionType?.BET:
        return <BetsCard {...item} />;
      case TransactionType?.CREDIT_WIN:
        return <WinningCard {...item} />;
      case TransactionType?.RECHARGE:
        return <RechargeCard {...item} />;
      case TransactionType?.WITHDRAW:
        return <WithdrawCard {...item} />;
      case TransactionType?.TRANSFER:
        return <TransferCard {...item} />;
      case TransactionType?.VIP_BONUS:
        return <VipTransactionCard {...item} />;
      case TransactionType?.REBATE:
        return <RebateCard {...item} />;
      case TransactionType?.COMMISSION:
        return <CommissionCard {...item} />;
      default:
        return null;
    }
  };

  /* -------------------- Initial Load -------------------- */
  useEffect(() => {
    handleButtonPress(buttons[0]);
  }, []);



  /* -------------------- UI -------------------- */
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <NewAppHeader
        leftIconPress={() => navigation.goBack()}
        leftIcon={leftArrowHeader}
        centerText="Transactions"
      />

      <HeaderButtonList
        buttonList={buttons}
        onButtonPressed={handleButtonPress}
        selectedButtonObject={selectedButton}
      />

      <TouchableOpacity
        style={{ padding: 12, flexDirection: 'row', alignItems: 'center' }}
        onPress={() => setOpen(true)}
      >
        <Icon name="calendar" size={22} color="#fff" />
        <Text style={{ color: '#fff', marginHorizontal: 10 }}>
          {range.startDate && range.endDate
            ? `${format(range.startDate, 'yyyy-MM-dd')} → ${format(
                range.endDate,
                'yyyy-MM-dd',
              )}`
            : 'Pick range'}
        </Text>
      </TouchableOpacity>

      <DatePickerModal
        locale="en"
        mode="range"
        visible={open}
        onDismiss={() => setOpen(false)}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={({ startDate, endDate }) => {
          setOpen(false);
          setRange({ startDate, endDate });
        }}
      />

      <FlatList
        data={normalizedData}
        renderItem={renderItem}
        keyExtractor={(_, i) => i.toString()}
        ListEmptyComponent={
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>
            {transactionLoader ? 'Loading...' : 'No data available'}
          </Text>
        }
      />
    </View>
  );
};

export default Transactions;


const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  dateText: {
    color: '#fff',
    fontWeight: '600',
  },
  icon: {
    marginRight: 8,
  },
});

