import React, {ChangeEvent, useEffect, useState} from 'react';
import * as classNames from 'classnames';
import { getLocationDetailsLS, setLocationDetailsLS } from '../../helpers/cache.ts';
import { callProxy } from '../../helpers/fetch.ts';
import Button, { ButtonStyle } from '../Button';
import Modal from '../Modal';
import AddToTripModal from '../Modal/components/AddToTripModal';
import Photos from './Photos';
import { LocationDetailsType } from './typings.ts';
import styles from './index.module.scss';
import {
  addLocationToDay,
  removeFromTripPlanLS,
  removeLocationFromDay,
} from '../../helpers/userData.ts';
import { formatDate } from '../../helpers/dates.ts';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

export enum ACTIONS {
  addToTrip,
  addToDay,
  removeFromDay,
  delete,
}

type LocationDetailsProps = {
  locationId?: string;
  tripId?: number;
  tripDaysTimestamps?: number[];
  actions?: ACTIONS[];
  allowNotes?: boolean;
  callback?: () => void;
};

const LocationDetails = ({
  locationId,
  tripId,
  tripDaysTimestamps,
  actions,
  allowNotes,
  callback,
}: LocationDetailsProps) => {
  const [locationDetails, setLocationDetails] = useState<LocationDetailsType>({});
  const [isAddingToTripModalOpen, setIsAddingToTripModalOpen] = useState<boolean>(false);
  const [isAddingToDayModalOpen, setIsAddingToDayModalOpen] = useState<boolean>(false);
  const [isRemovingFromDayModalOpen, setIsRemovingFromDayModalOpen] = useState<boolean>(false);
  const [selectedDayTimestamp, setSelectedDayTimestamp] = useState<number>(
    tripDaysTimestamps ? tripDaysTimestamps[0] : 0,
  );
  const [note, setNote] = useState<string>('');
  const [isEditNote, setIsEditNote] = useState<boolean>(!note.length);

  useEffect(() => {
    if (locationId) {
      getLocationDetails(locationId);
    }
  }, [locationId]);

  const showAddingToTripDialog = () => {
    setIsAddingToTripModalOpen(!isAddingToTripModalOpen);
  };

  const closeAddingToTripDialog = () => {
    setIsAddingToTripModalOpen(false);
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

  const showRemovingFromDayDialog = () => {
    setIsRemovingFromDayModalOpen(!isRemovingFromDayModalOpen);
  };

  const cancelRemovingFromDayDialog = () => {
    setIsRemovingFromDayModalOpen(false);
  };

  const saveRemovingFromDay = () => {
    setIsRemovingFromDayModalOpen(false);
    tripId &&
      locationId &&
      selectedDayTimestamp &&
      removeLocationFromDay(tripId, locationId, selectedDayTimestamp);
    callback && callback();
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

  const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const cancelNote = () => {
    setNote('');
    setIsEditNote(false);
  };

  const saveNote = () => {
    setIsEditNote(!note.length);
  };

  const { location_id, name, address_obj, description } = locationDetails;

  return location_id ? (
    <>
      <div className={styles.container}>
        <Link to={`/location/${location_id}`} className={styles.locationContainer}>
          <div className={styles.details}>
            <h2 className={classNames(styles.text, styles.title)}>{name}</h2>
            <span className={classNames(styles.text, styles.location)}>
              {address_obj?.address_string}, {address_obj?.country}
            </span>
            <div className={styles.actions}>
              {actions?.includes(ACTIONS.addToTrip) && (
                <Button
                  value={<FontAwesomeIcon icon={faPlus} />}
                  addClass={styles.actionButton}
                  onClick={showAddingToTripDialog}
                />
              )}
              {actions?.includes(ACTIONS.addToDay) && (
                <Button
                  value={<FontAwesomeIcon icon={faCalendar} />}
                  addClass={styles.actionButton}
                  onClick={showAddingToDayDialog}
                />
              )}
              {actions?.includes(ACTIONS.removeFromDay) && (
                <Button
                  value={<FontAwesomeIcon icon={faCalendar} />}
                  addClass={styles.actionButton}
                  onClick={showRemovingFromDayDialog}
                  style={ButtonStyle.delete}
                />
              )}
              {actions?.includes(ACTIONS.delete) && (
                <Button
                  value={<FontAwesomeIcon icon={faTrash} />}
                  addClass={styles.actionButton}
                  onClick={removeFromTripPlan}
                  style={ButtonStyle.delete}
                />
              )}
            </div>
            <p className={classNames(styles.text, styles.description)}>{description}</p>
          </div>

          <Photos locationId={location_id} />
        </Link>
        {allowNotes &&
        <div className={styles.notesContainer}>
          {!isEditNote &&
            <pre
              className={styles.noteText}
              onClick={() => setIsEditNote(true)}
            >
              {note}
            </pre>
          }
          {isEditNote &&
            <>
              <textarea
                className={styles.noteData}
                onChange={handleNoteChange}
                defaultValue={note}
              />
              <div className={styles.noteButtons}>
                <Button value="Save note" onClick={saveNote}/>
                <Button value="Cancel" style={ButtonStyle.secondary} onClick={cancelNote}/>
              </div>
            </>
          }
        </div>
        }
      </div>
      <AddToTripModal
        isModalOpen={isAddingToTripModalOpen}
        locationId={location_id}
        closeModal={closeAddingToTripDialog}
      />

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
      <Modal
        isOpen={isRemovingFromDayModalOpen}
        title="Remove from a day"
        closeModal={cancelRemovingFromDayDialog}
        acceptAction={saveRemovingFromDay}
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
    </>
  ) : null;
};

export default LocationDetails;
