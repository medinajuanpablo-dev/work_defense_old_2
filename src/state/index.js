import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

import defaultState from "./defaultState";

import armyReducer from "./army/reducer";
import buildingsReducer from "./buildings/reducer";
import equipmentReducer from "./equipment/reducer";
import interfaceReducer from "./interface/reducer";
import invasionReducer from "./invasion/reducer";
import miscReducer, { previousGSReducer } from "./miscellaneous/reducer";
import populationReducer from "./population/reducer";
import resourcesReducer from "./resources/reducer";
import techsReducer from "./technologies/reducer";

const combinedReducers = combineReducers({
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

function rootReducer(previousGeneralState, action) {
  const previousState = previousGSReducer(previousGeneralState, action);
  const newState = combinedReducers(previousState, action);

  // localStorage.setItem("generalState", JSON.stringify(newState));

  return newState;
}

export const createComposedStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    defaultState,
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
};
