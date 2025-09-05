import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export const serviceUrls = {
  Auth: {
    getRegisterOtp: '/api/Auth/send-registration-otp',
    verfiyRegisterOtp: '/api/Auth/validate-registration-otp',
    register: '/api/Auth/register',
    ForgetPassword: '/api/Auth/reset-password',
    signInPassword: '/api/Auth/login',
    getLoginOtp: '/api/Auth/send-login-otp',
    signInOtp: '/api/Auth/login-with-otp',
    forgotPasswordOtp: '/api/Auth/forgot-password-otp',
    resetPassword: '/api/Auth/reset-password',
  },
  games:{
    getAllGamesList:'/api/Game/list',
    orderPlace:'/api/Bet/place',
  },
  results:{
    getAllResults:'api/ResultHistory/all-result',

    getIndividualGameResult:'/api/ResultHistory/game-result',
    getIndividualGameData:'/api/Game/by-interval',
  }
};

export const BaseURL = process.env.API_BASE_URL;


