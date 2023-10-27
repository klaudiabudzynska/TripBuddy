import React, { createContext } from 'react';
import {LocationDetailsType} from '../components/LocationDetails/typings.ts';

export type LocationDetailsContextValue = {
    searchedValue?: string,
    data?: LocationDetailsType[]
}

type ContextType = {
    locationDetailsContext?: LocationDetailsContextValue;
    setLocationDetailsContext?: React.Dispatch<React.SetStateAction<LocationDetailsContextValue>>;
}

export const LocationDetailsContext = createContext<ContextType>({});