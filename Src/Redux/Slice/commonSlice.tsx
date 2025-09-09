import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CommonSliceState } from './types'

const initialValues: CommonSliceState = {
  howToPlayVisible: false,
  show30SecondsLeftAlert: false,
  paymentSuccessModalVisible: false,
}

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
    }
   
  },
})

export const { showHowToPlay, hideHowToPlay, handleShowAlert, setPaymentSuccessModalVisible } = CommonSlice.actions

export default CommonSlice.reducer