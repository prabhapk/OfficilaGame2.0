import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { vip } from './types';
import axios from 'axios';
import { BaseURL, serviceUrls } from '../../Utils/serviceUrls';
import axiosInstance from '../../Utils/axiosClient';
import { RootState } from '../store';

const initialValues: vip = {
    vipLists: [],
    vipListLoader: false
};

export const getVipLists = createAsyncThunk<
  any,                       
  void,                       
  { rejectValue: string }     
>(
  'result/getVipLists',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(serviceUrls.vip.vipLists);
      console.log('getAllVipResults', response.data);
      return response.data;
    } catch (error: any) {
      console.log('getAllVipResultsApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString(),
      );
    }
  }
);




export const vipSlice = createSlice({
  name: 'vipSlice',
  initialState: initialValues,
  reducers: {

  },
  extraReducers: builder => {
    // Pending
    builder.addCase(getVipLists.pending, (state, action) => {
      state.vipListLoader = true;
    });
    // Fulfilled
    builder.addCase(getVipLists.fulfilled, (state, action) => {
      state.vipListLoader = false;
      state.vipLists = action.payload;
      console.log('viplists====>', state.vipLists);
      
    });

    // Rejected
    builder.addCase(getVipLists.rejected, (state, action) => {
      state.vipListLoader = true;
    });

  },
});

export const {} = vipSlice.actions;

export default vipSlice.reducer;
