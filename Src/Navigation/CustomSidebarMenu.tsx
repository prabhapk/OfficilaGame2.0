import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';

import Scale from '../Components/Scale';
import { COLORS } from '../Constants/Theme';
import {
  bigSpin,
  cancel,
  drawerHeader,
  drawerLevel,
  freeLottery,
  gifAgent,
  gifLottery,
  gifPromotion,
  gifRefer,
  homeAppIcon,
  promotions,
  rebateMenu,
  robMoney,
  superAgent,
  wallet3dImage1,
  walletIcon,
} from '../../assets/assets';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MenuBarList } from '../Constants/CommonFlatlist';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { formatToDecimal } from '../Utils/Common';
import { useContainerScale } from '../hooks/useContainerScale';
const CustomSidebarMenu = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const logoutFunction = async () => {
    setModalVisible(true);
  };
    const { Scale, verticalScale } = useContainerScale();
    const styles = createStyles(Scale);
  const { isLoggedIn, userDetails } = useSelector(
    (state: RootState) => state.signInSlice,
  );
  console.log('userDetails', userDetails);

  const renderMenuItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.menuContainer}
        onPress={() => navigation.navigate(item.name)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={item.image}
            style={styles.menuImage}
            contentFit="contain"
          />
          <Text style={styles.menuText}>{item.name}</Text>
        </View>
        <Entypo
          name="chevron-right"
          size={Scale(30)}
          color="white"
          style={{ marginLeft: Scale(10) }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.primary }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={homeAppIcon}
            // tintColor={'#fff'}
            contentFit='contain'
            style={{ width: Scale(120), backgroundColor:"white" }}
          />
          {/* <Text style={{ color: '#fff' }}>AppName</Text> */}
          {!isLoggedIn && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignInScreen');
              }}
              style={styles.loginButton}
            >
              <LinearGradient
                colors={['#FF4140', '#FFAD45']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.registerGradient}
              >
                <Text style={{ color: '#fff' }}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Image
            source={cancel}
            style={{ width: Scale(30), height: Scale(30) }}
            tintColor={'#fff'}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{ borderTopWidth: 1, borderTopColor: '#ccc', bottom: 10 }}
      ></View>

      {isLoggedIn && (
        <LinearGradient
          colors={['#FF4242', '#f6c976ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            marginTop: Scale(10),
            backgroundColor: COLORS.secondary,
            borderRadius: 10,
            padding: Scale(10),
            zIndex: 100,
            marginHorizontal: 10,
            borderWidth: 1,
            borderColor: 'yellow',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              marginTop: Scale(10),
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  marginLeft: Scale(5),
                  color: '#fff',
                  fontSize: Scale(16),
                  fontWeight: 'bold',
                }}
              >
                Player {userDetails.id}
              </Text>
              <Image
                source={drawerLevel}
                style={{
                  width: Scale(70),
                  height: Scale(30),
                  marginLeft: Scale(15),
                }}
                resizeMode="contain"
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              marginTop: Scale(40),
            }}
          >
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={wallet3dImage1}
                  style={{ width: Scale(30), height: Scale(30) }}
                />
                <Text
                  style={{
                    marginLeft: Scale(5),
                    color: '#fff',
                    fontSize: Scale(14),
                  }}
                >
                  My Wallet
                </Text>
              </View>
              <Text
                style={{
                  marginLeft: Scale(5),
                  fontSize: Scale(22),
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              >
                ₹ {formatToDecimal(userDetails.walletBalance?.rechargeBalance)}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#FF4242',
                padding: 10,
                borderRadius: 40,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: Scale(14),
                }}
              >
                {'Recharge'}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}

      <View style={styles.referalView}>
        <TouchableOpacity style={styles.refButton}>
          <Image
            source={rebateMenu}
            style={styles.refImage}
            contentFit="contain"
          />
          <Text style={styles.refText}>Rebate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.refButton}>
          <Image
            source={bigSpin}
            style={styles.refImage}
            contentFit="contain"
          />
          <Text style={styles.refText}>Big Spin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.refButton}>
          <Image
            source={robMoney}
            style={styles.refImage}
            contentFit="contain"
          />
          <Text style={styles.refText}>Rob money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.refButton}>
          <Image
            source={freeLottery}
            style={styles.refImage}
            contentFit="contain"
          />
          <Text style={styles.refText}>Free Lottery</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MenuBarList}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ marginTop: Scale(20) }}
        renderItem={renderMenuItem}
      />

      <TouchableOpacity style={{ alignItems: 'center' }}>
        <Image
          source={superAgent}
          style={{ width: '93%', height: Scale(110) }}
          resizeMode={'stretch'}
        />
      </TouchableOpacity>

      <TouchableOpacity style={{ alignItems: 'center' }}>
        <Image
          source={promotions}
          style={{ width: '93%', height: Scale(110) }}
          resizeMode={'stretch'}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const createStyles = (Scale: any) => StyleSheet.create({
  profileImg: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  headingTxt: {
    fontSize: Scale(22),
    letterSpacing: Scale(0.5),
    color: '#595959',
    fontFamily: 'Satoshi-Bold',
  },
  btnNext: {
    backgroundColor: 'rgba(102, 45, 145, 1)',
    width: '90%',
    borderRadius: Scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: Scale(20),
    flexDirection: 'row',
  },
  Txtnextstyle: {
    paddingVertical: 20,
    color: 'white',
    fontSize: Scale(18),
    marginLeft: 10,
    fontFamily: 'Satoshi-Regular',
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    alignItems: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    padding: 8,
    justifyContent: 'space-between',
  },
  loginButton: {
    marginLeft: Scale(10),
  },

  referalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 30,
  },
  refImage: { width: 50, height: 50, resizeMode: 'cover' },
  refText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  refButton: { alignItems: 'center' },
  menuText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  menuImage: { width: 40, height: 40, resizeMode: 'cover' },
  registerGradient: {
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomSidebarMenu;
