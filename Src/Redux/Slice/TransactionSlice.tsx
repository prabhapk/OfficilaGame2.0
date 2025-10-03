import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { resultSliceState } from './types';
import axios from 'axios';
import { BaseURL, serviceUrls } from '../../Utils/serviceUrls';
import axiosInstance from '../../Utils/axiosClient';
import { RootState } from '../store';

const initialValues: resultSliceState = {
  resultScreenCommonLoader: false,
  allResultData: [],
  individualGameResults: [],
};

export const getTransferData = createAsyncThunk<
  any,                       
  void,                       
  { rejectValue: string }     
>(
  'transaction/getTransferData',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(serviceUrls.transaction.transfer);
      console.log('getTransferDataResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('getAllResultsApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString(),
      );
    }
  }
);



export const TransactionSlice = createSlice({
  name: 'TransactionSlice',
  initialState: initialValues,
  reducers: {
    // setMobileNumber: (state, action: PayloadAction<string>) => {
    //   state.mobileNumber = action.payload;
    // },
  },
  extraReducers: builder => {
    // Pending
    // builder.addCase(getAllResults.pending, (state, action) => {
    //   state.resultScreenCommonLoader = true;
    // });

    // Fulfilled
    // builder.addCase(getAllResults.fulfilled, (state, action) => {
    //   state.resultScreenCommonLoader = false;
    //   state.allResultData = action.payload;
    // });

    // Rejected
    // builder.addCase(getAllResults.rejected, (state, action) => {
    //   state.resultScreenCommonLoader = true;
    // });

  },
});

export const {} = TransactionSlice.actions;

export default TransactionSlice.reducer;
