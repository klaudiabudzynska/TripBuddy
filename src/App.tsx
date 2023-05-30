import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const url = 'http://localhost:3000/tripadvisor-api';
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
  }, []);

  return <>Hello</>;
}

export default App;
