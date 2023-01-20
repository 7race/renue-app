import uniqid from 'uniqid';
import { useAppSelector } from '../../../redux/hooks';
import { getAllSoldItems } from '../../../redux/VendingMachine/selector';
import style from './style.module.css';
import type { FC } from 'react';

export const SoldItems: FC = () => {
  const soldItems = useAppSelector(getAllSoldItems);

  return (
    <div className={style.soldItems}>
      {soldItems.map(({ img, title }) => (
        <div key={uniqid()} className={style.soldItem}>
          <img src={img} />
          <p>{title}</p>
        </div>
      ))}
    </div>
  );
};
