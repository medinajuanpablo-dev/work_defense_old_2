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
    DESCRIPTION:
      "This is where all orders are dispatched and research is made. Losing this building to enemy occupation is Game Over. Each upgrade confers 1 Research Point.",
  },
  [KEYS.NAMES.ACADEMY]: {
    NAME: "Academy",
    SHORT_NAME: "Academy",
    PLACEMENT_ZONE: MIK.ZONES.RECRUITMENT,
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 5, [REK.NAMES.MATERIALS]: 3 },
      INCREASE: { [REK.NAMES.DLOGS]: 5, [REK.NAMES.MATERIALS]: 3 },
    },
    DESCRIPTION:
      "This building allows better training for recruits before they become soldiers. Losing this building blocks all it's benefits. Each upgrade allows recruiting new soldiers with a higher initial CE level.",
  },
  [KEYS.NAMES.FARMS]: {
    NAME: "Farms",
    SHORT_NAME: "Farms",
    PLACEMENT_ZONE: MIK.ZONES.FARMING,
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 3, [REK.NAMES.MATERIALS]: 1 },
      INCREASE: { [REK.NAMES.DLOGS]: 2, [REK.NAMES.MATERIALS]: 1 },
    },
    DESCRIPTION:
      "Our main source of Food comes from here and we'll likely not be able to sustain the Outpost without proper Farms (and farmers). Losing this building blocks all Food production until recovered. Each upgrade improves the food produced by each farmer.",
  },
  [KEYS.NAMES.WEAPONSMITH]: {
    NAME: "Weaponsmith",
    SHORT_NAME: "Wpsmith",
    PLACEMENT_ZONE: MIK.ZONES.ARMAMENT,
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 50, [REK.NAMES.MATERIALS]: 15 },
      INCREASE: { [REK.NAMES.DLOGS]: 25, [REK.NAMES.MATERIALS]: 15 },
    },
    DESCRIPTION:
      "The Weaponsmith both crafts and upgrades all the weaponry needed to keep our defense able to destroy the enemy. Losing this building blocks all weapon crafting until recovered. Each upgrade allows to order a higher maximum weapon rank.",
  },
  [KEYS.NAMES.ARMORSMITH]: {
    PLACEMENT_ZONE: MIK.ZONES.ARMAMENT,
    NAME: "Armorsmith",
    SHORT_NAME: "Arsmith",
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 50, [REK.NAMES.MATERIALS]: 15 },
      INCREASE: { [REK.NAMES.DLOGS]: 25, [REK.NAMES.MATERIALS]: 15 },
    },
    DESCRIPTION:
      "The Armorsmith both crafts and updgrades all the body-protection our defense need to destroy the enemy and survive the process. Losing this building blocks all armor crafting until recovered. Each upgrade allows to order a higher maximum armor rank.",
  },
  [KEYS.NAMES.MINES]: {
    PLACEMENT_ZONE: MIK.ZONES.MINING,
    NAME: "Mines",
    SHORT_NAME: "Mines",
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 3, [REK.NAMES.MATERIALS]: 1 },
      INCREASE: { [REK.NAMES.DLOGS]: 2, [REK.NAMES.MATERIALS]: 1 },
    },
    DESCRIPTION:
      "Most materials, fundamental to build and craft, come from here. Losing this building blocks all Materials production until recovered. Each upgrades improves the materials produced by each miner.",
  },
  [KEYS.NAMES.HOUSES]: {
    PLACEMENT_ZONE: MIK.ZONES.RESIDENTIAL,
    NAME: "Houses",
    SHORT_NAME: "Houses",
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 5, [REK.NAMES.MATERIALS]: 3 },
      INCREASE: { [REK.NAMES.DLOGS]: 5, [REK.NAMES.MATERIALS]: 2 },
    },
    DESCRIPTION:
      "People lives here and is needed to host every newcomer. After losing this building, people will start deserting, starting by the army. Each upgrade improves the capacity of the Houses.",
  },
  [KEYS.NAMES.IMMIGRATION_POST]: {
    PLACEMENT_ZONE: MIK.ZONES.RESIDENTIAL,
    NAME: "Immigration Post",
    SHORT_NAME: "Im. Post",
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 5, [REK.NAMES.MATERIALS]: 2 },
      INCREASE: { [REK.NAMES.DLOGS]: 10, [REK.NAMES.MATERIALS]: 5 },
    },
    DESCRIPTION:
      "Immigrants arrive here each tempo looking to join the Oupost. Losing this build blocks immigration. Each upgrade improves the amount of newcomers arriving each tempo.",
  },
  [KEYS.NAMES.WAREHOUSE]: {
    PLACEMENT_ZONE: MIK.ZONES.STORAGE,
    NAME: "Warehouse",
    SHORT_NAME: "Warehouse",
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 3, [REK.NAMES.MATERIALS]: 2 },
      INCREASE: { [REK.NAMES.DLOGS]: 2, [REK.NAMES.MATERIALS]: 1 },
    },
    DESCRIPTION:
      "All Food and Materials are stored here, and each have a different section that is not shareable. Losing this building blocks access to the stored resources, but we won't lose them at least. Each upgrade improves the capacity for both resources.",
  },
  [KEYS.NAMES.ARSENAL]: {
    PLACEMENT_ZONE: MIK.ZONES.STORAGE,
    NAME: "Arsenal",
    SHORT_NAME: "Arsenal",
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 3, [REK.NAMES.MATERIALS]: 2 },
      INCREASE: { [REK.NAMES.DLOGS]: 2, [REK.NAMES.MATERIALS]: 1 },
    },
    DESCRIPTION:
      "All Weapons and Armor currently not equipped by soldiers are stored here, and both share the same space. Losing this building blocks access to the stored equipment, but we won't lose them at least. Each upgrade improves the unused-equipment capacity.",
  },
  [KEYS.NAMES.MARKET]: {
    PLACEMENT_ZONE: MIK.ZONES.COMMERCE,
    NAME: "Market",
    SHORT_NAME: "Market",
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 5, [REK.NAMES.MATERIALS]: 3 },
      INCREASE: { [REK.NAMES.DLOGS]: 2, [REK.NAMES.MATERIALS]: 1 },
    },
    DESCRIPTION:
      "Here we may improve our income of precious Dlogs, needed for everything. Losing this building blocks all it's benefits. Each upgrade improves the amount of Dlogs earned per Sess.",
  },
  [KEYS.NAMES.SCOUTS_GUILD]: {
    PLACEMENT_ZONE: MIK.ZONES.EXPEDITION,
    NAME: "Scouts Guild",
    SHORT_NAME: "Sc. Guild",
    UPGRADE_COST: {
      BASE: { [REK.NAMES.DLOGS]: 10, [REK.NAMES.MATERIALS]: 2 },
      INCREASE: { [REK.NAMES.DLOGS]: 5, [REK.NAMES.MATERIALS]: 2 },
    },
    DESCRIPTION:
      "Enemy attacks can come from anywhere. Knowing the objective of each attack is just as important as having a proper defense for it. Each upgrades improves the base quality of each Scouting Expedition.",
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
 * @property {string} DESCRIPTION The effect/purpose of the building.
 */
