export interface HeaderButton {
    id: number
    name: string
  }

export interface BetsData {
  betAmount: number;
  beforeBalance: number;
  afterBalance: number;
  orderTime: string;
  game: string;
  orderNumber: string;
  }

  export interface RechargeData {
    rechargeAmount: number;
    beforeBalance: number;
    afterBalance: number;
    rechargeTime: string;
    rechargeNumber: string;
    ssr: string;
  }
  export interface AllData {
    rechargeAmount?: number;
    beforeBalance?: number;
    afterBalance?: number;
    rechargeTime?: string;
    rechargeNumber?: string;
    ssr?: string;
    betAmount?: number;
    orderTime?: string;
    game?: string;
    orderNumber?: string;
  }