import { ADD_TO_LOCATIONS, UPDATE_LOCATION } from "./constants";
import { Action, Location } from "./types";

const reducer = (state: Location[] = [], action: Action): Location[] => {
  switch (action.type) {
    case ADD_TO_LOCATIONS:
      return [...state, action.payload.location];

    case UPDATE_LOCATION:
      return state.map((location, index) => {
        if (index === action.payload.index) {
          return action.payload.location;
        } else {
          return location;
        }
      });

    default:
      return state;
  }
};
export default reducer;
