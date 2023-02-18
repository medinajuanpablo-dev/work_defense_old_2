import { checkRequiredValues, mustBe } from "@static/functions";

import { WORKER_OCCS, PROCESS_OCCS, KEYS as PPK } from "./gens";

/**
 * Tells the amount of free people coming from immigration with the specified Immigration Post level.
 * @param {number} postLevel
 */
export function immigrants(postLevel) {
  checkRequiredValues([{ postLevel, type: "number" }]);

  const { BASE, INCREASE_PER_LEVEL } = IMMIGRATION;
  return BASE + postLevel * INCREASE_PER_LEVEL;
}

/**
 * Tells the amount of people that can currently exist in the outpost, including soldiers, with the specified Houses level.
 * @param {number} housesLevel
 */
export function housingCapacity(housesLevel) {
  checkRequiredValues([{ housesLevel, type: "number" }]);

  const { BASE, INCREASE_PER_LEVEL } = CAPACITY;
  return BASE + housesLevel * INCREASE_PER_LEVEL;
}

/**
 * Calculates the mantainment cost for the specified amount of civilians of the specified occupation.
 * @param {string} occupationKey A civilian occupation.
 * @param {number} peopleAmount The amount of civilians in that occupation.
 */
export function civiliansMantainment(occupationKey, peopleAmount) {
  checkRequiredValues([
    [{ occupationKey, peopleAmount }, mustBe(PPK.OCCS), "n"],
  ]);

  if (occupationKey == PPK.OCCS.FREE) return MANTAINMENT.FREE * peopleAmount;
  else if (Object.keys(WORKER_OCCS).includes(occupationKey))
    return MANTAINMENT.WORKER * peopleAmount;
  else if (Object.keys(PROCESS_OCCS).includes(occupationKey))
    return MANTAINMENT.PROCESS * peopleAmount;
  else throw Error(`Specified a non-civilian occupation: ${occupationKey}`);
}

//========================================================================================================
//------------------------------------ Local values used in the ops only ---------------------------------
//========================================================================================================

/**Values to calculate the amount of free civilians received at the Immigration Stage. */
const IMMIGRATION = {
  BASE: 2,
  INCREASE_PER_LEVEL: 1,
};

/**Values to calculate the maximum amount of people that can live in the outpost */
const CAPACITY = {
  BASE: 10,
  INCREASE_PER_LEVEL: 10,
};

/**Mantainment cost in Food for 1 person of a certain category of occupation. */
const MANTAINMENT = {
  FREE: 0.5,
  WORKER: 1,
  PROCESS: 0.75,
};
