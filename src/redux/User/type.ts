export type Denominations = 1 | 5 | 10 | 50 | 100 | 500 | 1000;

export interface User {
  denominations: Array<{
    readonly id: string;
    readonly denomination: Denominations;
    amount: number;
  }>;
  isHaveDenomination: boolean;
}
