import Modal from '../../index.tsx';
import styles from '../../../LocationDetails/index.module.scss';
import Button from '../../../Button';
import EditTripModal from '../EditTripModal';
import React, {useState} from 'react';
import {
  addLocationToTripPlanLS,
  addTripPlanToLS,
  getLSTripPlansList,
  TripPlanType
} from '../../../../helpers/userData.ts';

type AddToTripModalProps = {
  isModalOpen: boolean;
  locationId: string;
  closeModal: () => void;
}

const AddToTripModal = ({
  isModalOpen,
  locationId,
  closeModal
}: AddToTripModalProps) => {
  const trips: TripPlanType[] = getLSTripPlansList() || [];
  const [selectedTripId, setSelectedTripId] = useState<number>(trips[0]?.id || 0);
  const [isEditTripModalOpen, setIsEditTripModalOpen] = useState<boolean>(false);

  const cancelAddingToTripDialog = () => {
    closeModal();
  };

  const saveAddingTrip = () => {
    closeModal();
    addLocationToTripPlanLS(selectedTripId, locationId);
  };

  const onTripSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedTripId(parseInt(e.currentTarget.value));
  };

  const openNewTripModal = () => {
    setIsEditTripModalOpen(true);
  };

  const saveTrip = (name: string, startDate: Date, endDate: Date) => {
    addTripPlanToLS({ name, startDate, endDate });
    const newTrips: TripPlanType[] = getLSTripPlansList() || [];

    setSelectedTripId(selectedTripId || newTrips[0]?.id || 0);
    setIsEditTripModalOpen(false);
  };

  const closeEditTripDialog = () => {
    setIsEditTripModalOpen(false);
  };

  return <>
    <Modal
      isOpen={isModalOpen}
      title="Add to a trip"
      closeModal={cancelAddingToTripDialog}
      acceptAction={saveAddingTrip}
    >
      <>
        <p className={styles.modalText}>Choose a trip</p>
        {trips.length > 0 && (
          <select onChange={onTripSelectChange} className={styles.tripSelect}>
            {trips.map((trip, key) => {
              return (
                <option key={key} value={trip.id}>
                  {trip.name}
                </option>
              );
            })}
          </select>
        )}
        <Button
          value="+ Create a new trip"
          onClick={openNewTripModal}
          addClass={styles.addNewTripButton}
        />
      </>
    </Modal>
    <EditTripModal
      isModalOpen={isEditTripModalOpen}
      saveTrip={saveTrip}
      closeModal={closeEditTripDialog}
    />
  </>;
};

export default AddToTripModal;
