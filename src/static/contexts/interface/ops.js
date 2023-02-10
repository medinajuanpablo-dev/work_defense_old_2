import { checkRequiredValues } from "@static/functions";

import { KEYS } from "./gens";

const CSK = KEYS.CAPACITY_STATUS;

/**
 * Tells the capacity/storage status of a certain resource, equipment or any value given it's current stored amount and capacity.
 * @param {number} stored The currently stored amount.
 * @param {number} capacity The current capacity.
 */
export function capacityStatus(stored, capacity) {
  checkRequiredValues([[{ stored, capacity }, "n", "n"]]);

  if (stored >= capacity) return CSK.MAXED;
  else if (stored >= capacity * STATUS_CRITERIA[CSK.ALMOST_MAXED])
    return CSK.ALMOST_MAXED;
  else if (stored > capacity * STATUS_CRITERIA[CSK.NEAR_MAX])
    return CSK.NEAR_MAX;
  else return CSK.FINE;
}

//========================================================================================================
//------------------------------------ Local values used in the ops only ---------------------------------
//========================================================================================================

const STATUS_CRITERIA = {
  [CSK.NEAR_MAX]: 0.7,
  [CSK.ALMOST_MAXED]: 0.85,
};
