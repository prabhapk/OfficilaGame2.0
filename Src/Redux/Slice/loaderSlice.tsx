import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialValues: any = {
  isLoading: false,
}

export const LoaderSlice = createSlice({
  name: 'LoaderSlice',
  initialState:initialValues,
  reducers: {
    showLoader:state=>{
      state.isLoading = true;
    },
    hideLoader:state=>{
      state.isLoading = false;
    }
   
  },
})

export const { showLoader, hideLoader } = LoaderSlice.actions

export default LoaderSlice.reducer