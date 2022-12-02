/* ==== Building Values ====
These are general values and keys, meaning they are used in multiple and spread places (stages, state and/or static).
Local-use values and keys are defined where they are used. 
*/

import { MIK } from "../miscellaneous";
import { REK } from "../resources";

export const KEYS = {
  NAMES: {
    COMMAND_CENTER: "commandCenter",
    ACADEMY: "academy",
    FARMS: "farms",
    WEAPONSMITH: "weaponsmith",
    ARMORSMITH: "armorsmith",
    MINES: "mines",
    HOUSES: "houses",
    IMMIGRATION_POST: "immigrationPost",
    WAREHOUSE: "warehouse",
    ARSENAL: "arsenal",
    MARKET: "market",
    SCOUTS_GUILD: "scoutsGuild",
  },
};

/**By-building values.
 * @type {{[buildingKey: string]: BuildingValues}}
 */
export const BY_BUILDING = {
  [KEYS.NAMES.COMMAND_CENTER]: {
    NAME: "Command Center",
    SHORT_NAME: "Cm. Center",
    PLACEMENT_ZONE: MIK.ZONES.COMMAND,
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 10, [REK.NAMES.MATERIALS]: 5 },
      INCREASE: { [REK.NAMES.DLOGS]: 10, [REK.NAMES.MATERIALS]: 5 },
    },
  },
  [KEYS.NAMES.ACADEMY]: {
    NAME: "Academy",
    SHORT_NAME: "Academy",
    PLACEMENT_ZONE: MIK.ZONES.RECRUITMENT,
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 5, [REK.NAMES.MATERIALS]: 3 },
      INCREASE: { [REK.NAMES.DLOGS]: 5, [REK.NAMES.MATERIALS]: 3 },
    },
  },
  [KEYS.NAMES.FARMS]: {
    NAME: "Farms",
    SHORT_NAME: "Farms",
    PLACEMENT_ZONE: MIK.ZONES.FARMING,
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 3, [REK.NAMES.MATERIALS]: 1 },
      INCREASE: { [REK.NAMES.DLOGS]: 2, [REK.NAMES.MATERIALS]: 1 },
    },
  },
  [KEYS.NAMES.WEAPONSMITH]: {
    NAME: "Weaponsmith",
    SHORT_NAME: "Wpsmith",
    PLACEMENT_ZONE: MIK.ZONES.ARMAMENT,
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 50, [REK.NAMES.MATERIALS]: 15 },
      INCREASE: { [REK.NAMES.DLOGS]: 25, [REK.NAMES.MATERIALS]: 15 },
    },
  },
  [KEYS.NAMES.ARMORSMITH]: {
    PLACEMENT_ZONE: MIK.ZONES.ARMAMENT,
    NAME: "Armorsmith",
    SHORT_NAME: "Arsmith",
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 50, [REK.NAMES.MATERIALS]: 15 },
      INCREASE: { [REK.NAMES.DLOGS]: 25, [REK.NAMES.MATERIALS]: 15 },
    },
  },
  [KEYS.NAMES.MINES]: {
    PLACEMENT_ZONE: MIK.ZONES.MINING,
    NAME: "Mines",
    SHORT_NAME: "Mines",
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 3, [REK.NAMES.MATERIALS]: 1 },
      INCREASE: { [REK.NAMES.DLOGS]: 2, [REK.NAMES.MATERIALS]: 1 },
    },
  },
  [KEYS.NAMES.HOUSES]: {
    PLACEMENT_ZONE: MIK.ZONES.RESIDENTIAL,
    NAME: "Houses",
    SHORT_NAME: "Houses",
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 5, [REK.NAMES.MATERIALS]: 3 },
      INCREASE: { [REK.NAMES.DLOGS]: 5, [REK.NAMES.MATERIALS]: 2 },
    },
  },
  [KEYS.NAMES.IMMIGRATION_POST]: {
    PLACEMENT_ZONE: MIK.ZONES.RESIDENTIAL,
    NAME: "Immigration Post",
    SHORT_NAME: "Im. Post",
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 5, [REK.NAMES.MATERIALS]: 2 },
      INCREASE: { [REK.NAMES.DLOGS]: 10, [REK.NAMES.MATERIALS]: 5 },
    },
  },
  [KEYS.NAMES.WAREHOUSE]: {
    PLACEMENT_ZONE: MIK.ZONES.STORAGE,
    NAME: "Warehouse",
    SHORT_NAME: "Warehouse",
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 3, [REK.NAMES.MATERIALS]: 2 },
      INCREASE: { [REK.NAMES.DLOGS]: 2, [REK.NAMES.MATERIALS]: 1 },
    },
  },
  [KEYS.NAMES.ARSENAL]: {
    PLACEMENT_ZONE: MIK.ZONES.STORAGE,
    NAME: "Arsenal",
    SHORT_NAME: "Arsenal",
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 3, [REK.NAMES.MATERIALS]: 2 },
      INCREASE: { [REK.NAMES.DLOGS]: 2, [REK.NAMES.MATERIALS]: 1 },
    },
  },
  [KEYS.NAMES.MARKET]: {
    PLACEMENT_ZONE: MIK.ZONES.COMMERCE,
    NAME: "Market",
    SHORT_NAME: "Market",
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 5, [REK.NAMES.MATERIALS]: 3 },
      INCREASE: { [REK.NAMES.DLOGS]: 2, [REK.NAMES.MATERIALS]: 1 },
    },
  },
  [KEYS.NAMES.SCOUTS_GUILD]: {
    PLACEMENT_ZONE: MIK.ZONES.EXPEDITION,
    NAME: "Scouts Guild",
    SHORT_NAME: "Sc. Guild",
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 10, [REK.NAMES.MATERIALS]: 2 },
      INCREASE: { [REK.NAMES.DLOGS]: 5, [REK.NAMES.MATERIALS]: 2 },
    },
  },
};

/**
 * @typedef {Object} BuildingValues
 * @property {string} PLACEMENT_ZONE The key of the zone where this building is placed.
 * @property {string} NAME The name of this building.
 * @property {string} SHORT_NAME The name of this building but shorter to fit smaller spaces.
 * @property {Object} UPGRADE_COST Values to calculate the upgrade cost of this building.
 * @property {{[resourceKey]: number}} UPGRADE_COST.BASE Cost to upgrade this building to level 1.
 * @property {{[resourceKey]: number}} UPGRADE_COST.INCREASE Cost increase for each subsequent level.
 */
