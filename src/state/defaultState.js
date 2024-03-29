// This file contains the state structure, types and keys, as well as the default values for each field.

import { mapValues, random } from "lodash";

import { armyOps } from "@static/contexts/army";
import { TECHS } from "@static/contexts/technologies";
import { BATTLE } from "@static/contexts/battle";
import { MISC, MIK } from "@static/contexts/miscellaneous";
import { BUILDINGS, BDK } from "@static/contexts/buildings";
import { EQK, EQUIPMENT } from "@static/contexts/equipment";
import { REK, RESOURCES } from "@static/contexts/resources";
import { PPK, POPULATION } from "@static/contexts/population";
import { ITK } from "@static/contexts/interface";

/**Error thrown when some actions were defined but not handled by the reducer.
 * @param {string} stateName @param {string} type */
export function unhandledActionError(stateName, type) {
  throw Error(
    (stateName || "A state") +
      " contains actions types it's reducer is not handling. Unhandled type: " +
      (type || "--Pass action type to error throwing--")
  );
}

// ==== State's structure and default values ====

/**@type {GeneralState} */
const DEFAULT_GENERAL_STATE = {
  army: {
    soldierCreationCounter: 0,
    zonesDefense: mapValues(MISC.ACTIVE_ZONES, () => ({
      force: [],
      protocol: BATTLE.DEFAULT_PROTOCOL,
    })),
    liberationUnits: {},
    freeZone: { force: [] },
  },

  // battle: {},

  buildings: mapValues(BUILDINGS.BY_BUILDING, () => {
    return {
      level: 0,
      upgrading: false,
      occupantsBillPaid: false,
    };
  }),

  equipment: {
    stored: mapValues(EQUIPMENT.TYPES_NAMES, () => ({})),
    orders: mapValues(EQUIPMENT.TYPES_NAMES, () => ({})),
  },

  interface: {
    shownSummarySections: {
      [ITK.MENUS.BUILDINGS]: { buildings: true, techs: true },
      [ITK.MENUS.POPULATION]: { general: true, army: true, civilians: true },
      [ITK.MENUS.RESOURCES]: { resources: true, equipment: true },
    },
    visibleMenu: { menu: null, subMenu: null },
  },

  invasion: {
    defense: {
      risks: mapValues(MISC.ACTIVE_ZONES, () => 0),
      dangerZones: [],
      attacks: {},
      fullInvasionForce: [],
    },
    liberations: {},
    occupations: {},
  },

  miscellaneous: {
    tempo: 1,
    stage: MIK.STAGES.DAWN,
    previousGS: null,
    tempState: null,
  },

  population: {
    count: {
      ...mapValues(POPULATION.WORKER_OCCS, () => 0),
      ...mapValues(POPULATION.PROCESS_OCCS, () => 0),
      ...mapValues(POPULATION.MILITARY_OCCS, () => 0),
      [PPK.OCCS.FREE]: 0,
      total: 0,
    },
    recruitsLevels: {},
  },

  resources: {
    storedPrevTempo: mapValues(RESOURCES.NAMES, () => 0),
    stored: mapValues(RESOURCES.NAMES, () => 0),
  },

  technologies: {
    researchPoints: 0,
    tree: mapValues(TECHS.TREE, (category) =>
      mapValues(category, (column) => column.map(() => ({ researched: false })))
    ),
  },
};

