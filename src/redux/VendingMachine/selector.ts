import type { VendingMachine } from './type';
import type { RootState } from '../store';

export const getAllVendingMachineItems = ({
  vendingMachine
}: RootState): VendingMachine['items'] => vendingMachine.items;

export const getAllDenominationVendingMachineItems = ({
  vendingMachine
}: RootState): VendingMachine['denominations'] => vendingMachine.denominations;

export const getTotalAmountMoney = ({ vendingMachine }: RootState): number =>
  vendingMachine.denominations.reduce(
    (p, c) => p + c.denomination * c.amount,
    0
  );

export const getChangeMoney = ({
  vendingMachine
}: RootState): VendingMachine['currentChangeMoney'] =>
  vendingMachine.currentChangeMoney;

export const getAllSoldItems = ({
  vendingMachine
}: RootState): VendingMachine['soldItems'] => vendingMachine.soldItems;

export const getIsChangeMoney = ({
  vendingMachine
}: RootState): VendingMachine['isChangeMoney'] => vendingMachine.isChangeMoney;
