import { ADD_TO_LOCATIONS, UPDATE_LOCATION } from "./constants";
import { Location } from "./types";

export const addToLocations = (location: Location) => ({
  type: ADD_TO_LOCATIONS,
  payload: { location },
});

export const updateLocation = (location: Location, index: number) => ({
  type: UPDATE_LOCATION,
  payload: { location, index },
});
