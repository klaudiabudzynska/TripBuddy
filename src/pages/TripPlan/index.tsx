import Button from '../../components/Button';
import styles from './index.module.scss';

function TripPlan() {
  const handleTripAdd = () => {

  };

  return <div>
    <h1 className={styles.title}>Your trip plans</h1>
    <Button value="Add a trip" onClick={handleTripAdd} />
  </div>;
}

export default TripPlan;
