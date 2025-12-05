import { AnyAction, combineReducers, configureStore, createAction } from '@reduxjs/toolkit';
import threeDigitSlice from './Slice/threeDigitSlice';
import commonSlice from './Slice/commonSlice';
import LoaderSlice from './Slice/loaderSlice';
import signInSlice from './Slice/signInSlice';
import signUpSlice from './Slice/signUpSlice';
import homeSlice from './Slice/HomeSlice';
import resultSlice from './Slice/resultSlice';
import Quick3DSlice from './Slice/Quick3DSlice';
import withdrawSlice from './Slice/withdrawSlice';
import TransactionSlice from './Slice/TransactionSlice';
import vipSlice from './Slice/vipSlice';
import depositSlice from './Slice/depositSlice';
import agentSlice from './Slice/agentSlice';
import rebateSlice from './Slice/rebateSlice';
import storage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';


export const resetState = createAction('RESET_STATE');
const reducers = combineReducers({
  threeDigit: threeDigitSlice,
  commonSlice: commonSlice,
  LoaderSlice: LoaderSlice,
  signInSlice: signInSlice,
  signUpSlice: signUpSlice,
  homeSlice: homeSlice,
  resultSlice: resultSlice,
  quick3DSlice: Quick3DSlice,
  withdrawSlice: withdrawSlice,
  TransactionSlice: TransactionSlice,
  vipSlice: vipSlice,
  depositSlice: depositSlice,
  agentSlice: agentSlice,
  rebateSlice: rebateSlice,
});
const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === resetState.type) {
    storage.removeItem('persist:root'); // <-- wipe persisted storage explicitly
    return reducers(undefined, action); // clean slate
  }
  return reducers(state, action);
};
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { persistor, store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;