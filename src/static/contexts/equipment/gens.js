/* ==== Equipment Values ====
All values related to equipment stored or being crafted (not currently equipped by soldiers): 
To calculate craft ranks and costs, capacity, etc...

Equipment currently equipped by soldiers is called "Gear" and is considered part of the soldier,
so it belongs to army values.

These are general values and keys, meaning they are used in multiple and spread places (stages, state and/or static).
Local-use values and keys are defined where they are used. 
*/

export const KEYS = {
  TYPES: {
    WEAPON: "weapon",
    ARMOR: "armor",
  },
};

export const TYPES_NAMES = {
  [KEYS.TYPES.WEAPON]: { singular: "Weapon", plural: "Weapons" },
  [KEYS.TYPES.ARMOR]: { singular: "Armor", plural: "Armor" },
};
