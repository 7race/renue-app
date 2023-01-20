import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';
import bounty from './static/bounty.webp';
import cola from './static/cola.webp';
import fanta from './static/fanta.webp';
import kitkat from './static/kitkat.webp';
import lipton from './static/lipton.webp';
import rittersport from './static/rittersport.webp';
import snikers from './static/snikers.webp';
import sprite from './static/sprite.webp';
import noMore from './static/noMore.jpeg';
import type { Denomination } from '../../helpers/methods';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AcceptDenominations, Item, VendingMachine } from './type';

const initialState: VendingMachine = {
  items: [
    { id: uniqid(), title: 'bounty', img: bounty, price: 57, amount: 5 },
    { id: uniqid(), title: 'cola', img: cola, price: 67, amount: 7 },
    { id: uniqid(), title: 'fanta', img: fanta, price: 59, amount: 3 },
    { id: uniqid(), title: 'kitkat', img: kitkat, price: 33, amount: 4 },
    { id: uniqid(), title: 'lipton', img: lipton, price: 65, amount: 9 },
    {
      id: uniqid(),
      title: 'rittersport',
      img: rittersport,
      price: 94,
      amount: 4
    },
    { id: uniqid(), title: 'snikers', img: snikers, price: 50, amount: 6 },
    { id: uniqid(), title: 'sprite', img: sprite, price: 60, amount: 7 }
  ],
  denominations: [
    {
      id: uniqid(),
      denomination: 1,
      amount: 10
    },
    {
      id: uniqid(),
      denomination: 5,
      amount: 20
    },
    {
      id: uniqid(),
      denomination: 10,
      amount: 18
    },
    {
      id: uniqid(),
      denomination: 50,
      amount: 23
    },
    {
      id: uniqid(),
      denomination: 100,
      amount: 7
    },
    {
      id: uniqid(),
      denomination: 500,
      amount: 3
    }
  ],
  currentChangeMoney: 0,

  soldItems: [],

  isChangeMoney: false
};

export const vendingMachineSlice = createSlice({
  name: 'vending machine',
  initialState,
  reducers: {
    addCurrentChangeMoney: (state, { payload }: PayloadAction<number>) => {
      state.currentChangeMoney += payload;
    },
    resetCurrentChangeMoney: (state) => {
      state.currentChangeMoney = 0;
    },

    addPossibleMoneyChange: (
      state,
      { payload }: PayloadAction<Omit<AcceptDenominations, 1000>>
    ) => {
      const target = state.denominations.find(
        (d) => d.denomination === payload
      );
      if (target) {
        target.amount += 1;
      }
    },

    subItemAmount: (state, { payload }: PayloadAction<Item['id']>) => {
      const target = state.items.find((item) => item.id === payload);

      if (target) {
        if (target.amount - 1 < 0) return;
        target.amount -= 1;
        if (target.amount > 0) {
          state.currentChangeMoney -= target.price;
          state.soldItems.push(target);
        } else if (target.amount === 0) {
          const lastItem = Object.assign({}, target);
          target.img = noMore;
          state.soldItems.push(lastItem);
        }
      }
    },

    subPossibleMoneyChange: (
      state,
      { payload }: PayloadAction<Denomination[]>
    ) => {
      for (let i = 0; i < state.denominations.length; i++) {
        for (let j = 0; j < payload.length; j++) {
          if (state.denominations[i].denomination === payload[j].denomination) {
            state.denominations[i].amount -= payload[j].amount;
            break;
          }
        }
      }
    },

    setIsChangeMoney: (state, { payload }: PayloadAction<boolean>) => {
      state.isChangeMoney = payload;
    }
  }
});

export const vendingMachine = vendingMachineSlice.reducer;

export const {
  addCurrentChangeMoney,
  addPossibleMoneyChange,
  subPossibleMoneyChange,
  resetCurrentChangeMoney,
  subItemAmount,
  setIsChangeMoney
} = vendingMachineSlice.actions;
