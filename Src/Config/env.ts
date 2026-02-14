import Constants from 'expo-constants';

type ExtraConfig = {
  API_BASE_URL?: string;
};

const extra = (Constants.expoConfig?.extra || {}) as ExtraConfig;

export const API_BASE_URL =
  extra.API_BASE_URL ?? 'https://47.102.194.30/';

// Debug logging to verify API_BASE_URL is loaded correctly
console.log('🔧 API_BASE_URL from env:', API_BASE_URL);
console.log('🔧 Constants.expoConfig?.extra:', Constants.expoConfig?.extra);

