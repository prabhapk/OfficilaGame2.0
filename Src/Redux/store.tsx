import { AnyAction, combineReducers, configureStore, createAction } from '@reduxjs/toolkit';
import threeDigitSlice from './Slice/threeDigitSlice';
import commonSlice from './Slice/commonSlice';
import  LoaderSlice  from './Slice/loaderSlice';
import signInSlice from './Slice/signInSlice';
import signUpSlice from './Slice/signUpSlice';
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
  commonSlice:commonSlice,
  LoaderSlice:LoaderSlice,
  signInSlice:signInSlice,
  signUpSlice:signUpSlice
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

export {persistor, store};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;