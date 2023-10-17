import { LocationDetailsType } from '../components/LocationDetails/typings.ts';

const LOCATION_DETAILS_KEY = 'TripBuddy_locations_details';

type LocationDetailField = {
  locationId: string;
  data: LocationDetailsType;
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

export const getLocationsDetailsLS = (): LocationDetailField[] => {
  return JSON.parse(localStorage.getItem(LOCATION_DETAILS_KEY) || '[]');
};

export const getLocationDetailsLS = (locationId: string): LocationDetailField | undefined => {
  const locationsDetails = getLocationsDetailsLS();

  return locationsDetails.find((locationDetails: LocationDetailField) => {
    return locationDetails.locationId === locationId;
  });
};
