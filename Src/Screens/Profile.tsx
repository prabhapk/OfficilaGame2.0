import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Scale from '../Components/Scale';
import {
  profileCommissionImage,
  profileCustomerServiceImage,
  profileLotteriesImage,
  profileTransactionImage,
  tootTipImage,
  vipBadgeBackground,
  vipBadgeZero,
  wallet,
  profileTwentyFourImage1,
} from '../../assets/assets';
import Modal from 'react-native-modal';
import WalletInfoModal from '../Components/Modal/WalletInfoModal';
import { useDispatch } from 'react-redux';
import { persistor, resetState, RootState } from '../Redux/store';
import { setIsLoggedIn } from '../Redux/Slice/signInSlice';
import { useSelector } from 'react-redux';

const ProfileScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [showLogoutButton, setShowLogoutButton] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [isRechargeModalVisible, setRechargeModalVisible] = useState(false);
  const [isWithdrawModalVisible, setWithdrawModalVisible] = useState(false);

  const tabItems = [
    { label: 'Lotteries', image: profileLotteriesImage, route: 'MyBetsScreen' },
    { label: 'Commission', image: profileCommissionImage, route: 'InviteScreen' },
    { label: 'Transactions', image: profileTransactionImage, route: 'Transactions' },
    { label: 'Customer Service', image: profileCustomerServiceImage, route: 'CustomerService' },
  ];

  const toggleModalRecharge = () => setRechargeModalVisible(!isRechargeModalVisible);
  const toggleModalWithdraw = () => setWithdrawModalVisible(!isWithdrawModalVisible);

  const handleLogout = async () => {
    try {
      dispatch(resetState());
      setShowModal(false);
      setShowLogoutButton(false);
      dispatch(setIsLoggedIn(false));
      await persistor.flush();
      persistor.purge();
      navigation.reset({ index: 0, routes: [{ name: 'BottomNavigation' }] });
    } catch (error) {
      console.error('Error resetting state:', error);
    }
  };
