import { cloneDeep } from "lodash";

import defaultState, { unhandledActionError } from "../defaultState";
import { TYPES, STATE_NAME, PREVIOUS_GS_TYPES } from "./actions";
import getHandlers, { getPreviousGSHandlers } from "./handlers";

export function previousGSReducer(prevState = defaultState, action) {
  if (!Object.values(PREVIOUS_GS_TYPES).includes(action.type)) return prevState;

  const handlers = getPreviousGSHandlers(prevState, cloneDeep(prevState));

  switch (action.type) {
    case PREVIOUS_GS_TYPES.SAVE:
      return handlers.saveState();
    case PREVIOUS_GS_TYPES.LOAD:
      return handlers.loadState();
    case PREVIOUS_GS_TYPES.DELETE:
      return handlers.deleteSavedState();

    default:
      throw unhandledActionError("PreviousGS", action.type);
  }
}

export default function reducer(
  prevState = defaultState.miscellaneous,
  action
) {
  if (!Object.values(TYPES).includes(action.type)) return prevState;

  const handlers = getHandlers(prevState, cloneDeep(prevState));

  switch (action.type) {
    case TYPES.STAGE_FORWARD:
      return handlers.stageForward();
    case TYPES.STAGE_BACKWARDS:
      return handlers.stageBackwards();
    case TYPES.TO_FIRST:
      return handlers.toFirst();
    case TYPES.TO_LAST:
      return handlers.toLast();
    case TYPES.NOTHING:
      return handlers.nothing();

    case TYPES.TO_STAGE:
      return handlers.toStage(action.params);
    case TYPES.ADVANCE_STAGES:
      return handlers.advanceStages(action.params);

    default:
      throw unhandledActionError(STATE_NAME, action.type);
  }
}
