import { useRef, useState } from 'react';
import { callProxy } from '../../helpers/fetch.ts';
import LocationDetails from '../LocationDetails';
import { LocationDetailsProps } from '../LocationDetails/typings.ts';

const Search = () => {
  const [locationDetails, setLocationDetails] = useState<LocationDetailsProps>({});
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

  const getLocationDetails = (locationId: string) => {
    callProxy('/tripadvisor-api/location-details', { locationId })
      .then((res) => {
        console.log(res);
        setLocationDetails(res);
      })
      .catch((err) => console.error('error:' + err));
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleSearch}>Search</button>

      <LocationDetails {...locationDetails} />
    </>
  );
};

export default Search;