export default (() => {
  // Development changes and processes on the default state before exporting.
  var dgs = DEFAULT_GENERAL_STATE;

  //Misc
  dgs.miscellaneous.tempo = 30;
  dgs.miscellaneous.stage = MIK.STAGES.SIGHTING;

  //Buildings
  for (let b in dgs.buildings) dgs.buildings[b].level = 3;
  dgs.buildings[BDK.NAMES.WAREHOUSE].level = 3;
  dgs.buildings[BDK.NAMES.ARSENAL].level = 3;
  dgs.buildings[BDK.NAMES.IMMIGRATION_POST].level = 5;
  dgs.buildings[BDK.NAMES.ACADEMY].level = 0;

  dgs.buildings[BDK.NAMES.MINES].upgrading = true;
  dgs.buildings[BDK.NAMES.FARMS].upgrading = true;
  dgs.buildings[BDK.NAMES.IMMIGRATION_POST].upgrading = true;
  dgs.buildings[BDK.NAMES.COMMAND_CENTER].upgrading = true;

  //Population
  dgs.population.count[PPK.OCCS.FREE] = 8;
  dgs.population.count[PPK.OCCS.MINER] = 5;
  dgs.population.count[PPK.OCCS.FARMER] = 12;
  dgs.population.count[PPK.OCCS.RECRUIT] = 6;
  dgs.population.recruitsLevels = { 1: 3, 2: 1, 3: 2 };

  dgs.population.count.total = 31;

  //Techs
  dgs.technologies.researchPoints = 1;

  //Army
  const randomConstruct = true;
  const constructLevel = 10;

  function constructForce() {
    return Array(2)
      .fill(true)
      .map(() =>
        armyOps.createSoldier({
          number: ++dgs.army.soldierCreationCounter,
          level: randomConstruct ? random(1, constructLevel) : constructLevel,
          weaponRank: randomConstruct
            ? random(1, constructLevel)
            : constructLevel,
          armorRank: randomConstruct
            ? random(1, constructLevel)
            : constructLevel,
        })
      );
  }

  dgs.army.freeZone.force = constructForce();
  Object.values(dgs.army.zonesDefense).forEach(
    (zf) => (zf.force = constructForce())
  );
  dgs.army.liberationUnits = {
    eagles: {
      name: "Eagles",
      force: constructForce(),
      protocol: { type: BATTLE.DEFAULT_PROTOCOL },
    },
    lions: {
      name: "Lions",
      force: constructForce(),
      protocol: { type: BATTLE.DEFAULT_PROTOCOL },
    },
  };

  //Resources
  dgs.resources.storedPrevTempo = {
    [REK.NAMES.DLOGS]: 45,
    [REK.NAMES.FOOD]: 35,
    [REK.NAMES.MATERIALS]: 30,
  };
  dgs.resources.stored = {
    [REK.NAMES.DLOGS]: 35,
    [REK.NAMES.FOOD]: 35,
    [REK.NAMES.MATERIALS]: 20,
  };

  //Equipment

  // dgs.equipment.stored[EQK.TYPES.WEAPON]["1"] = 3;
  // dgs.equipment.stored[EQK.TYPES.ARMOR]["1"] = 3;

  // prettier-ignore
  for (let i = 1; i <= 10; i++) {
    dgs.equipment.stored[EQK.TYPES.ARMOR][i] = random(0, 2);
    // dgs.equipment.orders[EQK.TYPES.ARMOR][i] = random(0, 10);
  }
  //prettier-ignore
  for (let i = 1; i <= 10; i++){
    dgs.equipment.stored[EQK.TYPES.WEAPON][i] = random(0, 2);
    // dgs.equipment.orders[EQK.TYPES.WEAPON][i] = random(0, 10);
  }

  return dgs;
})();

/** General State types
 * @typedef GeneralState
 * @property {ArmyState} army Current force and protocol of each active zone, liberation unit and the free zone.
 * battle
 * @property {AllBuildingsState} buildings Current level and status flags of each building.
 * @property {EquipmentState} equipment Currently stored and ordered equipment, each by type and rank.
 * @property {InterfaceState} interface Current state of the parts of the interface.
 * @property {InvasionState} invasion Current defense state of each zone, liberations attempts and occupations.
 * @property {MiscellaneousState} miscellaneous Current state of miscellanous ambits
 * @property {PopulationState} population Current amount of people of each occupation.
 * @property {ResourcesState} resources Current amount of each resource.
 * @property {TechnologiesState} technologies Current state of research.
 */

/** Army State types
 * @typedef ArmyState
 * @property {number} soldierCreationCounter Saves the number of the last created soldier.
 * @property {{[activeZoneKey: string]: ZoneDefenseState}} zonesDefense Current defense force and protocol of each zone.
 * @property {{[unitKey: string]: LiberationUnitState}} liberationUnits Current name, force and protocol of every liberation unit. The name is converted to camelCase and used as the unit's key.
 * @property {FreeZoneState} freeZone Current free force (force in the free zone) and other values.
 *
 * @typedef ZoneDefenseState
 * @property {Array<SoldierState>} force Current defense force of the zone.
 * @property {RetreatProtocolState} protocol Current battle protocol of the defense force of the zone.
 *
 * @typedef LiberationUnitState
 * @property {string} name Current name of the unit. The `unitKey` is always this in camelCase.
 * @property {Array<SoldierState>} force Current force of the unit.
 * @property {RetreatProtocolState} protocol Current battle protocol of the unit.
 *
 * @typedef FreeZoneState
 * @property {Array<SoldierState>} force Current force in the free zone, or free force.
 *
 * @typedef SoldierState
 * @property {number} number The soldier indentifier.
 * @property {SoldierCombatExperience} ce The current combat experience level and progress of the soldier.
 * @property {SoldierGear} gear The ranks of the weapon and armor currently equipped by the soldier.
 *
 * @typedef SoldierCombatExperience
 * @property {number} level The current level of Combat Experience.
 * @property {number} progress The current progress until the next level of Combat Experience.
 *
 * @typedef SoldierGear
 * @property {number} weaponRank The rank of the weapon currently equipped by a soldier.
 * @property {number} armorRank The rank of the armor currently equipped by a soldier.
 */

