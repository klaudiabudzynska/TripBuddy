import React, {useState} from 'react';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import styles from './index.module.scss';
import TripItem from '../../components/TripItem';
import {addTripPlanToLS, getLSTripPlansList, TripPlanType} from '../../helpers/userData.ts';

function TripPlan() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTripName, setNewTripName] = useState('');

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
        return <TripItem key={`trip-id-${key}`} location={trip.name}/>;
      })}
    </div>
    <Modal isOpen={isModalOpen} title="Create a trip" closeModal={cancelAddingDialog} acceptAction={saveTrip}>
      <>
        <p>Trip name</p>
        <input className={styles.input} onChange={onTripNameInput}/>
      </>
    </Modal>
  </div>;
}

export default TripPlan;
