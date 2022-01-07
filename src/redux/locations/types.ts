import { ADD_TO_LOCATIONS } from "./constants";

export interface Location {
  name: string;
  location: { lat: number; lng: number };
  locationType: string;
  logo: string;
}
export interface Action {
  type: typeof ADD_TO_LOCATIONS;
  payload: Location;
}
