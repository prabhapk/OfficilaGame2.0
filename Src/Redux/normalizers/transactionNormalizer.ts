import { TransactionType } from '../../types/transaction.types';

/* -------------------- helpers -------------------- */

const formatTime = (timestamp: string) =>
  new Date(timestamp).toLocaleString();

/* -------------------- API → ENUM MAPPER -------------------- */

export const mapApiTypeToTransactionType = (type: string) => {
  if (!type) return null;

  const normalizedType = type.trim().toUpperCase(); // ✅ IMPORTANT

  switch (normalizedType) {
    case "WALLET RECHARGE":
      return TransactionType.RECHARGE;

    case "WITHDRAW":
      return TransactionType.WITHDRAW;

    case "DEBIT_BET":
      return TransactionType.BET;

    case "CREDIT_WIN":
      return TransactionType.WIN;

    case "TRANSFER":
      return TransactionType.TRANSFER;

    case "VIP_BONUS":
      return TransactionType.VIP_BONUS;

    case "REBATE":
      return TransactionType.REBATE;

    case "COMMISSION":
      return TransactionType.COMMISSION;

    default:
      console.log("❌ UNKNOWN API TYPE:", type);
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

export const normalizeTransactionForCard = (item: any) => {
  if (!item) return null;

  console.log('🔍 RAW TYPE:', item.type); // DEBUG

  const transactionType = mapApiTypeToTransactionType(item.type);

  if (!transactionType) {
    console.log('❌ DROPPED ITEM:', item);
    return null;
  }

  return {
    transactionType,
    type: item.type,

    betAmount: Math.abs(item.amount || 0),
afterBalance: Number(item.balanceAfter),
beforeBalance: Number(item.balanceBefore),
    amount: item.amount || 0,
balanceBefore: item.balanceBefore || 0,
    orderTime: new Date(item.timestamp).toLocaleString(),
    orderNumber: item.transactionId,

    description: item.description || '-',
    channelName: item.channelName || '-',
    // paymentType: item.paymentType || '-',
    game: item.gameType || '-',
    rechargeNumber: item.transactionId,
    rechargeTime: new Date(item.timestamp).toLocaleString(),
    paymentType: item.status || "-"
  };
};

