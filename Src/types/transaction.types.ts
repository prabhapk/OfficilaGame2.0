export enum TransactionType {
  BET = 'BET',
  CREDIT_WIN = 'CREDIT_WIN',
  RECHARGE = 'RECHARGE',
  WITHDRAW = 'WITHDRAW',
  TRANSFER = 'TRANSFER',
  VIP_BONUS = 'VIP_BONUS',
  COMMISSION = 'Commission',
  REBATE = 'Rebate',
}
  
  /**
   * Common base for all transactions
   */
  export interface BaseTransaction {
    transactionType: TransactionType;
    beforeBalance: number;
    afterBalance: number;
  }
  