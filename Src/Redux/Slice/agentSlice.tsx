import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { agentSliceState } from './types'
import axios from 'axios';
import { BaseURL, serviceUrls } from '../../Utils/serviceUrls';
import axiosInstance from '../../Utils/axiosClient';
import { RootState } from '../store';
import { setInsufficientBalanceModalVisible, setPaymentSuccessModalVisible } from './commonSlice';
import { Alert } from 'react-native';

const initialValues: agentSliceState = {
    agentLoader:false,
    userData:[]
}

export const getAgentDailyStats = createAsyncThunk<
  any,
  {
    agentId: number;
    date: string;
  },
  { rejectValue: string }
>(
  'games/getAgentDailyStats',
  async ({agentId, date}, thunkAPI) => {
    try {
        const response = await axiosInstance.get(
            `${serviceUrls.Agent.dailyStats}/${agentId}?${date}`,)
    //   const response = await axiosInstance.get(serviceUrls.Agent.dailyStats)

        // {
        //   params: {
        //     agentId,
        //     date,
        //   },
        // },);
      console.log('getAgentDailyStatsResponse', response.data);
      const getAgentDailyStats = response.data
      return getAgentDailyStats;
    } catch (error: any) {
      console.log('getAgentDailyStatsApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString()
      );
    }
  }
);




export const agentSlice = createSlice({
  name: 'agentSlice',
  initialState: initialValues,
  reducers: {
    // setMobileNumber: (state, action: PayloadAction<string>) => {
    //   state.mobileNumber = action.payload;
    // },

  },
  extraReducers: builder => {
    // Pending
    builder.addCase(getAgentDailyStats.pending, (state, action) => {
       state.agentLoader = true;
    });

  
    // Fulfilled
    builder.addCase(getAgentDailyStats.fulfilled, (state, action) => {
        state.userData= action.payload
        console.log('userDataState==>', state.userData)
        state.agentLoader = false;
    });
 

    // Rejected
    builder.addCase(getAgentDailyStats.rejected, (state, action) => {
        state.agentLoader = false;
    });

  },
})

export const {
} = agentSlice.actions

export default agentSlice.reducer