import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { withdrawSliceStates } from './types';
import axios from 'axios';
import { serviceUrls, BaseURL } from '../../Utils/serviceUrls';
import { RootState } from '../store';
import { Alert } from 'react-native';
import axiosInstance from '../../Utils/axiosClient';
import { setIsLoggedIn } from "./signInSlice"; 
const initialValues: withdrawSliceStates = {
  withdrawLoader:false,
  bankAccountsData: null,
};

export const AddBankAccount =createAsyncThunk<any, any, { rejectValue: string }>(
  'withDraw/AddBankAccount',
  async (apiData, thunkAPI) => {
    console.log('apiData===>', apiData);
    try {
      const response = await axiosInstance.post(
        serviceUrls.withdraw.AddBankAccount,
        apiData,
      );

      console.log('AddBankAccountResponse', response);
      return response.data;
    } catch (error: any) {
      console.log('VerifyOtpResponseApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString(),
      );
    }
  },
);

export const getBankAccounts = createAsyncThunk<
  any,
  {
userId:number;
  },
  { rejectValue: string }
>('withDraw/getBankAccounts', async ({userId}, thunkAPI) => {
  try {
    console.log('userIdSlice==>',userId);
    console.log('CheckServiceRequest===>', serviceUrls.withdraw.getBankDetails + '/' + userId);
    
    const response = await axiosInstance.get(
      serviceUrls.withdraw.getBankDetails + '/' + userId,
    );
    console.log('getBankAccountsResponse', response.data);
    return response.data;
  } catch (error: any) {
    console.log('getBankAccountsApiError', error);
    return thunkAPI.rejectWithValue(
      error?.response?.data || error.message || error.toString(),
    );
  }
});

export const withDrawAmount = createAsyncThunk<
  any,
  { 
    userId: number; 
    withdrawalAmount: number; 
    bankName: string;
    accountNo: string;
    ifsc: string;
    holderName: string;
    upi: string;
    },
  { rejectValue: string }
>(
  'withDraw/withDrawAmount',
  async ({
    userId, 
    withdrawalAmount,
    bankName,
    accountNo,
    ifsc,
    holderName,
    upi,
  }, thunkAPI) => {
    const data = {
      userId, 
      withdrawalAmount,
      bankName,
      accountNo,
      ifsc,
      holderName,
      upi,
    }
    console.log("withDrawAmountPassingData", data)
    try {

      const response = await axiosInstance.post(serviceUrls.withdraw.withDrawAmount,
        data,
      );
      console.log('withDrawAmountResponse', response);
      console.log('withDrawAmountResponseData', response.data);
      return response.data;
    } catch (error: any) {
      console.log('withDrawAmountResponseApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString()
      );
    }
  }
);



export const withdrawSlice = createSlice({
  name: 'withdrawSlice',
  initialState: initialValues,
  reducers: {
    // setMobileNumber: (state, action: PayloadAction<string>) => {
    //   state.mobileNumber = action.payload;
    // },
   
  },
  extraReducers: builder => {
    // Pending 
    builder.addCase(getBankAccounts.pending, (state, action) => {
      state.withdrawLoader = true;
    });

    // Fulfilled
    builder.addCase(getBankAccounts.fulfilled, (state, action) => {
      state.bankAccountsData = action.payload;
      state.withdrawLoader = false;
    });

    // Rejected
    builder.addCase(getBankAccounts.rejected, (state, action) => {
      state.withdrawLoader = false;
    });
  },
});

export const {
//   setMobileNumber,
} = withdrawSlice.actions;

export default withdrawSlice.reducer;
