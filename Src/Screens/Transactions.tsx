import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderButtonList from '../Components/HeaderButtonList';
import {AllData, BetsData, HeaderButton, RechargeData, transactionData} from '../types';
import Scale from '../Components/Scale';
import BetsCard from '../Components/BetsCard';
import RechargeCard from '../Components/RechargeCard';
import { leftArrowHeader } from '../../assets/assets';
import NewAppHeader from '../Components/NewAppHeader';

const Transactions = ({navigation}: any) => {
  const [allData, setAllData] = useState<AllData[]>([]);
  const [winData, setWinData] = useState<BetsData[]>([]);
  const [rechargeData, setRechargeData] = useState<RechargeData[]>([]);
  const [betsData, setBetsData] = useState<BetsData[]>([]);
  const [withDrawData, setWithDrawData] = useState<RechargeData[]>([]);
  const [commissionData, setCommissionData] = useState<RechargeData[]>([]);
  const [rebateData, setRebateData] = useState<RechargeData[]>([]);
  const [transferData, setTransferData] = useState<RechargeData[]>([]);
  const [vipData, setVipData] = useState<RechargeData[]>([]);
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

  const handleButtonPress = (button: HeaderButton) => {
    setSelectedButton(button);
  };
  const allDatasVAlues = [
    {
      betAmount: 200,
      beforeBalance: 350,
      afterBalance: 150,
      orderTime: '31-07-2022 12:00:00 PM',
      game: '3 Digit',
      orderNumber: 'PAC1010101920n22',
    },
    {
      betAmount: 200,
      beforeBalance: 350,
      afterBalance: 150,
      orderTime: '31-07-2022 12:00:00 PM',
      game: '3 Digit',
      orderNumber: 'PAC1010101920n22',
    },
    {
      rechargeAmount: 1000,
      beforeBalance: 0,
      afterBalance: 1000,
      rechargeTime: '23-07-2022 12:00:00 PM',
      rechargeNumber: 'REC1010101921111',
      ssr: 'ONLINE',
    },
  ]
  const winsDatas = [
    {
      betAmount: 200,
      beforeBalance: 350,
      afterBalance: 150,
      orderTime: '31-07-2022 12:00:00 PM',
      game: '3 Digit',
      orderNumber: 'PAC1010101920n22',
    },
    {
      betAmount: 200,
      beforeBalance: 350,
      afterBalance: 150,
      orderTime: '31-07-2022 12:00:00 PM',
      game: '3 Digit',
      orderNumber: 'PAC1010101920n22',
    },
  ];
  const rechargeDatas = [
    {
      rechargeAmount: 1000,
      beforeBalance: 0,
      afterBalance: 1000,
      rechargeTime: '23-07-2022 12:00:00 PM',
      rechargeNumber: 'REC1010101921111',
      ssr: 'ONLINE',
    },
    {
      rechargeAmount: 1000,
      beforeBalance: 0,
      afterBalance: 1000,
      rechargeTime: '23-07-2022 12:00:00 PM',
      rechargeNumber: 'REC1010101921111',
      ssr: 'ONLINE',
    },

];
  const betsDatas = [
    {
      betAmount: 200,
      beforeBalance: 350,
      afterBalance: 150,
      orderTime: '31-07-2022 12:00:00 PM',
      game: '3 Digit',
      orderNumber: 'PAC1010101920n22',
    },
    {
      betAmount: 200,
      beforeBalance: 350,
      afterBalance: 150,
      orderTime: '31-07-2022 12:00:00 PM',
      game: '3 Digit',
      orderNumber: 'PAC1010101920n22',
    },
    {
      betAmount: 200,
      beforeBalance: 350,
      afterBalance: 150,
      orderTime: '31-07-2022 12:00:00 PM',
      game: '3 Digit',
      orderNumber: 'PAC1010101920n22',
    },
]
  const withDrawDatas = [
    {
      rechargeAmount: 1000,
      beforeBalance: 0,
      afterBalance: 1000,
      rechargeTime: '23-07-2022 12:00:00 PM',
      rechargeNumber: 'REC1010101921111',
      ssr: 'ONLINE',
    },
    {
      rechargeAmount: 1000,
      beforeBalance: 0,
      afterBalance: 1000,
      rechargeTime: '23-07-2022 12:00:00 PM',
      rechargeNumber: 'REC1010101921111',
      ssr: 'ONLINE',
    },
  ]
  const commissionDatas = [
    {
      rechargeAmount: 1000,
      beforeBalance: 0,
      afterBalance: 1000,
      rechargeTime: '23-07-2022 12:00:00 PM',
      rechargeNumber: 'REC1010101921111',
      ssr: 'ONLINE',
    },
    {
      rechargeAmount: 1000,
      beforeBalance: 0,
      afterBalance: 1000,
      rechargeTime: '23-07-2022 12:00:00 PM',
      rechargeNumber: 'REC1010101921111',
      ssr: 'ONLINE',
    },
  ];
  const rebateDatas = [
    {
      rechargeAmount: 1000,
      beforeBalance: 0,
      afterBalance: 1000,
      rechargeTime: '23-07-2022 12:00:00 PM',
      rechargeNumber: 'REC1010101921111',
      ssr: 'ONLINE',
    },
    {
      rechargeAmount: 1000,
      beforeBalance: 0,
      afterBalance: 1000,
      rechargeTime: '23-07-2022 12:00:00 PM',
      rechargeNumber: 'REC1010101921111',
      ssr: 'ONLINE',
    },

];
  const transferDatas = [
    {
      rechargeAmount: 1000,
      beforeBalance: 0,
      afterBalance: 1000,
      rechargeTime: '23-07-2022 12:00:00 PM',
      rechargeNumber: 'REC1010101921111',
      ssr: 'ONLINE',
    },
    {
      rechargeAmount: 1000,
      beforeBalance: 0,
      afterBalance: 1000,
      rechargeTime: '23-07-2022 12:00:00 PM',
      rechargeNumber: 'REC1010101921111',
      ssr: 'ONLINE',
    },
]
  const vipDatas = [
    {
      rechargeAmount: 1000,
      beforeBalance: 0,
      afterBalance: 1000,
      rechargeTime: '23-07-2022 12:00:00 PM',
      rechargeNumber: 'REC1010101921111',
      ssr: 'ONLINE',
    },
    {
      rechargeAmount: 1000,
      beforeBalance: 0,
      afterBalance: 1000,
      rechargeTime: '23-07-2022 12:00:00 PM',
      rechargeNumber: 'REC1010101921111',
      ssr: 'ONLINE',
    },
]


  useEffect(() => {
    setAllData(allDatasVAlues);
    setWinData(winsDatas);
    setRechargeData(rechargeDatas);
    setBetsData(betsDatas);
    setWithDrawData(withDrawDatas);
    setCommissionData(commissionDatas);
    setRebateData(rebateDatas);
    setTransferData(transferDatas);
    setVipData(vipDatas);
  }, []);
  const renderItem = ({item}: {item: any}) => {
    console.log('Render item:', item);
  
    if (item.betAmount !== undefined) {
      return (
        <BetsCard
          betAmount={item.betAmount}
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
  
  const getSelectedData = () => {
    switch (selectedButton?.id) {
      case 1:
        return allData;
      case 2:
        return winData;
      case 3:
        return rechargeData;
      case 4:
        return betsData;
      case 5:
        return withDrawData;
      case 6:
        return commissionData;
      case 7:
        return rebateData;
      case 8:
        return transferData;
      default:
        return vipData;
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#3E0E0D'}}>
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

<FlatList
  data={getSelectedData() || []}
  renderItem={renderItem}
  keyExtractor={(item, index) => index.toString()}
  ListEmptyComponent={() => <Text style={{color: 'white', textAlign: 'center'}}>No data available</Text>}
/>
  </View>
  );
};


export default Transactions;
