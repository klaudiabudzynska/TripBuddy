import { MouseEvent, useState } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { editTripPlanLS, removeTripFromLS, TripPlanType } from '../../helpers/userData.ts';
import Button, { ButtonStyle } from '../Button';
import EditTripModal from '../Modal/components/EditTripModal';
import { formatDate } from '../../helpers/dates.ts';

type TripItemProps = {
  changeCallback: () => void;
  tripData: TripPlanType;
};

const TripItem = ({
  changeCallback,
  tripData: { id, name, startDate, endDate },
}: TripItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const startDateFormat = new Date(startDate || 0);
  const endDateFormat = new Date(endDate || 0);

  const openEditingDialog = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(!isModalOpen);
  };

  const closeEditingDialog = () => {
    setIsModalOpen(false);
  };

  const saveTrip = (name: string, startDate: Date, endDate: Date) => {
    setIsModalOpen(false);
    editTripPlanLS(id, { name, startDate, endDate });
    changeCallback();
  };

  const deleteTrip = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeTripFromLS(id);
    changeCallback();
  };

  return (
    <>
      <Link className={styles.tripItem} to={`/trip-plans/${id}`}>
        <div className={styles.imagePlaceholder}></div>
        <div className={styles.tripData}>
          <h3 className={styles.title}>{name}</h3>
          <div>
            <Button value="Edit" onClick={openEditingDialog} />
            <Button value="Delete" onClick={deleteTrip} style={ButtonStyle.delete} />
          </div>
          {startDate && endDate && (
            <div className={styles.dates}>
              <span>Start: {formatDate(startDateFormat)}</span>
              <span>End: {formatDate(endDateFormat)}</span>
              <span>
                {Math.floor(
                  (endDateFormat.getTime() - startDateFormat.getTime()) / (1000 * 3600 * 24),
                ) + 1}{' '}
                days
              </span>
            </div>
          )}
        </div>
      </Link>
      <EditTripModal
        isModalOpen={isModalOpen}
        saveTrip={saveTrip}
        closeModal={closeEditingDialog}
        tripName={name}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
};

export default TripItem;
