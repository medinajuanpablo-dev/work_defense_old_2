import { cloneDeep } from "lodash";

import defaultState, { unhandledActionError } from "../defaultState";
import { TYPES, STATE_NAME } from "./actions";
import getHandlers from "./handlers";

export default function reducer(prevState = defaultState.technologies, action) {
  if (!Object.values(TYPES).includes(action.type)) return prevState;

  const handlers = getHandlers(prevState, cloneDeep(prevState));

  switch (action.type) {
    case TYPES.ALL_UNRESEARCHED:
      return handlers.allUnresearched();
    case TYPES.ALL_RESEARCHED:
      return handlers.allResearched();
    case TYPES.EMPTY_POINTS:
      return handlers.emptyPoints();
    case TYPES.ADD_ONE_POINT:
      return handlers.addOnePoint();
    case TYPES.REMOVE_COST_POINTS:
      return handlers.removeCostPoints();

    case TYPES.CATEGORY_RESEARCHED:
      return handlers.categoryResearched(action.params);
    case TYPES.CATEGORY_UNRESEARCHED:
      return handlers.categoryUnresearched(action.params);
    case TYPES.COLUMN_RESEARCHED:
      return handlers.columnResearched(action.params);
    case TYPES.COLUMN_UNRESEARCHED:
      return handlers.columnUnresearched(action.params);
    case TYPES.RESEARCH:
      return handlers.research(action.params);
    case TYPES.UNRESEARCH:
      return handlers.unresearch(action.params);
    case TYPES.ADD_POINTS:
      return handlers.addPoints(action.params);
    case TYPES.REMOVE_POINTS:
      return handlers.removePoints(action.params);
    case TYPES.SET_POINTS:
      return handlers.setPoints(action.params);

    default:
      throw unhandledActionError(STATE_NAME, action.type);
  }
}
