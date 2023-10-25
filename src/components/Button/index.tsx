import React from 'react';
import styles from './index.module.scss';

type ButtonProps = {
    type?: 'submit' | 'reset' | 'button';
    value: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  type = 'button',
  value,
  onClick
}: ButtonProps) => {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;