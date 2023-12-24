const TRIP_PLANS_KEY = 'TripBuddy_trip_plans';

type DayPlan = {
  timestamp: number;
  locationsId: string[];
};

export type TripPlanType = {
  id: number;
  name: string;
  startDate?: Date;
  endDate?: Date;
  daysPlan: DayPlan[];
  locationsId: string[];
  notes: string;
};

export type NewTripData = {
  name: string;
  startDate: Date;
  endDate: Date;
};

const createDaysPlanArray = (startDate: Date, endDate: Date) => {
  const daysPlan: DayPlan[] = [];

  const tripDuration =
    Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;

  for (let iterator = 0; iterator < tripDuration; iterator++) {
    daysPlan.push({
      timestamp: startDate.getTime() + iterator * 24 * 60 * 60 * 1000,
      locationsId: [],
    });
  }

  return daysPlan;
};

export const addTripPlanToLS = ({ name, startDate, endDate }: NewTripData) => {
  const tripPlans: TripPlanType[] = getLSTripPlansList();

  localStorage.setItem(
    TRIP_PLANS_KEY,
    JSON.stringify([
      ...tripPlans,
      {
        id: new Date().getTime(),
        name,
        startDate,
        endDate,
        daysPlan: createDaysPlanArray(startDate, endDate),
        locationsId: [],
        notes: '',
      },
    ]),
  );
};

export const addLocationToDay = (tripId: number, locationId: string, dayTimestamp: number) => {
  const tripPlans: TripPlanType[] = getLSTripPlansList();

  const index = tripPlans.findIndex((tripPlan: TripPlanType) => {
    return tripPlan.id === tripId;
  });

  if (index === -1) {
    return;
  }

  const newDaysPlan = tripPlans[index].daysPlan;

  const dayIndex = newDaysPlan.findIndex((dayPlan: DayPlan) => {
    return dayPlan.timestamp === dayTimestamp;
  });

  newDaysPlan[dayIndex].locationsId.push(locationId);

  tripPlans[index] = {
    ...tripPlans[index],
    daysPlan: newDaysPlan,
  };

  localStorage.setItem(TRIP_PLANS_KEY, JSON.stringify(tripPlans));
};

export const removeLocationFromDay = (tripId: number, locationId: string, dayTimestamp: number) => {
  const tripPlans: TripPlanType[] = getLSTripPlansList();

  const index = tripPlans.findIndex((tripPlan: TripPlanType) => {
    return tripPlan.id === tripId;
  });

  if (index === -1) {
    return;
  }

  const newDaysPlan = tripPlans[index].daysPlan;

  const dayIndex = newDaysPlan.findIndex((dayPlan: DayPlan) => {
    return dayPlan.timestamp === dayTimestamp;
  });

  const locationIndex = newDaysPlan[dayIndex].locationsId.findIndex((id) => {
    return id === locationId;
  });

  newDaysPlan[dayIndex].locationsId.splice(locationIndex, 1);

  tripPlans[index] = {
    ...tripPlans[index],
    daysPlan: newDaysPlan,
  };

  localStorage.setItem(TRIP_PLANS_KEY, JSON.stringify(tripPlans));
};

export const editTripPlanLS = (id: number, { name, startDate, endDate }: NewTripData, notes?: string) => {
  const tripPlans: TripPlanType[] = getLSTripPlansList();

  const index = tripPlans.findIndex((tripPlan: TripPlanType) => {
    return tripPlan.id === id;
  });

  if (index === -1) {
    return;
  }

  const newNotes = notes ? notes: tripPlans[index].notes;

  tripPlans[index] = {
    ...tripPlans[index],
    name,
    startDate,
    endDate,
    notes: newNotes,
    daysPlan: createDaysPlanArray(startDate, endDate),
  };

  localStorage.setItem(TRIP_PLANS_KEY, JSON.stringify(tripPlans));
};

export const removeTripFromLS = (id: number) => {
  const tripPlans: TripPlanType[] = getLSTripPlansList();

  const index = tripPlans.findIndex((tripPlan: TripPlanType) => {
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

export const getLSTripDayLocationsId = (id: number, dayTimestamp: number): string[] | undefined => {
  const tripPlan = getLSTripPlanById(id);

  const dayPlan = tripPlan?.daysPlan.find((dayPlan: DayPlan) => {
    return dayPlan.timestamp === dayTimestamp;
  });

  return dayPlan?.locationsId;
};
