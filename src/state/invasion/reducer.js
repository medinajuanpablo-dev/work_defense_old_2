import { cloneDeep } from "lodash";

import defaultState, { unhandledActionError } from "../defaultState";
import { TYPES, STATE_NAME } from "./actions";
import getHandlers from "./handlers";

export default function reducer(prevState = defaultState.invasion, action) {
  if (!Object.values(TYPES).includes(action.type)) return prevState;

  const handlers = getHandlers(prevState, cloneDeep(prevState));

  switch (action.type) {
    case TYPES.CLEAN_DEFENSE:
      return handlers.cleanDefense();
    case TYPES.CLEAN_LIBERATIONS:
      return handlers.cleanLiberations();
    case TYPES.CLEAN_OCCUPATIONS:
      return handlers.cleanOccupations();

    case TYPES.SET_RISKS:
      return handlers.setRisks(action.params);
    case TYPES.SET_DANGER_ZONES:
      return handlers.setDangerZones(action.params);
    case TYPES.ADD_ATTACK:
      return handlers.addAttack(action.params);
    case TYPES.SET_ATTACK_RESULT:
      return handlers.setAttackResult(action.params);
    case TYPES.SET_LIBERATION_DATA:
      return handlers.setLiberationData(action.params);
    case TYPES.SET_OCCUPATION:
      return handlers.setOccupation(action.params);

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
