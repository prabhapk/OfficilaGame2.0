import Constants from 'expo-constants';

type ExtraConfig = {
  API_BASE_URL?: string;
};

const extra = (Constants.expoConfig?.extra || {}) as ExtraConfig;

export const API_BASE_URL =
  extra.API_BASE_URL ?? 'http://136.115.20.223';

// Debug logging to verify API_BASE_URL is loaded correctly
console.log('🔧 API_BASE_URL from env:', API_BASE_URL);
console.log('🔧 Constants.expoConfig?.extra:', Constants.expoConfig?.extra);

