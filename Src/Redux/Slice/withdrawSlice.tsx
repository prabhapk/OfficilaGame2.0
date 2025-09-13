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
    // builder.addCase(VerifyRegisterationOtp.pending, (state, action) => {
    //   state.nextButtonLoader = true;
    // });

    // Fulfilled
    // builder.addCase(VerifyRegisterationOtp.fulfilled, (state, action) => {
    //   state.nextButtonLoader = false;
    // });

    // Rejected
    // builder.addCase(VerifyRegisterationOtp.rejected, (state, action) => {
    //   state.nextButtonLoader = false;
    // });
  },
});

export const {
//   setMobileNumber,
} = withdrawSlice.actions;

export default withdrawSlice.reducer;
