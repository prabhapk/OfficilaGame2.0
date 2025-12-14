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
    userData:[],
    dashboardData:[],
    dashBoardUserData:[],
    dashBoardDailyData:[],
    dashBoardUserDataActiveUser:0,
    dashBoardUserDataRechargeUser:0,
    dashBoardUserDataNewUser:0,
    dashBoardDailyDataRecharge:0,
    dashBoardDailyDataCommission:0,
    inviteCode: '',
    agentCreatedDate: '',
    rechargeBonusData: [],
    commissionBonusData: [],
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
export const getAgentDashboardData = createAsyncThunk<
  any,
  { agentId: number },
  { rejectValue: string }
>(
  'games/getAgentDashboardData',
  async ({ agentId }, thunkAPI) => {
    try {
      const url = `${serviceUrls.Agent.dashboardData}/${agentId}`;
      // Example result: http://8.148.148.185/api/Agent/dashboard/1

      const response = await axiosInstance.get(url);

      console.log('getAgentDashboardDataResponse', response.data);
      return response.data;

    } catch (error: any) {
      console.log('getAgentDashboardDataApiError', error);

      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || String(error)
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
    builder.addCase(getAgentDashboardData.pending, (state, action) => {
       state.agentLoader = true;
    });

  
    // Fulfilled
    builder.addCase(getAgentDailyStats.fulfilled, (state, action) => {
        state.userData= action.payload
        console.log('userDataState==>', state.userData)
        state.agentLoader = false;
    });
    builder.addCase(getAgentDashboardData.fulfilled, (state, action) => {
        state.dashboardData= action.payload
        console.log('dashboardDataState==>', state.dashboardData)
        state.dashBoardUserData= action.payload.agent
        console.log('dashBoardUserDataState==>', state.dashBoardUserData)
        // UserData 
        state.dashBoardUserDataActiveUser= action.payload.agent.totalEarnings
        state.dashBoardUserDataRechargeUser= action.payload.agent.totalEarnings
        state.dashBoardUserDataNewUser= action.payload.agent.totalReferrals
        // DailyData 
        state.dashBoardDailyData= action.payload.todayStats
        console.log('dashBoardDailyDataState==>', state.dashBoardDailyData)
        state.dashBoardDailyDataRecharge= action.payload.todayStats.totalRechargeAmount
        state.dashBoardDailyDataCommission= action.payload.todayStats.totalCommissionEarned
        // inviteCode
        state.inviteCode= action.payload.agent.agentCode
        console.log('inviteCodeState==>', state.inviteCode)
        // agentCreatedDate
        state.agentCreatedDate= action.payload.agent.createdAt
        console.log('agentCreatedDateState==>', state.agentCreatedDate)
        state.agentLoader = false;
        // rechargeBonusData 
        state.rechargeBonusData = action.payload.rechargeBonusConfigs
        console.log('rechargeBonusDataState==>', state.rechargeBonusData)
        // commissionData 
        state.commissionBonusData = action.payload.commissionConfigs
        console.log('commissionBonusDataState==>', state.commissionBonusData)

    });
 

    // Rejected
    builder.addCase(getAgentDailyStats.rejected, (state, action) => {
        state.agentLoader = false;
    });
    builder.addCase(getAgentDashboardData.rejected, (state, action) => {
        state.agentLoader = false;
    });

  },
})

export const {
} = agentSlice.actions

export default agentSlice.reducer