import { useRef } from 'react';
import { callProxy } from '../../helpers/fetch.ts';

const Search = () => {
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
      .then((res) => console.log(res))
      .catch((err) => console.error('error:' + err));
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleSearch}>Search</button>
    </>
  );
};

export default Search;
