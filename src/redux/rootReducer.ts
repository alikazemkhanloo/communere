import { combineReducers } from "redux";
import locations from "./locations/reducer";

const reducers = { locations };

type Reducers = typeof reducers;

export type State = {
  [Property in keyof Reducers]: ReturnType<Reducers[Property]>;
};

const rootReducer = combineReducers<State>(reducers);

export default rootReducer;
