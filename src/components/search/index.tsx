import { useRef } from 'react';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    console.log(inputRef.current?.value);
    const url = `http://localhost:3000/tripadvisor-api?searchString=${inputRef.current?.value}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log(json))
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
