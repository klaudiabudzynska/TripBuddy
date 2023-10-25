import React from 'react';
import styles from './index.module.scss';

export enum ButtonStyle {
    primary,
    secondary,
}

type ButtonProps = {
  type?: 'submit' | 'reset' | 'button';
  value: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: ButtonStyle
}

const Button = ({
  type = 'button',
  value,
  onClick,
  style = ButtonStyle.primary
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={style === ButtonStyle.primary ? styles.button : styles.buttonSecondary}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;