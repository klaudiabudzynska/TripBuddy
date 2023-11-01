import React, {forwardRef, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './index.module.scss';
import Modal from '../../index.tsx';

type RefData = {
  value?: string | number | readonly string[] | undefined,
  onClick?: React.MouseEventHandler<HTMLInputElement>
}

type AddTripModalProps = {
  isModalOpen: boolean,
  closeModal: () => void,
  saveTrip: (name: string, startDate: Date, endDate: Date) => void,
}

const CustomDateInput = forwardRef(({ value, onClick }: RefData, ref: React.Ref<HTMLInputElement>) => {
  return (
    <input className={styles.input} onClick={onClick} ref={ref} value={value}/>
  );
});

CustomDateInput.displayName = 'CustomDateInput';

const AddTripModal = ({isModalOpen, closeModal, saveTrip}: AddTripModalProps) => {
  const [newTripName, setNewTripName] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const onTripNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    setNewTripName(e.currentTarget.value);
  };

  const cancel = () => {
    closeModal();
  };

  const save = () => {
    saveTrip(newTripName, startDate, endDate);
  };

  return <Modal isOpen={isModalOpen} title="Create a trip" closeModal={cancel} acceptAction={save}>
    <>
      <label className={styles.label}>Trip name</label>
      <input className={styles.input} onChange={onTripNameInput}/>
      <p className={styles.label}>Trip dates</p>
      <div className={styles.dates}>
        <div className={styles.date}>
          <label className={styles.label}>Start date</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            customInput={<CustomDateInput />}
          />
        </div>
        <div className={styles.date}>
          <label className={styles.label}>End date</label>
          <DatePicker
            selected={endDate}
            minDate={startDate}
            onChange={(date: Date) => setEndDate(date)}
            customInput={<CustomDateInput />}
          />
        </div>
      </div>
    </>
  </Modal>;
};

export default AddTripModal;