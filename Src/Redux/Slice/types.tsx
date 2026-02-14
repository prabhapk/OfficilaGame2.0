import InsufficientBalanceModal from "../../Components/Modal/InsufficientBalanceModal";

export interface CommonSliceState {
    howToPlayVisible: boolean;
    show30SecondsLeftAlert:boolean
    paymentSuccessModalVisible:boolean
    InsufficientBalanceModalVisible:boolean
    sessionExpiredVisible:boolean
    shouldNavigateToLogin:boolean
    tableCurrentPage:number
    gameRulesData: any;
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
    myOrdersData:any
    myOrdersLoader:boolean
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
    resetPasswordLoader: boolean,
    userId: number,
    vipLevelDetails: any,
    totalDeposit: number,
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
    resultLoader: boolean;
  }

  export interface Quick3DState {
    quick3dGamesList: any;
    quick3dGamesLoader:boolean
    quick3dGameTypeId:number
    quick3dGamesGroupId:number
  }
  export interface withdrawSliceStates {
    withdrawLoader:boolean
    bankAccountsData:any
  }
  export interface transactionSliceStates {
    transactionLoader:boolean
    transferData:any
    walletData:any
    withdrawalsData:any
    betsData:any
    winsData:any
    vipsData:any
    allTransactionsData:any
    rebateData:any
    commissionData:any
  }

  export interface vip {
    vipLists: any
    vipListLoader: boolean
  }
  export interface depositState {
    paymentGateWayLists: any,
    paymentGateWayListsLoader: boolean,
    depositLoader:boolean,
    depositData:any
  }

  export interface agentSliceState {
    agentLoader:boolean
    userData: any;
    dashboardData: any;
    dashBoardUserData: any;
    dashBoardDailyData: any;
    dashBoardUserDataActiveUser: any;
    dashBoardUserDataRechargeUser: any;
    dashBoardUserDataNewUser: any;
    dashBoardDailyDataRecharge: any;
    dashBoardDailyDataCommission: any;
    inviteCode: any;
    agentCreatedDate: any;
    rechargeBonusData: any;
    commissionBonusData: any;
  }
  export interface rebateSliceState {
    rebateData: any;
    rebateDataLoader: boolean;
    rebateListData: any;
    rebateListLoader: boolean;
    rebateClaimData: any;
    rebateClaimDataLoader: boolean;
    allRebateSummary: any;
    toBeCollectedList: any;
    receivedList: any;
    allRebateSummaryMaster: any
    toBeCollectedListMaster: any
    receivedListMaster: any

  }