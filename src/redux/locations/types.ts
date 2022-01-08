import { ADD_TO_LOCATIONS, UPDATE_LOCATION } from "./constants";

export interface Location {
  name: string;
  location: { lat: number; lng: number };
  locationType: string;
  logo: string;
}
interface AddAction {
  type: typeof ADD_TO_LOCATIONS;
  payload: { location: Location };
}
export interface UpdateAction {
  type: typeof UPDATE_LOCATION;
  payload: { location: Location; index: number };
}
export type Action = AddAction | UpdateAction;
