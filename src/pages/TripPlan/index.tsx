import {useParams} from 'react-router-dom';
import {getLSTripPlanById} from '../../helpers/userData.ts';
import LocationDetails, {ACTIONS} from '../../components/LocationDetails';
import styles from './index.module.scss';

const TripPlan = () => {
  const {id} = useParams();
  const tripPlanData = getLSTripPlanById(parseInt(id || '0'));

  return (<div>
    <h1 className={styles.title}>Trip plan to {tripPlanData?.name}</h1>
    {
      tripPlanData?.locationsId.map((locationId, key) => {
        return <LocationDetails locationId={locationId} actions={[ACTIONS.delete]} key={key} />;
      })
    }
  </div>);
};

export default TripPlan;