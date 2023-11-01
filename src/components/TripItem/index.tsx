import {MouseEvent} from 'react';
import styles from './index.module.scss';
import {Link} from 'react-router-dom';
import {removeTripFromLS, TripPlanType} from '../../helpers/userData.ts';
import Button, {ButtonStyle} from '../Button';

type TripItemProps = {
  changeCallback: () => void;
  tripData: TripPlanType;
}

const TripItem = ({changeCallback, tripData: {id, name, startDate, endDate}}: TripItemProps) => {
  const dateOptions: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};
  const formattedStartDate = new Intl.DateTimeFormat('en-US', dateOptions)
    .format(new Date(startDate || 0));
  const formattedEndDate = new Intl.DateTimeFormat('en-US', dateOptions)
    .format(new Date(endDate || 0));

  const editTrip = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    changeCallback();
  };

  const deleteTrip = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeTripFromLS(id);
    changeCallback();
  };

  return <Link className={styles.tripItem} to={`/trip-plans/${id}`}>
    <div className={styles.imagePlaceholder}></div>
    <div className={styles.tripData}>
      <h3 className={styles.title}>{name}</h3>
      <div>
        <Button value="Edit" onClick={editTrip}/>
        <Button value="Delete" onClick={deleteTrip} style={ButtonStyle.delete}/>
      </div>
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