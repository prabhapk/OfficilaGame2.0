import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { rebateSliceState } from './types'
import axios from 'axios';
import { BaseURL, serviceUrls } from '../../Utils/serviceUrls';
import axiosInstance from '../../Utils/axiosClient';
import { RootState } from '../store';
import { setInsufficientBalanceModalVisible, setPaymentSuccessModalVisible } from './commonSlice';
import { Alert } from 'react-native';

const initialValues: rebateSliceState = {
    rebateData: [],
    rebateDataLoader: false,
    rebateListData: [],
    rebateListLoader: false,
    rebateClaimData: [],
    rebateClaimDataLoader: false,
}

export const getRebateSummary = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>(
  'games/getRebateSummary',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(serviceUrls.Rebate.rebateSummary)
      // console.log('getRebateSummaryResponse', response.data);
      const getRebateSummary = response.data
      return getRebateSummary;
    } catch (error: any) {
      // console.log('getRebateSummaryApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString()
      );
    }
  }
);

export const getRebateList = createAsyncThunk<
  any,
  {
claimed: boolean;
  },
  { rejectValue: string }
>(
  'games/getRebateList',
  async ({claimed}, thunkAPI) => {
    try {
      const response = await axiosInstance.get(serviceUrls.Rebate.rebateList,
        {
              params: {
                claimed,
              },
            },
      )
      console.log('getRebateListResponse', response.data);
      const getRebateList = response.data
      return getRebateList;
    } catch (error: any) {
      console.log('getRebateListApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString()
      );
    }
  }
);

export const claimRebate = createAsyncThunk<any,{rebateId: number},{ rejectValue: string }>(
  'games/claimRebate',
  async (rebateId, thunkAPI) => {
    console.log('rebateId===>', rebateId);
    try {
      const response = await axiosInstance.post(
        serviceUrls.Rebate.rebateClaim,
        rebateId
      );
      console.log('claimRebateResponse', response.data);
      // thunkAPI.dispatch(setPaymentSuccessModalVisible(true));
      return response.data;
    } catch (error: any) {
      console.log('claimRebateApiError', error);
      const status = error?.response?.status;
      const errorData = error?.response?.data;
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString(),
      );
    }
  }
);




export const rebateSlice = createSlice({
  name: 'rebateSlice',
  initialState: initialValues,
  reducers: {
    // setMobileNumber: (state, action: PayloadAction<string>) => {
    //   state.mobileNumber = action.payload;
    // },

  },
  extraReducers: builder => {
    // Pending
    builder.addCase(getRebateSummary.pending, (state, action) => {
       state.rebateDataLoader = true;
    });
    builder.addCase(getRebateList.pending, (state, action) => {
       state.rebateListLoader = true;
    });
    builder.addCase(claimRebate.pending, (state, action) => {
       state.rebateClaimDataLoader = true;
    });

  
    // Fulfilled
    builder.addCase(getRebateSummary.fulfilled, (state, action) => {
        state.rebateData= action.payload
        console.log('rebateDataState==>', state.rebateData)
        state.rebateDataLoader = false;
    });
       builder.addCase(getRebateList.fulfilled, (state, action) => {
        state.rebateListData = action.payload
        console.log('getRebateListState==>',state.rebateListData)
        state.rebateClaimDataLoader = false;
    });
       builder.addCase(claimRebate.fulfilled, (state, action) => {
        state.rebateClaimData = action.payload
        console.log('claimRebateState==>',state.rebateClaimData)
        state.rebateListLoader = false;
    });
 

    // Rejected
    builder.addCase(getRebateSummary.rejected, (state, action) => {
        state.rebateDataLoader = false;
    });
    builder.addCase(getRebateList.rejected, (state, action) => {
      console.log("getRebateList REJECTED =>", action.payload);
        state.rebateListLoader = false;
    });
    builder.addCase(claimRebate.rejected, (state, action) => {
      console.log("claimRebate REJECTED =>", action.payload);
        state.rebateListLoader = false;
    });

  },
})

export const {
} = rebateSlice.actions

export default rebateSlice.reducer