import React, { useEffect, useState } from 'react';
import * as classNames from 'classnames';
import { getLocationDetailsLS, setLocationDetailsLS } from '../../helpers/cache.ts';
import { callProxy } from '../../helpers/fetch.ts';
import Button, { ButtonStyle } from '../Button';
import Modal from '../Modal';
import Photos from './Photos';
import { LocationDetailsType } from './typings.ts';
import styles from './index.module.scss';
import {
  addLocationToTripPlanLS,
  addTripPlanToLS,
  getLSTripPlansList,
  removeFromTripPlanLS,
  TripPlanType,
} from '../../helpers/userData.ts';
import EditTripModal from '../Modal/components/EditTripModal';

export enum ACTIONS {
  add,
  delete,
}

type LocationDetailsProps = {
  locationId?: string;
  tripId?: number;
  actions?: ACTIONS[];
  callback?: () => void;
};

const LocationDetails = ({ locationId, tripId, actions, callback }: LocationDetailsProps) => {
  const trips: TripPlanType[] = getLSTripPlansList() || [];

  const [locationDetails, setLocationDetails] = useState<LocationDetailsType>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isTripModalOpen, setIsTripModalOpen] = useState<boolean>(false);
  const [selectedTripId, setSelectedTripId] = useState<number>(trips[0]?.id || 0);

  useEffect(() => {
    if (locationId) {
      getLocationDetails(locationId);
    }
  }, [locationId]);

  const showAddingDialog = () => {
    setIsModalOpen(!isModalOpen);
  };

  const cancelAddingDialog = () => {
    setIsModalOpen(false);
  };

  const saveAddingTrip = () => {
    setIsModalOpen(false);
    locationId && addLocationToTripPlanLS(selectedTripId, locationId);
  };

  const onTripSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedTripId(parseInt(e.currentTarget.value));
  };

  const getLocationDetails = (locationId: string) => {
    if (locationId && !getLocationDetailsLS(locationId)) {
      callProxy('/tripadvisor-api/location-details', { locationId: locationId })
        .then((res) => {
          setLocationDetails(res);
          setLocationDetailsLS(locationId, res);
        })
        .catch((err) => console.error('error:' + err));
    } else {
      setLocationDetails(getLocationDetailsLS(locationId)?.data || {});
    }
  };

  const removeFromTripPlan = () => {
    removeFromTripPlanLS(tripId || 0, locationId || '0');
    callback && callback();
  };

  const openNewTripModal = () => {
    setIsTripModalOpen(true);
  };

  const saveTrip = (name: string, startDate: Date, endDate: Date) => {
    setIsTripModalOpen(false);
    addTripPlanToLS({ name, startDate, endDate });
  };

  const closeTripDialog = () => {
    setIsTripModalOpen(false);
  };

  const { location_id, name, address_obj, description } = locationDetails;

  return location_id ? (
    <div className={styles.container}>
      <div className={styles.details}>
        <h2 className={classNames(styles.text, styles.title)}>{name}</h2>
        <span className={classNames(styles.text, styles.location)}>
          {address_obj?.address_string}, {address_obj?.country}
        </span>
        <p className={classNames(styles.text, styles.description)}>{description}</p>
      </div>

      <Photos locationId={location_id} />
      <div className={styles.actions}>
        {actions?.includes(ACTIONS.add) && (
          <Button value="Add to a trip" addClass={styles.actionButton} onClick={showAddingDialog} />
        )}
        {actions?.includes(ACTIONS.delete) && (
          <Button
            value="Remove from a trip"
            addClass={styles.actionButton}
            onClick={removeFromTripPlan}
            style={ButtonStyle.delete}
          />
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        title="Add to a trip"
        closeModal={cancelAddingDialog}
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
    </div>
  ) : null;
};

export default LocationDetails;
