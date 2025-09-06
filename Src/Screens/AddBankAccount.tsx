import React, { useState } from 'react';
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

const AddBankCardScreen = ({ navigation }: any) => {
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
          label={`Phone number:  ${7373214025}`}
          required
          keyboardType="numeric"
          value={form.otp}
          onChangeText={val => handleChange('otp', val)}
          placeholder="Please enter OTP"
          showSendButton
        />
      </ScrollView>
      <View style={{ marginBottom: 15 }}>
        <TouchableOpacity
          style={[styles.buttonWrapper, { opacity: isFormValid ? 1 : 0.5 }]}
          disabled={!isFormValid}
          onPress={() => {
            console.log('asasasasas', form);
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
