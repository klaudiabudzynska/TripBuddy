import React, { useEffect, useState } from 'react';
import * as classNames from 'classnames';
import { getLocationDetailsLS, setLocationDetailsLS } from '../../helpers/cache.ts';
import { callProxy } from '../../helpers/fetch.ts';
import Button from '../Button';
import Modal from '../Modal';
import Photos from './Photos';
import { LocationDetailsType } from './typings.ts';
import styles from './index.module.scss';
import {addLocationToTripPlanLS, getLSTripPlansList, TripPlanType} from '../../helpers/userData.ts';

const LocationDetails = (details: LocationDetailsType) => {
  const trips: TripPlanType[] = getLSTripPlansList() || [];

  const [locationDetails, setLocationDetails] = useState<LocationDetailsType>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTripId, setSelectedTripId] = useState<number>(trips[0]?.id || 0);

  useEffect(() => {
    if (details.location_id) {
      getLocationDetails(details.location_id);
    }
  }, [details]);

  const showAddingDialog = () => {
    setIsModalOpen(!isModalOpen);
  };

  const cancelAddingDialog = () => {
    setIsModalOpen(false);
  };

  const saveTrip = () => {
    setIsModalOpen(false);
    details.location_id && addLocationToTripPlanLS(selectedTripId, details.location_id);
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
      <div className={styles.addToTrip}>
        <Button value="Add to a trip" addClass={styles.addToTripButton} onClick={showAddingDialog} />
        <Modal isOpen={isModalOpen} title="Create a trip" closeModal={cancelAddingDialog} acceptAction={saveTrip}>
          <>
            <p>Choose a trip</p>
            <select onChange={onTripSelectChange}>
              {
                trips.map((trip, key) => {
                  return (
                    <option key={key} value={trip.id}>{trip.name}</option>
                  );
                })
              }
            </select>
          </>
        </Modal>
      </div>
    </div>
  ) : null;
};

export default LocationDetails;