const {isLoggedIn} = useSelector((state: RootState) => state.signInSlice);
console.log("asasasasas",isLoggedIn);

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {!isLoggedIn ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('SignInScreen')}
            style={styles.loginWrapper}
          >
            <LinearGradient
              colors={['#FF4140', '#FFAD45']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.loginBox, styles.loginBoxRow]}
            >
              <Text style={styles.loginText}>Please Login</Text>
              <Entypo name="chevron-right" size={30} color="white" style={styles.chevronIcon} />
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={styles.mt20} />
        )}

        {/* Wallet Section */}
        <LinearGradient
          colors={['#851701', '#8F4E01']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.walletCard}
        >
          <Text style={styles.walletTitle}>Total Wallet</Text>
          <Text style={styles.walletAmount}>₹ 0.00</Text>

          <View style={styles.walletRow}>
            <View>
              <View style={styles.rowCenter}>
                <Text style={styles.walletSub}>Recharge Wallet</Text>
                <TouchableOpacity onPress={() => setRechargeModalVisible(true)}>
                  <Image source={tootTipImage} style={styles.tooltipIcon} />
                </TouchableOpacity>
              </View>
              <Text style={styles.walletSub}>₹ 0.00</Text>
            </View>
            <View>
              <View style={styles.rowCenter}>
                <Text style={styles.walletSub}>Withdraw Wallet</Text>
                <TouchableOpacity onPress={() => setWithdrawModalVisible(true)}>
                  <Image source={tootTipImage} style={styles.tooltipIcon} />
                </TouchableOpacity>
              </View>
              <Text style={styles.walletSub}>₹ 0.00</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          {[
            { label: 'Recharge', desc: 'Recharge without limit', route: 'WalletScreen' },
            { label: 'Withdraw', desc: '3 seconds to payment', route: 'Withdraw' },
          ].map((btn, idx) => (
            <LinearGradient
              key={idx}
              colors={['#ED310F', '#F5AF1A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.actionButton}
            >
              <TouchableOpacity onPress={() => navigation.navigate(btn.route)}>
                <View style={styles.rowCenter}>
                  <Text style={styles.buttonText}>{btn.label}</Text>
                  <Image source={wallet} resizeMode="contain" style={styles.buttonIcon} />
                </View>
                <Text style={styles.subText}>{btn.desc}</Text>
              </TouchableOpacity>
            </LinearGradient>
          ))}
        </View>

        {/* VIP Badge */}
        <TouchableOpacity
          onPress={() => navigation.navigate('VipLevelDetailsScreen')}
          style={styles.vipTouchable}
          activeOpacity={0.8}
        >
          <ImageBackground source={vipBadgeBackground} style={styles.vipImageBackground}>
            <View style={styles.vipTopRow}>
              <Image source={vipBadgeZero} resizeMode="contain" style={styles.vipBadgeImage} />
              <View style={styles.vipTopRight}>
                <Text style={styles.vipText}>VIP 1</Text>
                <Text style={styles.vipText}>$500 / $1000</Text>
              </View>
            </View>
            <View style={styles.vipProgressBackground}>
              <View style={styles.vipProgressFill} />
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Bottom Tabs */}
        <View style={styles.bottomTabs}>
          {tabItems.map(item => (
            <TouchableOpacity 
            onPress={() => navigation.navigate(item.route)}
            key={item.label} style={styles.tabCenter}>
              <View>
                <Image source={item.image} style={styles.tabIcon} />
                {item.label === 'Customer Service' && (
                  <Image source={profileTwentyFourImage1} style={styles.tabBadge} />
                )}
              </View>
              <Text style={styles.tabItem}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Rows */}
        {/* {['Password', 'Languages'].map((label, idx) => (
          <View style={styles.inputRow} key={idx}>
            <TouchableOpacity style={styles.inputButton}>
              <Text style={styles.inputLabel}>{label}</Text>
              <Entypo name="chevron-right" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))} */}
  
          <View style={styles.inputRow}>
            <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.inputButton}>
              <Text style={styles.inputLabel}>Password</Text>
              <Entypo name="chevron-right" size={20} color="white" />
            </TouchableOpacity>
          </View>
  

        {/* Logout */}
        {showLogoutButton ? (
          <View style={styles.logoutWrapper}>
            <TouchableOpacity style={styles.logoutButton} onPress={() => setShowModal(true)}>
              <Text style={styles.logoutText}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.mt20} />
        )}

        {/* Modals */}
        <WalletInfoModal
          isVisible={isRechargeModalVisible}
          toggleModal={toggleModalRecharge}
          headerText="Recharge Wallet"
          bodyText="This is wallet balance that can just be used to buy lottery tickets and cant withdraw..."
        />
        <WalletInfoModal
          isVisible={isWithdrawModalVisible}
          toggleModal={toggleModalWithdraw}
          headerText="Withdraw Wallet"
          bodyText="This is wallet balance that can just be used to withdraw and betting..."
        />

        <Modal isVisible={showModal} animationIn="flipInX" animationOut="flipOutX" backdropOpacity={0.5}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Logout?</Text>
            </View>
            <Text style={styles.modalBodyText}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtonRow}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalButton}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={styles.modalButton}>
                <Text style={styles.modalLogoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#360400',
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },

  /* ===== Login ===== */
  loginWrapper: {
    marginHorizontal: 5,
    marginBottom: 16,
  },
  loginBox: {
    borderRadius: 16,
    padding: 16,
    flex: 1,
  },
  loginBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  chevronIcon: {
    marginLeft: 10,
  },
  mt20: {
    marginTop: 20,
  },

  /* ===== Wallet Card ===== */
  walletCard: {
    backgroundColor: '#5a0000',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    marginHorizontal: 5,
  },
  walletTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  walletAmount: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  walletRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletSub: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  tooltipIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },

  /* ===== Action Buttons ===== */
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginHorizontal: 5,
    marginTop: 10,
  },
  actionButton: {
    width: '48%',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    height: 50,
    width: 50,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },

  /* ===== VIP Badge ===== */
  vipTouchable: {
    marginVertical: 20,
  },
  vipImageBackground: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    overflow: 'hidden',
  },
  vipTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  vipBadgeImage: {
    width: 50,
    height: 50,
  },
  vipTopRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  vipText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  vipProgressBackground: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
  },
  vipProgressFill: {
    width: '65%',
    height: '100%',
    backgroundColor: 'red',
    borderRadius: 999,
  },

  /* ===== Bottom Tabs ===== */
  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    marginTop: 20,
  },
  tabCenter: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  tabItem: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'left',
    marginVertical: 5,
  },
  tabIcon: {
    height: 60,
    width: 60,
    marginBottom: 5,
  },
  tabBadge: {
    height: 24,
    width: 24,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },

  /* ===== Inputs / Rows ===== */
  inputRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#944040',
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  inputButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  /* ===== Logout ===== */
  logoutWrapper: {
    marginTop: 40,
  },
  logoutButton: {
    borderWidth: 2,
    borderColor: '#ff5f5f',
    backgroundColor: '#2e0b0b',
    borderRadius: 999,
    paddingVertical: 15,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  logoutText: {
    color: '#ff5f5f',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /* ===== Modal ===== */
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalHeaderText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
  modalBodyText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  modalButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 40,
    justifyContent: 'space-evenly',
  },
  modalButton: {
    borderRadius: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalCancelText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalLogoutText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
  },
});


