import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Scale from '../Components/Scale';
import { walletMini, refresh, lefArrow, checkBox } from '../../assets/assets';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Divider } from '@rneui/base';
import Modal from 'react-native-modal';
import CommonTextInput from '../Components/CommonTextInput';
import NewAppHeader from '../Components/NewAppHeader';


const Withdraw = ({navigation}: any) => {
  const [walletAmount, setWalletAmount] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState('');
  const amounts = ['₹100', '₹200', '₹500', '₹1000'];
  const actualAmount = walletAmount / 0.03;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [withdrawableAmount, setWithdrawableAmount] = useState('');
  const [BankAccountModalVisible, setBankAccountModalVisible] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: '#360400'}}>
      <NewAppHeader
          leftIconPress={() => navigation.goBack()}
          centerText={'Withdraw'}
        />
    <ScrollView style={styles.container}>
      {/* Wallet Header */}
      <LinearGradient
        colors={['#FF4242', '#f6c976ff']}
        style={styles.walletHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <View style={styles.walletTopRow}>
          <View style= {{flexDirection: 'column'}}> 
          <View style={styles.walletInfo}>
            <Image source={walletMini} style={styles.iconSmall} />
            <Text style={styles.walletTitle}>Total Wallet</Text>
          </View>
            <View style={styles.amountRow}>
          <Text style={styles.amountText}>₹ 1,00,000</Text>
          <TouchableOpacity onPress={()=>{
            setBankAccountModalVisible(true)
          }
          }> 
          <Image source={refresh} style={styles.iconMedium} />
          </TouchableOpacity>
        </View>
        </View>
        <TouchableOpacity
        onPress={()=> navigation.navigate('Transactions')}
        style={styles.rechargeRecords}>
            <Text style={styles.rechargeText}>Recharge{'\n'}records</Text>
            <Image
              source={lefArrow}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.amountRow}>
          <Text style={styles.amountText}>₹ 0</Text>
          <Image source={refresh} style={styles.iconMedium} />
        </View> */}
     
        <View style ={{}}>
        <LinearGradient
        colors={['black', 'transparent']}
        style={{
          // backgroundColor: '#909191',
           borderRadius: 10, width: '100%', padding: Scale(10), marginTop: Scale(10)}}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
            <View style ={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View> 
        <Text style={styles.currentMethod}>
         Transfer
        </Text>
        <Text style={styles.warningText}>
          Converting to no withdrawal can earn an
        </Text>
        </View>
        <View style ={{right: Scale(20)}}>
          <TouchableOpacity
          onPress = {() => {
            setIsModalVisible(true);
          }}
          >
            <Image source={lefArrow} style={styles.arrowIcon} resizeMode="contain" />
            </TouchableOpacity>
        </View>
        </View>
        </LinearGradient>
        </View>
      </LinearGradient>

      {/* Amount Box */}
      <View style={styles.amountBox}>
        <Text style ={{fontSize: Scale(20), fontWeight: 'bold', color: '#fff', marginVertical: Scale(10)}}>
            Transfer to bank account
        </Text>
        <TouchableOpacity
        onPress={() => navigation.navigate('AddBankAccount')}
        style ={{ backgroundColor: '#360400', borderRadius: 10, padding: Scale(12), marginBottom: Scale(12), alignItems: 'center', alignSelf: 'center', width: '100%', }}>

        <AntDesign name="plus" size={Scale(30)} color="#FF4242" />
            <Text style ={{ textAlign: 'center', fontSize: Scale(16), color: '#FF4242', fontWeight: 'bold', marginVertical: Scale(10) }}>
                Add Bank Account
            </Text>
        </TouchableOpacity>
    </View>

      {/* Self Service Recharge */}
      <View style={styles.rechargeSection}>
        <Text style={styles.sectionTitle}>Withdrawable Amount</Text>
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Please enter the amount"
          placeholderTextColor="#999"
          value={walletAmount}
          onChangeText={text => {
            setWalletAmount(text);
            setSelectedAmount('');
          }}
          keyboardType="numeric"
          maxLength={10}
        />
      </View>
      <Text style={[styles.sectionTitle, {marginVertical: Scale(20)}]}>Actual amount received:$ {actualAmount} </Text>
      <Divider style={{marginVertical: Scale(10)}} />
      <Text style ={{fontSize: Scale(16), fontWeight: 'bold', color: '#fff', marginVertical: Scale(10)}}>
          Withdrawal will be charged with 3% of withdraw fee will be charged.
      </Text>
      <Text style ={{fontSize: Scale(16), fontWeight: 'bold', color: '#fff', marginVertical: Scale(10)}}>
          Each user could withdraw (3) times per day.
      </Text>
      <Text style ={{fontSize: Scale(16), fontWeight: 'bold', color: '#fff', marginVertical: Scale(10)}}>
          Note: Withdrawal may be delayed due to bank issues. In this case, the withdrawn amount will be returned to your wallet.
          Thank you for your patience.
      </Text>
      <Text style ={{fontSize: Scale(16), fontWeight: 'bold', color: '#fff', marginVertical: Scale(10)}}>
         Our platforms withdrawal delay compensation polices.
      </Text>
      <Text style ={{fontSize: Scale(16), fontWeight: 'bold', color: '#fff', marginVertical: Scale(10)}}>
         1. Within 24 hours to 72 hours - 5% of withdrawal amount.
      </Text>
      <Text style ={{fontSize: Scale(16), fontWeight: 'bold', color: '#fff', marginVertical: Scale(10)}}>
         2. Within 72 hours to 168 hours - 30% of withdrawal amount.
      </Text>
      <Text style ={{fontSize: Scale(16), fontWeight: 'bold', color: '#fff', marginVertical: Scale(10)}}>
        Over 168 hours - 100% compensation of withdrawal amount.
      </Text>
      <Text style ={{fontSize: Scale(16), fontWeight: 'bold', color: '#fff', marginVertical: Scale(10)}}>
       Note: No Compensation of payment within 24 hours. Compensation will be added to user's wallet after his bank account's credited. To claim the compensation, user have to contact customer service.
      </Text>
      </View>
      {/* Modal  */}
      <View>
<Modal
  isVisible={isModalVisible}
  animationIn="flipInY"
  animationOut="flipOutY"
  animationInTiming={500}
  animationOutTiming={500}
  style={{
    justifyContent: 'flex-end',
    margin: 0,
  }}
>
  <KeyboardAvoidingView
    style={{ flex: 1, justifyContent: 'flex-end' }}
  >
    <View
      style={{
        backgroundColor: '#360400',
        borderRadius: 10,
        padding: 20,
        // marginBottom: 16,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: Scale(20),
        }}
      >
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: Scale(16),
          }}
        >
          Transfer
        </Text>
        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
          <AntDesign
            name={'delete'}
            size={Scale(18)}
            color={'white'}
            style={{ marginRight: Scale(10) }}
          />
        </TouchableOpacity>
      </View>

      {/* TextInput wrapper */}
      <View
        style={{
          borderWidth: 1,
          borderColor: '#FF4242',
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 4,
          marginTop: 10,
        }}
      >
        <TextInput
          style={{
            fontSize: Scale(16),
            color: 'white',
            fontWeight: 'bold',
          }}
          placeholder="Enter Withdrawable amount"
          placeholderTextColor="#999"
          value={withdrawableAmount}
          onChangeText={text => setWithdrawableAmount(text)}
          keyboardType="numeric"
          maxLength={10}
        />
      </View>
      <View style={{ marginTop: Scale(20), marginHorizontal: Scale(2) }}>
        <View style={styles.amountChipsRow}>
          {amounts.map((amt, i) => {
            const isSelected = selectedAmount === amt;

            const chipContent = (
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.activeChipText,
                ]}>
                {amt}
              </Text>
            );

            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setWithdrawableAmount(amt);
                  setSelectedAmount(amt);
                }}
                style={{ borderRadius: Scale(8), overflow: 'hidden' }}>
                {isSelected ? (
                  <LinearGradient
                    colors={['#FF4242', '#f6c976']}
                    // start={{ x: 0, y: 0 }}
                    // end={{ x: 1, y: 0 }}
                    style={styles.amountChip}>
                    {chipContent}
                  </LinearGradient>
                ) : (
                  <View style={styles.amountChip}>{chipContent}</View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <Text style={{ marginTop: Scale(10), marginHorizontal: Scale(10), color: 'white', fontSize: Scale(12), fontWeight: '500' }}>
        After clicking Confirm, your withdrawable balance will be converted into Recharge wallet and you will the corresponding bonus. 
      </Text>
      <Divider style={{ marginVertical: Scale(20), marginHorizontal: Scale(10) }} />
      <View style ={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{ color: 'white', fontSize: Scale(12), fontWeight: '500'}}>
        Will get:
      </Text>
      <Text style={{ color: 'white', fontSize: Scale(16), fontWeight: 'bold', marginLeft: Scale(5)}}>
        ₹103.00
      </Text>
      </View>
      <View style={{marginTop: Scale(10), marginHorizontal: Scale(10)}}>
      <TouchableOpacity style={styles.buttonWrapper}>
            <LinearGradient
              colors={['#FF4140', '#FFAD45']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signInButton}
            >
              <Text style={styles.signInButtonText}>Withdraw</Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>
    </View>
  </KeyboardAvoidingView>
</Modal>

      </View>

      {/* Bank account details modal  */}

      <View>
<Modal
  isVisible={BankAccountModalVisible}
  animationIn="flipInY"
  animationOut="flipOutY"
  animationInTiming={500}
  animationOutTiming={500}
  style={{
    justifyContent: 'flex-end',
    margin: 0,
  }}
>
  <KeyboardAvoidingView
    style={{ flex: 1, justifyContent: 'flex-end' }}
  >
    <View
      style={{
        backgroundColor: '#360400',
        borderRadius: 10,
        padding: 20,
        // marginBottom: 16,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: Scale(20),
        }}
      >
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: Scale(16),
          }}
        >
         Choose a bank account
        </Text>
        <TouchableOpacity onPress={() => setBankAccountModalVisible(false)}>
          <AntDesign
            name={'close'}
            size={Scale(18)}
            color={'white'}
            style={{ marginRight: Scale(10) }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={{marginTop: Scale(10), marginHorizontal: Scale(10), flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', borderColor: '#FF4242', borderWidth: 1, borderRadius: 10, padding: Scale(15)}}>
          <View style ={{flexDirection: 'row', alignItems: 'center',}}> 
        <Entypo
            name={'wallet'}
            size={Scale(30)}
            color={'white'}
            style={{ marginRight: Scale(20) }}
          />
       
        <View>
          <Text style ={{fontSize: Scale(16), fontWeight: 'bold', color: '#fff',}}>
            Beckham
          </Text>
          <Text style ={{fontSize: Scale(12), fontWeight: 'bold', color: '#fff',}}>
           *********1234
          </Text>
        </View>
        </View>

        <TouchableOpacity style ={{flexDirection: 'row', alignItems: 'center',bottom: Scale(5)}}>
        <Entypo
            name={'edit'}
            size={Scale(14)}
            color={'#FF4242'}
            style={{ marginRight: Scale(5) }}
          />
          <View>
          <Text style ={{fontSize: Scale(12), fontWeight: 'bold', color: '#FF4242',}}>
              Edit
            </Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>{
        navigation.navigate('AddBankAccount');
        setBankAccountModalVisible(false)

        }
      }
        style ={{ backgroundColor: '#360400', borderRadius: 10, padding: Scale(12), marginVertical: Scale(10), alignItems: 'center', alignSelf: 'center', width: '100%', }}>

        <AntDesign name="plus" size={Scale(30)} color="#FF4242" />
            <Text style ={{ textAlign: 'center', fontSize: Scale(16), color: '#FF4242', fontWeight: 'bold', marginVertical: Scale(10) }}>
                Add Bank Account
            </Text>
        </TouchableOpacity>

    </View>
  </KeyboardAvoidingView>
</Modal>

      </View>

    </ScrollView>
    <View style={{marginBottom: Scale(10)}}>
      <TouchableOpacity style={styles.buttonWrapper}>
            <LinearGradient
              colors={['#FF4140', '#FFAD45']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signInButton}
            >
              <Text style={styles.signInButtonText}>Withdraw</Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#360400',
    padding: Scale(10),
  },
  walletHeader: {
    borderRadius: 12,
    padding: Scale(16),
    marginBottom: Scale(12),
  },
  walletTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSmall: {
    width: Scale(18),
    height: Scale(18),
    marginRight: Scale(6),
  },
  walletTitle: {
    fontSize: Scale(16),
    color: '#fff',
    fontWeight: 'bold',
  },
  rechargeRecords: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rechargeText: {
    color: '#fff',
    fontSize: Scale(14),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  arrowIcon: {
    width: Scale(14),
    height: Scale(14),
    transform: [{ rotate: '180deg' }],
    marginHorizontal: Scale(10),
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Scale(12),
  },
  amountText: {
    fontSize: Scale(26),
    color: '#fff',
    fontWeight: 'bold',
    maxWidth: Scale(150),
  },
  iconMedium: {
    width: Scale(30),
    height: Scale(30),
    marginLeft: Scale(10),
  },
  currentMethod: {
    marginTop: Scale(12),
    color: '#fff',
    fontWeight: '500',
  },
  warningText: {
    color: '#FFF',
    fontSize: Scale(12),
    marginTop: Scale(4),
    width: Scale(300),
  },
  amountBox: {
    backgroundColor: '#47231E',
    borderRadius: 10,
    padding: Scale(12),
    marginBottom: Scale(12),
  },
  amountInput: {
    color: '#fff',
    fontSize: Scale(20),
    fontWeight: 'bold',
    marginBottom: Scale(4),
  },
  rangeText: {
    color: '#fff',
    fontSize: Scale(12),
    marginBottom: Scale(10),
  },
  amountChipsRow: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    gap: Scale(5),
  },
  amountChip: {
    backgroundColor: '#4B3737',
    borderRadius: 8,
    paddingVertical: Scale(6),
    paddingHorizontal: Scale(16),
    marginBottom: Scale(8),
    width: Scale(80),
    marginTop: Scale(10),
  },
  chipText: {
    color: '#fff',
    fontSize: Scale(14),
    textAlign: 'center',
    paddingHorizontal: Scale(4),
    paddingVertical: Scale(4),
    fontWeight: 'bold',

  },
  activeChip: {
    backgroundColor: 'linear-gradient(to right, #FF4242, #f6c976ff)',
  },
  activeChipText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rechargeSection: {
    backgroundColor: '#47231E',
    borderRadius: 10,
    padding: Scale(12),
    marginBottom: Scale(12),
  },
  sectionTitle: {
    color: '#fff',
    fontSize: Scale(16),
    fontWeight: 'bold',
    marginBottom: Scale(8),
  },
  bankOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: Scale(10),
    marginTop: Scale(10),
  },
  bankOptionView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#47231E',
    borderWidth: 1,
    borderRadius: 10,
    padding: Scale(10),
    marginVertical: Scale(10),
  },
  paytmLogo: {
    width: Scale(28),
    height: Scale(28),
    marginRight: Scale(10),
  },
  bankText: {
    color: '#fff',
    fontSize: Scale(14),
    fontWeight: '500',
  },
  attentionBox: {
    backgroundColor: '#6E4B44',
    padding: Scale(10),
    borderRadius: 8,
    marginBottom: Scale(10),
  },
  attentionTitle: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: Scale(16),
  },
  attentionText: {
    color: '#fff',
    fontSize: Scale(14),
    marginVertical: Scale(5),
    textAlign: 'justify',
  },
  redWarningBox: {
    backgroundColor: '#5A1414',
    padding: Scale(10),
    borderRadius: 8,
    marginVertical: Scale(10),
  },
  redWarningText: {
    color: '#FF6464',
    fontSize: Scale(14),
    textAlign: 'justify',
    marginVertical: Scale(10),
    lineHeight: Scale(25),
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#442727',
    borderColor: '#FF4242',
    borderWidth: 3,
    borderRadius: Scale(12),
    height: Scale(48),
    paddingHorizontal: Scale(10),
    width: '100%',
  },
  textInput: {
    flex: 1,
    fontSize: Scale(16),
    color: 'white',
    fontWeight: 'bold',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    width: Scale(20),
    height: Scale(20),
    position: 'absolute',
    right: Scale(20),
  },
  buttonWrapper: {
    marginTop: Scale(10),
    marginHorizontal: Scale(20),
  },
  signInButton: {
    paddingVertical: Scale(14),
    borderRadius: Scale(25),
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#fff',
    fontSize: Scale(16),
    fontWeight: 'bold',
  },
});

export default Withdraw;
