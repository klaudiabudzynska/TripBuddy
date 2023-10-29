import React, {forwardRef, useState} from 'react';
import DatePicker from 'react-datepicker';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import TripItem from '../../components/TripItem';
import {addTripPlanToLS, getLSTripPlansList, TripPlanType} from '../../helpers/userData.ts';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './index.module.scss';

type RefData = {
  value?: string | number | readonly string[] | undefined,
  onClick?: React.MouseEventHandler<HTMLInputElement>
}

const CustomDateInput = forwardRef(({ value, onClick }: RefData, ref: React.Ref<HTMLInputElement>) => {
  return (
    <input className={styles.input} onClick={onClick} ref={ref} value={value}/>
  );
});

CustomDateInput.displayName = 'CustomDateInput';

function TripPlans() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTripName, setNewTripName] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const trips: TripPlanType[] = getLSTripPlansList() || [];

  const onTripNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    setNewTripName(e.currentTarget.value);
  };

  const showAddingDialog = () => {
    setIsModalOpen(!isModalOpen);
  };

  const cancelAddingDialog = () => {
    setIsModalOpen(false);
  };

  const saveTrip = () => {
    setIsModalOpen(false);
    addTripPlanToLS(newTripName);
  };

  return <div>
    <h1 className={styles.title}>Your trip plans</h1>
    <Button value="Create your trip" onClick={showAddingDialog} />
    <div className={styles.tripsList}>
      {trips.map((trip, key) => {
        return <TripItem key={`trip-id-${key}`} locationName={trip.name} id={trip.id}/>;
      })}
    </div>
    <Modal isOpen={isModalOpen} title="Create a trip" closeModal={cancelAddingDialog} acceptAction={saveTrip}>
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
    </Modal>
  </div>;
}

export default TripPlans;
