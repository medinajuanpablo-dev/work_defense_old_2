/* ==== Resources Values ====
These are general values and keys, meaning they are used in multiple and spread places (stages, state and/or static).
Local-use values and keys are defined where they are used. 
*/

export const KEYS = {
  NAMES: {
    DLOGS: "dlogs",
    FOOD: "food",
    MATERIALS: "materials",
  },
};

/**Name of each resource. */
export const NAMES = {
  [KEYS.NAMES.DLOGS]: { SINGULAR: "Dlog", PLURAL: "Dlogs" },
  [KEYS.NAMES.MATERIALS]: { SINGULAR: "Material", PLURAL: "Materials" },
  [KEYS.NAMES.FOOD]: { SINGULAR: "Food", PLURAL: "Food" },
};

/**
 * @typedef {{dlogs: number, food: number, materials: number}} Cost
 */
