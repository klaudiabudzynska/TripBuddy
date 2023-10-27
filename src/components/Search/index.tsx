import React, {useContext, useState} from 'react';
import { callProxy } from '../../helpers/fetch.ts';
import LocationDetails from '../LocationDetails';
import { LocationDetailsType } from '../LocationDetails/typings.ts';
import styles from './index.module.scss';
import Button from '../Button';
import {LocationDetailsContext} from '../../context/LocationDetailsContext.ts';

const Search = () => {
  const {locationDetailsContext, setLocationDetailsContext} = useContext(LocationDetailsContext);
  const [locationsDetails, setLocationsDetails] = useState<LocationDetailsType[]>(locationDetailsContext?.data || []);
  const [locationInput, setLocationInput] = useState<string | undefined>(locationDetailsContext?.searchedValue || undefined);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!locationInput || !locationInput.length) {
      return;
    }

    callProxy('/tripadvisor-api/search', { searchString: locationInput })
      .then((res) => {
        setLocationsDetails(res);
        setLocationDetailsContext && setLocationDetailsContext({
          searchedValue: locationInput,
          data: res
        });
      })
      .catch((err) => console.error('error:' + err));
  };

  return (
    <>
      <form className={styles.container} onSubmit={handleSearch}>
        <input
          className={styles.input}
          defaultValue={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <Button type="submit" value="Search"/>
      </form>
      {locationsDetails ? locationsDetails.map((locationDetails, key) => (
        <LocationDetails location_id={locationDetails.location_id} key={key} />
      )): <p>Not found</p>}
    </>
  );
};

export default Search;
