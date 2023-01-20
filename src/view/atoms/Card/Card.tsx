import style from './style.module.css';
import type { ComponentPropsWithoutRef, FC } from 'react';

interface CardProps {
  variant: 'primary' | 'secondary';
}

export const Card: FC<ComponentPropsWithoutRef<'div'> & CardProps> = ({
  children,
  variant
}) => <div className={`${style.card} ${style[variant]}`}>{children}</div>;
