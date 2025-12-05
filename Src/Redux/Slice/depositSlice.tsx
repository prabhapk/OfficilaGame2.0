import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { depositState } from './types'
import axios from 'axios';
import { BaseURL, serviceUrls } from '../../Utils/serviceUrls';
import axiosInstance from '../../Utils/axiosClient';
import { RootState } from '../store';
import { setInsufficientBalanceModalVisible, setPaymentSuccessModalVisible } from './commonSlice';
import { Alert } from 'react-native';

const initialValues: depositState = {
    paymentGateWayLists: [],
    paymentGateWayListsLoader: false,
    depositLoader:false,
    depositData:[]
}




export const getAllPaymentGateWaysList = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>(
  'games/getAllPaymentGateWaysList',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(serviceUrls.payment.paymentGatewayLists);
      console.log('getAllPaymentGateWaysListResponse', response.data);
      const paymentGateWaysList = response.data
      return paymentGateWaysList;
    } catch (error: any) {
      console.log('getAllPaymentGateWaysListApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString()
      );
    }
  }
);

export const DepositPayment = createAsyncThunk<
  any,
  { amount: number; channelId: any; },
  { rejectValue: string }
>(
  'auth/DepositPayment',
  async ({
    amount,
    channelId,
  }, thunkAPI) => {
    const data = {
        amount: Number(amount),
        channelId,
    }
    console.log("dataDeposit===>", data)
    try {

      const response = await axiosInstance.post(serviceUrls.payment.depositPayment,
        data,
      );
      console.log("DepositPaymentResponse", response.data);
      Alert.alert("Deposit Successful")
      return response.data;
    } catch (error: any) {
      console.log('DepositPaymentApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString()
      );
    }
  }
);



export const depositSlice = createSlice({
  name: 'depositSlice',
  initialState: initialValues,
  reducers: {
    // setMobileNumber: (state, action: PayloadAction<string>) => {
    //   state.mobileNumber = action.payload;
    // },

  },
  extraReducers: builder => {
    // Pending
    builder.addCase(getAllPaymentGateWaysList.pending, (state, action) => {
       state.paymentGateWayListsLoader = true;
    });
    builder.addCase(DepositPayment.pending, (state, action) => {
       state.depositLoader = true;
    });
  
    // Fulfilled
    builder.addCase(getAllPaymentGateWaysList.fulfilled, (state, action) => {
        state.paymentGateWayLists= action.payload
        console.log('paymentGateWayListsState==>', state.paymentGateWayLists)
        state.paymentGateWayListsLoader = false;
    });
    builder.addCase(DepositPayment.fulfilled, (state, action) => {
        state.depositLoader = false;
    });

    // Rejected
    builder.addCase(getAllPaymentGateWaysList.rejected, (state, action) => {
        state.paymentGateWayListsLoader = false;
    });
    builder.addCase(DepositPayment.rejected, (state, action) => {
        state.depositLoader = false;
    });
  },
})

export const {
} = depositSlice.actions

export default depositSlice.reducer