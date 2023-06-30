import React, { useRef, useState } from 'react';
import { callProxy } from '../../helpers/fetch.ts';
import LocationDetails from '../LocationDetails';
import { LocationDetailsProps } from '../LocationDetails/typings.ts';
import styles from './index.module.scss';
import * as classNames from 'classnames';

enum Category {
  hotel = 'hotels',
  attraction = 'attractions',
  restaurant = 'restaurants',
  geos = 'geos',
}

const Search = () => {
  const [locationDetails, setLocationDetails] = useState<LocationDetailsProps>({});
  const [category, setCategory] = useState<string>(Category.geos);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (!inputRef.current) {
      return;
    }

    callProxy('/tripadvisor-api/search', { searchString: inputRef.current?.value })
      .then((res) => {
        console.log(res);
        getLocationDetails(res.location_id);
      })
      .catch((err) => console.error('error:' + err));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const getLocationDetails = (locationId: string) => {
    callProxy('/tripadvisor-api/location-details', { locationId, category })
      .then((res) => {
        console.log(res);
        setLocationDetails(res);
      })
      .catch((err) => console.error('error:' + err));
  };

  return (
    <>
      <div className={styles.container}>
        <>
          <input className={styles.input} ref={inputRef} />
          <select className={classNames(styles.input, styles.select)} onChange={handleSelect}>
            <option value={Category.hotel}>Hotel</option>
            <option value={Category.attraction}>Attraction</option>
            <option value={Category.restaurant}>Restaurant</option>
          </select>
        </>
        <button className={classNames(styles.input, styles.button)} onClick={handleSearch}>
          Search
        </button>
      </div>
      <LocationDetails {...locationDetails} />
    </>
  );
};

export default Search;
