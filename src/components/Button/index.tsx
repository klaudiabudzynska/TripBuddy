import React from 'react';
import styles from './index.module.scss';
import * as classNames from 'classnames';

export enum ButtonStyle {
  primary,
  secondary,
  delete,
  active,
}

type ButtonProps = {
  type?: 'submit' | 'reset' | 'button';
  value: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: ButtonStyle;
  addClass?: any;
};

const Button = ({
  type = 'button',
  value,
  onClick,
  addClass,
  style = ButtonStyle.primary,
}: ButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClick && onClick(event);
  };

  return (
    <button
      type={type}
      className={classNames({
        [styles.button]: style === ButtonStyle.primary,
        [styles.buttonSecondary]: style === ButtonStyle.secondary,
        [styles.buttonDelete]: style === ButtonStyle.delete,
        [styles.buttonActive]: style === ButtonStyle.active,
        [addClass]: !!addClass,
      })}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

export default Button;
