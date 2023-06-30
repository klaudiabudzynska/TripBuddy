import { LocationDetailsProps } from './typings.ts';
import Photos from './Photos';
import styles from './index.module.scss';
import * as classNames from 'classnames';
import { callProxy } from '../../helpers/fetch.ts';
import { useEffect, useState } from 'react';

const LocationDetails = (details: LocationDetailsProps) => {
  const [locationDetails, setLocationDetails] = useState<LocationDetailsProps>({});

  useEffect(() => {
    if (details.location_id) {
      getLocationDetails(details.location_id);
    }
  }, [details]);

  const getLocationDetails = (locationId: string) => {
    callProxy('/tripadvisor-api/location-details', { locationId: locationId })
      .then((res) => {
        console.log(res);
        setLocationDetails(res);
      })
      .catch((err) => console.error('error:' + err));
  };

  const { location_id, name, address_obj, description } = locationDetails;

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
