const TRIP_PLANS_KEY = 'TripBuddy_trip_plans';

type DayPlan = {
  timestamp: number;
  locationsId: string[];
};

type LocationData = {
  id: string,
  notes: string,
}

export type TripPlanType = {
  id: number;
  name: string;
  startDate?: Date;
  endDate?: Date;
  daysPlan: DayPlan[];
  locationsData: LocationData[];
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
        locationsData: [],
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

  const newNotes = notes !== undefined ? notes: tripPlans[index].notes;

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

  const index = tripPlanToUpdate.locationsData.findIndex(locationData => {
    return locationData.id === locationId;
  });

  if (index !== -1) {
    tripPlanToUpdate.locationsData.splice(index, 1);

    const tripPlans: TripPlanType[] = getLSTripPlansList();
    const tripPlanIndex = tripPlans.findIndex((tripPlan: TripPlanType) => {
      return tripPlan.id === id;
    });

    tripPlans[tripPlanIndex].locationsData = tripPlanToUpdate.locationsData;

    localStorage.setItem(TRIP_PLANS_KEY, JSON.stringify(tripPlans));
  }
};

export const addLocationToTripPlanLS = (id: number, locationId: string) => {
  const tripPlans: TripPlanType[] = getLSTripPlansList();
  const tripPlanIndex = tripPlans.findIndex((tripPlan: TripPlanType) => {
    return tripPlan.id === id;
  });

  tripPlans[tripPlanIndex]?.locationsData?.push({
    id: locationId,
    notes: '',
  });

  localStorage.setItem(TRIP_PLANS_KEY, JSON.stringify(tripPlans));
};

export const addLocationNoteToTripPlan = (id: number, locationId: string, note: string) => {
  const tripPlans: TripPlanType[] = getLSTripPlansList();
  const tripPlanIndex = tripPlans.findIndex((tripPlan: TripPlanType) => {
    return tripPlan.id === id;
  });

  if (!tripPlans[tripPlanIndex]) {
    return;
  }

  const locationDataIndex = tripPlans[tripPlanIndex].locationsData.findIndex(locationData => {
    return locationData.id === locationId;
  });

  tripPlans[tripPlanIndex].locationsData[locationDataIndex].notes = note;

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

export const getLSTripPlanLocationsId = (id: number): string[] | undefined => {
  const tripPlan = getLSTripPlanById(id);

  return  tripPlan?.locationsData.map((locationData) => {
    return locationData.id;
  });
};

export const getLSTripPlanLocationData = (id: number, locationId: string): LocationData | undefined => {
  const tripPlan = getLSTripPlanById(id);
  return tripPlan?.locationsData.find(locationData => {
    return locationData.id === locationId;
  });
};
