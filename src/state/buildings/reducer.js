import { cloneDeep } from "lodash";

import defaultState, { unhandledActionError } from "../defaultState";
import { TYPES, STATE_NAME } from "./actions";
import getHandlers from "./handlers";

export default function reducer(prevState = defaultState.buildings, action) {
  if (!Object.values(TYPES).includes(action.type)) return prevState;

  const handlers = getHandlers(prevState, cloneDeep(prevState));

  switch (action.type) {
    case TYPES.ALL_ZERO:
      return handlers.allZero();
    case TYPES.ALL_LEVEL_UP:
      return handlers.allLevelUp();
    case TYPES.ALL_LEVEL_DOWN:
      return handlers.allLevelDown();
    case TYPES.ALL_PAID:
      return handlers.allPaid();
    case TYPES.ALL_UNPAID:
      return handlers.allUnpaid();
    case TYPES.ALL_NOT_UPGRADING:
      return handlers.allNotUpgrading();

    case TYPES.SET_LEVEL:
      return handlers.setLevel(action.params);
    case TYPES.LEVEL_UP:
      return handlers.levelUp(action.params);
    case TYPES.LEVEL_DOWN:
      return handlers.levelDown(action.params);
    case TYPES.SET_UPGRADING:
      return handlers.setUpgrading(action.params);
    case TYPES.PAY_BILL:
      return handlers.payBill(action.params);
    case TYPES.UNPAY_BILL:
      return handlers.unpayBill(action.params);

    default:
      throw unhandledActionError(STATE_NAME, action.type);
  }
}
