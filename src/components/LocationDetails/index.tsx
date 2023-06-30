import { LocationDetailsProps } from './typings.ts';
import Photos from './Photos';
import styles from './index.module.scss';
import * as classNames from 'classnames';

const LocationDetails = (details: LocationDetailsProps) => {
  const { location_id, name, address_obj, description } = details;

  return location_id ? (
    <div className={styles.container}>
      <div className={styles.details}>
        <h2 className={classNames(styles.text, styles.title)}>{name}</h2>
        <span className={classNames(styles.text, styles.location)}>
          {address_obj?.address_string}, {address_obj?.country}
        </span>
        <p className={classNames(styles.text, styles.description)}>{description}</p>
      </div>

      <Photos locationId={location_id} />
    </div>
  ) : null;
};

export default LocationDetails;
