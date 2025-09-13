import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Quick3DState } from './types'
import axios from 'axios';
import { BaseURL, serviceUrls } from '../../Utils/serviceUrls';
import axiosInstance from '../../Utils/axiosClient';
import { RootState } from '../store';
import { setPaymentSuccessModalVisible } from './commonSlice';

const initialValues: Quick3DState = {

  quick3dGamesList: [],
  quick3dGamesLoader: false,
  quick3dGameTypeId:0,
  quick3dGamesGroupId:0
}







export const fetchQuick3DGamesData = createAsyncThunk<
  any,
  {
    quickythree: string;
  },
  { rejectValue: string }
>('games/fetchQuick3DGamesData', async ({ quickythree }, thunkAPI) => {
  try {
   const response = await axiosInstance.get(
  serviceUrls.quick3d.getQuick3DGamesData,
  {
    params: { quickythree },
  },
);

    console.log('fetchquick3dgamessssssss', response.data);
    return response.data;
  } catch (error: any) {
    console.log('getIndividualGameDataErrorResponse', error);
    return thunkAPI.rejectWithValue(
      error?.response?.data || error.message || error.toString(),
    );
  }
});




export const Quick3DSlice = createSlice({
  name: 'Quick3DSlice',
  initialState: initialValues,
  reducers: {


  },
  extraReducers: builder => {
    builder
      .addCase(fetchQuick3DGamesData.pending, (state, action) => {
        state.quick3dGamesLoader = true;
      })
      .addCase(fetchQuick3DGamesData.fulfilled, (state, action) => {
        state.quick3dGamesLoader = false;
        state.quick3dGamesList = action.payload;
        console.log("quick3dGamesListState====>", action.payload);
      
        // Extract the first key dynamically
        const firstKey = Object.keys(action.payload)[0];
        const firstGame = action.payload[firstKey]?.[0];
      
        if (firstGame) {
          state.quick3dGamesGroupId = firstGame.groupId;
        } else {
          state.quick3dGamesGroupId = null;
        }
      
        console.log("quick3dGamesGroupId====>", state.quick3dGamesGroupId);
      })
      .addCase(fetchQuick3DGamesData.rejected, (state, action) => {
        state.quick3dGamesLoader = false;
      })
  },
})

export const {
} = Quick3DSlice.actions

export default Quick3DSlice.reducer