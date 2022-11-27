import { cloneDeep } from "lodash";

import defaultState, { unhandledActionError } from "../defaultState";
import { TYPES, STATE_NAME } from "./actions";
import getHandlers from "./handlers";

export default function reducer(prevState = defaultState.lives, action) {
  if (!Object.values(TYPES).includes(action.type)) return prevState;

  const handlers = getHandlers(prevState, cloneDeep(prevState));

  switch (action.type) {
    case TYPES.ANIHILATE:
      return handlers.anihilate();

    case TYPES.DIE:
      return handlers.die(action.params);
    case TYPES.LIVE:
      return handlers.live(action.params);

    default:
      throw unhandledActionError(STATE_NAME, action.type);
  }
}
