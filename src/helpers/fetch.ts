export const callProxy = (endpoint: string, query: Record<string, string>, options?: object) => {
  const searchParams = new URLSearchParams(query).toString();
  const url = `http://localhost:3000${endpoint}?${searchParams}`;
  const defaultOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  return fetch(url, { ...defaultOptions, ...options })
    .then((res) => res.json())
    .catch((err) => console.error('error:' + err));
};
