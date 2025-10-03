import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { resultSliceState, transactionSliceStates } from './types';
import axios from 'axios';
import { BaseURL, serviceUrls } from '../../Utils/serviceUrls';
import axiosInstance from '../../Utils/axiosClient';
import { RootState } from '../store';

const initialValues: transactionSliceStates = {
  transactionLoader:false,
  transferData:[],
  walletData:[],
  withdrawalsData:[],
  betsData:[],
  winsData:[],
  vipsData:[],
  allTransactionsData:[],
};

export const getTransferData = createAsyncThunk<
any,
  {
    FromDate: string;
    ToDate: string;
    UserId: number;
    Page: number;
    PageSize: number;
  },                                             
  { rejectValue: string }     
>(
  'transaction/getTransferData',
  async ({FromDate, ToDate, UserId, Page, PageSize}, thunkAPI) => {
    try {
      // const response = await axiosInstance.get(serviceUrls.transaction.transfer);
      console.log('TransferApiServiceURLCheck==>',`${serviceUrls.transaction.transfer}?FromDate=${FromDate}&ToDate=${ToDate}&UserId=${UserId}&Page=${Page}&PageSize=${PageSize}`);
      
      const response = await axiosInstance.get(
      `${serviceUrls.transaction.transfer}?FromDate=${FromDate}&ToDate=${ToDate}&UserId=${UserId}&Page=${Page}&PageSize=${PageSize}`,);
      console.log('getTransferDataResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('getTransferResultsApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString(),
      );
    }
  }
);

export const getWalletData = createAsyncThunk<
any,
  {
    FromDate: string;
    ToDate: string;
    UserId: number;
    Page: number;
    PageSize: number;
  },                                             
  { rejectValue: string }     
>(
  'transaction/getWalletData',
  async ({FromDate, ToDate, UserId, Page, PageSize}, thunkAPI) => {
    try {
      console.log('WalletApiServiceURLCheck==>',`${serviceUrls.transaction.wallet}?FromDate=${FromDate}&ToDate=${ToDate}&UserId=${UserId}&Page=${Page}&PageSize=${PageSize}`);
      const response = await axiosInstance.get(
      `${serviceUrls.transaction.wallet}?FromDate=${FromDate}&ToDate=${ToDate}&UserId=${UserId}&Page=${Page}&PageSize=${PageSize}`,);
      console.log('getWalletDataResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('getWalletResultsApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString(),
      );
    }
  }
);

export const getWithdrawalsData = createAsyncThunk<
any,
  {
    FromDate: string;
    ToDate: string;
    UserId: number;
    Page: number;
    PageSize: number;
  },                                             
  { rejectValue: string }     
>(
  'transaction/getWithdrawalsData',
  async ({FromDate, ToDate, UserId, Page, PageSize}, thunkAPI) => {
    try {
      console.log('WithdrawalApiServiceURLCheck==>',`${serviceUrls.transaction.withdrawals}?FromDate=${FromDate}&ToDate=${ToDate}&UserId=${UserId}&Page=${Page}&PageSize=${PageSize}`);
      const response = await axiosInstance.get(
      `${serviceUrls.transaction.withdrawals}?FromDate=${FromDate}&ToDate=${ToDate}&UserId=${UserId}&Page=${Page}&PageSize=${PageSize}`,);
      console.log('withdrawalsDataResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('getWithdrawalsResultsApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString(),
      );
    }
  }
);
export const getBetsData = createAsyncThunk<
any,
  {
    FromDate: string;
    ToDate: string;
    UserId: number;
    Page: number;
    PageSize: number;
  },                                             
  { rejectValue: string }     
>(
  'transaction/getBetsData',
  async ({FromDate, ToDate, UserId, Page, PageSize}, thunkAPI) => {
    try {
      console.log('BetsDataApiServiceURLCheck==>',`${serviceUrls.transaction.bets}?FromDate=${FromDate}&ToDate=${ToDate}&UserId=${UserId}&Page=${Page}&PageSize=${PageSize}`);
      const response = await axiosInstance.get(
      `${serviceUrls.transaction.bets}?FromDate=${FromDate}&ToDate=${ToDate}&UserId=${UserId}&Page=${Page}&PageSize=${PageSize}`,);
      console.log('BetsDataResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('getBetsResultsApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString(),
      );
    }
  }
);
export const getWinsData = createAsyncThunk<
any,
  {
    FromDate: string;
    ToDate: string;
    UserId: number;
    Page: number;
    PageSize: number;
  },                                             
  { rejectValue: string }     
