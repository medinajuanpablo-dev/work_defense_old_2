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

    case TYPES.SHOW_SUMMARY_SECTION:
      return handlers.showSummarySection(action.params);
    case TYPES.HIDE_SUMMARY_SECTION:
      return handlers.hideSummarySection(action.params);

    default:
      throw unhandledActionError(STATE_NAME, action.type);
  }
}
