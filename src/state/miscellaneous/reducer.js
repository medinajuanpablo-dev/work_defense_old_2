import { cloneDeep } from "lodash";

import defaultState, { unhandledActionError } from "../defaultState";
import { TYPES, STATE_NAME } from "./actions";
import getHandlers from "./handlers";

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
