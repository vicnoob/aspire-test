import { ICard, CardStatus } from 'src/models/card';
import { cards, transactions } from './mockData';
import { LocalStorage } from 'quasar';
import { ITransaction } from 'src/models/transaction';

export const getCardList = () => {
  return new Promise<ICard[]>((resolve) => {
    const localStoredCards = LocalStorage.getItem('cards');
    let myCards: ICard[] = [];
    if (localStoredCards) {
      myCards = localStoredCards as ICard[];
    } else {
      myCards = cards.slice(0);
      LocalStorage.set('cards', cards.slice(0));
    }
    resolve(myCards);
  });
};

export const addNewCard = (card: ICard) => {
  return new Promise<ICard[]>((resolve) => {
    const localStoredCards = LocalStorage.getItem('cards') as ICard[];
    let cards = [card];
    if (localStoredCards) {
      cards = [card, ...localStoredCards];
    }
    LocalStorage.set('cards', cards);
    resolve(cards);
  });
};

export const changeCardStatus = (card: ICard, newStatus: CardStatus) => {
  return new Promise<ICard[]>((resolve) => {
    const localStoredCards = LocalStorage.getItem('cards') as ICard[];
    let cards: ICard[] = [];
    if (localStoredCards) {
      cards = localStoredCards.map((item: ICard) => {
        if (item.id === card.id) {
          item.status = newStatus;
        }
        return item;
      });
    }
    LocalStorage.set('cards', cards);
    resolve(cards);
  });
};

export const cancelCard = (card: ICard) => {
  return new Promise<ICard[]>((resolve) => {
    const localStoredCards = LocalStorage.getItem('cards') as ICard[];
    let cards: ICard[] = [];
    if (localStoredCards) {
      cards = localStoredCards.filter((item: ICard) => item.id !== card.id);
    }
    LocalStorage.set('cards', cards);
    resolve(cards);
  });
};

export const getTransactionList = (cardId: number) => {
  return new Promise<ITransaction[]>((resolve) => {
    resolve(transactions.filter((item) => cardId === item.cardId));
  });
};
