import { createStore, AnyAction, Store, Reducer } from "redux";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import rootReducer, { State } from "./rootReducer";

const reducer: Reducer<State, AnyAction> = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };

    default:
      return rootReducer(state, action);
  }
};
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any;
  }
}

const makeStore = (context: Context) => {
  if (typeof window !== "undefined")
    return createStore(reducer, window?.__REDUX_DEVTOOLS_EXTENSION__?.());
  else return createStore(reducer);
};

export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true });
