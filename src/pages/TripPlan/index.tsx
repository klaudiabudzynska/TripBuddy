import { useParams } from 'react-router-dom';
import { getLSTripPlanById, TripPlanType } from '../../helpers/userData.ts';
import LocationDetails, { ACTIONS } from '../../components/LocationDetails';
import styles from './index.module.scss';
import { useState } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import { getLocationDetailsLS } from '../../helpers/cache.ts';
import Button from '../../components/Button';
import { formatDate } from '../../helpers/dates.ts';

const TripPlan = () => {
  const { id } = useParams();
  const [tripPlanData, setTripPlanData] = useState<TripPlanType | undefined>(
    getLSTripPlanById(parseInt(id || '0')),
  );

  const firstLocationId = tripPlanData?.locationsId[0] || '0';
  const firstLocationData = getLocationDetailsLS(firstLocationId);

  const startDate = new Date(tripPlanData?.startDate || 0);
  const endDate = new Date(tripPlanData?.endDate || 0);
  const tripDuration =
    Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;

  const tripDaysTimestamps: number[] = [];

  for (let iterator = 0; iterator < tripDuration; iterator++) {
    tripDaysTimestamps.push(startDate.getTime() + iterator * 24 * 60 * 60 * 1000);
  }

  if (!id) {
    return null;
  }

  const reloadList = () => {
    setTripPlanData(getLSTripPlanById(parseInt(id || '0')));
  };

  return (
    <div>
      <h1 className={styles.title}>
        Trip plan to {tripPlanData?.name}, {tripDuration} days
      </h1>
      {tripDaysTimestamps.map((tripDayTimestamp) => {
        return <Button key={tripDayTimestamp} value={formatDate(tripDayTimestamp)} />;
      })}
      {tripPlanData?.locationsId.map((locationId, key) => {
        return (
          <LocationDetails
            locationId={locationId}
            tripId={parseInt(id || '0')}
            actions={[ACTIONS.delete]}
            key={key}
            callback={reloadList}
          />
        );
      })}
      {firstLocationData && (
        <ReactMapGl
          initialViewState={{
            latitude: parseFloat(firstLocationData?.data.latitude || '0'),
            longitude: parseFloat(firstLocationData?.data.longitude || '0'),
            zoom: 10,
          }}
          mapboxAccessToken={import.meta.env.VITE_MAPS_API_KEY}
          style={{ width: 600, height: 400, margin: '0 auto 20px auto' }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {tripPlanData?.locationsId.map((locationId, key) => {
            const locationData = getLocationDetailsLS(locationId)?.data;
            return (
              locationData && (
                <Marker
                  key={key}
                  longitude={parseFloat(locationData?.longitude || '0')}
                  latitude={parseFloat(locationData?.latitude || '0')}
                />
              )
            );
          })}
        </ReactMapGl>
      )}
    </div>
  );
};

export default TripPlan;
