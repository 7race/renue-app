import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  getAllDenominationVendingMachineItems,
  getAllVendingMachineItems,
  getChangeMoney
} from '../../../redux/VendingMachine/selector';
import { VendingMachineItem } from '../../molecules/VendingMachineItem';
import { Button } from '../../atoms/Button';
import {
  acceptChangeMoney,
  isHaveDenomination,
  pay
} from '../../../redux/User/slice';
import {
  addCurrentChangeMoney,
  addPossibleMoneyChange,
  resetCurrentChangeMoney,
  setIsChangeMoney,
  subPossibleMoneyChange
} from '../../../redux/VendingMachine/slice';
import { getAllDenominationUserItems } from '../../../redux/User/selector';
import { denominationHelper } from '../../../helpers/methods';
import { findFirstSumSubset } from '../../../helpers/functions';
import style from './style.module.css';
import type { AcceptDenominations } from '../../../redux/VendingMachine/type';
import type { ComponentPropsWithoutRef, FC } from 'react';

export const VendingMachine: FC<ComponentPropsWithoutRef<'div'>> = ({
  className
}) => {
  const allVendingMachineItems = useAppSelector(getAllVendingMachineItems);

  const denominationUserItems = useAppSelector(getAllDenominationUserItems);
  const denominationVendingMachineItems = useAppSelector(
    getAllDenominationVendingMachineItems
  );

  const changeMoney = useAppSelector(getChangeMoney);

  const dispatch = useAppDispatch();

  const putMoney = (denomination: AcceptDenominations): void => {
    const targetUserDenomination = denominationUserItems.find(
      (item) => item.denomination === denomination
    );

    if (targetUserDenomination && targetUserDenomination.amount > 0) {
      dispatch(pay(denomination));
      dispatch(addCurrentChangeMoney(denomination));
      dispatch(addPossibleMoneyChange(denomination));
      dispatch(isHaveDenomination(true));
    } else {
      dispatch(isHaveDenomination(false));
    }
  };

  const giveChangeToTheUser = (): void => {
    const denominationNumbers = denominationHelper.objectsToDenominationNumbers(
      denominationVendingMachineItems
    );
    const possibleChangeNumbers = findFirstSumSubset(
      denominationNumbers,
      changeMoney
    );
    const denominationObjects = denominationHelper.denominationNumbersToObjects(
      possibleChangeNumbers
    );

    if (changeMoney === 0) return;

    if (denominationObjects.length === 0) {
      dispatch(setIsChangeMoney(true));
      return;
    } else {
      dispatch(setIsChangeMoney(false));
    }

    dispatch(subPossibleMoneyChange(denominationObjects));
    dispatch(resetCurrentChangeMoney());
    dispatch(acceptChangeMoney(denominationObjects));
  };

  return (
    <div className={className}>
      <div className={style.vendingMachine}>
        {allVendingMachineItems.map(({ id, title, img, price, amount }) => (
          <VendingMachineItem
            key={id}
            id={id}
            title={title}
            img={img}
            price={price}
            amount={amount}
          />
        ))}
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            putMoney(50);
          }}
        >
          put 50
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            putMoney(100);
          }}
        >
          put 100
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            putMoney(500);
          }}
        >
          put 500
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            putMoney(1000);
          }}
        >
          put 1000
        </Button>
        <p>your change is</p>
        <p>{changeMoney}</p>
        <p>would you like to take it?</p>
        <Button variant="accept" type="button" onClick={giveChangeToTheUser}>
          Yes!
        </Button>
      </div>
    </div>
  );
};
