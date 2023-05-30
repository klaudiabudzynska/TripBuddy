import { LocationDetailsProps } from './typings.ts';
import Photos from './Photos';

const LocationDetails = (details: LocationDetailsProps) => {
  const { location_id, name, address_obj, description } = details;

  return location_id ? (
    <div>
      <h2>{name}</h2>
      <span>
        {address_obj?.address_string}, {address_obj?.country}
      </span>
      <p>{description}</p>

      <Photos locationId={location_id} />
    </div>
  ) : null;
};

export default LocationDetails;
