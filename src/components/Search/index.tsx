import React, { useState } from 'react';
import { callProxy } from '../../helpers/fetch.ts';
import LocationDetails from '../LocationDetails';
import { LocationDetailsType } from '../LocationDetails/typings.ts';
import styles from './index.module.scss';
import * as classNames from 'classnames';

const Search = () => {
  const [locationsDetails, setLocationsDetails] = useState<LocationDetailsType[]>([]);
  const [locationInput, setLocationInput] = useState<string | undefined>();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!locationInput || !locationInput.length) {
      return;
    }

    callProxy('/tripadvisor-api/search', { searchString: locationInput })
      .then((res) => {
        setLocationsDetails(res);
      })
      .catch((err) => console.error('error:' + err));
  };

  return (
    <>
      <form className={styles.container} onSubmit={handleSearch}>
        <input className={styles.input} onChange={(e) => setLocationInput(e.target.value)} />
        <button type="submit" className={classNames(styles.input, styles.button)}>
          Search
        </button>
      </form>
      {locationsDetails.map((locationDetails, key) => (
        <LocationDetails location_id={locationDetails.location_id} key={key} />
      ))}
    </>
  );
};

export default Search;
