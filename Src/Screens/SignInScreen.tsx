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
  Alert,
} from 'react-native';
import CommonTextInput from '../Components/CommonTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  lefArrow,
  loginImageBackground,
  signInCustomerLogo,
  signInLogo,
} from '../../assets/assets';
import { GetLoginOtp, setIsLoggedIn, SignInOtp, SignInPassword } from '../Redux/Slice/signInSlice';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { unwrapResult } from '@reduxjs/toolkit';
import { RootState } from '../Redux/store';
import LoadingSpinnerButton from '../Components/LoadingSpinnerButton';
import { useContainerScale } from '../hooks/useContainerScale';

const SignInScreen = ({ navigation }: any) => {
  const [selectedTab, setSelectedTab] = useState<'password' | 'otp'>('password');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const dispatch = useDispatch();
  const {isLoading } = useSelector(
    (state: RootState) => state.signInSlice,
  );
  const mobileRegex = /^\d{10}$/;
  const otpRegex = /^\d{6}$/;

  const mobileNumberValid = mobileRegex.test(mobileNumber);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);



  const handleGetOtp = async () => {
    if (mobileNumberValid) {
      console.log("asasasasas", mobileNumber);

      const resultAction = await dispatch(GetLoginOtp({ mobileNumber }));
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

  const handleSignIn = async () => {
    console.log('Sign In clicked');
    // setIsShowAlert(true);
    try {
      // const resultAction = await dispatch(SignInPassword({ mobileNumber, password,navigation: navigation }));
      // unwrapResult(resultAction);
      navigation.navigate("DrawerNavigation")
      dispatch(setIsLoggedIn(true))
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
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
  const handleOtpSignIn = async () => {
    console.log('Sign In clicked');
    // setIsShowAlert(true);
    try {
      const resultAction = await dispatch(SignInOtp({ mobileNumber, otp,navigation:navigation }));
      unwrapResult(resultAction);
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
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

  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: Scale(30) }}>
        {/* <Image source={loginImageBackground} style={styles.topImage} /> */}
        <ImageBackground source={loginImageBackground} style={styles.topImage}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Image source={lefArrow} style={styles.leftArrow} resizeMode="contain" />
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.bottomContainer}>
          <View style={styles.logoHeader}>
            <Image source={signInLogo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.headerText}>Log in</Text>
          </View>

          {/* Tab Switch */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'password' && styles.activeTab]}
              onPress={() => setSelectedTab('password')}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'password' ? styles.activeText : styles.inactiveText,
                ]}
              >
                Password Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, selectedTab === 'otp' && styles.activeTab]}
              onPress={() => setSelectedTab('otp')}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'otp' ? styles.activeText : styles.inactiveText,
                ]}
              >
                OTP Login
              </Text>
            </TouchableOpacity>
          </View>

          {/* Inputs */}
          <View style={styles.inputWrapper}>
            <CommonTextInput
              placeholderText="Please enter phone number"
              value={mobileNumber}
              keyboardType="phone-pad"
              onChange={setMobileNumber}
              isDisabled={false}
              secureTextEntry={false}
              leftIcon={<Ionicons name="call-outline" size={Scale(18)} color="#999" />}
            />

            {selectedTab === 'password' ? (
              <View style={styles.inputSpacing}>
                <CommonTextInput
                  placeholderText="Set pwd (letters & nums, 6+chars)"
                  value={password}
                  onChange={setPassword}
                  isDisabled={false}
                  secureTextEntry= {true}
                  showEyeIcon
                  leftIcon={<Ionicons name="lock-closed-outline" size={Scale(18)} color="#999" />}
                />
              </View>
            ) : (
              <View style={styles.inputSpacing}>
                <CommonTextInput
                  placeholderText="Enter OTP"
                  value={otp}
                  onChange={setOtp}
                  isDisabled={false}
                  secureTextEntry={false}
                  keyboardType="numeric"
                  leftIcon={<Ionicons name="keypad-outline" size={Scale(18)} color="#999" />}
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
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
  onPress={selectedTab === 'password' ? handleSignIn : handleOtpSignIn}
  style={styles.buttonWrapper}
  disabled={isLoading}
>
  <LinearGradient
    colors={['#FF4140', '#FFAD45']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.signInButton}
  >
    {isLoading ? (
      <LoadingSpinnerButton color="#fff" durationMs={1000} />
    ) : (
      <Text style={styles.signInButtonText}>LOGIN</Text>
    )}
  </LinearGradient>
</TouchableOpacity>

          {/* Register Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={styles.buttonWrapperRegister}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.customerViewLogo}>
            <Image source={signInCustomerLogo}
              style={styles.signInCustomerLogoStyle}
              resizeMode="contain" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

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
    marginTop: Scale(30)
  }
});
