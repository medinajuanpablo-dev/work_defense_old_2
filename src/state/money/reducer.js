import { cloneDeep } from "lodash";

import defaultState, { unhandledActionError } from "../defaultState";
import { TYPES, STATE_NAME } from "./actions";
import getHandlers from "./handlers";

export default function reducer(prevState = defaultState.money, action) {
  if (!Object.values(TYPES).includes(action.type)) return prevState;

  const handlers = getHandlers(prevState, cloneDeep(prevState));

  switch (action.type) {
    case TYPES.EMPTY_MONEY:
      return handlers.emptyMoney();
    case TYPES.FREEZE:
      return handlers.freeze();
    case TYPES.WATCH:
      return handlers.watch();
    case TYPES.ACTIVATE:
      return handlers.activate();

    case TYPES.DEPOSIT:
      return handlers.deposit(action.params);
    case TYPES.WITHDRAW:
      return handlers.withdraw(action.params);

    default:
      throw unhandledActionError(STATE_NAME, action.type);
  }
}
