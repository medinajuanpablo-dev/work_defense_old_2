import { checkRequiredValues } from "@static/functions";

import { KEYS } from "./gens";

const CSK = KEYS.CAPACITY_STATUS;
const ACK = KEYS.AFTER_CAPACITY_STATUS;

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

/**
 * Tells the status of capacity/storage of a certain resource, equipment or any value AFTER production,
 * given the amount after production and current capacity.
 * @param {number} storedAfter The stored amount after production.
 * @param {number} capacity The current capacity.
 */
export function afterCapacityStatus(storedAfter, capacity) {
  if (storedAfter < capacity * AFTER_STATUS_CRITERIA[ACK.SAFELY_STORABLE])
    return ACK.SAFELY_STORABLE;
  else if (storedAfter < capacity) return ACK.BARELY_STORABLE;
  else if (storedAfter < capacity * AFTER_STATUS_CRITERIA[ACK.MOST_STORABLE])
    return ACK.MOST_STORABLE;
  else return ACK.NOT_STORABLE;
}

//========================================================================================================
//------------------------------------ Local values used in the ops only ---------------------------------
//========================================================================================================

const STATUS_CRITERIA = {
  [CSK.NEAR_MAX]: 0.7,
  [CSK.ALMOST_MAXED]: 0.85,
};

const AFTER_STATUS_CRITERIA = {
  [ACK.SAFELY_STORABLE]: 0.9,
  [ACK.MOST_STORABLE]: 1.15,
};
