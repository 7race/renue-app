import { configureStore } from '@reduxjs/toolkit';
import { vendingMachine } from './VendingMachine/slice';
import { user } from './User/slice';

export const store = configureStore({
  reducer: { vendingMachine, user }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
