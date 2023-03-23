import { cloneDeep } from "lodash";

import defaultState, { unhandledActionError } from "../defaultState";
import { TYPES, STATE_NAME } from "./actions";
import getHandlers from "./handlers";

export default function reducer(prevState = defaultState.army, action) {
  if (!Object.values(TYPES).includes(action.type)) return prevState;

  const handlers = getHandlers(prevState, cloneDeep(prevState));

  switch (action.type) {
    case TYPES.EMPTY_ALL_FORCES:
      return handlers.emptyAllForces();
    case TYPES.NULL_ALL_PROTOCOLS:
      return handlers.nullAllProtocols();
    case TYPES.ALL_TO_FREE:
      return handlers.allToFree();
    case TYPES.NEW_SOLDIER_CREATED:
      return handlers.newSoldierCreated();

    case TYPES.ADD_FREE_FORCE:
      return handlers.addFreeForce(action.params);
    case TYPES.REMOVE_FREE_FORCE:
      return handlers.removeFreeForce(action.params);
    case TYPES.SET_FREE_FORCE:
      return handlers.setFreeForce(action.params);
    case TYPES.ADD_FRESH_SOLDIERS:
      return handlers.addFreshSoldiers(action.params);
    case TYPES.ADD_DEFENSE_FORCE:
      return handlers.addDefenseForce(action.params);
    case TYPES.REMOVE_DEFENSE_FORCE:
      return handlers.removeDefenseForce(action.params);
    case TYPES.SET_DEFENSE_FORCE:
      return handlers.setDefenseForce(action.params);
    case TYPES.FORM_UNIT:
      return handlers.formUnit(action.params);
    case TYPES.DISSOLVE_UNIT:
      return handlers.dissolveUnit(action.params);
    case TYPES.ADD_UNIT_FORCE:
      return handlers.addUnitForce(action.params);
    case TYPES.REMOVE_UNIT_FORCE:
      return handlers.removeUnitForce(action.params);
    case TYPES.SET_UNIT_FORCE:
      return handlers.setUnitForce(action.params);
    case TYPES.SET_DEFENSE_PROTOCOL:
      return handlers.setDefenseProtocol(action.params);
    case TYPES.SET_UNIT_PROTOCOL:
      return handlers.setUnitProtocol(action.params);
    case TYPES.REASSIGN_DEFENSE:
      return handlers.reassignDefense(action.params);
    case TYPES.SET_SOLDIERS:
      return handlers.setSoldiers(action.params);

    case TYPES.CLEAR:
      return handlers.clear();
    case TYPES.REPLACE:
      return handlers.replace(action.params);
    case TYPES.MERGE:
      return handlers.merge(action.params);

    default:
      throw unhandledActionError(STATE_NAME, action.type);
  }
}
