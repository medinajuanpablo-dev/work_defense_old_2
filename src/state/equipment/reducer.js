import { cloneDeep } from "lodash";

import defaultState, { unhandledActionError } from "../defaultState";
import { TYPES, STATE_NAME } from "./actions";
import getHandlers from "./handlers";

export default function reducer(prevState = defaultState.equipment, action) {
  if (!Object.values(TYPES).includes(action.type)) return prevState;

  const handlers = getHandlers(prevState, cloneDeep(prevState));

  switch (action.type) {
    case TYPES.EMPTY_STORAGE:
      return handlers.emptyStorage();
    case TYPES.CANCEL_ALL_ORDERS:
      return handlers.cancelAllOrders();
    case TYPES.FINISH_ALL_ORDERS:
      return handlers.finishAllOrders();

    case TYPES.EMPTY_TYPE:
      return handlers.emptyType(action.params);
    case TYPES.CANCEL_TYPE_ORDERS:
      return handlers.cancelTypeOrders(action.params);
    case TYPES.ADD_TO_STORAGE:
      return handlers.addToStorage(action.params);
    case TYPES.REMOVE_FROM_STORAGE:
      return handlers.removeFromStorage(action.params);
    case TYPES.SET_STORED:
      return handlers.setStored(action.params);
    case TYPES.ADD_ORDER:
      return handlers.addOrder(action.params);
    case TYPES.CANCEL_ORDER:
      return handlers.cancelOrder(action.params);
    case TYPES.FINISH_ORDER:
      return handlers.finishOrder(action.params);
    case TYPES.SET_ALL_STORED:
      return handlers.setAllOrders(action.params);
    case TYPES.SET_ALL_ORDERS:
      return handlers.setAllOrders(action.params);

    default:
      throw unhandledActionError(STATE_NAME, action.type);
  }
}
