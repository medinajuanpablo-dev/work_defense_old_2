import { random, floor } from "lodash";

import { checkRequiredValues } from "@static/functions";

import { KEYS } from "./gens";

const CSK = KEYS.CAPACITY_STATUS;

/**
 * For calculating values of random increase, that have a `base` constant value and an `increase` value with a minimum
 * and maximum that depends of a `factor`.
 * @param {Object} definedValues
 * @param {number} definedValues.base
 * @param {{min: number, max: number}} definedValues.increase
 * @param {number} factor
 * @param {boolean} float
 * @returns {number} The calculated value.
 */
export function randomIncrease({ base, increase }, factor, float) {
  const x = base + factor * random(increase.min, increase.max, true);
  return float ? x : floor(x);
}

/**
 * Tells the capacity/storage status of a certain resource, equipment or any value given it's current stored amount and capacity.
 * @param {number} stored The currently stored amount.
 * @param {number} capacity The current capacity.
 */
export function capacityStatus(stored, capacity) {
  checkRequiredValues([[{ stored, capacity }, "n", "n"]]);

  if (stored == capacity) return CSK.MAXED;
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
