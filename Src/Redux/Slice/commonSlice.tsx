import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CommonSliceState } from './types'
import axiosInstance from '../../Utils/axiosClient';
import { serviceUrls } from '../../Utils/serviceUrls';

const initialValues: CommonSliceState = {
  howToPlayVisible: false,
  show30SecondsLeftAlert: false,
  paymentSuccessModalVisible: false,
  InsufficientBalanceModalVisible: false,
  sessionExpiredVisible: false,
  tableCurrentPage: 1,
  gameRulesData: null,
  shouldNavigateToLogin: false,
}
export const gameRules = createAsyncThunk<
  any,
  { gameTypeId: number },
  { rejectValue: string }
>('games/gameRules', async ({ gameTypeId }, thunkAPI) => {
  try {
    console.log('gameTypeId==>', gameTypeId);
    console.log('Check===>', `${serviceUrls.rules.getRules}/${gameTypeId}`);

    const response = await axiosInstance.get(
      `${serviceUrls.rules.getRules}/${gameTypeId}`
    );

    console.log('getGameRulesResponse', response.data);
    return response.data;
  } catch (error: any) {
    console.log('getGameRulesResponseErrorResponse', error);
    return thunkAPI.rejectWithValue(
      error?.response?.data || error.message || error.toString(),
    );
  }
});


export const CommonSlice = createSlice({
  name: 'CommonSlice',
  initialState:initialValues,
  reducers: {
    showHowToPlay: state => {
      state.howToPlayVisible = true;
    },
    hideHowToPlay: state => {
      state.howToPlayVisible = false;
    },
    handleShowAlert:state=>{
      state.show30SecondsLeftAlert = !state.show30SecondsLeftAlert;
    },
    setPaymentSuccessModalVisible:(state,action:PayloadAction<boolean>)=>{
      state.paymentSuccessModalVisible = action.payload
    },
    setInsufficientBalanceModalVisible:(state,action:PayloadAction<boolean>)=>{
      state.InsufficientBalanceModalVisible = action.payload
    },
    setSessionExpiredVisible:(state,action:PayloadAction<boolean>)=>{
      console.log('setSessionExpiredVisibleasasasas', action.payload)
      state.sessionExpiredVisible = action.payload
    },
    setShouldNavigateToLogin:(state,action:PayloadAction<boolean>)=>{
      state.shouldNavigateToLogin = action.payload
    },
    setTableCurrentPage:(state,action:PayloadAction<number>)=>{
      state.tableCurrentPage = action.payload
    }
   
  },
  extraReducers: builder => {
    // Pending
    builder.addCase(gameRules.pending, (state, action) => {

    });

    // Fulfilled
    builder.addCase(gameRules.fulfilled, (state, action) => {
      state.gameRulesData = action.payload.description;
      console.log('gameRulesData==>', state.gameRulesData);
    });

    // Rejected
    builder.addCase(gameRules.rejected, (state, action) => {
 

    });
  },
})

export const { showHowToPlay, hideHowToPlay, handleShowAlert, setPaymentSuccessModalVisible, 
  setInsufficientBalanceModalVisible, setSessionExpiredVisible, setShouldNavigateToLogin, setTableCurrentPage
 } = CommonSlice.actions

export default CommonSlice.reducer