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
  addLocationToDay,
  addLocationToTripPlanLS,
  addTripPlanToLS,
  getLSTripPlansList,
  removeFromTripPlanLS,
  TripPlanType,
} from '../../helpers/userData.ts';
import EditTripModal from '../Modal/components/EditTripModal';
import { formatDate } from '../../helpers/dates.ts';

export enum ACTIONS {
  addToTrip,
  addToDay,
  delete,
}

type LocationDetailsProps = {
  locationId?: string;
  tripId?: number;
  tripDaysTimestamps?: number[];
  actions?: ACTIONS[];
  callback?: () => void;
};

const LocationDetails = ({
  locationId,
  tripId,
  tripDaysTimestamps,
  actions,
  callback,
}: LocationDetailsProps) => {
  const trips: TripPlanType[] = getLSTripPlansList() || [];

  const [locationDetails, setLocationDetails] = useState<LocationDetailsType>({});
  const [isAddingToTripModalOpen, setIsAddingToTripModalOpen] = useState<boolean>(false);
  const [isAddingToDayModalOpen, setIsAddingToDayModalOpen] = useState<boolean>(false);
  const [isTripModalOpen, setIsTripModalOpen] = useState<boolean>(false);
  const [selectedTripId, setSelectedTripId] = useState<number>(trips[0]?.id || 0);
  const [selectedDayTimestamp, setSelectedDayTimestamp] = useState<number>(
    tripDaysTimestamps ? tripDaysTimestamps[0] : 0,
  );

  useEffect(() => {
    if (locationId) {
      getLocationDetails(locationId);
    }
  }, [locationId]);

  const showAddingToTripDialog = () => {
    setIsAddingToTripModalOpen(!isAddingToTripModalOpen);
  };

  const cancelAddingToTripDialog = () => {
    setIsAddingToTripModalOpen(false);
  };

  const saveAddingTrip = () => {
    setIsAddingToTripModalOpen(false);
    locationId && addLocationToTripPlanLS(selectedTripId, locationId);
  };

  const showAddingToDayDialog = () => {
    setIsAddingToDayModalOpen(!isAddingToDayModalOpen);
  };

  const cancelAddingToDayDialog = () => {
    setIsAddingToDayModalOpen(false);
  };

  const saveAddingToDay = () => {
    setIsAddingToDayModalOpen(false);
    tripId &&
      locationId &&
      selectedDayTimestamp &&
      addLocationToDay(tripId, locationId, selectedDayTimestamp);
  };

  const onTripSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedTripId(parseInt(e.currentTarget.value));
  };

  const onDaySelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedDayTimestamp(parseInt(e.currentTarget.value));
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
    addTripPlanToLS({ name, startDate, endDate });
    const newTrips: TripPlanType[] = getLSTripPlansList() || [];

    setSelectedTripId(selectedTripId || newTrips[0]?.id || 0);
    setIsTripModalOpen(false);
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
        {actions?.includes(ACTIONS.addToTrip) && (
          <Button
            value="Add to a trip"
            addClass={styles.actionButton}
            onClick={showAddingToTripDialog}
          />
        )}
        {actions?.includes(ACTIONS.addToDay) && (
          <Button
            value="Add to a day"
            addClass={styles.actionButton}
            onClick={showAddingToDayDialog}
          />
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
      <Modal
        isOpen={isAddingToDayModalOpen}
        title="Add to a day"
        closeModal={cancelAddingToDayDialog}
        acceptAction={saveAddingToDay}
      >
        <>
          <p className={styles.modalText}>Choose a day</p>
          {tripDaysTimestamps && (
            <select onChange={onDaySelectChange} className={styles.tripSelect}>
              {tripDaysTimestamps.map((dayTimestamp, key) => {
                return (
                  <option key={key} value={dayTimestamp}>
                    {formatDate(dayTimestamp)}
                  </option>
                );
              })}
            </select>
          )}
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
