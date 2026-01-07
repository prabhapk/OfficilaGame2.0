import { TransactionType } from '../../types/transaction.types';

/* -------------------- helpers -------------------- */

const formatTime = (timestamp: string) =>
  new Date(timestamp).toLocaleString();

/* -------------------- API → ENUM MAPPER -------------------- */

const mapApiTypeToTransactionType = (type: string): TransactionType | null => {
  switch (type) {
    case 'DEBIT_BET':
      return TransactionType.BET;

    case 'CREDIT_WIN':
      return TransactionType.CREDIT_WIN;

    case 'Deposit':
    case 'Recharge Fee':
      return TransactionType.RECHARGE;

    case 'Withdraw':
      return TransactionType.WITHDRAW;

    case 'Transfer':
      return TransactionType.TRANSFER;

    case 'Referral Bonus':
      return TransactionType.VIP_BONUS;

    case 'Rebate':
      return TransactionType.REBATE;

    case 'Commission':
      return TransactionType.COMMISSION;

    default:
      return null;
  }
};

/* -------------------- BASE -------------------- */

const base = (t: any) => ({
  beforeBalance: t.balanceBefore ?? 0,
  afterBalance: t.balanceAfter ?? 0,
  orderTime: formatTime(t.timestamp),
  orderNumber: t.transactionId,
});

/* -------------------- MAIN NORMALIZER -------------------- */

export const normalizeTransactionForCard = (t: any) => {
  const transactionType = mapApiTypeToTransactionType(t.type);
  if (!transactionType) return null;

  switch (transactionType) {
    case TransactionType.BET:
      return {
        transactionType,
        ...base(t),
        betAmount: Math.abs(t.amount),
        game: t.gameType ?? '-',
      };

    case TransactionType.CREDIT_WIN:
      return {
        transactionType,
        ...base(t),
        betAmount: t.amount,
        game: t.gameType ?? '-',
      };

    case TransactionType.RECHARGE:
      return {
        transactionType,
        ...base(t),
        rechargeAmount: t.amount,
        channelName: t.channelName ?? '-',
        paymentType: t.paymentType ?? '-',
        description: t.description ?? '-',
      };

    case TransactionType.WITHDRAW:
      return {
        transactionType,
        ...base(t),
        betAmount: Math.abs(t.amount),
        description: t.description ?? '-',
      };

    case TransactionType.TRANSFER:
      return {
        transactionType,
        ...base(t),
        betAmount: t.amount,
        description: t.description ?? '-',
      };

    case TransactionType.VIP_BONUS:
      return {
        transactionType,
        ...base(t),
        betAmount: t.amount,
        description: t.description ?? '-',
      };

    case TransactionType.REBATE:
      return {
        transactionType,
        ...base(t),
        betAmount: t.amount,
        description: t.description ?? '-',
      };

    case TransactionType.COMMISSION:
      return {
        transactionType,
        ...base(t),
        betAmount: t.amount,
        channelName: t.channelName ?? '-',
        paymentType: t.paymentType ?? '-',
        description: t.description ?? '-',
      };

    default:
      return null;
  }
};
