import { useAppSelector } from '../../../redux/hooks';
import {
  getAllDenominationVendingMachineItems,
  getIsChangeMoney,
  getTotalAmountMoney
} from '../../../redux/VendingMachine/selector';
import { Card } from '../../atoms/Card';
import style from './style.module.css';
import type { ComponentPropsWithoutRef, FC } from 'react';

export const VendingMachineChangeMoney: FC<ComponentPropsWithoutRef<'div'>> = ({
  className
}) => {
  const allDenominationVendingMachineItems = useAppSelector(
    getAllDenominationVendingMachineItems
  );
  const totalAmountMoney = useAppSelector(getTotalAmountMoney);

  const isChangeMoney = useAppSelector(getIsChangeMoney);

  return (
    <div className={className}>
      <div className={style.container}>
        <p>Possible money change</p>
        <div className={style.VendingMachineChangeMoney}>
          {allDenominationVendingMachineItems.map(
            ({ id, denomination, amount }) => (
              <Card variant="primary" key={id}>
                {denomination}: {amount}
              </Card>
            )
          )}
        </div>
        <p>total: {totalAmountMoney}</p>
        {isChangeMoney && (
          <p>
            sorry, we don&apos;t have suitable banknotes for current change, but
            you can use it to buy something tasty
          </p>
        )}
      </div>
    </div>
  );
};
