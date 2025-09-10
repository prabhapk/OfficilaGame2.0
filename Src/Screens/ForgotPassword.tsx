import React, {useEffect, useState} from 'react';
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
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import {lefArrow, loginImageBackground, signInLogo} from '../../assets/assets';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Redux/store';
import {
  GetForgetPasswordOtp,
  resetPassword,
  setMobileNumber,
  setNewPassword,
  setOtp,
} from '../Redux/Slice/signInSlice';
import {GetOtp} from '../Redux/Slice/signUpSlice';
import {unwrapResult} from '@reduxjs/toolkit';
import AlertErrorModal from '../Components/Modal/AlertErrorModal';
import AlertSuccessModal from '../Components/Modal/AlertSuccessModal';
import Toast from 'react-native-toast-message';
import { useContainerScale } from '../hooks/useContainerScale';
import LoadingSpinnerButton from '../Components/LoadingSpinnerButton';

const ForgotPassword = ({navigation}: any) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  const dispatch = useDispatch();
  const {mobileNumber, otp, newPassword, resetPasswordLoader} = useSelector(
    (state: RootState) => state.signInSlice,
  );
  const [countdown, setCountdown] = useState(0);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const mobileRegex = /^\d{10}$/;
  const otpRegex = /^\d{6}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  const isFormValid =
    mobileRegex.test(mobileNumber) && otpRegex.test(otp) && passwordRegex.test(newPassword);
  const mobileNumberValid = mobileRegex.test(mobileNumber);

  const handleMobileNumber = (value: string) => {
    dispatch(setMobileNumber(value));
  };
  const handleOtp = (value: string) => {
    dispatch(setOtp(value));
  };

  const handleGetOtp = async () => {
    if (mobileNumberValid) {
      const resultAction = await dispatch(GetForgetPasswordOtp({mobileNumber}));
      setCountdown(60);
      unwrapResult(resultAction);
      setShowSuccessAlert(true);
    } else {
      setShowErrorAlert(true);
    }
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);
  const handleNewPassword = (value: string) => {
    dispatch(setNewPassword(value));
  };

  const handleResetPassword = async () => {
    try {
      const resultAction = await dispatch(resetPassword({
         otp,
        mobileNumber,
        newPassword,
         navigation: navigation,
         
        }));
      unwrapResult(resultAction);
      Toast.show({
        type: 'success',
        text1: 'Password Reset Successfully',
        position: 'top',
      });
    }
    catch (error: any) {
      console.log('error', error);
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid credentials',
        position: 'top',
      });
    } 
  };
  const closeErrorModal = () => {
    setShowErrorAlert(false);
  };
  const closeSuccessModal = () => {
    setShowSuccessAlert(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{paddingBottom: Scale(30)}}>
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
            <Text style={styles.headerText}>Set password</Text>
          </View>

          {/* Inputs */}
          <View style={styles.inputWrapper}>
            <CommonTextInput
              placeholderText="Enter Mobile number"
              value={mobileNumber}
              keyboardType="phone-pad"
              onChange={handleMobileNumber}
              isDisabled={false}
              secureTextEntry={false}
              leftText={true}
              leftIcon={
                <Ionicons name="call-outline" size={Scale(18)} color="#999" />
              }
            />
             {mobileNumber && !mobileRegex.test(mobileNumber) && (
  <Text style={{ color: 'red', fontSize: Scale(12), marginLeft: Scale(10),marginBottom:Scale(10),}}>
    Mobile number must be exactly 10 digits
  </Text>
            )}

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
                    <Text style={styles.getOtpText}>{countdown}s</Text>
                  ) : (
                    <TouchableOpacity onPress={handleGetOtp}>
                      <Text style={styles.getOtpText}>GET OTP</Text>
                    </TouchableOpacity>
                  )
                }
              />
              {otp && !otpRegex.test(otp) && (
                <Text
                  style={{
                    color: 'red',
                    fontSize: Scale(12),
                    marginLeft: Scale(10),
                    marginBottom: Scale(10),
                  }}>
                  OTP must be exactly 6 digits
                </Text>
              )}
            </View>
            <View style={styles.inputSpacing}>
              <CommonTextInput
                placeholderText="New Password"
                value={newPassword}
                keyboardType="default"
                onChange={handleNewPassword}
                isDisabled={false}
                secureTextEntry={false}
                leftIcon={
                  <Entypo name="dial-pad" size={Scale(18)} color="#999" />
                }
              />
               {newPassword && !passwordRegex.test(newPassword) && (
  <Text style={{ color: 'red', fontSize: Scale(12), marginLeft: Scale(10),marginBottom:Scale(10),}}>
    Mobile number must be exactly 10 digits
  </Text>
            )}

            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
           onPress={handleResetPassword} 
           disabled={!mobileNumber || !otp || !newPassword}
           style={[styles.buttonWrapper,{
            opacity: isFormValid ? 1: 0.5
           }]}>
            <LinearGradient
              colors={['#FF4140', '#FFAD45']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.signInButton}>
              {/* <Text style={styles.signInButtonText}>Confirm</Text> */}
              {resetPasswordLoader ? (
      <LoadingSpinnerButton color="#fff" durationMs={1000} />
    ) : (
      <Text style={styles.signInButtonText}>LOGIN</Text>
    )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <AlertErrorModal
          isVisible={showErrorAlert}
          closeModal={closeErrorModal}
          headerText={'Error!'}
          bodyText={'Please Enter Mobile Number'}
        />
        <AlertSuccessModal
          isVisible={showSuccessAlert}
          closeModal={closeSuccessModal}
          headerText={'Success!'}
          bodyText={'OTP sent successfully'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const createStyles = (Scale: any) =>
  StyleSheet.create({
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
  leftArrow: {
    width: Scale(24),
    height: Scale(24),
    marginTop: Scale(20),
    marginLeft: Scale(10),
  },
  customerViewLogo: {
    alignItems: 'center',
    marginTop: Scale(30),
  },
});
