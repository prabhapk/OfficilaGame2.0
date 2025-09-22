import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { signUpSliceState } from './types';
import axios from 'axios';
import { serviceUrls, BaseURL } from '../../Utils/serviceUrls';
import { RootState } from '../store';
import { Alert } from 'react-native';
import axiosInstance from '../../Utils/axiosClient';
import { setIsLoggedIn, setMainWalletBalance } from "./signInSlice"; 
const initialValues: signUpSliceState = {
  mobileNumber: '',
  otp: '',
  password: '',
  confirmPassword: '',
  referralCode: '',
  isLoading: false,
  error: '',
  isEighteenPlus: false,
  isNotify: false,
  ipAddress: '173.191.40.28',
  registrationType: 'mobile',
  deviceInfo: {
    deviceId: '',
    brand: '',
    model: '',
  },
  nextButtonLoader: false,
  singUpConfirmLoader: false,
};

export const GetRegistrationOtp = createAsyncThunk(
  'auth/getOtp',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const mobileNumber = state.signUpSlice.mobileNumber;
    const data = {
      mobileNumber: Number(mobileNumber),
    };
    try {
      const response = await axiosInstance.post(
        serviceUrls.Auth.getRegisterOtp,
        data,
      );

      console.log('getOtpResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('getOtpResponseApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString(),
      );
    }
  },
);

export const VerifyRegisterationOtp = createAsyncThunk<
  any,
  signUpSliceState,
  { rejectValue: string }
>(
  'auth/VerifyOtp',
  async ({ mobileNumber, otp, referralCode, navigation }, thunkAPI) => {
    const data = { mobileNumber, otp, referralCode };

    try {
      const response = await axiosInstance.post(
        serviceUrls.Auth.verfiyRegisterOtp,
        data,
      );

      console.log('VerifyOtpResponse resss', response);

      if (
        response.status === 200 &&
        response.data.message !== 'Invalid or expired OTP'
      ) {
        navigation.navigate('SignUpSetPassword'); // ✅ fix here
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error: any) {
      console.log('VerifyOtpResponseApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString(),
      );
    }
  },
);

export const RegisterUSer = createAsyncThunk<
  any,
  signUpSliceState,
  { rejectValue: string }
>(
  'auth/RegisterUSer',
  async (
    { mobileNumber, otp, referralCode, password, navigation },
    thunkAPI,
  ) => {
    const state = thunkAPI.getState() as RootState;
    const ipAddress = state.signUpSlice.ipAddress;
    const deviceInfo = JSON.stringify(state.signUpSlice.deviceInfo);
    console.log("deviceInfoApiData==>", deviceInfo);
    const registrationType = state.signUpSlice.registrationType;
    const paramsData = {
      ipAddress,
      deviceInfo,
      registrationType,
    };
    const data = {
      mobileNumber,
      otp,
      referralCode,
      password,
    };
    try {
      const response = await axiosInstance.post(
        serviceUrls.Auth.register,
        data,
        {
          params: paramsData,
        },
      );
      console.log('RegisterResponse resss', response);

      if (response.status === 200) {
        thunkAPI.dispatch(setIsLoggedIn(true));
        console.log('check', response.data.user.walletBalance.rechargeBalance);
        thunkAPI.dispatch(setMainWalletBalance(response.data.user.walletBalance.rechargeBalance))
        navigation.navigate('DrawerNavigation');
      }
      console.log('VerifyOtpResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('VerifyOtpResponseApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString(),
      );
    }
  },
);


export const signUpSlice = createSlice({
  name: 'signUpSlice',
  initialState: initialValues,
  reducers: {
    setMobileNumber: (state, action: PayloadAction<string>) => {
      state.mobileNumber = action.payload;
    },
    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    setReferralCode: (state, action: PayloadAction<string>) => {
      state.referralCode = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setIsEighteenPlus: (state, action: PayloadAction<boolean>) => {
      state.isEighteenPlus = action.payload;
    },
    setIsNotify: (state, action: PayloadAction<boolean>) => {
      state.isNotify = action.payload;
    },
    setIpAddress: (state, action: PayloadAction<string>) => {
      state.ipAddress = action.payload;
    },
    setDeviceInfo: (state, action: PayloadAction<any>) => {
      state.deviceInfo = action.payload;
    },
    setRegistrationType: (state, action: PayloadAction<string>) => {
      state.registrationType = action.payload;
    },
  },
  extraReducers: builder => {
    // Pending 
    builder.addCase(VerifyRegisterationOtp.pending, (state, action) => {
      state.nextButtonLoader = true;
    });
    builder.addCase(RegisterUSer.pending, (state, action) => {
      state.singUpConfirmLoader = true;
    });
    // Fulfilled
    builder.addCase(VerifyRegisterationOtp.fulfilled, (state, action) => {
      state.nextButtonLoader = false;
    });
    builder.addCase(RegisterUSer.fulfilled, (state, action) => {
      state.singUpConfirmLoader = false;
    });
    // Rejected
    builder.addCase(VerifyRegisterationOtp.rejected, (state, action) => {
      state.nextButtonLoader = false;
    });
    builder.addCase(RegisterUSer.rejected, (state, action) => {
      state.singUpConfirmLoader = false;
    });
  },
});

export const {
  setMobileNumber,
  setOtp,
  setPassword,
  setReferralCode,
  setIsLoading,
  setError,
  setIsEighteenPlus,
  setIsNotify,
  setIpAddress,
  setConfirmPassword,
  setDeviceInfo,
  setRegistrationType,
} = signUpSlice.actions;

export default signUpSlice.reducer;
