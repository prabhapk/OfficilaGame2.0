import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import CustomInput from '../Components/CustomInput';
import NewAppHeader from '../Components/NewAppHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { useContainerScale } from '../hooks/useContainerScale';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { AddBankAccount, UpdateBankAccount, getBankAccounts, getMobileOtpAddAccount } from '../Redux/Slice/withdrawSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import { ro } from 'react-native-paper-dates';

const AddBankCardScreen = ({ navigation, route }: any) => {
  const AccountId= route?.params?.bankAccountId;
  console.log("AccountId===>", AccountId);
  
  const { isLoggedIn, userId, mobileNumber } = useSelector(
    (state: RootState) => state.signInSlice
  );
  const bankAccountsData = useSelector((state: RootState) => state.withdrawSlice.bankAccountsData);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    accountName: '',
    ifsc: '',
    accountNumber: '',
    accountNumberAgain: '',
    upi: '',
    upiAgain: '',
    email: '',
    otp: '',
  });

  useEffect(() => {
    if (AccountId && bankAccountsData?.length) {
      const selected = bankAccountsData.find((b: any) => b.id === AccountId);
      if (selected) {
        setForm({
          accountName: selected.accountHolderName || '',
          ifsc: selected.ifsc || '',
          accountNumber: selected.accountNumber || '',
          accountNumberAgain: selected.accountNumber || '',
          upi: selected.upi || '',
          upiAgain: selected.upi || '',
          email: selected.email || '',
          otp: '',
        });
      }
    }
  }, [AccountId, bankAccountsData]);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const isFormValid =
    form.accountName.trim() &&
    form.ifsc.trim() &&
    form.accountNumber.trim() &&
    form.accountNumberAgain.trim() &&
    form.upi.trim() &&
    form.upiAgain.trim() &&
    form.otp.trim();
    const { Scale, verticalScale } = useContainerScale();
    const styles = createStyles(Scale);

    const handleAddBankAccount = async () => {
      if (isLoggedIn) {
        try {
          const apiData = {
            id: 0,
            userId: userId,
            accountNumber: form.accountNumber,
            ifsc: form.ifsc,
            accountHolderName: form.accountName,
            gatewayName: '',
            mobile: mobileNumber,
            upi: form.upi,
            otp: form.otp,
          };
    
          const resultAction = await dispatch(AddBankAccount(apiData));
          const data = unwrapResult(resultAction);
          console.log("data==>", data);
    
          // ✅ Since response is the created bank account object
          if (data?.id) {
            Toast.show({
              type: 'success',
              text1: 'Account added successfully',
              position: 'top',
            });
            setForm({
              accountName: '',
              ifsc: '',
              accountNumber: '',
              accountNumberAgain: '',
              upi: '',
              upiAgain: '',
              email: '',
              otp: '',
            });
    
            dispatch(getBankAccounts({ userId: userId }));
            // navigation.navigate("Withdraw");
          } else {
            Toast.show({
              type: 'error',
              text1: 'Something went wrong',
              position: 'top',
            });
          }
        } catch (error: any) {
          console.log("handlePayNowError", error);
          Toast.show({
            type: 'error',
            text1: error?.message || 'Failed to add account',
            position: 'top',
          });
        }
      } else {
        navigation.navigate("SignInScreen");
      }
    };
    // const handleUpdateBankAccount = async () => {
    //   if (isLoggedIn) {
    //     try {
    //       const apiData = {
    //         id: AccountId,
    //         userId: userId,
    //         accountNumber: form.accountNumber,
    //         ifsc: form.ifsc,
    //         accountHolderName: form.accountName,
    //         mobile: mobileNumber,
    //         upi: form.upi,
    //         otp: form.otp,
    //       };
    
    //       const resultAction = await dispatch(UpdateBankAccount(apiData));
    //       // const data = unwrapResult(resultAction);
    //       const data = resultAction.payload;
    //       console.log("dataEditAccount==>", data);
    //       if (data?.id) {
    //         Toast.show({
    //           type: 'success',
    //           text1: 'Account Updated successfully',
    //           position: 'top',
    //         });
    //         setForm({
    //           accountName: '',
    //           ifsc: '',
    //           accountNumber: '',
    //           accountNumberAgain: '',
    //           upi: '',
    //           upiAgain: '',
    //           email: '',
    //           otp: '',
    //         });
    
    //         dispatch(getBankAccounts({ userId: userId }));
    //       } else {
    //         Toast.show({
    //           type: 'error',
    //           text1: 'Something went wrong',
    //           position: 'top',
    //         });
    //       }
    //     } catch (error: any) {
    //       console.log("handlePayNowError", error);
    //       Toast.show({
    //         type: 'error',
    //         text1: error?.message || 'Failed to Edit account',
    //         position: 'top',
    //       });
    //     }
    //   } else {
    //     navigation.navigate("SignInScreen");
    //   }
    // };
    const handleUpdateBankAccount = async () => {
      if (!isLoggedIn) {
        navigation.navigate("SignInScreen");
        return;
      }
    
      try {
        const apiData = {
          id: AccountId,
          userId: userId,
          accountNumber: form.accountNumber,
          ifsc: form.ifsc,
          accountHolderName: form.accountName,
          mobile: mobileNumber,
          upi: form.upi,
          otp: form.otp,
        };
    
        const resultAction = await dispatch(UpdateBankAccount(apiData));
    
        if (UpdateBankAccount.fulfilled.match(resultAction)) {
          const data = resultAction.payload;
          console.log("dataEditAccount==>", data);
    
          Toast.show({
            type: 'success',
            text1: 'Account Updated successfully',
            position: 'top',
          });
    
          setForm({
            accountName: '',
            ifsc: '',
            accountNumber: '',
            accountNumberAgain: '',
            upi: '',
            upiAgain: '',
            email: '',
            otp: '',
          });
    
          dispatch(getBankAccounts({ userId }));
        } else {
          Toast.show({
            type: 'error',
            text1: resultAction.payload || 'Something went wrong',
            position: 'top',
          });
        }
      } catch (error: any) {
        console.log("handleUpdateBankAccountError", error);
        Toast.show({
          type: 'error',
          text1: error?.message || 'Failed to Edit account',
          position: 'top',
        });
      }
    };
    
    
    
    const handleGetOtp = async () => {
      try {
        const resultAction = await dispatch(getMobileOtpAddAccount({ mobileNumber }));
        const data = unwrapResult(resultAction);
        console.log('getOtpResponse==>', data);
    
        // ✅ check by message or other available keys
        if (data?.message?.toLowerCase().includes("otp sent")) {
          Toast.show({
            type: 'success',
            text1: data.message || 'OTP sent successfully',
            position: 'top',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: data?.message || 'Please enter a valid mobile number',
            position: 'top',
          });
        }
      } catch (error: any) {
        console.log('handleGetOtpError==>', error);
        Toast.show({
          type: 'error',
          text1: error?.message || 'Failed to send OTP',
          position: 'top',
        });
      }
    };
    
  return (
    <KeyboardAvoidingView style={styles.container}>
      <NewAppHeader leftIconPress={() => {
        navigation.pop();
      }} centerText={'Add Bank Account'} />
      <ScrollView contentContainerStyle={styles.content}>
        <CustomInput
          label="Account name"
          required
          value={form.accountName}
          onChangeText={val => handleChange('accountName', val)}
          placeholder="Account name"
        />
        <CustomInput
          label="IFSC Code"
          required
          value={form.ifsc}
          onChangeText={val => handleChange('ifsc', val)}
          placeholder="IFSC Code"
        />
        <CustomInput
          label="Account Number"
          required
          keyboardType="numeric"
          value={form.accountNumber}
          onChangeText={val => handleChange('accountNumber', val)}
          placeholder="Account Number"
        />
        <CustomInput
          label="Account Number Again"
          required
          keyboardType="numeric"
          value={form.accountNumberAgain}
          onChangeText={val => handleChange('accountNumberAgain', val)}
          placeholder="Account Number Again"
        />
        <CustomInput
          label="UPI ID"
          required
          value={form.upi}
          onChangeText={val => handleChange('upi', val)}
          placeholder="UPI ID"
        />
        <CustomInput
          label="UPI ID Again"
          required
          value={form.upiAgain}
          onChangeText={val => handleChange('upiAgain', val)}
          placeholder="UPI ID Again"
        />
        <CustomInput
          label="Email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={val => handleChange('email', val)}
          placeholder="Email"
        />
        <CustomInput
          label={`Phone number:  ${mobileNumber}`}
          required
          keyboardType="numeric"
          value={form.otp}
          onChangeText={val => handleChange('otp', val)}
          placeholder="Please enter OTP"
          showSendButton
          onPressSend={handleGetOtp}
        />
      </ScrollView>
      <View style={{ marginBottom: 15 }}>
        <TouchableOpacity
          style={[styles.buttonWrapper, { opacity: isFormValid ? 1 : 0.5 }]}
          disabled={!isFormValid}
          onPress={() => {
            if (AccountId) {
              handleUpdateBankAccount(); 
            } else {
              handleAddBankAccount();
            }
          }}
        >
          <LinearGradient
            colors={['#FF4140', '#FFAD45']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.signInButton}
          >
            <Text style={styles.signInButtonText}>Confirm</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Toast/>
    </KeyboardAvoidingView>
  );
};

export default AddBankCardScreen;

const createStyles = (Scale: any) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#360400',
  },
  content: {
    padding: 16,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: 'linear-gradient(90deg, #FF3A44, #FF7E21)', // mimic gradient
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
  buttonWrapper: {
    marginTop: Scale(10),
    marginHorizontal: Scale(20),
  },
});
