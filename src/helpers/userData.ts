import {LocationDetailsType} from '../components/LocationDetails/typings.ts';

const TRIP_PLANS_KEY = 'TripBuddy_trip_plans';

export type TripPlanType = {
  name: string,
  locations: LocationDetailsType,
};

export const addTripPlanToLS = (name: string) => {
  const tripPlans = getLSTripPlansList();
  localStorage.setItem(TRIP_PLANS_KEY, JSON.stringify([...tripPlans, {
    name,
    locations: [],
  }]));
};

const getLSItem = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const getLSTripPlansList = (): TripPlanType[] => {
  return getLSItem(TRIP_PLANS_KEY);
};