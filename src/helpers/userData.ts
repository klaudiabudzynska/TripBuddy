const TRIP_PLANS_KEY = 'TripBuddy_trip_plans';

export type TripPlanType = {
  name: string,
  locationsId: string[],
};

export const addTripPlanToLS = (name: string) => {
  const tripPlans = getLSTripPlansList();
  localStorage.setItem(TRIP_PLANS_KEY, JSON.stringify([...tripPlans, {
    name,
    locationsId: [],
  }]));
};

export const addLocationToTripPlanLS = (name: string, locationId: string) => {
  const tripPlans = getLSTripPlansList();
  const tripPlanIndex = tripPlans.findIndex((tripPlan: TripPlanType) => {
    return tripPlan.name === name;
  });

  tripPlans[tripPlanIndex]?.locationsId?.push(locationId);

  localStorage.setItem(TRIP_PLANS_KEY, JSON.stringify(tripPlans));
};

const getLSItem = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const getLSTripPlansList = (): TripPlanType[] => {
  return getLSItem(TRIP_PLANS_KEY);
};
