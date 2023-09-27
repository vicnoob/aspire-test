import { defineStore } from 'pinia';
import { CardStatus, ICard } from 'src/models/card';
import { ITransaction } from 'src/models/transaction';
import {
  getTransactionList,
  addNewCard,
  getCardList,
  changeCardStatus,
  cancelCard,
} from 'src/services/cardService';
type CardState = {
  cards: ICard[];
  transactions: ITransaction[];
};

export const useCardStore = defineStore('card', {
  state: () =>
    ({
      cards: [],
      transactions: [],
    } as CardState),

  actions: {
    async getCards() {
      const cards = await getCardList();
      this.cards = cards;
    },
    async addNewCard(card: ICard) {
      const cards = await addNewCard(card);
      this.cards = cards;
    },
    async cancelCard(card: ICard) {
      const cards = await cancelCard(card);
      this.cards = cards;
    },
    async changeCardStatus(card: ICard, newStatus: CardStatus) {
      const cards = await changeCardStatus(card, newStatus);
      this.cards = cards;
    },

    async getTransactionList(cardId: number) {
      const transactions = await getTransactionList(cardId);
      this.transactions = transactions;
    },
  },
});
