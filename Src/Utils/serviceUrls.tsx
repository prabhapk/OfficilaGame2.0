import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getMyOrders } from "../Redux/Slice/threeDigitSlice";

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
    getBankOtp: '/api/Auth/send-bank-otp',
  },
  games: {
    getAllGamesList: '/api/HomeGame/groups',
    orderPlace: '/api/Bet/place',
    walletBalance: '/api/Wallet/balance',
  },
  results: {
    getAllResults: 'api/ResultHistory/all-result',

    getIndividualGameResult: '/api/ResultHistory/game-result/gametype',
    getIndividualGameData: '/api/Game/by-typeid',
    getMyOrders: '/api/BetHistory/group',
  },
  quick3d: {
    getQuick3DGamesData: '/api/Game/by-typeid/quickythree',
  },
  withdraw: {
    AddBankAccount:'/api/user/User/bank-accounts',
    getBankDetails:'/api/user/User/bank-accounts',
    withDrawAmount: '/api/Withdrawal/submit',
    deleteBankAccount:'/api/user/User/bank-accounts',
    transfer: '/api/Wallet/transfer-to-recharge',
    UpdateBankAccount:'/api/user/User/bank-accounts',
    
  },
  rules: {
    getRules: '/api/user/User/game-rules',
  },
  transaction: {
    transfer: '/api/Transaction/transfers',
    wallet: '/api/Transaction/wallet',
    withdrawals: '/api/Transaction/withdrawals',
    bets: '/api/Transaction/bets',
    win: '/api/Transaction/wins',
    vip: '/api/Transaction/vip',
    allTransactions: '/api/Transaction/all-transactions',
  }
};

export const BaseURL = process.env.API_BASE_URL;


