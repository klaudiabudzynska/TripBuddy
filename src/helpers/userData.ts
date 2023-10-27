const TRIP_PLANS_KEY = 'TripBuddy_trip_plans';

export type TripPlanType = {
  id: number,
  name: string,
  locationsId: string[],
};

export const addTripPlanToLS = (name: string) => {
  const tripPlans: TripPlanType[] = getLSTripPlansList();
  localStorage.setItem(TRIP_PLANS_KEY, JSON.stringify([...tripPlans, {
    id: new Date().getTime(),
    name,
    locationsId: [],
  }]));
};

export const addLocationToTripPlanLS = (id: number, locationId: string) => {
  const tripPlans: TripPlanType[] = getLSTripPlansList();
  const tripPlanIndex = tripPlans.findIndex((tripPlan: TripPlanType) => {
    return tripPlan.id === id;
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

export const getLSTripPlanById = (id: number): TripPlanType | undefined => {
  const tripPlans: TripPlanType[] = getLSTripPlansList();

  return tripPlans.find((tripPlan: TripPlanType) => {
    return tripPlan.id === id;
  });
};
