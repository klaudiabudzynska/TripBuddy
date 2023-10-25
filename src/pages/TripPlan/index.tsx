import Button from '../../components/Button';
import Modal from '../../components/Modal';
import styles from './index.module.scss';
import {useState} from 'react';

function TripPlan() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showAddingDialog = () => {
    setIsModalOpen(!isModalOpen);
  };

  const cancelAddingDialog = () => {
    setIsModalOpen(false);
  };

  const saveTrip = () => {
    setIsModalOpen(false);
  };

  return <div>
    <h1 className={styles.title}>Your trip plans</h1>
    <Button value="Create your trip" onClick={showAddingDialog} />
    <Modal isOpen={isModalOpen} title="Create a trip" closeModal={cancelAddingDialog} acceptAction={saveTrip}>
      <>
        <p>Trip name</p>
        <input className={styles.input}/>
      </>
    </Modal>
  </div>;
}

export default TripPlan;
