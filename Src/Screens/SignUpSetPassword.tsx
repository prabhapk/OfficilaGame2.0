import React, { useState } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import {
  lefArrow,
  loginImageBackground,
  signInLogo,
} from '../../assets/assets';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import {
  setMobileNumber,
  setPassword,
  setConfirmPassword,
  RegisterUSer,
} from '../Redux/Slice/signUpSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import LoadingSpinnerButton from '../Components/LoadingSpinnerButton';
import { useContainerScale } from '../hooks/useContainerScale';

const SignUpSetPassword = ({ navigation }: any) => {
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);
  const dispatch = useDispatch();
  const {
    mobileNumber,
    password,
    confirmPassword,
    referralCode,
    otp,
    singUpConfirmLoader,
  } = useSelector((state: RootState) => state.signUpSlice);
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  const handleMobileNumber = (value: string) => {
    dispatch(setMobileNumber(value));
  };
  const handlePassword = (value: string) => {
    dispatch(setPassword(value));
    if (!passwordRegex.test(value)) {
      setPasswordError(
        'Password must be at least 8 chars, 1 uppercase & 1 special char.',
      );
    } else {
      setPasswordError('');
    }
  };
  const handleConfirmPassword = (value: string) => {
    dispatch(setConfirmPassword(value));
    if (password && value !== password) {
      setConfirmError('Passwords do not match.');
    } else {
      setConfirmError('');
    }
  };
  const isFormValid =
    passwordRegex.test(password) &&
    password === confirmPassword &&
    mobileNumber;

  const handleSingUp = async () => {
    try {
      const resultAction = await dispatch(
        RegisterUSer({
          mobileNumber,
          password,
          referralCode,
          otp,
          navigation: navigation,
        }),
      );
      console.log('request', resultAction);

      unwrapResult(resultAction);
      Toast.show({
        type: 'success',
        text1: 'Account Created Successfully!',
        position: 'top',
      });
    } catch (error: any) {
      console.log('error', error);
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
            <Text style={styles.headerText}>Set password</Text>
          </View>

          <View style={styles.inputWrapper}>
            <CommonTextInput
              placeholderText="Enter Mobile number"
              value={mobileNumber}
              keyboardType="phone-pad"
              onChange={handleMobileNumber}
              isDisabled={true}
              secureTextEntry={false}
              leftIcon={
                <Ionicons name="call-outline" size={Scale(18)} color="#999" />
              }
            />
            <View style={styles.inputSpacing}>
              <CommonTextInput
                placeholderText="New Password"
                value={password}
                keyboardType="default"
                onChange={handlePassword}
                isDisabled={false}
                secureTextEntry={false}
                leftIcon={
                  <Entypo name="dial-pad" size={Scale(18)} color="#999" />
                }
              />
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>
            <View style={styles.inputSpacing}>
              <CommonTextInput
                placeholderText="Repeat Password"
                value={confirmPassword}
                keyboardType="default"
                onChange={handleConfirmPassword}
                isDisabled={false}
                secureTextEntry={false}
                leftIcon={
                  <Entypo name="dial-pad" size={Scale(18)} color="#999" />
                }
              />
              {confirmError ? (
                <Text style={styles.errorText}>{confirmError}</Text>
              ) : null}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => handleSingUp()}
            disabled={!isFormValid || singUpConfirmLoader}
            style={[styles.buttonWrapper, { opacity: isFormValid ? 1 : 0.5 }]}
          >
            <LinearGradient
              colors={['#FF4140', '#FFAD45']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signInButton}
            >
              {singUpConfirmLoader ? (
                <LoadingSpinnerButton color="#fff" />
              ) : (
                <Text style={styles.signInButtonText}>Confirm</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpSetPassword;

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
  errorText: {
    color: 'red',
    fontSize: Scale(12),
    marginTop: Scale(5),
  },
});
