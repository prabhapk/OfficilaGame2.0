import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { rebateSliceState } from './types';
import axiosInstance from '../../Utils/axiosClient';
import { serviceUrls } from '../../Utils/serviceUrls';
import { RootState } from '../store';

const initialValues: rebateSliceState = {
  rebateData: [],
  rebateDataLoader: false,

  rebateListData: [],
  rebateListLoader: false,

  rebateClaimData: [],
  rebateClaimDataLoader: false,

  allRebateSummary: [],
  toBeCollectedList: [],
  receivedList: [],

  // Master copies to support filtering without overwriting original data
  allRebateSummaryMaster: [],
  toBeCollectedListMaster: [],
  receivedListMaster: [],
};

/* -------------------------------------------------------
   GET REBATE SUMMARY
------------------------------------------------------- */
export const getRebateSummary = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>('games/getRebateSummary', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(
      serviceUrls.Rebate.rebateSummary,
    );
    console.log('getRebateSummaryResponse', response.data);
    return response.data;  
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.response?.data || error.message || error.toString(),
    );
  }
});

/* -------------------------------------------------------
   GET REBATE LIST
------------------------------------------------------- */
export const getRebateList = createAsyncThunk<
  any,
  { claimed: boolean },
  { rejectValue: string }
>('games/getRebateList', async ({ claimed }, thunkAPI) => {
  try {
    const response = await axiosInstance.get(
      serviceUrls.Rebate.rebateList,
      {
        params: { claimed },
      },
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.response?.data || error.message || error.toString(),
    );
  }
});

/* -------------------------------------------------------
   CLAIM REBATE
------------------------------------------------------- */
export const claimRebate = createAsyncThunk<
  any,
  { rebateId: number },
  { rejectValue: string }
>('games/claimRebate', async ({ rebateId }, thunkAPI) => {
  try {
    const response = await axiosInstance.post(
      serviceUrls.Rebate.rebateClaim,
      { rebateId },
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.response?.data || error.message || error.toString(),
    );
  }
});

/* -------------------------------------------------------
   SLICE
------------------------------------------------------- */
export const rebateSlice = createSlice({
  name: 'rebateSlice',
  initialState: initialValues,
  reducers: {},
  extraReducers: builder => {
    /* ---------------------------------------------------
       PENDING
    --------------------------------------------------- */
    builder.addCase(getRebateSummary.pending, state => {
      state.rebateDataLoader = true;
    });

    builder.addCase(getRebateList.pending, state => {
      state.rebateListLoader = true;
    });

    builder.addCase(claimRebate.pending, state => {
      state.rebateClaimDataLoader = true;
    });

    /* ---------------------------------------------------
       FULFILLED
    --------------------------------------------------- */
    builder.addCase(getRebateSummary.fulfilled, (state, action) => {
      const summary = action.payload;

      // Update current lists
      state.allRebateSummary = summary?.recentRebates || [];
      state.toBeCollectedList = summary?.pendingRebates || [];

      // Update master copies
      state.allRebateSummaryMaster = summary?.recentRebates || [];
      state.toBeCollectedListMaster = summary?.pendingRebates || [];
    });

    builder.addCase(getRebateList.fulfilled, (state, action) => {
      const list = action.payload;

      if (action.meta.arg.claimed) {
        state.receivedList = list;
        state.receivedListMaster = list; // Master copy
      } else {
        state.toBeCollectedList = list;
        state.toBeCollectedListMaster = list; // Master copy
      }
    });

    builder.addCase(claimRebate.fulfilled, (state, action) => {
      state.rebateClaimData = action.payload;
      state.rebateClaimDataLoader = false;
    });

    /* ---------------------------------------------------
       REJECTED
    --------------------------------------------------- */
    builder.addCase(getRebateSummary.rejected, state => {
      state.rebateDataLoader = false;
    });

    builder.addCase(getRebateList.rejected, (state, action) => {
      console.log('getRebateList REJECTED =>', action.payload);
      state.rebateListLoader = false;
    });

    builder.addCase(claimRebate.rejected, (state, action) => {
      console.log('claimRebate REJECTED =>', action.payload);
      state.rebateClaimDataLoader = false;
    });
  },
});

export default rebateSlice.reducer;
