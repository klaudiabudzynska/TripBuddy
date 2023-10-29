import styles from '../../../../pages/TripPlans/index.module.scss';
import DatePicker from 'react-datepicker';
import Modal from '../../index.tsx';
import React, {forwardRef, useState} from 'react';

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
      <label>Trip name</label>
      <input className={styles.input} onChange={onTripNameInput}/>
      <p>Trip dates</p>
      <div>
        <div>
          <label>Start date</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            customInput={<CustomDateInput />}
          />
        </div>
        <div>
          <label>End date</label>
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