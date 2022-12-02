import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

import defaultState from "./defaultState";

import armyReducer from "./army/reducer";
import buildingsReducer from "./buildings/reducer";
import equipmentReducer from "./equipment/reducer";
import interfaceReducer from "./interface/reducer";
import invasionReducer from "./invasion/reducer";
import miscReducer from "./miscellaneous/reducer";
import populationReducer from "./population/reducer";
import resourcesReducer from "./resources/reducer";
import techsReducer from "./technologies/reducer";

const rootReducer = combineReducers({
  army: armyReducer,
  buildings: buildingsReducer,
  equipment: equipmentReducer,
  interface: interfaceReducer,
  invasion: invasionReducer,
  miscellaneous: miscReducer,
  population: populationReducer,
  resources: resourcesReducer,
  technologies: techsReducer,
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
