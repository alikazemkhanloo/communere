import { createStore, AnyAction, Store } from "redux";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import rootReducer from "./rootReducer";

export interface State {
  tick?: string;
}

const reducer = (state: State = {}, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };

    default:
      return rootReducer(state, action);
  }
};

const makeStore = (context: Context) => createStore(reducer);

export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true });
