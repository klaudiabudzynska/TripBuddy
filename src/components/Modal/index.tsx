import {LegacyRef, MouseEventHandler, ReactElement, useEffect, useRef} from 'react';
import styles from './index.module.scss';
import Button, {ButtonStyle} from '../Button';

type ModalProps = {
    isOpen: boolean;
    title?: string;
    closeModal: MouseEventHandler<HTMLButtonElement>;
    acceptAction?: MouseEventHandler<HTMLButtonElement>;
    children: ReactElement;
}

const Modal = ({ isOpen, title, closeModal, acceptAction, children }: ModalProps) => {
  const ref: LegacyRef<HTMLDialogElement> | undefined = useRef(null);

  useEffect(() => {
    isOpen ? ref.current?.show() : ref.current?.close();
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      className={styles.modal}
    >
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.modalContent}>
        {children}
      </div>
      <Button value="Close" onClick={closeModal} style={ButtonStyle.secondary} />
      {acceptAction &&
        <Button value="Save" onClick={acceptAction}/>
      }
    </dialog>
  );
};

export default Modal;