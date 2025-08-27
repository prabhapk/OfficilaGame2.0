import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import Scale from '../Components/Scale';
import CommonTextInput from '../Components/CommonTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  lefArrow,
  loginImageBackground,
  referral,
  signInCustomerLogo,
  signInLogo,
} from '../../assets/assets';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { setMobileNumber, setOtp, setReferralCode, setIsEighteenPlus, setIsNotify, GetRegistrationOtp, VerifyRegisterationOtp } from '../Redux/Slice/signUpSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
const SignUpScreen = ({ navigation }: any) => {

  const dispatch = useDispatch();
  const { mobileNumber, otp, referralCode, isEighteenPlus, isNotify } = useSelector(
    (state: RootState) => state.signUpSlice,
  );
  const [countdown, setCountdown] = useState(0);

  const mobileRegex = /^\d{10}$/;
  const otpRegex = /^\d{6}$/;

  const isFormValid =
    mobileRegex.test(mobileNumber) &&
    otpRegex.test(otp) &&
    isEighteenPlus &&
    isNotify;
  const mobileNumberValid = mobileRegex.test(mobileNumber);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  }

  const handleGetOtp = async () => {
    if (mobileNumberValid) {
      const resultAction = await dispatch(GetRegistrationOtp({ mobileNumber }));
      setCountdown(60);
      unwrapResult(resultAction);
      Toast.show({
        type: 'success',
        text1: 'OTP sent successfully',
        position: 'top',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid mobile number',
        position: 'top',
      });
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleMobileNumber = (value: string) => {
    dispatch(setMobileNumber(value));
  };
  const handleOtp = (value: string) => {
    dispatch(setOtp(value));
  };

  const handleReferralCode = (value: string) => {
    dispatch(setReferralCode(value));
  };

  const handleVerifyOtp = async () => {
    console.log('request handddNext',);
    try {
      const resultAction = await dispatch(
        VerifyRegisterationOtp({
          mobileNumber,
          otp,
          referralCode,
          navigation: navigation,
        }),
      );
      console.log('request', resultAction);

      unwrapResult(resultAction);
      Toast.show({
        type: 'success',
        text1: 'OTP Verified successfully',
        position: 'top',
      });
    } catch (error: any) {
      console.log('error', error);
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid otp',
        position: 'top',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: Scale(30) }}>
        <ImageBackground source={loginImageBackground} style={styles.topImage}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={lefArrow}
              style={styles.leftArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.bottomContainer}>
          <View style={styles.logoHeader}>
            <Image
              source={signInLogo}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.headerText}>Sign up</Text>
          </View>

          {/* Inputs */}
          <View style={styles.inputWrapper}>
            {/* Mobile number */}
            <CommonTextInput
              placeholderText="Enter Mobile number"
              value={mobileNumber}
              keyboardType="phone-pad"
              onChange={handleMobileNumber}
              isDisabled={false}
              secureTextEntry={false}
              maxChar={10}
              leftIcon={
                <Ionicons name="call-outline" size={Scale(18)} color="#999" />
              }
              leftText={true}
            />
            {mobileNumber && !mobileRegex.test(mobileNumber) && (
              <Text style={{ color: 'red', fontSize: Scale(12), marginLeft: Scale(10), marginBottom: Scale(10), }}>
                Mobile number must be exactly 10 digits
              </Text>
            )}

            {/* otp  */}
            <View style={styles.inputSpacing}>
              <CommonTextInput
                placeholderText="Enter OTP"
                value={otp}
                onChange={handleOtp}
                isDisabled={false}
                secureTextEntry={false}
                keyboardType="numeric"
                maxChar={6}
                leftIcon={
                  <MaterialIcons
                    name="verified-user"
                    size={Scale(18)}
                    color="#999"
                  />
                }

                rightButton={
                  countdown > 0 ? (
                    <Text style={styles.getOtpText}>
                      {countdown}s
                    </Text>
                  ) : (
                    <TouchableOpacity onPress={handleGetOtp}>
                      {/* // <TouchableOpacity onPress={showToast}> */}
                      <Text style={styles.getOtpText}>GET OTP</Text>
                    </TouchableOpacity>
                  )
                }
              />
              {otp && !otpRegex.test(otp) && (
                <Text style={{
                  color: 'red', fontSize: Scale(12), marginLeft: Scale(10),
                  marginBottom: Scale(10),
                }}>
                  OTP must be exactly 6 digits
                </Text>
              )}
            </View>
            {/* Referral Code */}
            <View style={styles.inputSpacing}>
              <CommonTextInput
                placeholderText="Referral Code"
                value={referralCode}
                onChange={handleReferralCode}
                isDisabled={false}
                secureTextEntry={false}
                leftIcon={
                  <Image
                    source={referral}
                    style={{ width: Scale(18), height: Scale(18) }}
                    resizeMode="contain"
                    tintColor={'#999'}
                  />
                }
              />
            </View>
          </View>
          <View style={{ marginHorizontal: Scale(10) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: Scale(10), marginTop: Scale(10) }}>
              <TouchableOpacity
                style={styles.container}
                onPress={() => dispatch(setIsEighteenPlus(!isEighteenPlus))}>
                <View
                  style={[styles.circle, isEighteenPlus && styles.checkedCircle]}>
                  {isEighteenPlus && (
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  )}
                </View>
              </TouchableOpacity>
              <Text style={styles.label}>I confirm I am 18+</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Scale(20), marginHorizontal: Scale(10) }}>
              <TouchableOpacity
                style={styles.container}
                onPress={() => dispatch(setIsNotify(!isNotify))}>
                <View style={[styles.circle, isNotify && styles.checkedCircle]}>
                  {isNotify && (
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  )}
                </View>

              </TouchableOpacity>
              <Text style={styles.label}>
                Allow us to notify you important winning information through
                this mobile number
              </Text>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            disabled={!mobileNumber || !otp || !isEighteenPlus || !isNotify}

            onPress={() => handleVerifyOtp()}
            style={[styles.buttonWrapper,
            { opacity: isFormValid ? 1 : 0.5 }
            ]}>
            <LinearGradient
              colors={['#FF4140', '#FFAD45']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signInButton}>
              <Text style={styles.signInButtonText}>NEXT</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.accountTextView}>
            <Text style={styles.accountText}>
              Already have an account? {''}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}>
              <Text style={styles.siginText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#360400',
  },
  topImage: {
    width: '100%',
    height: Scale(260),
  },
  bottomContainer: {
    backgroundColor: '#360400',
    borderTopRightRadius: Scale(80),
    marginTop: -Scale(70),
    paddingBottom: Scale(30),
  },
  logoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Scale(20),
    marginTop: Scale(30),
  },
  logo: {
    width: Scale(40),
    height: Scale(40),
  },
  headerText: {
    fontSize: Scale(36),
    fontWeight: 'bold',
    color: 'white',
    marginLeft: Scale(10),
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2e0b0b',
    borderRadius: 999,
    marginHorizontal: Scale(20),
    marginTop: Scale(40),
    padding: Scale(4),
    borderWidth: 1,
    borderColor: '#ff5f5f',
  },
  tab: {
    flex: 1,
    paddingVertical: Scale(12),
    borderRadius: Scale(25),
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    borderColor: '#ff5f5f',
    borderWidth: 1,
  },
  tabText: {
    fontSize: Scale(16),
    fontWeight: 'bold',
  },
  activeText: {
    color: '#ff5f5f',
  },
  inactiveText: {
    color: '#ff5f5f',
    opacity: 0.6,
  },
  inputWrapper: {
    marginHorizontal: Scale(20),
    marginTop: Scale(30),
  },
  inputSpacing: {
    marginTop: Scale(10),
  },
  forgotPassword: {
    // marginTop: Scale(10),
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#FFAD45',
    fontSize: Scale(16),
    fontWeight: 'bold',
  },
  buttonWrapper: {
    marginTop: Scale(30),
    marginHorizontal: Scale(20),
  },
  buttonWrapperRegister: {
    marginTop: Scale(30),
    marginHorizontal: Scale(20),
    paddingVertical: Scale(14),
    borderRadius: Scale(25),
    alignItems: 'center',
    borderColor: '#FFAD45',
    borderWidth: 1,
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
  registerText: {
    color: '#fff',
    fontSize: Scale(16),
    fontWeight: 'bold',
  },
  getOtpText: {
    color: '#ff5f5f',
    fontWeight: 'bold',
    marginLeft: Scale(10),
    marginHorizontal: Scale(10),
  },
  signInCustomerLogoStyle: {
    width: Scale(80),
    height: Scale(80),
  },
  customerViewLogo: {
    alignItems: 'center',
    marginTop: Scale(30),
  },
  siginText: {
    color: '#ff5f5f',
    fontSize: Scale(16),
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  accountTextView: {
    alignItems: 'center',
    marginTop: Scale(30),
    flexDirection: 'row',
    marginHorizontal: Scale(30),
  },
  accountText: {
    color: '#999',
    fontSize: Scale(16),
    fontWeight: 'bold',
  },
  container: {

    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF5F5F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedCircle: {
    backgroundColor: '#FF5F5F',
  },
  label: {
    fontSize: Scale(16),
    color: 'white',
    fontWeight: '400',
    marginHorizontal: Scale(10),
  },
  leftArrow: {
    width: Scale(24),
    height: Scale(24),
    marginTop: Scale(20),
    marginLeft: Scale(10),
  },
});
