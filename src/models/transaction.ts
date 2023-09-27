export enum TransactionType {
  Charged = 'charged',
  Refund = 'refund',
}

export enum TransactionCategory {
  Travel = 'travel',
  Grocery = 'grocery',
  Payment = 'payment',
}

export interface ITransaction {
  recipientName: string;
  id: number;
  amount: number;
  currency: string;
  type: TransactionType;
  transactionTime: Date;
  cardId: number;
  category: TransactionCategory;
}
