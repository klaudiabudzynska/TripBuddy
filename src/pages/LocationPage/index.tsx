import {useParams} from 'react-router-dom';
import {getLocationDetailsLS} from '../../helpers/cache.ts';
import Map from '../../components/Map';
import locationDetails from '../../components/LocationDetails';
import Photos from '../../components/LocationDetails/Photos';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import styles from '../../components/LocationDetails/index.module.scss';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import {addLocationToTripPlanLS, addTripPlanToLS, getLSTripPlansList, TripPlanType} from '../../helpers/userData.ts';
import EditTripModal from '../../components/Modal/components/EditTripModal';

const LocationPage = () => {
  const { id} = useParams();

  const trips: TripPlanType[] = getLSTripPlansList() || [];

  const [isAddingToTripModalOpen, setIsAddingToTripModalOpen] = useState<boolean>(false);
  const [selectedTripId, setSelectedTripId] = useState<number>(trips[0]?.id || 0);
  const [isTripModalOpen, setIsTripModalOpen] = useState<boolean>(false);

  const showAddingToTripDialog = () => {
    setIsAddingToTripModalOpen(!isAddingToTripModalOpen);
  };

  const cancelAddingToTripDialog = () => {
    setIsAddingToTripModalOpen(false);
  };

  const saveAddingTrip = () => {
    setIsAddingToTripModalOpen(false);
    id && addLocationToTripPlanLS(selectedTripId, id);
  };

  const onTripSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedTripId(parseInt(e.currentTarget.value));
  };

  const openNewTripModal = () => {
    setIsTripModalOpen(true);
  };

  const saveTrip = (name: string, startDate: Date, endDate: Date) => {
    addTripPlanToLS({ name, startDate, endDate });
    const newTrips: TripPlanType[] = getLSTripPlansList() || [];

    setSelectedTripId(selectedTripId || newTrips[0]?.id || 0);
    setIsTripModalOpen(false);
  };

  const closeTripDialog = () => {
    setIsTripModalOpen(false);
  };

  if (!id) {
    return;
  }

  const locationData = getLocationDetailsLS(id);

  if (!locationData) {
    return;
  }

  console.log(locationData.data);

  const {name, description, address_obj, phone, email, website} = locationData?.data || {};

  return <div>
    <h1>{name}</h1>
    <p>{address_obj?.address_string}</p>
    <Photos locationId={id} />
    <Button
      value={<FontAwesomeIcon icon={faPlus} />}
      addClass={styles.actionButton}
      onClick={showAddingToTripDialog}
    />
    <p>{description}</p>
    <h2>Contact</h2>
    <p>{website}</p>
    <p>{email}</p>
    <p>{phone}</p>
    <Modal
      isOpen={isAddingToTripModalOpen}
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
      isModalOpen={isTripModalOpen}
      saveTrip={saveTrip}
      closeModal={closeTripDialog}
    />
    {/*<Map locationData={locationData} locationsToDisplay={[id]} />*/}
  </div>;
};

export default LocationPage;