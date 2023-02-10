import { cloneDeep } from "lodash";

import defaultState, { unhandledActionError } from "../defaultState";
import { TYPES, STATE_NAME } from "./actions";
import getHandlers from "./handlers";

export default function reducer(prevState = defaultState.resources, action) {
  if (!Object.values(TYPES).includes(action.type)) return prevState;

  const handlers = getHandlers(prevState, cloneDeep(prevState));

  switch (action.type) {
    case TYPES.EMPTY_ALL:
      return handlers.emptyAll();
    case TYPES.SAVE_AS_PREV:
      return handlers.saveAsPrev();

    case TYPES.ADD_RESOURCE:
      return handlers.addResource(action.params);
    case TYPES.REMOVE_RESOURCE:
      return handlers.removeResource(action.params);
    case TYPES.SET_RESOURCE:
      return handlers.setResource(action.params);

    default:
      throw unhandledActionError(STATE_NAME, action.type);
  }
}
