import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { walletMini, refresh, lefArrow, checkBox } from '../../assets/assets';
import NewAppHeader from '../Components/NewAppHeader';
import { useContainerScale } from '../hooks/useContainerScale';
import { formatToDecimal } from '../Utils/Common';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { getWalletBalance } from '../Redux/Slice/signInSlice';
const WalletScreenUI = ({navigation}: any) => {
  const [walletAmount, setWalletAmount] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState('');
  const amounts = ['500', '1000', '2000', '5000', '10000', '20000', '50000', '300'];
  const [selectedRechargeOption, setSelectedRechargeOption] = useState<'option1' | 'option2' | null>(null);
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  const dispatch = useDispatch();
  const {mainWalletBalance } = useSelector((state: RootState) => state.signInSlice);
  return (
    <View style={{flex: 1, backgroundColor: '#360400'}}>
      <NewAppHeader
          leftIconPress={() => navigation.goBack()}
          centerText={'Deposit'}
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
          <Text style={styles.amountText}>₹ {formatToDecimal(mainWalletBalance)}</Text>
          <TouchableOpacity onPress={() => dispatch(getWalletBalance())}>
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
        colors={['#f5eceb', 'transparent']}
        style={{
          // backgroundColor: '#909191',
           borderRadius: 10, width: '100%', padding: Scale(10), marginTop: Scale(10)}}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Text style={styles.currentMethod}>
          Current Method: Bank transfer 4
        </Text>
        <Text style={styles.warningText}>
          Please switch to another method if the current method failed.
        </Text>
        </LinearGradient>
        </View>
      </LinearGradient>

      {/* Amount Box */}
      <View style={styles.amountBox}>
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

      <View style={{ marginTop: Scale(20), marginHorizontal: Scale(10) }}>
        <Text style={styles.rangeText}>Min ₹300 {'    '} Max ₹50,000</Text>

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
                  setWalletAmount(amt);
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
    </View>

      {/* Self Service Recharge */}
      <View style={styles.rechargeSection}>
        <Text style={styles.sectionTitle}>Self Service Recharge</Text>
        <TouchableOpacity
    onPress={() => setSelectedRechargeOption('option1')}
    style={[
      styles.bankOptionView,
      {
        borderColor: selectedRechargeOption === 'option1' ? '#FF4242' : 'grey',
      },
    ]}>
    <View style={styles.optionContent}>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Paytm_Logo.png' }}
        style={styles.paytmLogo}
        resizeMode="contain"
      />
      <Text style={styles.bankText}>Bank transfer 4</Text>
    </View>

    {selectedRechargeOption === 'option1' && (
      <Image
        source={checkBox}
        style={styles.checkIcon}
        resizeMode="contain"
      />
    )}
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => setSelectedRechargeOption('option2')}
    style={[
      styles.bankOptionView,
      {
        borderColor: selectedRechargeOption === 'option2' ? '#FF4242' : 'grey',
      },
    ]}>
    <View style={styles.optionContent}>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Paytm_Logo.png' }}
        style={styles.paytmLogo}
        resizeMode="contain"
      />
      <Text style={styles.bankText}>Bank transfer 1</Text>
    </View>

    {selectedRechargeOption === 'option2' && (
      <Image
        source={checkBox}
        style={styles.checkIcon}
        resizeMode="contain"
      />
    )}
  </TouchableOpacity>
      </View>

      {/* Attention Box */}
      <View style={styles.attentionBox}>
        <Text style={styles.attentionTitle}>Attention:</Text>
        <Text style={styles.attentionText}>
          Users are requested to download Paytm UPI App for faster recharge.
        </Text>
      </View>

      {/* Final Red Warning Box */}
      <View style={styles.redWarningBox}>
        <Text style={styles.redWarningText}>
          Due to the normal risk alerts caused by bank control, please feel free to recharge.{'\n'}
          <Text style={styles.redWarningText}>
            If the funds are not received in time, please contact the online customer service for assistance.
          </Text>
        </Text>
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
              <Text style={styles.signInButtonText}>Recharge</Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>
    </View>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
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
    flexWrap: 'wrap',
    gap: Scale(8),
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
    outlineWidth: 0,
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

export default WalletScreenUI;
