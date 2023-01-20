export type AcceptDenominations = 50 | 100 | 500 | 1000;

export interface Item {
  readonly id: string;
  readonly title: string;
  readonly img: string;
  readonly price: number;
  amount: number;
}

interface Denomination {
  id: string;
  denomination: number;
  amount: number;
}
export interface VendingMachine {
  items: Item[];
  denominations: Denomination[];
  currentChangeMoney: number;
  soldItems: Item[];
  isChangeMoney: boolean;
}
