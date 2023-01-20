import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';
import type { Denomination } from '../../helpers/methods';
import type { AcceptDenominations } from '../VendingMachine/type';
import type { User } from './type';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
  denominations: [
    {
      id: uniqid(),
      denomination: 1,
      amount: 0
    },
    {
      id: uniqid(),
      denomination: 5,
      amount: 0
    },
    {
      id: uniqid(),
      denomination: 10,
      amount: 0
    },
    {
      id: uniqid(),
      denomination: 50,
      amount: 10
    },
    {
      id: uniqid(),
      denomination: 100,
      amount: 5
    },
    {
      id: uniqid(),
      denomination: 500,
      amount: 2
    },
    {
      id: uniqid(),
      denomination: 1000,
      amount: 2
    }
  ],
  isHaveDenomination: true
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    pay: (state, { payload }: PayloadAction<AcceptDenominations>) => {
      const target = state.denominations.find(
        (d) => d.denomination === payload
      );
      if (target && target.amount > 0) {
        target.amount -= 1;
      }
    },

    acceptChangeMoney: (state, { payload }: PayloadAction<Denomination[]>) => {
      for (let i = 0; i < state.denominations.length; i++) {
        for (let j = 0; j < payload.length; j++) {
          if (state.denominations[i].denomination === payload[j].denomination) {
            state.denominations[i].amount += payload[j].amount;
            break;
          }
        }
      }
    },

    isHaveDenomination: (state, { payload }: PayloadAction<boolean>) => {
      state.isHaveDenomination = payload;
    }
  }
});

export const user = userSlice.reducer;

export const { pay, acceptChangeMoney, isHaveDenomination } = userSlice.actions;
