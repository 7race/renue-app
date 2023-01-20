import { VendingMachine } from './view/organisms/VendingMachine';
import { VendingMachineChangeMoney } from './view/organisms/VendingMachineChangeMoney';
import { UserMoney } from './view/organisms/UserMoney';
import style from './App.module.css';
import { SoldItems } from './view/molecules/SoldItems';
import type { FC } from 'react';

export const App: FC = () => (
  <>
    <div className={style.app}>
      <VendingMachineChangeMoney className={style.VendingMachineChangeMoney} />
      <VendingMachine className={style.vendingMachine} />
      <UserMoney className={style.userMoney} />
    </div>
    <SoldItems />
  </>
);
