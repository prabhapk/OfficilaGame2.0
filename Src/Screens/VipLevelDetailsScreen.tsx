import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Scale from '../Components/Scale';
import {
  bonusCash,
  levelEightBadge,
  levelFiveBadge,
  levelFourBadge,
  levelNineBadge,
  levelOneBadge,
  levelSevenBadge,
  levelSixBadge,
  levelThreeBadge,
  levelTwoBadge,
  levelZeroBadge,
  spin,
  vipBadgeZero,
} from '../../assets/assets';
import VipCard from '../Components/VipCard';
import NewAppHeader from '../Components/NewAppHeader';
const VipLevelDetailsScreen = ({navigation}: any) => {
  const [selectedVipIndex, setSelectedVipIndex] = useState(0);
  const tableDatas = [
    {id: 1, bonus: '0', spin: 'x0', image: levelZeroBadge},
    {id: 2, bonus: '8', spin: 'x2', image: levelOneBadge},
    {id: 3, bonus: '5', spin: 'x2', image: levelTwoBadge},
    {id: 4, bonus: '198', spin: 'x5', image: levelThreeBadge},
    {id: 5, bonus: '1300', spin: '20', image: levelFourBadge},
    {id: 6, bonus: '2300', spin: 'x50', image: levelFiveBadge},
    {id: 7, bonus: '13000', spin: 'x200', image: levelSixBadge},
    {id: 8, bonus: '23000', spin: 'x500', image: levelSevenBadge},
    {id: 9, bonus: '130000', spin: 'x1000', image: levelEightBadge},
    {id: 10, bonus: '560000', spin: 'x4000', image: levelNineBadge},
  ];
  const vipCardTargets = [
    300, 1000, 10000, 50000, 100000, 500000, 1000000, 2000000, 5000000,
    10000000,
  ];
  const vipCardDatas = [
    {
      target: 300,
      image: vipBadgeZero,
    },
    {
      target: 1000,
      image: vipBadgeZero,
    },
    {
      target: 10000,
      image: vipBadgeZero,
    },
    {
      target: 50000,
      image: vipBadgeZero,
    },
    {
      target: 100000,
      image: vipBadgeZero,
    },
    {
      target: 500000,
      image: vipBadgeZero,
    },
    {
      target: 1000000,
      image: vipBadgeZero,
    },
    {
      target: 2000000,
      image: vipBadgeZero,
    },
    {target: 5000000, image: vipBadgeZero},
    {target: 10000000, image: vipBadgeZero},
  ];

  const tableRenderData = ({item, index}: any) => (
    <TouchableOpacity
      style={[
        styles.tableRowContainer,
        selectedVipIndex === index && {backgroundColor: 'red'}, // highlight
      ]}
      onPress={() => setSelectedVipIndex(index)}>
      {/* VIP Group */}
      <View style={styles.vipColumn}>
        <Image source={item.image} style={styles.vipImage} />
        <Text style={styles.vipText}>VIP {item.id - 1}</Text>
      </View>

      {/* Rewards Group */}
      <View style={styles.rewardColumn}>
        <View style={styles.bonusContainer}>
          <View style={styles.bonusRow}>
            <Image source={bonusCash} style={styles.bonusIcon} />
            <Text style={styles.bonusText}>Bonus</Text>
          </View>
          <Text style={styles.bonusText}>₹{item.bonus}</Text>
        </View>
        <View style={styles.spinContainer}>
          <View style={styles.spinRow}>
            <Image source={spin} style={styles.spinIcon} />
            <Text style={styles.spinText}>Spin</Text>
          </View>
          <Text style={styles.spinText}>{item.spin}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#360400'}}>
      <NewAppHeader
        leftIconPress={() => navigation.goBack()}
        centerText={'VIP'}
      />
      <VipCard
        headerText={`V${selectedVipIndex}`}
        bottomText={`Recharge ₹${
          vipCardTargets[selectedVipIndex]
        } more to reach level VIP${selectedVipIndex + 1}`}
        badgeImage={vipCardDatas[selectedVipIndex].image}
      />
      <ScrollView>
        <View style={{marginTop: Scale(10), marginHorizontal: Scale(10)}}>
          <View style={styles.vipHeaderContainer}>
            <Text style={[styles.vipHeaderText, {flex: 1}]}>VIP LEVEL</Text>
            <Text style={[styles.vipHeaderText, {flex: 2}]}>REWARD</Text>
          </View>

          <FlatList
            data={tableDatas}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={tableRenderData}
            style={{
              flexGrow: 1,
            }}
            contentContainerStyle={{paddingBottom: 100}}
          />
        </View>
      </ScrollView>
      <View style={styles.fixedRechargeContainer}>
        <TouchableOpacity style={styles.buttonWrapper}>
          <LinearGradient
            colors={['#FF4140', '#FFAD45']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.signInButton}>  
            <Text style={styles.signInButtonText}>Recharge</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  walletCard: {
    borderRadius: Scale(14),
    backgroundColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '98%',
  },
  walletTitle: {
    fontSize: Scale(30),
    fontWeight: 'bold',
    color: 'white',
  },
  walletRow: {
    flexDirection: 'row',
    marginTop: Scale(10),
  },
  walletSub: {
    fontSize: Scale(18),
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: Scale(20),
    paddingVertical: Scale(5),
  },
  buttonWrapper: {
    marginTop: Scale(10),
    marginHorizontal: Scale(20),
  },
  signInButton: {
    paddingVertical: Scale(14),
    borderRadius: Scale(20),
    alignItems: 'center',
    width: Scale(350),
  },
  signInButtonText: {
    color: '#fff',
    fontSize: Scale(16),
    fontWeight: 'bold',
    paddingHorizontal: Scale(10),
  },
  fixedRechargeContainer: {
    position: 'absolute',
    bottom: Scale(10),
    left: Scale(0),
    right: Scale(0),
    alignItems: 'center',
  },
  vipHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#812B2B',
    padding: Scale(10),
    borderTopRightRadius: Scale(10),
    borderTopLeftRadius: Scale(10),
  },
  vipHeaderText: {
    fontSize: Scale(16),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  tableRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#540F0F',
    paddingVertical: Scale(8),
    paddingHorizontal: Scale(10),
    borderBottomWidth: Scale(1),
    borderColor: '#812B2B',
  },
  vipColumn: {
    flex: 1,
    alignItems: 'center',
  },
  vipImage: {
    width: Scale(55),
    height: Scale(55),
    resizeMode: 'contain',
  },
  vipText: {
    fontSize: Scale(12),
    fontWeight: 'bold',
    color: '#fff',
    marginTop: Scale(4),
  },
  rewardColumn: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bonusContainer: {
    alignItems: 'center',
  },
  bonusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Scale(4),
  },
  bonusIcon: {
    width: Scale(22),
    height: Scale(22),
    resizeMode: 'contain',
    marginRight: Scale(4),
  },
  bonusText: {
    fontSize: Scale(13),
    fontWeight: 'bold',
    color: '#fff',
  },
  spinContainer: {
    alignItems: 'center',
  },
  spinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Scale(4),
  },
  spinIcon: {
    width: Scale(22),
    height: Scale(22),
    resizeMode: 'contain',
    marginRight: Scale(4),
  },
  spinText: {
    fontSize: Scale(13),
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default VipLevelDetailsScreen;
