import { ADD_TO_LOCATIONS } from "./constants";
import { Action, Location } from "./types";

const initialState: Location[] = [];
const reducer = (
  state: Location[] = initialState,
  action: Action
): Location[] => {
  switch (action.type) {
    case ADD_TO_LOCATIONS:
      return [...state, action.payload];
    default:
      return state;
  }
};
export default reducer;
