import style from './style.module.css';
import type { ComponentPropsWithoutRef, FC } from 'react';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  variant: 'primary' | 'secondary' | 'accept';
}

export const Button: FC<ComponentPropsWithoutRef<'button'> & ButtonProps> = ({
  children,
  variant,
  ...rest
}) => (
  <button className={`${style.button} ${style[variant]}`} {...rest}>
    {children}
  </button>
);
