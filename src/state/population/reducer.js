import { cloneDeep } from "lodash";

import defaultState, { unhandledActionError } from "../defaultState";
import { TYPES, STATE_NAME } from "./actions";
import getHandlers from "./handlers";

export default function reducer(prevState = defaultState.population, action) {
  if (!Object.values(TYPES).includes(action.type)) return prevState;

  const handlers = getHandlers(prevState, cloneDeep(prevState));

  switch (action.type) {
    case TYPES.ANIHILATION:
      return handlers.anihilation();
    case TYPES.CLEAR_RECRUITS_LEVELS:
      return handlers.clearRecruitsLevels();

    case TYPES.ADD_OCCUPATION_PEOPLE:
      return handlers.addOccupationPeople(action.params);
    case TYPES.REMOVE_OCCUPATION_PEOPLE:
      return handlers.removeOccupationPeople(action.params);
    case TYPES.SET_OCCUPATION_PEOPLE:
      return handlers.setOccupationPeople(action.params);
    case TYPES.SET_RECRUITS_LEVELS:
      return handlers.setRecruitsLevels(action.params);

    default:
      throw unhandledActionError(STATE_NAME, action.type);
  }
}
