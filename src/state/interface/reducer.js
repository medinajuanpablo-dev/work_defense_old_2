import { cloneDeep } from "lodash";

import defaultState, { unhandledActionError } from "../defaultState";
import { TYPES, STATE_NAME } from "./actions";
import getHandlers from "./handlers";

export default function reducer(prevState = defaultState.interface, action) {
  if (!Object.values(TYPES).includes(action.type)) return prevState;

  const handlers = getHandlers(prevState, cloneDeep(prevState));

  switch (action.type) {
    case TYPES.DEFAULT_EVERYTHING:
      return handlers.defaultEverything();

    case TYPES.SET_SUMMARY_SECTION_VISIBILITY:
      return handlers.setSummarySectionVisibility(action.params);
    case TYPES.SET_VISIBLE_MENU:
      return handlers.setVisibleMenu(action.params);
    case TYPES.SET_VISIBLE_SUB_MENU:
      return handlers.setVisibleSubMenu(action.params);

    default:
      throw unhandledActionError(STATE_NAME, action.type);
  }
}
