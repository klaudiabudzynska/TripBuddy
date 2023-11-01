const TRIP_PLANS_KEY = 'TripBuddy_trip_plans';

export type TripPlanType = {
  id: number,
  name: string,
  startDate?: Date,
  endDate?: Date,
  locationsId: string[],
};

export type NewTripData = {
  name: string,
  startDate: Date,
  endDate: Date,
}

export const addTripPlanToLS = ({name, startDate, endDate}: NewTripData) => {
  const tripPlans: TripPlanType[] = getLSTripPlansList();
  localStorage.setItem(TRIP_PLANS_KEY, JSON.stringify([...tripPlans, {
    id: new Date().getTime(),
    name,
    startDate,
    endDate,
    locationsId: [],
  }]));
};

export const removeTripFromLS = (id: number) => {
  const tripPlans: TripPlanType[] = getLSTripPlansList();

  const index =  tripPlans.findIndex((tripPlan: TripPlanType) => {
    return tripPlan.id === id;
  });

  if (index !== -1) {
    tripPlans.splice(index, 1);
    localStorage.setItem(TRIP_PLANS_KEY, JSON.stringify(tripPlans));
  }
};

export const removeFromTripPlanLS = (id: number, locationId: string) => {
  const tripPlanToUpdate = getLSTripPlanById(id);

  if (!tripPlanToUpdate) {
    return;
  }

  const index = tripPlanToUpdate.locationsId.indexOf(locationId);

  if (index !== -1) {
    tripPlanToUpdate.locationsId.splice(index, 1);

    const tripPlans: TripPlanType[] = getLSTripPlansList();
    const tripPlanIndex = tripPlans.findIndex((tripPlan: TripPlanType) => {
      return tripPlan.id === id;
    });

    tripPlans[tripPlanIndex].locationsId = tripPlanToUpdate.locationsId;

    localStorage.setItem(TRIP_PLANS_KEY, JSON.stringify(tripPlans));
  }
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
