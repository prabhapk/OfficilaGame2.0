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
  resetPasswordLoader: false,
  userId:0,
  vipLevelDetails:[],
  totalDeposit:0
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
      console.log("🔑 FULL LOGIN RESPONSE:", response);
      console.log("🔑 RESPONSE DATA:", response.data);
      console.log("🔑 RESPONSE DATA TYPE:", typeof response.data);
      console.log("🔑 TOKEN FROM DATA:", response.data?.token);
      console.log("🔑 REFRESH TOKEN FROM DATA:", response.data?.refreshToken);
      
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
  void,
  { rejectValue: string }
>(
  'games/getWalletBalance',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      // Early rejection if token hasn't hydrated yet due to race vs Redux persist
      if (!state.signInSlice.token) {
        console.warn('⚠️ getWalletBalance rejected early: missing token');
        return thunkAPI.rejectWithValue('Token not available yet');
      }
      console.log('🔑 WALLET BALANCE: Current token:', state.signInSlice.token);
      console.log('🔑 WALLET BALANCE: IsLoggedIn:', state.signInSlice.isLoggedIn);
      console.log('🔑 WALLET BALANCE: API URL:', serviceUrls.games.walletBalance);
      const response = await axiosInstance.get(serviceUrls.games.walletBalance);
      console.log('✅ getWalletBalance SUCCESS:', response.data);
      return response.data;
    } catch (error: any) {
      console.log('❌ walletBalanceApiError', error);
      console.log('❌ walletBalanceApiError Status:', error?.response?.status);
      console.log('❌ walletBalanceApiError Message:', error?.response?.data);
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
    setMainWalletBalance: (state, action: PayloadAction<number>) => {
      state.mainWalletBalance = action.payload;
    },
    logoutUser: (state) => {
      // Clear all token-related fields
      state.token = undefined;
      state.refreshAccessToken = undefined;
      state.userDetails = undefined;
      state.mobileNumber = undefined;
      state.email = undefined;
      state.password = undefined;
      state.otp = undefined;
      state.newPassword = undefined;
      state.isLoggedIn = false;
      state.mainWalletBalance = 0;
      state.withdrawBalance = 0;
      state.userId = 0;
      state.error = '';
      state.isLoading = false;
      state.walletBalanceLoader = false;
      state.resetPasswordLoader = false;
      
      console.log('SignInSlice: User logged out - all tokens and data cleared');
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
    builder.addCase(resetPassword.pending, (state, action) => {
      state.resetPasswordLoader = true;
      
    });

    // Fulfilled
    builder.addCase(SignInPassword.fulfilled, (state, action) => {
      console.log("🔑 FULFILLED DEBUG: Raw action.payload:", action.payload);
      console.log("🔑 FULFILLED DEBUG: action.payload.token:", action.payload.token);
      console.log("🔑 FULFILLED DEBUG: action.payload.refreshToken:", action.payload.refreshToken);
      console.log("🔑 FULFILLED DEBUG: action.payload.user:", action.payload.user);
      console.log("🔑 FULFILLED DEBUG: action.payload.user.vipLevelDetails:", action.payload.user.vipLevels);
      
      
      state.token = action.payload.token;
      state.refreshAccessToken = action.payload.refreshToken;
      state.userDetails = action.payload.user;
      state.mobileNumber = action.payload.user.mobileNumber;
      state.mainWalletBalance = action.payload.user?.walletBalance?.rechargeBalance;
      state.withdrawBalance = action.payload.user?.walletBalance?.withdrawBalance;
      state.vipLevelDetails = action.payload.user?.vipLevels;
      state.totalDeposit= action.payload.user?.totalDeposit;
  
      
      
      // Ensure login state is properly set
      state.isLoggedIn = true;
      state.isLoading = false;
      state.userId = action.payload.user.id;
      
      console.log("🔑 LOGIN SUCCESS: Page reload test start");
      console.log("🔑 LOGIN SUCCESS: Token stored:", state.token);
      console.log("🔑 LOGIN SUCCESS: Token length:", state.token?.length);
      console.log("🔑 LOGIN SUCCESS: IsLoggedIn:", state.isLoggedIn);
      console.log("🔑 LOGIN SUCCESS: RefreshToken:", state.refreshAccessToken);
      console.log("🔑 LOGIN SUCCESS: Page reload test end");
      console.log("state.mobileNumber", state.mobileNumber);
      
    });

    builder.addCase(getWalletBalance.fulfilled, (state, action) => {
      state.walletBalanceLoader = false;
      state.mainWalletBalance= action.payload.rechargeBalance
      state.withdrawBalance = action.payload.withdrawBalance
      console.log("state.mainWalletBalance", state.mainWalletBalance);
      console.log("state.withdrawBalance", state.withdrawBalance);
      
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.resetPasswordLoader = false;
      
    });
    // Rejected

    builder.addCase(SignInPassword.rejected, (state, action) => {
      state.isLoading = false;
      
    });
    builder.addCase(getWalletBalance.rejected, (state, action) => {
      state.walletBalanceLoader = false;
      
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.resetPasswordLoader = false;
      
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
  setIsLoggedIn,
  setMainWalletBalance,
  logoutUser
} = signInSlice.actions

export default signInSlice.reducer