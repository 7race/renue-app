import { useAppSelector } from '../../../redux/hooks';
import {
  getAllDenominationUserItems,
  getIsHaveDenomination,
  getTotalAmountMoney
} from '../../../redux/User/selector';
import { Card } from '../../atoms/Card';
import style from './style.module.css';
import type { ComponentPropsWithoutRef, FC } from 'react';

export const UserMoney: FC<ComponentPropsWithoutRef<'div'>> = ({
  className
}) => {
  const denominationUserItems = useAppSelector(getAllDenominationUserItems);

  const totalAmountMoney = useAppSelector(getTotalAmountMoney);

  const isHaveDenomination = useAppSelector(getIsHaveDenomination);

  return (
    <div className={className}>
      <div className={style.container}>
        <p>User money</p>
        <div className={style.userMoney}>
          {denominationUserItems.map(({ id, denomination, amount }) => (
            <Card variant="secondary" key={id}>
              {denomination}: {amount}
            </Card>
          ))}
        </div>
        <p>total: {totalAmountMoney}</p>
        {!isHaveDenomination && <p>you don&apos;t have this banknote</p>}
      </div>
    </div>
  );
};
