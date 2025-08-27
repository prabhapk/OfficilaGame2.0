import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { threeDigitState } from './types'



const initialvalues: threeDigitState = {
  singleDigitA: "",
  singleDigitB: "",
  singleDigitC: "",
  singleACount: 3,
  singleBCount: 3,
  singleCCount: 3,
  doubleDigitA1: "",
  doubleDigitA2: "",
  doubleDigitB1: "",
  doubleDigitB2: "",
  doubleDigitC1: "",
  doubleDigitC2: "",
  doubleABCount: 3,
  doubleACCount: 3,
  doubleBCCount: 3,
  threeDigitA: "",
  threeDigitB: "",
  threeDigitC: "",
  threeDigitCount: 3,
  min1TargetDate: "2025-07-22T15:46:27.123Z",
  min3TargetDate: '2025-07-22T15:49:27.123Z',
  min5TargetDate: '2025-07-22T15:52:27.123Z',
}
export const threeDigitSlice = createSlice({
  name: 'threeDigit',
  initialState:initialvalues,
  reducers: {
    setSingleDigitA: (state, action: PayloadAction<any>) => {
      state.singleDigitA = action.payload;
      if (action.payload !== null) state.singleACount = 3;
    },
    setSingleDigitB: (state, action: PayloadAction<any>) => {
      state.singleDigitB = action.payload;
      if (action.payload !== null) state.singleBCount = 3;
    },
    setSingleDigitC: (state, action: PayloadAction<any>) => {
      state.singleDigitC = action.payload;
      if (action.payload !== null) state.singleCCount = 3;
    },
    setSingleACount: (state, action: PayloadAction<number>) => {
      state.singleACount = action.payload === 0 ? 3 : action.payload;
    },
    setSingleBCount: (state, action: PayloadAction<number>) => {
      state.singleBCount = action.payload === 0 ? 3 : action.payload;
    },
    setSingleCCount: (state, action: PayloadAction<number>) => {
      state.singleCCount = action.payload === 0 ? 3 : action.payload;
    },
    setDoubleDigitA1: (state, action: PayloadAction<any>) => {
      state.doubleDigitA1 = action.payload;
      if (action.payload !== null) state.doubleACount = 3;
    },
    setDoubleDigitA2: (state, action: PayloadAction<any>) => {
      state.doubleDigitA2 = action.payload;
      if (action.payload !== null) state.doubleACount = 3;
    },
    setDoubleDigitB1: (state, action: PayloadAction<any>) => {
      state.doubleDigitB1 = action.payload;
      if (action.payload !== null) state.doubleBCount = 3;
    },
    setDoubleDigitB2: (state, action: PayloadAction<any>) => {
      state.doubleDigitB2 = action.payload;
      if (action.payload !== null) state.doubleBCount = 3;
    },
    setDoubleDigitC1: (state, action: PayloadAction<any>) => {
      state.doubleDigitC1 = action.payload;
      if (action.payload !== null) state.doubleCCount = 3;
    },
    setDoubleDigitC2: (state, action: PayloadAction<any>) => {
      state.doubleDigitC2 = action.payload;
      if (action.payload !== null) state.doubleCCount = 3;
    },
    setDoubleABCount: (state, action: PayloadAction<number>) => {
      state.doubleABCount = action.payload === 0 ? 3 : action.payload;
    },
    setDoubleACCount: (state, action: PayloadAction<number>) => {
      state.doubleACCount = action.payload === 0 ? 3 : action.payload;
    },
    setDoubleBCCount: (state, action: PayloadAction<number>) => {
      state.doubleBCCount = action.payload === 0 ? 3 : action.payload;
    },
    setThreeDigitA: (state, action: PayloadAction<any>) => {
      state.threeDigitA = action.payload;
      if (action.payload !== null) state.threeDigitCount = 3;
    },
    setThreeDigitB: (state, action: PayloadAction<any>) => {
      state.threeDigitB = action.payload;
      if (action.payload !== null) state.threeDigitCount = 3;
    },
    setThreeDigitC: (state, action: PayloadAction<any>) => {
      state.threeDigitC = action.payload;
      if (action.payload !== null) state.threeDigitCount = 3;
    },
    setThreeDigitCount: (state, action: PayloadAction<number>) => {
      state.threeDigitCount = action.payload === 0 ? 3 : action.payload;
    },
    setMin1TargetDate: (state, action: PayloadAction<any>) => {
      state.min1TargetDate = action.payload;
    },
    setMin3TargetDate: (state, action: PayloadAction<any>) => {
      state.min3TargetDate = action.payload;
    },
    setMin5TargetDate: (state, action: PayloadAction<any>) => {
      state.min5TargetDate = action.payload;
    },
},

})

export const {  setSingleDigitA,setSingleDigitB,
  setSingleDigitC, setSingleACount, 
  setSingleBCount, setSingleCCount, setDoubleDigitA1, 
  setDoubleDigitA2, setDoubleDigitB1, setDoubleDigitB2, 
  setDoubleDigitC1, setDoubleDigitC2, setDoubleABCount, 
  setDoubleACCount, setDoubleBCCount, setThreeDigitA,
   setThreeDigitB, setThreeDigitC, setThreeDigitCount, setMin1TargetDate, setMin3TargetDate, setMin5TargetDate } = threeDigitSlice.actions

export default threeDigitSlice.reducer