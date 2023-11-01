import React from 'react';
import styles from './index.module.scss';
import * as classNames from 'classnames';

export enum ButtonStyle {
    primary,
    secondary,
    delete,
}

type ButtonProps = {
  type?: 'submit' | 'reset' | 'button';
  value: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: ButtonStyle
  addClass?: any
}

const Button = ({
  type = 'button',
  value,
  onClick,
  addClass,
  style = ButtonStyle.primary
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={classNames({
        [styles.button]: style === ButtonStyle.primary,
        [styles.buttonSecondary]: style === ButtonStyle.secondary,
        [styles.buttonDelete]: style === ButtonStyle.delete,
        [addClass]: !!addClass
      })}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;