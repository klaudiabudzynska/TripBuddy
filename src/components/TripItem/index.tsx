import styles from './index.module.scss';

type TripItemProps = {
  location: string;
}

const TripItem = ({location}: TripItemProps) => {
  return <div className={styles.tripItem}>
    <div className={styles.imagePlaceholder}></div>
    <h3>{location}</h3>
  </div>;
};

export default TripItem;