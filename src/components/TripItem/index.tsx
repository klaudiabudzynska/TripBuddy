import styles from './index.module.scss';
import {Link} from 'react-router-dom';
import {TripPlanType} from '../../helpers/userData.ts';

const TripItem = ({id, name, startDate, endDate}: TripPlanType) => {
  const dateOptions: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};
  const formattedStartDate = new Intl.DateTimeFormat('en-US', dateOptions)
    .format(new Date(startDate || 0));
  const formattedEndDate = new Intl.DateTimeFormat('en-US', dateOptions)
    .format(new Date(endDate || 0));

  return <Link className={styles.tripItem} to={`/trip-plans/${id}`}>
    <div className={styles.imagePlaceholder}></div>
    <div className={styles.tripData}>
      <h3 className={styles.title}>{name}</h3>
      {startDate && endDate &&
        <div className={styles.dates}>
          <span>
          Start: {formattedStartDate}
          </span>
          <span>
          End: {formattedEndDate}
          </span>
        </div>
      }
    </div>
  </Link>;
};

export default TripItem;