/** Battle State types
 * (under construction)
 *
 * @typedef {Object} RetreatProtocolState
 * @property {string} type The type of the Protocol.
 * @property {number} amount The amount left of the selected type that triggers a retreat.
 */

/** Buildings State types
 * @typedef {{[buildingKey: string]: BuildingState}} AllBuildingsState
 *
 * @typedef BuildingState
 * @property {number} level Current level of the building.
 * @property {boolean} upgrading If the building is currently being upgraded.
 * @property {boolean} occupantsBillPaid Current state of payment of the occupants bill for the use of the building.
 */

/** Equipment State types
 * @typedef EquipmentState
 * @property {OrderedEquipmentState} stored Currently stored equipment by type and rank.
 * @property {OrderedEquipmentState} orders Current orders of equipment by type and rank.
 *
 * @typedef {{ [equipmentType: string]: EquipmentSet }} OrderedEquipmentState
 *
 * @typedef {{[rank: string]: number}} EquipmentSet A list of Ranks and their current amount of equipment.
 */

/** Interface State types
 * @typedef InterfaceState
 * @property {{menu: string, subMenu: string}} visibleMenu Currently shown menu and subMenu, if any.
 * @property {{[menuKey: string]: {[sectionKey: string]: boolean}}} shownSummarySections The currently shown summary sections of each menu.
 */

/** Invasion State types
 * @typedef InvasionState
 * @property {InvasionDefenseState} defense Current state of the outpost defense.
 * @property {LiberationsState} liberations Current state of liberation attempts.
 * @property {OccupationsState} occupations Current state of occupied zones.
 *
 * @typedef InvasionDefenseState
 * @property { Array<SoldierState> } fullInvasionForce Full invaders force.
 * @property {{ [activeZoneKey: string]: number }} risks Current risk of being attacked of each active zone.
 * @property {Array<string>} dangerZones Current zones likely to be attacked.
 * @property {{ [attackedZoneKey: string]: AttackState }} attacks Current attack state of each attacked zone.
 *
 * @typedef AttackState
 * @property {{ force: Array<SoldierState>, protocol: RetreatProtocolState }} enemyDivision The current enemy division attacking this zone.
 * @property {any} results The attack results and details
 *
 * @typedef {{ [tarketZoneKey: string]: LiberationAttemptState }} LiberationsState
 * @typedef {any} LiberationAttemptState
 *
 * @typedef {{ [occupiedZoneKey: string]: OccupiedZoneState }} OccupationsState
 * @typedef {any} OccupiedZoneState
 */

/** Miscellaneous State types
 * @typedef MiscellaneousState
 * @property {number} tempo Current tempo number.
 * @property {string} stage Current stage of the current tempo.
 * @property {GeneralState} previousGS The previous GS saved for undo.
 * @property {any} tempState The temporal state of the current stage that will be used to update the GS when saving, and also to prevent state from changing on-refresh.
 */

/** Population State types
 * @typedef PopulationState
 * @property {{ [occupationKey: string]: number, total: number }} count Current amount of people of each occupation and the total.
 * @property {{ [level: string]: number }} recruitsLevels The ordered levels of the recruits.
 */

/** Resources State types
 * @typedef ResourcesState
 * @property {{ [resourceKey: string]: number }} stored Current stored amount of each resource.
 * @property {{ [resourceKey: string]: number }} storedPrevTempo The stored amount of each resource at the end of the previous tempo.
 */

/** Technologies State types
 * @typedef TechnologiesState
 * @property {number} researchPoints Current amount of remaining research points.
 * @property {ResearchTreeState} tree Current state of research.
 *
 * @typedef {{ [categoryKey: string]: { [columnKey: string]: Array<TechnologyState> } }} ResearchTreeState
 *
 * @typedef TechnologyState
 * @property {boolean} researched Current state of research of this technology.
 */
