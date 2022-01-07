import { ADD_TO_LOCATIONS } from "./constants";
import { Location } from "./types";

export const addToLocations = (location: Location) => ({
  type: ADD_TO_LOCATIONS,
  payload: location,
});
