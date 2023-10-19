import { LocationDetailsType } from '../components/LocationDetails/typings.ts';
import { LocationDetailPhoto } from '../components/LocationDetails/Photos/typings.ts';

const LOCATION_DETAILS_KEY = 'TripBuddy_locations_details';
const LOCATION_PHOTOS_KEY = 'TripBuddy_locations_photos';

type LocationDetailField = {
  locationId: string;
  data: LocationDetailsType;
};
type LocationPhotoField = {
  locationId: string;
  data: LocationDetailPhoto[];
};

export const setLocationDetailsLS = (locationId: string, data: LocationDetailsType) => {
  if (getLocationDetailsLS(locationId)) {
    return;
  }

  const locationsDetails = getLocationsDetailsLS() || [];
  const locationDetails: LocationDetailField = {
    locationId,
    data,
  };

  locationsDetails.push(locationDetails);
  localStorage.setItem(LOCATION_DETAILS_KEY, JSON.stringify(locationsDetails));
};

export const setLocationPhotosLS = (locationId: string, data: LocationDetailPhoto[]) => {
  if (getLocationPhotosLS(locationId)) {
    return;
  }

  const locationsPhotos = getLocationsPhotosLS() || [];
  const locationPhotos: LocationPhotoField = {
    locationId,
    data,
  };

  locationsPhotos.push(locationPhotos);
  localStorage.setItem(LOCATION_PHOTOS_KEY, JSON.stringify(locationsPhotos));
};

const getLSItem = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

const getLSItemDetails = (key: string, locationId: string) => {
  const itemDetails = getLSItem(key);

  return itemDetails.find((detail: LocationDetailField | LocationPhotoField) => {
    return detail.locationId === locationId;
  });
};

export const getLocationsDetailsLS = (): LocationDetailField[] => getLSItem(LOCATION_DETAILS_KEY);

export const getLocationsPhotosLS = (): LocationPhotoField[] => getLSItem(LOCATION_PHOTOS_KEY);

export const getLocationDetailsLS = (locationId: string): LocationDetailField | undefined =>
  getLSItemDetails(LOCATION_DETAILS_KEY, locationId);

export const getLocationPhotosLS = (locationId: string): LocationPhotoField | undefined =>
  getLSItemDetails(LOCATION_PHOTOS_KEY, locationId);
