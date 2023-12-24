import { useNavigate, useParams } from 'react-router-dom';
import {
  editTripPlanLS,
  getLSTripDayLocationsId,
  getLSTripPlanById,
  TripPlanType,
} from '../../helpers/userData.ts';
import LocationDetails, { ACTIONS } from '../../components/LocationDetails';
import styles from './index.module.scss';
import {ChangeEvent, useState} from 'react';
import { getLocationDetailsLS } from '../../helpers/cache.ts';
import Button, { ButtonStyle } from '../../components/Button';
import { formatDate } from '../../helpers/dates.ts';
import Map from '../../components/Map';

const TripPlan = () => {
  const { id, dayTimestamp } = useParams();
  const navigate = useNavigate();
  const [tripPlanData, setTripPlanData] = useState<TripPlanType | undefined>(
    getLSTripPlanById(parseInt(id || '0')),
  );
  const [note, setNote] = useState<string>(tripPlanData?.notes || '');
  const [isEditNote, setIsEditNote] = useState<boolean>(false);
  const locationIdsByDay = getLSTripDayLocationsId(
    parseInt(id || '0'),
    parseInt(dayTimestamp || '0'),
  );
  const locationsToDisplay = dayTimestamp ? locationIdsByDay : tripPlanData?.locationsId;

  const firstLocationId = locationsToDisplay ? locationsToDisplay[0] : '0';
  const firstLocationData = getLocationDetailsLS(firstLocationId);

  const startDate = new Date(tripPlanData?.startDate || 0);
  const endDate = new Date(tripPlanData?.endDate || 0);
  const tripDuration =
    Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;

  const tripDaysTimestamps: number[] = [];

  for (let iterator = 0; iterator < tripDuration; iterator++) {
    tripDaysTimestamps.push(startDate.getTime() + iterator * 24 * 60 * 60 * 1000);
  }

  if (!id) {
    return null;
  }

  const reloadList = () => {
    setTripPlanData(getLSTripPlanById(parseInt(id || '0')));
  };

  const openDayDetails = (timestamp: number) => {
    if (timestamp === parseInt(dayTimestamp || '0')) {
      navigate(`/trip-plans/${id}`);
    } else {
      navigate(`/trip-plans/${id}/${timestamp}`);
    }
  };

  const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const saveNote = () => {
    editTripPlanLS(
      parseInt(id),
      {
        name: tripPlanData?.name || '',
        startDate,
        endDate
      },
      note
    );
    setIsEditNote(false);
  };

  return (
    <div>
      <h1 className={styles.title}>
        Trip plan to {tripPlanData?.name}, {tripDuration} days
      </h1>
      <div className={styles.noteBox}>
        <h2 className={styles.subtitle}>Trip notes</h2>
        {!isEditNote &&
          <p className={styles.noteText} onClick={() => setIsEditNote(true)}>{note}</p>
        }
        {isEditNote &&
          <>
            <textarea
              className={styles.noteData}
              onChange={handleNoteChange}
              defaultValue={note}
            />
            <Button value="Save note" onClick={saveNote}/>
          </>
        }
      </div>
      <div className={styles.dates}>
        {tripDaysTimestamps.map((tripDayTimestamp) => {
          return (
            <Button
              key={tripDayTimestamp}
              value={formatDate(tripDayTimestamp)}
              style={
                tripDayTimestamp === parseInt(dayTimestamp || '0')
                  ? ButtonStyle.active
                  : ButtonStyle.secondary
              }
              onClick={() => openDayDetails(tripDayTimestamp)}
            />
          );
        })}
      </div>
      {locationsToDisplay?.map((locationId, key) => {
        return (
          <LocationDetails
            locationId={locationId}
            tripId={parseInt(id || '0')}
            actions={[ACTIONS.addToDay, ACTIONS.removeFromDay, ACTIONS.delete]}
            key={key}
            callback={reloadList}
            tripDaysTimestamps={tripDaysTimestamps}
          />
        );
      })}
      {/*{firstLocationData && (*/}
      {/*  <Map locationData={firstLocationData} locationsToDisplay={locationsToDisplay} />*/}
      {/*)}*/}
    </div>
  );
};

export default TripPlan;
