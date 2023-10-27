import styles from './index.module.scss';
import {Link} from 'react-router-dom';

type TripItemProps = {
  id: number
  locationName: string;
}

const TripItem = ({id, locationName}: TripItemProps) => {
  return <Link className={styles.tripItem} to={`/trip-plans/${id}`}>
    <div className={styles.imagePlaceholder}></div>
    <h3>{locationName}</h3>
  </Link>;
};

export default TripItem;