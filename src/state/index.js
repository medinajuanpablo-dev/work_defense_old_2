import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

import defaultState from "./defaultState";

import moneyReducer from "./money/reducer";
import livesReducer from "./lives/reducer";

const rootReducer = combineReducers({
  money: moneyReducer,
  lives: livesReducer,
});

export const createComposedStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    defaultState,
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
};
