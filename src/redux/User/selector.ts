import type { User } from './type';
import type { RootState } from '../store';

export const getAllDenominationUserItems = ({
  user
}: RootState): User['denominations'] => user.denominations;

export const getTotalAmountMoney = ({ user }: RootState): number =>
  user.denominations.reduce((p, c) => p + c.denomination * c.amount, 0);

export const getIsHaveDenomination = ({
  user
}: RootState): User['isHaveDenomination'] => user.isHaveDenomination;
