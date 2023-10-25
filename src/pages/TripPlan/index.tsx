import React, {useState} from 'react';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import styles from './index.module.scss';
import TripItem from '../../components/TripItem';

function TripPlan() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [trips, setTrips] = useState<string[]>([]);
  const [newTripName, setNewTripName] = useState('');

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
    setTrips([...trips, newTripName]);
  };

  return <div>
    <h1 className={styles.title}>Your trip plans</h1>
    <Button value="Create your trip" onClick={showAddingDialog} />
    <div>
      {trips.map((trip, key) => {
        return <TripItem key={`trip-id-${key}`} location={trip}/>;
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
