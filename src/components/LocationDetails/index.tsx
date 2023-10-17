import { LocationDetailsType } from './typings.ts';
import Photos from './Photos';
import styles from './index.module.scss';
import * as classNames from 'classnames';
import { callProxy } from '../../helpers/fetch.ts';
import { useEffect, useState } from 'react';
import { getLocationDetailsLS, setLocationDetailsLS } from '../../helpers/cache.ts';

const LocationDetails = (details: LocationDetailsType) => {
  const [locationDetails, setLocationDetails] = useState<LocationDetailsType>({});

  useEffect(() => {
    if (details.location_id) {
      getLocationDetails(details.location_id);
    }
  }, [details]);

  const getLocationDetails = (locationId: string) => {
    if (locationId && !getLocationDetailsLS(locationId)) {
      callProxy('/tripadvisor-api/location-details', { locationId: locationId })
        .then((res) => {
          setLocationDetails(res);
          setLocationDetailsLS(locationId, res);
        })
        .catch((err) => console.error('error:' + err));
    } else {
      setLocationDetails(getLocationDetailsLS(locationId)?.data || {});
    }
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
