import { checkRequiredValues } from "@static/functions";

import { BY_BUILDING as BBD } from "./gens";

/**
 * Calculates the upgrade cost of the specified building in the specified level.
 * @param {string} buildingKey The key of the building which upgrade cost is required.
 * @param {number} currentLevel The current level of the building.
 * @returns {Cost} The upgrade cost.
 */
export function upgradeCost(buildingKey, currentLevel) {
  checkRequiredValues([[{ buildingKey, currentLevel }, "s", "n"]]);

  const UC = BBD[buildingKey].UPGRADE_COST;
  var cost = {};

  for (let resKey in UC.BASE)
    cost[resKey] = UC.BASE[resKey] + currentLevel * UC.INCREASE[resKey];

  return cost;
}

/**
 * Tells the remaining tempos until destruction considering the specified `elapsedTempos`.
 * @param {number} elapsedTempos
 * @returns {number} The remaining tempos.
 */
export function remainingTemposForDestruction(elapsedTempos) {
  return TEMPOS_UNTIL_DESTRUCTION - elapsedTempos;
}

//========================================================================================================
//------------------------------------ Local values used in the ops only ---------------------------------
//========================================================================================================

/**Number of tempos until a building is destroyed by occupant enemies. */
const TEMPOS_UNTIL_DESTRUCTION = 3;

/**@typedef {import("@static/contexts/resources").Cost} Cost */