>(
  'transaction/getWinsData',
  async ({FromDate, ToDate, UserId, Page, PageSize}, thunkAPI) => {
    try {
      console.log('WinsDataApiServiceURLCheck==>',`${serviceUrls.transaction.win}?FromDate=${FromDate}&ToDate=${ToDate}&UserId=${UserId}&Page=${Page}&PageSize=${PageSize}`);
      const response = await axiosInstance.get(
      `${serviceUrls.transaction.win}?FromDate=${FromDate}&ToDate=${ToDate}&UserId=${UserId}&Page=${Page}&PageSize=${PageSize}`,);
      console.log('winsDataResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('getWinsResultsApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString(),
      );
    }
  }
);
export const getVipsData = createAsyncThunk<
any,
  {
    FromDate: string;
    ToDate: string;
    UserId: number;
    Page: number;
    PageSize: number;
  },                                             
  { rejectValue: string }     
>(
  'transaction/getVipsData',
  async ({FromDate, ToDate, UserId, Page, PageSize}, thunkAPI) => {
    try {
      console.log('VipsDataApiServiceURLCheck==>',`${serviceUrls.transaction.vip}?FromDate=${FromDate}&ToDate=${ToDate}&UserId=${UserId}&Page=${Page}&PageSize=${PageSize}`);
      const response = await axiosInstance.get(
      `${serviceUrls.transaction.vip}?FromDate=${FromDate}&ToDate=${ToDate}&UserId=${UserId}&Page=${Page}&PageSize=${PageSize}`,);
      console.log('VipsDataResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('getVipsResultsApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString(),
      );
    }
  }
);
export const getAllTransactionsData = createAsyncThunk<
any,
  {
    FromDate: string;
    ToDate: string;
    UserId: number;
    Page: number;
    PageSize: number;
  },                                             
  { rejectValue: string }     
>(
  'transaction/getAllTransactionsData',
  async ({FromDate, ToDate, UserId, Page, PageSize}, thunkAPI) => {
    try {
      console.log('AllTransactionsDataApiServiceURLCheck==>',`${serviceUrls.transaction.allTransactions}?FromDate=${FromDate}&ToDate=${ToDate}&UserId=${UserId}&Page=${Page}&PageSize=${PageSize}`);
      const response = await axiosInstance.get(
      `${serviceUrls.transaction.allTransactions}?FromDate=${FromDate}&ToDate=${ToDate}&UserId=${UserId}&Page=${Page}&PageSize=${PageSize}`,);
      console.log('AllTransactionsDataResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('getAllTransactionsResultsApiError', error);
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
    builder.addCase(getTransferData.pending, (state, action) => {
      state.transactionLoader = true;
    });
    builder.addCase(getWalletData.pending, (state, action) => {
      state.transactionLoader = true;
    });
    builder.addCase(getWithdrawalsData.pending, (state, action) => {
      state.transactionLoader = true;
    });
    builder.addCase(getBetsData.pending, (state, action) => {
      state.transactionLoader = true;
    });
    builder.addCase(getWinsData.pending, (state, action) => {
      state.transactionLoader = true;
    });
    builder.addCase(getVipsData.pending, (state, action) => {
      state.transactionLoader = true;
    });
    builder.addCase(getAllTransactionsData.pending, (state, action) => {
      state.transactionLoader = true;
    });

    // Fulfilled
    builder.addCase(getTransferData.fulfilled, (state, action) => {
      state.transactionLoader = false;
      state.transferData = action.payload;
    });
    builder.addCase(getWalletData.fulfilled, (state, action) => {
      state.transactionLoader = false;
      state.walletData = action.payload;
    });
    builder.addCase(getWithdrawalsData.fulfilled, (state, action) => {
      state.transactionLoader = false;
      state.withdrawalsData = action.payload;
    });
    builder.addCase(getBetsData.fulfilled, (state, action) => {
      state.transactionLoader = false;
      state.betsData = action.payload;
    });
    builder.addCase(getWinsData.fulfilled, (state, action) => {
      state.transactionLoader = false;
      state.winsData = action.payload;
    });
    builder.addCase(getVipsData.fulfilled, (state, action) => {
      state.transactionLoader = false;
      state.vipsData = action.payload;
    });
    builder.addCase(getAllTransactionsData.fulfilled, (state, action) => {
      state.transactionLoader = false;
      // state.allTransactionsData = action.payload;
      state.allTransactionsData = action.payload.transactions; 
      console.log("state.allTransactionsData==>", state.allTransactionsData);
      
    });

    // Rejected
    builder.addCase(getTransferData.rejected, (state, action) => {
      state.transactionLoader = true;
    });
    builder.addCase(getWalletData.rejected, (state, action) => {
      state.transactionLoader = true;
    });
    builder.addCase(getWithdrawalsData.rejected, (state, action) => {
      state.transactionLoader = true;
    });
    builder.addCase(getBetsData.rejected, (state, action) => {
      state.transactionLoader = true;
    });
    builder.addCase(getWinsData.rejected, (state, action) => {
      state.transactionLoader = true;
    });
    builder.addCase(getVipsData.rejected, (state, action) => {
      state.transactionLoader = true;
    });
    builder.addCase(getAllTransactionsData.rejected, (state, action) => {
      state.transactionLoader = true;
    });

  },
});

export const {} = TransactionSlice.actions;

export default TransactionSlice.reducer;
