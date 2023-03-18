import { cloneDeep, mapValues } from "lodash";

import { sumProperties, clean, checkRequiredValues } from "@static/functions";

import { REK } from "../resources";

/**
 * Tells the crafting requirements (cost and Crafting Capacity) of the specified amount of equipment
 * of the specified rank.
 * @param {number} rank The rank of the crafting equipment.
 * @param {number} amount The amount to craft of that rank.
 * @returns {{cost: Cost, cc: number}} The crafting cost.
 */
export function craftRequirements(rank, amount) {
  var cost = {};
  for (let resKey in REQUIREMENTS_PER_RANK.RESOURCES)
    cost[resKey] = REQUIREMENTS_PER_RANK.RESOURCES[resKey] * rank * amount;

  const cc = REQUIREMENTS_PER_RANK.CRAFTING_CAPACITY * rank * amount;

  return { cost, cc };
}

/**
 * Tells the maximum artisan crafting capacity based on it's building level.
 * @param {number} crafterBuildingLevel
 */
export function maximumCraftingCapacity(crafterBuildingLevel) {
  return CRAFTING_CAPACITY_PER_LEVEL * crafterBuildingLevel;
}

/**
 * Tells the maximum amount of equipment that can be stored.
 * @param {number} arsenalLevel The level of the Arsenal building.
 * @returns {number} The capacity.
 */
export function storageCapacity(arsenalLevel) {
  checkRequiredValues([{ arsenalLevel, type: "number" }]);

  const { BASE, INCRASE_PER_LEVEL } = CAPACITY;
  return BASE + arsenalLevel * INCRASE_PER_LEVEL;
}

/**
 * Joins multiple sets of equipments separated by rank, mixing the respective ranks from each set.
 * @param {Array<EquipmentSet>} equipmentSets
 * @return {EquipmentSet} The joined set.
 */
export function mergeSets(...equipmentSets) {
  checkRequiredValues([{ equipmentSets, type: "array" }]);

  var joinedSet = {};

  for (let set of equipmentSets) {
    checkRequiredValues([{ set, fieldsType: "number" }]);

    for (let rank in set) joinedSet[rank] = (joinedSet[rank] || 0) + set[rank];
  }

  return joinedSet;
}

/**
 * Extracts equipment from the specified source set in the ranks and amounts specified in the extractor set,
 * then returns the remaining set.
 *
 * **Notes**:
 * - The empty ranks are deleted.
 * - The original `sourceSet` is not modified.
 * - Ranks from the extractor that don't exist in the source are just ignored.
 * - If more than available in a certain rank is specified to be extracted, the extra is just ignored.
 * @param {EquipmentSet} sourceSet The set from which the equipment will be extracted.
 * @param {EquipmentSet} extractorSet The ranks and amounts to extract.
 * @returns {EquipmentSet} The remaining set after extraction.
 */
export function extractFromSet(sourceSet, extractorSet) {
  checkRequiredValues([
    { sourceSet, fieldsType: "number" },
    { extractorSet, itemsType: "number" },
  ]);

  const negativeExtractor = mapValues(extractorSet, (am) => -am);
  var remainingSet = sumProperties([sourceSet, negativeExtractor]);

  clean(remainingSet);

  return remainingSet;
}

/**
 * Extract the highest or lowest-ranks equipment from the specified source set in the amount specified,
 * then returns the remaining set.
 *
 * **Notes**:
 * - The empty ranks are deleted.
 * - The original `sourceSet` is not modified.
 * - If the amount to extract is higher than the available equipment in the source set, an error is thrown.
 * @param {EquipmentSet} sourceSet The set from which the equipment will be extracted.
 * @param {"highest-ranks" | "lowest-ranks"} type The type of ranks to extract from. Can be one of two values: "highest-ranks" or "lowest-ranks".
 * @param {number} amount The amount of equipment to extract.
 * @returns The remaining set after extraction.
 */
export function extractAmountFromSet(sourceSet, type, amount) {
  checkRequiredValues([
    { sourceSet, fieldsType: "number" },
    { type, enmr: ["highest-ranks", "lowest-ranks"] },
    { amount, type: "number", ch: (v) => v < sumProperties(sourceSet) }, //Amount must be lower than the sum of all equipment in sourceSet
  ]);

  var extractedSet = {};
  var extractedAmount = 0;
  var remainingSet = cloneDeep(sourceSet);

  const sortedRanks = Object.keys(sourceSet).sort((r1, r2) =>
    type === "highest-ranks" ? r2 - r1 : r1 - r2
  );

  for (let rank of sortedRanks) {
    extractedAmount += remainingSet[rank];
    extractedSet[rank] = remainingSet[rank];
    delete remainingSet[rank];

    if (extractedAmount >= amount) {
      if (extractedAmount > amount) {
        remainingSet[rank] = extractedAmount - amount;
        extractedSet[rank] -= extractedAmount - amount;
      }
      break;
    }
  }

  return {
    /**@type {EquipmentSet} */
    extractedSet,
    remainingSet,
  };
}

/**
 * Counts the total equipment ranks in the specified equipment set.
 * @param {EquipmentSet} set
 */
export function ranksSum(set) {
  checkRequiredValues([{ set, fieldsType: "number" }]);

  var ranks = 0;

  for (let r in set) ranks += r * set[r];

  return ranks;
}

/**Transforms a numeric rank into a letter. Rank 1 is an A.
 * @param {number} numericRank The rank to transform.
 * @returns {string} The letter representation of the specified rank.
 */
export function letterRank(numericRank) {
  var code = CODE_OF_LETTER_A + numericRank - 1;

  if (code > CODE_OF_LETTER_Z)
    throw Error(`The specified rank '${numericRank}' is invalid`);

  return String.fromCharCode(code);
}

//========================================================================================================
//------------------------------------ Local values used in the ops only ---------------------------------
//========================================================================================================

/**Values to calculate the capacity of the Arsenal */
const CAPACITY = {
  /**Arsenal base capacity. */
  BASE: 7,
  /**Arsenal capacity for each subsequent level. */
  INCRASE_PER_LEVEL: 7,
};

/**Equipment needed Resources and Crafting Capacity for each rank. */
const REQUIREMENTS_PER_RANK = {
  CRAFTING_CAPACITY: 1,
  RESOURCES: {
    [REK.NAMES.DLOGS]: 1.75,
    [REK.NAMES.MATERIALS]: 0.75,
  },
};

/**The maximum crafting capacity of an artisan per level of it's building. */
const CRAFTING_CAPACITY_PER_LEVEL = 10;

const CODE_OF_LETTER_A = 65;
const CODE_OF_LETTER_Z = 90;

/**
 * @typedef {import("@state/defaultState").EquipmentSet} EquipmentSet
 * @typedef {import("@static/contexts/resources/gens").Cost} Cost
 */
