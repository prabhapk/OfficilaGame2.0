import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { store } from '../Redux/store';
import { getNavigation } from '../Utils/getNavigation';
import noTokenUrls from './noTokenUrls';
import Toast from 'react-native-toast-message';
import { setSessionExpiredVisible } from '../Redux/Slice/commonSlice';

const axiosInstance = axios.create({
  // baseURL: process.env.API_BASE_URL,
  // baseURL: process.env.urlOne,
   baseURL: 'http://8.148.148.185',
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
      console.log('🔑 AUTH DEBUG: URL:', config.url);
      console.log('🔑 AUTH DEBUG: Should exclude token:', shouldExcludeToken);
      console.log('🔑 AUTH DEBUG: Token from store:', token);
      console.log('🔑 AUTH DEBUG: Token length:', token?.length);
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('✅ TOKEN ADDED:', token.substring(0, 20) + '...');
      } else {
        console.warn('❌ NO TOKEN FOUND for authenticated API:', config.url);
      }
    } else {
      console.log('🚫 TOKEN EXCLUDED for URL:', config.url);
    }

    config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    config.headers['X-Platform'] = 'mobile';

    // Optional: Attach AbortController
    const perRequestController = new AbortController();
    config.signal = perRequestController.signal;
    (config as any).abortController = perRequestController;

    console.log('🌐 API REQUEST:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      fullUrl: config.baseURL + config.url,
      hasToken: !!config.headers.Authorization,
      tokenPreview: config.headers.Authorization ? 
        config.headers.Authorization.substring(0, 20) + '...' : 'NO TOKEN',
      body: config.data,
      params: config.params
    });

    return config;
  },
  error => Promise.reject(error),
);

// ⛳ RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  response => {
    console.log('✅ API SUCCESS:', {
      method: response.config.method?.toUpperCase(),
      url: response.config.url,
      status: response.status,
      dataPreview: JSON.stringify(response.data).substring(0, 100) + '...'
    });
    return response;
  },
  error => {
    const originalRequest = error.config;

    console.log('❌ API ERROR:', {
      method: originalRequest?.method?.toUpperCase(),
      url: originalRequest?.url,
      fullUrl: originalRequest?.baseURL + originalRequest?.url,
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      errorMessage: error?.message,
      errorData: error?.response?.data,
      hasToken: !!originalRequest?.headers?.Authorization
    });

    if (axios.isCancel(error)) {
      console.warn('Request was canceled:', error.message);
      return Promise.reject(error);
    }

    if (error?.response?.status === 401 && !originalRequest._retry) {
      console.error('🚨 401 UNAUTHORIZED TRIGGERED BY:', {
        method: originalRequest?.method?.toUpperCase(),
        url: originalRequest?.url,
        fullUrl: originalRequest?.baseURL + originalRequest?.url,
        timestamp: new Date().toISOString(),
        errorData: error?.response?.data
      });
      console.warn('Token expired or unauthorized. Showing session expired modal...');
      originalRequest._retry = true;
      
      // Dispatch action to show session expired modal
      store.dispatch(setSessionExpiredVisible(true));
      
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
