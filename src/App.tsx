import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import ErrorPage from './pages/Error';
import LocationSearch from './pages/LocationSearch';
import TripPlans from './pages/TripPlans';
import TripPlan from './pages/TripPlan';
import {
  LocationDetailsContext,
  LocationDetailsContextValue,
} from './context/LocationDetailsContext.ts';
import { useState } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <LocationSearch />,
      },
      {
        path: 'trip-plans',
        element: <TripPlans />,
      },
      {
        path: 'trip-plans/:id/:dayTimestamp?',
        element: <TripPlan />,
      },
    ],
  },
]);

const App = () => {
  const [locationDetailsContext, setLocationDetailsContext] = useState<LocationDetailsContextValue>(
    {},
  );

  return (
    <LocationDetailsContext.Provider value={{ locationDetailsContext, setLocationDetailsContext }}>
      <RouterProvider router={router} />
    </LocationDetailsContext.Provider>
  );
};

export default App;
