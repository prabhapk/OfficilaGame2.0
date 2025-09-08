import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { signInSliceState } from './types'
import axios from 'axios';
import { BaseURL, serviceUrls } from '../../Utils/serviceUrls';
import axiosInstance from '../../Utils/axiosClient';
import { RootState } from '../store';

const initialValues: signInSliceState = {
  email: '',
  password: '',
  isLoading: false,
  error: '',
  mobileNumber: '',
  otp: '',
  newPassword: '',
  token: '',
  refreshAccessToken: '',
  userDetails: {},
  isLoggedIn: false,
  mainWalletBalance: 0,
  withdrawBalance: 1,
  walletBalanceLoader: false,
}


export const ForgetPassword = createAsyncThunk<
  any,
  { otp: string; mobileNumber: string; newPassword: string },
  { rejectValue: string }
>(
  'auth/ForgetPassword',
  async ({
    otp,
    mobileNumber,
    newPassword,
  }, thunkAPI) => {
    const data = {
      otp,
      mobileNumber,
      newPassword,
    }
    try {
      const response = await axios.post(
        `${BaseURL}${serviceUrls.Auth.ForgetPassword}`,
        data
      );
      console.log('ForgetPasswordResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('ForgetPasswordApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString()
      );
    }
  }
);

export const SignInPassword = createAsyncThunk<
  any,
  { mobileNumber: string; password: string; navigation: any },
  { rejectValue: string }
>(
  'auth/SignInPassword',
  async ({
    mobileNumber,
    password,
    navigation
  }, thunkAPI) => {
    const data = {
      mobileNumber: Number(mobileNumber),
      password,
    }
    console.log("datadatadata", data)
    try {

      const response = await axiosInstance.post(serviceUrls.Auth.signInPassword,
        data,
      );

      thunkAPI.dispatch(setIsLoggedIn(true));
      navigation.navigate('DrawerNavigation')
      console.log("responseSignIn", response);
      
      return response.data;
    } catch (error: any) {
      console.log('signInPasswordApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString()
      );
    }
  }
);

export const SignInOtp = createAsyncThunk<
  any,
  { mobileNumber: string; otp: string; navigation: any },
  { rejectValue: string }
>(
  'auth/SignInPassword',
  async ({
    mobileNumber,
    otp,
    navigation,
  }, thunkAPI) => {
    const data = {
      mobileNumber: Number(mobileNumber),
      otp,
    }
    console.log("datadatadata", data)
    try {

      const response = await axiosInstance.post(serviceUrls.Auth.signInOtp,
        data,
      );
      thunkAPI.dispatch(setIsLoggedIn(true));
      navigation.navigate('DrawerNavigation');
      return response.data;
    } catch (error: any) {
      console.log('signInOtpApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString()
      );
    }
  }
);

export const GetLoginOtp = createAsyncThunk<
  any,
  { mobileNumber: string },
  { rejectValue: string }
>(
  'auth/getloginOtp',
  async ({ mobileNumber }, thunkAPI) => {   // 👈 destructure here
    const state = thunkAPI.getState() as RootState;

    const data = {
      mobileNumber,
    };

    try {
      const response = await axiosInstance.post(serviceUrls.Auth.getLoginOtp, data);
      console.log('getOtpResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('getOtpResponseApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString()
      );
    }
  }
);
export const GetForgetPasswordOtp = createAsyncThunk<
  any,
  { mobileNumber: string },
  { rejectValue: string }
>(
  'auth/GetForgetPasswordOtp',
  async ({ mobileNumber }, thunkAPI) => {

    const data = {
      mobileNumber,
    };

    try {
      const response = await axiosInstance.post(serviceUrls.Auth.forgotPasswordOtp, data);
      console.log('GetForgetPasswordOtpResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('GetForgetPasswordOtpResponseApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString()
      );
    }
  }
);
export const resetPassword = createAsyncThunk<
  any,
  { mobileNumber: string; otp: string; navigation: any, newPassword: string },
  { rejectValue: string }
>(
  'auth/resetPassword',
  async ({
    otp,
    mobileNumber,
    newPassword,
    navigation,
  }, thunkAPI) => {
    const data = {
      otp,
      mobileNumber: mobileNumber, 
      newPassword,
    }
    console.log("resetPasswordPassingData", data)
    try {

      const response = await axiosInstance.post(serviceUrls.Auth.resetPassword,
        data,
      );
      thunkAPI.dispatch(setIsLoggedIn(true));
      navigation.navigate('DrawerNavigation');
      console.log('resetPasswordResponse', response);
      return response.data;
    } catch (error: any) {
      console.log('resetPasswordResponseOtpApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString()
      );
    }
  }
);

export const getWalletBalance = createAsyncThunk<
  any,
  { rejectValue: string }
>(
  'games/getWalletBalance',
  async (_, thunkAPI) => {
    try {

      const response = await axiosInstance.get(serviceUrls.games.walletBalance,

      );
      console.log('getWalletBalance', response.data);
      return response.data;
    } catch (error: any) {
      console.log('walletBalanceApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString()
      );
    }
  }
);

export const signInSlice = createSlice({
  name: 'signInSlice',
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
    setNewPassword: (state, action: PayloadAction<string>) => {
      state.newPassword = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshAccessToken = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: builder => {

    // Pending 
    builder.addCase(SignInPassword.pending, (state, action) => {
      state.isLoading = true;
      
    });
    builder.addCase(getWalletBalance.pending, (state, action) => {
      state.walletBalanceLoader = true;
      
    });

    // Fulfilled
    builder.addCase(SignInPassword.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.refreshAccessToken = action.payload.refreshToken;
      state.userDetails = action.payload.user;
      state.mobileNumber = action.payload.user.mobileNumber;
      state.mainWalletBalance = action.payload.user?.walletBalance?.rechargeBalance
      state.withdrawBalance = action.payload.user?.walletBalance?.withdrawBalance
      ;
      console.log("state.mobileNumber", state.mobileNumber);
      state.isLoading = false;
      
    });

    builder.addCase(getWalletBalance.fulfilled, (state, action) => {
      state.walletBalanceLoader = false;
      state.mainWalletBalance= action.payload.rechargeBalance
      state.withdrawBalance = action.payload.withdrawBalance
      console.log("state.mainWalletBalance", state.mainWalletBalance);
      console.log("state.withdrawBalance", state.withdrawBalance);
      
    });
    // Rejected

    builder.addCase(SignInPassword.rejected, (state, action) => {
      state.isLoading = false;
      
    });
    builder.addCase(getWalletBalance.rejected, (state, action) => {
      state.walletBalanceLoader = false;
      
    });
  },
})

export const {
  setMobileNumber,
  setOtp,
  setPassword,
  setNewPassword,
  setToken,
  setRefreshToken,
  setIsLoggedIn
} = signInSlice.actions

export default signInSlice.reducer