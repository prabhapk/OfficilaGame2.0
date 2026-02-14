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
  resultLoader: false,
};

export const getAllResults = createAsyncThunk<
  any,                       
  void,                       
  { rejectValue: string }     
>(
  'result/getAllResults',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(serviceUrls.results.getAllResults);
      console.log('getAllResultsResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('getAllResultsApiError', error);
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || error.toString(),
      );
    }
  }
);

export const getIndividualGameResult = createAsyncThunk<
  any,
  {
    // groupId: number;
    GametypeId: number;
    page: number;
    pageSize: number;
  },
  { rejectValue: string }
>('result/getIndividualGameResult', async ({ GametypeId,
  page,
  pageSize
 }, thunkAPI) => {
  try {
    console.log('GametypeId==>', GametypeId);
    // const page = 1;
    // const pageSie = 10;
   
    console.log('check==>', `${serviceUrls.results.getIndividualGameResult}?GametypeId=${GametypeId}&page=${page}&pageSize=${pageSize}`);
    
    const response = await axiosInstance.get(
        `${serviceUrls.results.getIndividualGameResult}?GametypeId=${GametypeId}&page=${page}&pageSize=${pageSize}`,
    //   {
    //     params: {
    //       groupId,
    //     },
    //   },
    );
    console.log('getIndividualGameResultResponse', response.data);
    return response.data;
  } catch (error: any) {
    console.log('getIndividualGameResultApiError', error);
    return thunkAPI.rejectWithValue(
      error?.response?.data || error.message || error.toString(),
    );
  }
});


export const resultSlice = createSlice({
  name: 'resultSlice',
  initialState: initialValues,
  reducers: {
    // setMobileNumber: (state, action: PayloadAction<string>) => {
    //   state.mobileNumber = action.payload;
    // },
  },
  extraReducers: builder => {
    // Pending
    builder.addCase(getAllResults.pending, (state, action) => {
      state.resultScreenCommonLoader = true;
      state.resultLoader = true;
    });
    builder.addCase(getIndividualGameResult.pending, (state, action) => {});
    // Fulfilled
    builder.addCase(getAllResults.fulfilled, (state, action) => {
      state.resultScreenCommonLoader = false;
      state.allResultData = action.payload;
      state.resultLoader = false;
    });
    builder.addCase(getIndividualGameResult.fulfilled, (state, action) => {
      state.individualGameResults = action.payload;
    });
    // Rejected
    builder.addCase(getAllResults.rejected, (state, action) => {
      state.resultScreenCommonLoader = true;
      state.resultLoader = true;
    });
    builder.addCase(getIndividualGameResult.rejected, (state, action) => {});
  },
});

export const {} = resultSlice.actions;

export default resultSlice.reducer;
