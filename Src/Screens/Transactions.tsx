import {View, Text, Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderButtonList from '../Components/HeaderButtonList';
import {AllData, BetsData, HeaderButton, RechargeData, transactionData} from '../types';
import BetsCard from '../Components/BetsCard';
import RechargeCard from '../Components/RechargeCard';
import { leftArrowHeader } from '../../assets/assets';
import NewAppHeader from '../Components/NewAppHeader';
import { useContainerScale } from '../hooks/useContainerScale';
import { DatePickerModal } from 'react-native-paper-dates';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactionsData, getTransferData, getWinsData, getBetsData, getWalletData, getWithdrawalsData, getVipsData } from '../Redux/Slice/TransactionSlice';
import { RootState } from '../Redux/store';
import { COLORS } from '../Constants/Theme';

const Transactions = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {userId} = useSelector(
    (state: RootState) => state.signInSlice
  );
  const [allData, setAllData] = useState<AllData[]>([]);
  const [winData, setWinData] = useState<BetsData[]>([]);
  const [rechargeData, setRechargeData] = useState<RechargeData[]>([]);
  // const [betsData, setBetsData] = useState<BetsData[]>([]);
  const [withDrawData, setWithDrawData] = useState<RechargeData[]>([]);
  const [commissionData, setCommissionData] = useState<RechargeData[]>([]);
  const [rebateData, setRebateData] = useState<RechargeData[]>([]);
  // const [transferData, setTransferData] = useState<RechargeData[]>([]);
  const [vipData, setVipData] = useState<RechargeData[]>([]);
  const { Scale, verticalScale } = useContainerScale();
  const buttons = [
    {id: 1, name: 'All'},
    {id: 2, name: 'WIN'},
    {id: 3, name: 'RECHARGE'},
    {id: 4, name: 'BETS'},
    {id: 5, name: 'WITHDRAW'},
    {id: 6, name: 'COMMISSION'},
    {id: 7, name: 'REBATE'},
    {id: 8, name: 'TRANSFER'},
    {id: 9, name: 'VIP'},
  ];
  const [selectedButton, setSelectedButton] = useState<HeaderButton | null>(
    buttons[0],
  );

  // const handleButtonPress = (button: HeaderButton) => {
  //   setSelectedButton(button);
  // };
  const handleButtonPress = (button: HeaderButton) => {
    setSelectedButton(button);
  
    const dateParams = {
      FromDate: range.startDate
        ? format(range.startDate, "yyyy-MM-dd")
        : "2025-01-01",   // default fallback
      ToDate: range.endDate
        ? format(range.endDate, "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
      UserId: userId,
      Page: 1,
      PageSize: 20,
    };
  
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
      case 8:
        dispatch(getTransferData(dateParams));
        break;
      case 9:
        dispatch(getVipsData(dateParams));
        break;
      default:
        break;
    }
  };
  
const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });

const {
  allTransactionsData,
  transferData,
  walletData,
  withdrawalsData,
  betsData,
  winsData,
  vipsData,
  transactionLoader,
} = useSelector((state: RootState) => state.TransactionSlice);

  const [open, setOpen] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );

  const displayText =
  range.startDate && range.endDate
    ? `${format(range.startDate, 'yyyy-MM-dd')} → ${format(range.endDate, 'yyyy-MM-dd')}`
    : range.startDate
    ? format(range.startDate, 'yyyy-MM-dd')
    : 'Pick range';

    useEffect(() => {
      dispatch(getAllTransactionsData({
        // FromDate: range.startDate,
        // ToDate: range.endDate,
        FromDate: '',
        ToDate: '',
        UserId: userId,
        Page: 1,
        PageSize: 10,
      }))
    }, [
      dispatch,
      range.startDate,
      range.endDate,
      userId,
    ]);

  const renderItem = ({item}: {item: any}) => {
    console.log('Render item:', item);
  
    if (item.amount !== undefined) {
      return (
        <BetsCard
          betAmount={item.amount}
          beforeBalance={item.beforeBalance}
          afterBalance={item.afterBalance}
          orderTime={item.orderTime}
          game={item.game}
          orderNumber={item.orderNumber}
        />
      );
    } else if (item.rechargeAmount !== undefined) {
      return (
        <RechargeCard
          rechargeAmount={item.rechargeAmount}
          beforeBalance={item.beforeBalance}
          afterBalance={item.afterBalance}
          rechargeTime={item.rechargeTime}
          rechargeNumber={item.rechargeNumber}
          ssr={item.ssr}
        />
      );
    } else {
      return <Text style={{color: 'white'}}>Invalid data</Text>;
    }
  };
  
  // const getSelectedData = () => {
  //   switch (selectedButton?.id) {
  //     case 1:
  //       return allData;
  //     case 2:
  //       return winData;
  //     case 3:
  //       return rechargeData;
  //     case 4:
  //       return betsData;
  //     case 5:
  //       return withDrawData;
  //     case 6:
  //       return commissionData;
  //     case 7:
  //       return rebateData;
  //     case 8:
  //       return transferData;
  //     default:
  //       return vipData;
  //   }
  // };

  const getSelectedData = () => {
    switch (selectedButton?.id) {
      case 1:
        return allTransactionsData;
      case 2:
        return winsData;
      case 3:
        return walletData;
      case 4:
        return betsData;
      case 5:
        return withdrawalsData;
      case 8:
        return transferData;
      case 9:
        return vipsData;
      default:
        return [];
    }
  };
  useEffect(() => {
    handleButtonPress(buttons[0]);
  }, []);

 




  
  return (
    <View style={{flex: 1, backgroundColor: COLORS.primary}}>
      <NewAppHeader
          leftIconPress={() => navigation.goBack()}
          rightIconPress={() => navigation.navigate('SignUpScreen')}
          leftIcon={leftArrowHeader}
          centerText={'Transactions'}
        />
    <HeaderButtonList
      buttonList={buttons}
      onButtonPressed={handleButtonPress}
      selectedButtonObject = {selectedButton}
    />
    <View style={{}}>
    <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        <Icon name="calendar" size={22} color="#fff" style={styles.icon} />
        <Text style={styles.dateText}>{displayText}</Text>
        <Icon name="chevron-down" size={20} color="#fff" />
      </TouchableOpacity>
        <DatePickerModal
          locale="en"
          mode="range"
          visible={open}
          onDismiss={onDismiss}
          startDate={range.startDate}
          endDate={range.endDate}
          onConfirm={onConfirm}
          startYear={2025}
          endYear={2028}
        />
      </View>

      <FlatList
  data={getSelectedData() || []}
  renderItem={renderItem}
  keyExtractor={(item, index) => index.toString()}
  ListEmptyComponent={() =>
    transactionLoader ? (
      <Text style={{color: 'white', textAlign: 'center'}}>Loading...</Text>
    ) : (
      <Text style={{color: 'white', textAlign: 'center'}}>No data available</Text>
    )
  }
/>
  </View>
  );
};

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

export default Transactions;
