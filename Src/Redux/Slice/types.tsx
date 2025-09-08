export interface CommonSliceState {
    howToPlayVisible: boolean;
    show30SecondsLeftAlert:boolean
    paymentSuccessModalVisible:boolean
  }

  export interface threeDigitState {
    singleDigitA: any;
    singleDigitB: any;
    singleDigitC: any;
    singleACount: number;
    singleBCount: number;
    singleCCount: number;
    doubleDigitA1: any;
    doubleDigitA2: any;
    doubleDigitB1: any;
    doubleDigitB2: any;
    doubleDigitC1: any;
    doubleDigitC2: any;
    doubleABCount: number;
    doubleACCount: number;
    doubleBCCount: number;
    threeDigitA: any;
    threeDigitB: any;
    threeDigitC: any;
    threeDigitCount: number;
    min1TargetDate: any;
    min3TargetDate: any;
    min5TargetDate: any;
  }
  export interface signInSliceState {
    email: string;
    password: string;
    error: string;
    otp?: string;
    newPassword?: string;
    mobileNumber?: string;
    token?: string;
    refreshAccessToken?: string;
    userDetails?: any;
    isLoggedIn?: boolean;
    isLoading?: boolean;
    mainWalletBalance?: number;
    withdrawBalance?: number;
    walletBalanceLoader: boolean,

  }
  export interface signUpSliceState {
    mobileNumber?: string;
    otp?: string;
    password?: string;
    confirmPassword: string;
    referralCode?: string;
    isLoading?: boolean;
    error?: string;
    isEighteenPlus?: boolean;
    isNotify?: boolean;
    ipAddress?: string;
    navigation?: any;
    deviceInfo?: any;
    registrationType?: string;
    nextButtonLoader?: boolean;
    singUpConfirmLoader?: boolean;
  }
  export interface homeSliceState {
    howScreenCommonLoader: boolean;
    allGamesList: any;
    individualGameData: any;
    individualGameDataLoader: boolean;
    invidualGameHeaders:any
  }
  export interface resultSliceState {
    resultScreenCommonLoader: boolean;
    allResultData: any;
    individualGameResults: any;
  }