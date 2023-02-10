import { random, floor } from "lodash";

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

//========================================================================================================
//------------------------------------ Local values used in the ops only ---------------------------------
//========================================================================================================
