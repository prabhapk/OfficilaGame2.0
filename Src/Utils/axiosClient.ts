import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { store } from '../Redux/store';
import { getNavigation } from '../Utils/getNavigation';
import noTokenUrls from './noTokenUrls';
import Toast from 'react-native-toast-message';

const axiosInstance = axios.create({
  // baseURL: process.env.API_BASE_URL,
  // baseURL: process.env.urlOne,
  baseURL: 'http://47.250.52.220',
});

const resetAction = CommonActions.reset({
  index: 0,
  routes: [{ name: 'DrawerNavigaton' }],
});

// ⛳ REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  async config => {
    const shouldExcludeToken = noTokenUrls.some(url =>
      config.url?.includes(url),
    );

    if (!shouldExcludeToken) {
      const token = store.getState().signInSlice.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('TOKEN:', token);
      }
    }

    config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    config.headers['X-Platform'] = 'mobile';

    // Optional: Attach AbortController
    const perRequestController = new AbortController();
    config.signal = perRequestController.signal;
    (config as any).abortController = perRequestController;

    console.log('Final Headers:', config.headers);
    console.log('REQUEST SENT TO:', config.baseURL + config.url);
    console.log('HTTP METHOD:', config.method);
    console.log('BODY:', config.data);
    console.log('PARAMS:', config.params);

    return config;
  },
  error => Promise.reject(error),
);

// ⛳ RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;

    if (axios.isCancel(error)) {
      console.warn('Request was canceled:', error.message);
      return Promise.reject(error);
    }

    if (error?.response?.status === 401 && !originalRequest._retry) {
      console.warn('Token expired or unauthorized. Redirecting to Signin...');
      originalRequest._retry = true;
      getNavigation()?.dispatch(resetAction);
      return Promise.reject(error);
    }
    if (error?.response?.status === 400) {
      const errorMessage =
        error?.response?.data?.message || // was wrong key
        error?.response?.data?.error || // ✅ correct for your backend
        error?.message ||
        'Something went wrong';

      console.log('🔥 400 Error Message:', errorMessage);

      Toast.show({
        type: 'error',
        text1: errorMessage,
        position: 'top',
      });

      return Promise.reject(error);
    }

    console.error('Request failed:', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
