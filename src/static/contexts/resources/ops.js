import { mapValues } from "lodash";
import {
  sumProperties,
  clean,
  checkRequiredValues,
  mustBe,
} from "@static/functions";

import { KEYS, NAMES } from "./gens";

const REK = KEYS.NAMES;

/**
 * Calculates the production of the specified resource by the specified producer building level and amount of workers.
 * @param {string} resourceKey The producing resource's key.
 * @param {number} producerBuildingLevel The level of the building that produces the resource.
 * @param {number} workersAmount The amount of people working in producing that resource.
 */
export function production(resourceKey, producerBuildingLevel, workersAmount) {
  checkRequiredValues([
    { resourceKey, enmr: Object.values(REK) },
    [{ producerBuildingLevel, workersAmount }, "n", "n"],
  ]);

  const PPW = PRODUCTION_PER_WORKER[resourceKey];

  return (
    (PPW.BASE + producerBuildingLevel * PPW.INCREASE_PER_LEVEL) * workersAmount
  );
}

/**
 * Tells the storage capacity of the specified resource by the specified Warehouse level.
 * @param {string} resourceKey
 * @param {number} warehouseLevel
 */
export function storageCapacity(resourceKey, warehouseLevel) {
  checkRequiredValues([[{ resourceKey, warehouseLevel }, mustBe(REK), "n"]]);

  const { BASE, INCREASE_PER_LEVEL } = STORAGE[resourceKey];
  return BASE + warehouseLevel * INCREASE_PER_LEVEL;
}

/**
 * Performs a sum of the specified costs. The resources to add can be specified with the 2nd parm; if not, it will add all existing resources.
 * @param {Array<Cost>} costsList
 * @param {Array<string>} addingResources
 * @returns {Cost}
 */
export function addCosts(costsList, addingResources) {
  checkRequiredValues([
    { costsList, itemsType: "object" },
    { addingResources, itemsType: "string" },
  ]);

  const resourcesKeys = addingResources || Object.values(REK);

  return sumProperties(costsList, resourcesKeys);
}

/**
 * Performs a substraction from the source cost in the amount specified in the substractor cost. The resources to substract can be specified with the 2nd parm; if not, it will substract all existing resources.
 * @param {Cost} source
 * @param {Cost} substractor
 * @param {Array<string>} substractingResources
 */
export function substractCosts(source, substractor, substractingResources) {
  checkRequiredValues([
    { source, onlyFields: Object.values(REK) },
    { substractor, onlyFields: Object.values(REK) },
  ]);

  const resourcesKeys = substractingResources || Object.values(REK);
  const negativeSubstractor = mapValues(substractor, (resource) => -resource);
  const result = sumProperties([source, negativeSubstractor], resourcesKeys);

  clean(result);

  return result;
}

/**
 * Transform a cost into it's string representation.
 * @param {Cost} cost The cost to convert.
 * @returns {string} The string representation of the cost.
 */
export function costToString(cost) {
  checkRequiredValues([{ cost, onlyFields: Object.values(REK) }]);

  return Object.keys(cost)
    .map((resKey) => {
      const { SINGULAR, PLURAL } = NAMES[resKey];
      return `${cost[resKey]} ${cost[resKey] > 1 ? PLURAL : SINGULAR}`;
    })
    .join(" — ");
}

//========================================================================================================
//------------------------------------ Local values used in the ops only ---------------------------------
//========================================================================================================

/**Values to calculate the amount of a certain resource produced by 1 worker in the Production Stage.*/
const PRODUCTION_PER_WORKER = {
  [REK.FOOD]: {
    BASE: 1,
    INCREASE_PER_LEVEL: 0.25,
  },
  [REK.MATERIALS]: {
    BASE: 0.5,
    INCREASE_PER_LEVEL: 0.1,
  },
};

/**Values to calculate the maximum storable amount of a certain resource. */
const STORAGE = {
  [REK.FOOD]: { BASE: 10, INCREASE_PER_LEVEL: 20 },
  [REK.MATERIALS]: { BASE: 5, INCREASE_PER_LEVEL: 10 },
};

/**
 * @typedef {import("@static/contexts/resources").Cost} Cost
 */
