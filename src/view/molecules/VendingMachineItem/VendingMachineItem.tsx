import { Button } from '../../atoms/Button';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getChangeMoney } from '../../../redux/VendingMachine/selector';
import { subItemAmount } from '../../../redux/VendingMachine/slice';
import style from './style.module.css';
import type { FC } from 'react';
import type { Item } from '../../../redux/VendingMachine/type';

export const VendingMachineItem: FC<Item> = ({
  id,
  title,
  img,
  price,
  amount
}) => {
  const changeMoney = useAppSelector(getChangeMoney);
  const dispatch = useAppDispatch();

  const buyProduct = (id: string): void => {
    dispatch(subItemAmount(id));
  };

  return (
    <div className={style.vendingMachineItem}>
      <img src={img} />
      <p>{title}</p>
      <p>price: {price}</p>
      <br />
      <p>amount: {amount}</p>
      <Button
        variant="primary"
        type="button"
        disabled={changeMoney < price || amount === 0}
        onClick={() => {
          buyProduct(id);
        }}
      >
        Buy
      </Button>
    </div>
  );
};
