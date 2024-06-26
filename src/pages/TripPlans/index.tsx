import {useEffect, useState} from 'react';
import Button from '../../components/Button';
import TripItem from '../../components/TripItem';
import EditTripModal from '../../components/Modal/components/EditTripModal';
import {addTripPlanToLS, getLSTripPlansList, TripPlanType} from '../../helpers/userData.ts';
import styles from './index.module.scss';

function TripPlans() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [trips, setTrips] = useState<TripPlanType[]>(getLSTripPlansList() || []);

  const showAddingDialog = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeAddingDialog = () => {
    setIsModalOpen(false);
  };

  const saveTrip = (name: string, startDate: Date, endDate: Date) => {
    setIsModalOpen(false);
    addTripPlanToLS({name, startDate, endDate});
  };

  const changeCallback = () => {
    setTrips(getLSTripPlansList() || []);
  };

  useEffect(() => {
    setTrips(getLSTripPlansList() || []);
  }, [isModalOpen]);

  return <div className={styles.container}>
    <h1 className={styles.title}>Your trip plans</h1>
    <Button value="Create your trip" onClick={showAddingDialog} />
    <div className={styles.tripsList}>
      {trips.map((trip, key) => {
        return <TripItem key={`trip-id-${key}`} changeCallback={changeCallback} tripData={trip}/>;
      })}
    </div>
    <EditTripModal isModalOpen={isModalOpen} saveTrip={saveTrip} closeModal={closeAddingDialog}/>
  </div>;
}

export default TripPlans;
