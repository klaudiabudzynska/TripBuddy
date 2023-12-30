import {getLocationDetailsLS, LocationDetailField} from '../../helpers/cache.ts';
import ReactMapGl, {Marker} from 'react-map-gl';

type MapProps = {
  locationData: LocationDetailField,
  locationsToDisplay:  string[] | undefined,
}

const Map = ({locationData, locationsToDisplay}: MapProps) => {
  return <ReactMapGl
    initialViewState={{
      latitude: parseFloat(locationData?.data.latitude || '0'),
      longitude: parseFloat(locationData?.data.longitude || '0'),
      zoom: 10,
    }}
    mapboxAccessToken={import.meta.env.VITE_MAPS_API_KEY}
    style={{ width: '100%', maxWidth: 800, height: 400, margin: '0 auto 20px auto' }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
    {locationsToDisplay?.map((locationId, key) => {
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
  </ReactMapGl>;
};

export default Map;
