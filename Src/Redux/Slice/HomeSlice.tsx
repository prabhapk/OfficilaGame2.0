import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { homeSliceState } from './types'
import axios from 'axios';
import { BaseURL, serviceUrls } from '../../Utils/serviceUrls';
import axiosInstance from '../../Utils/axiosClient';
import { RootState } from '../store';
import { setInsufficientBalanceModalVisible, setPaymentSuccessModalVisible } from './commonSlice';
import { Alert } from 'react-native';

const initialValues: homeSliceState = {
  howScreenCommonLoader: false,
  allGamesList: [],
  individualGameData: [],
  individualGameDataLoader: false
}




export const getAllGamesList = createAsyncThunk<
  any, // Returned type
  void, // ThunkArg (no argument expected)
  { rejectValue: string } // ThunkApiConfig
>(
  'games/getAllGamesList',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(serviceUrls.games.getAllGamesList);
      console.log('getAllGamesListResponse', response.data);
      const filteredGames = response.data.filter(
        game => !game.name.toLowerCase().includes("quick3d")
      );
      return filteredGames;
    } catch (error: any) {
      console.log('getAllGamesListApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString()
      );
    }
  }
);


export const getIndividualGameData = createAsyncThunk<
  any,
  {
    typeId: number;
  },
  { rejectValue: string }
>('games/getIndividualGameData', async ({ typeId }, thunkAPI) => {
  try {
    const response = await axiosInstance.get(
      serviceUrls.results.getIndividualGameData,
      {
        params: {
          typeId,
        },
      },
    );
    console.log('getIndividualGameDataResponse', response.data);
    return response.data;
  } catch (error: any) {
    console.log('getIndividualGameDataErrorResponse', error);
    return thunkAPI.rejectWithValue(
      error?.response?.data || error.message || error.toString(),
    );
  }
});

export const payNow = createAsyncThunk<any, any, { rejectValue: string }>(
  'games/payNow',
  async (apiData, thunkAPI) => {
    console.log('apiData===>', apiData);
    try {
      const response = await axiosInstance.post(
        serviceUrls.games.orderPlace,
        apiData
      );
      console.log('payNowResponse', response.data);
      thunkAPI.dispatch(setPaymentSuccessModalVisible(true));
      return response.data;
    } catch (error: any) {
      console.log('payNowResponseApiError', error);
      const status = error?.response?.status;
      const errorData = error?.response?.data;
      if (status === 402 || errorData?.message?.toLowerCase().includes("insufficient")) {
        thunkAPI.dispatch(setInsufficientBalanceModalVisible(true));
      } 
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString(),
      );
    }
  }
);


export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: initialValues,
  reducers: {
    // setMobileNumber: (state, action: PayloadAction<string>) => {
    //   state.mobileNumber = action.payload;
    // },

  },
  extraReducers: builder => {
    // Pending
    builder.addCase(getAllGamesList.pending, (state, action) => {
      state.howScreenCommonLoader = true;

    });
    builder.addCase(getIndividualGameData.pending, (state, action) => {
      state.individualGameDataLoader = true;

    });
    // Fulfilled
    builder.addCase(getAllGamesList.fulfilled, (state, action) => {
      state.howScreenCommonLoader = false;
      const seenGroups = new Set<number>();
      const uniqueGames = action.payload.filter((game: any) => {
        if (seenGroups.has(game.groupId)) {
          return false;
        }
        seenGroups.add(game.groupId);
        return true;
      });

      state.allGamesList = uniqueGames;
    });
    builder.addCase(getIndividualGameData.fulfilled, (state, action) => {
      state.individualGameDataLoader = false;
      state.individualGameData = action.payload;
    });
    // Rejected
    builder.addCase(getAllGamesList.rejected, (state, action) => {
      state.howScreenCommonLoader = false;
      console.error('❌ getAllGamesList failed:', action.payload);
    });
    builder.addCase(getIndividualGameData.rejected, (state, action) => {
      state.individualGameDataLoader = false;

    });
  },
})

export const {
} = homeSlice.actions

export default homeSlice.reducer