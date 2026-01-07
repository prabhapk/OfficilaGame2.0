export interface ApiTransaction {
    transactionId: string;
    timestamp: string;
    type: string;
  
    amount: number;
    balanceBefore: number | null;
    balanceAfter: number | null;
  
    description?: string;
  
    // Newly confirmed API fields
    channelName?: string | null;
    paymentType?: string | null;
    gameName?: string | null;
  }
  