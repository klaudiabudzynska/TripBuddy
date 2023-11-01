import {useParams} from 'react-router-dom';
import {getLSTripPlanById, TripPlanType} from '../../helpers/userData.ts';
import LocationDetails, {ACTIONS} from '../../components/LocationDetails';
import styles from './index.module.scss';
import {useState} from 'react';

const TripPlan = () => {
  const {id} = useParams();
  const [tripPlanData, setTripPlanData] =
    useState<TripPlanType | undefined>(getLSTripPlanById(parseInt(id || '0')));

  if (!id) {
    return null;
  }

  const reloadList = () => {
    setTripPlanData(getLSTripPlanById(parseInt(id || '0')));
  };

  return (<div>
    <h1 className={styles.title}>Trip plan to {tripPlanData?.name}</h1>
    {
      tripPlanData?.locationsId.map((locationId, key) => {
        return <LocationDetails
          locationId={locationId}
          tripId={parseInt(id || '0')}
          actions={[ACTIONS.delete]} key={key}
          callback={reloadList}
        />;
      })
    }
  </div>);
};

export default TripPlan;