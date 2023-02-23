/* ==== Miscellaneous Values ====
All values related to multiple contexts or any of them. 

These are general values and keys, meaning they are used in multiple and spread places (stages, state and/or static).
Local-use values and keys are defined where they are used. 
*/

export const KEYS = {
  STAGES: {
    DAWN: "dawn",
    PRODUCTION: "production",
    MANTAINMENT: "mantainment",
    OCCUPATIONS: "occupations",
    IMMIGRATION: "immigration",
    CONSTRUCTIONS_END: "constructionsEnd",
    EMPLOYMENT: "employment",
    BUILD: "build",
    RESEARCH: "research",
    ENLISTMENT: "enlistment",
    EQUIPMENT: "equipment",
    FABRICATION: "fabrication",
    RECRUITMENT: "recruitment",
    SIGHTING: "sighting",
    SCOUTING: "scouting",
    REASSIGNATION: "reassignation",
    OFFENSIVE: "offensive",
    ALARM: "alarm",
    DEFENSE: "defense",
    LIBERATION: "liberation",
    DEFENSE_RESULTS: "defenseResults",
    LIBERATION_RESULTS: "liberationResults",
    LEARNING: "learning",
  },

  ZONES: {
    COMMAND: "command",
    RECRUITMENT: "recruitment",
    FARMING: "farming",
    ARMAMENT: "armament",
    MINING: "mining",
    RESIDENTIAL: "residential",
    STORAGE: "storage",
    COMMERCE: "commerce",
    EXPEDITION: "expedition",
    FREE_ZONE: "freeZone",
  },

  SAVE_MOMENTS: {
    STAGE: "stage",
    TEMPO: "tempo",
  },
};

/**The amount of previous general states that can be saved recursively. This doesn't include the current gs. */
export const PREVIOUS_GS_MAX_DEEPNESS = 1;

/**Name of each zone. */
export const ACTIVE_ZONES = {
  [KEYS.ZONES.COMMAND]: "Command",
  [KEYS.ZONES.COMMERCE]: "Commerce",
  [KEYS.ZONES.EXPEDITION]: "Expedition",
  [KEYS.ZONES.FARMING]: "Farming",
  [KEYS.ZONES.MINING]: "Mining",
  [KEYS.ZONES.RECRUITMENT]: "Recruitment",
  [KEYS.ZONES.RESIDENTIAL]: "Residential",
  [KEYS.ZONES.STORAGE]: "Storage",
  [KEYS.ZONES.ARMAMENT]: "Armament",
};

export const FREE_ZONE_NAME = "Free Zone";

/**Name of each stage.
 * WARNING: MUST be ordered chronologically.
 */
export const ORDERED_STAGES = {
  // [KEYS.STAGES.DAWN]: "Dawn",
  // [KEYS.STAGES.PRODUCTION]: "Production",
  // [KEYS.STAGES.MANTAINMENT]: "Mantainment",
  // [KEYS.STAGES.DESTRUCTION]: "Destruction",
  [KEYS.STAGES.IMMIGRATION]: "Immigration",
  [KEYS.STAGES.CONSTRUCTIONS_END]: "Constructions End",
  [KEYS.STAGES.EMPLOYMENT]: "Employment",
  [KEYS.STAGES.BUILD]: "Build",
  [KEYS.STAGES.RESEARCH]: "Research",
  [KEYS.STAGES.ENLISTMENT]: "Enlistment",
  [KEYS.STAGES.EQUIPMENT]: "Equipment",
  [KEYS.STAGES.FABRICATION]: "Fabrication",
  [KEYS.STAGES.RECRUITMENT]: "Recruitment",
  // [KEYS.STAGES.SIGHTING]: "Sighting",
  // [KEYS.STAGES.SCOUTING]: "Scouting",
  // [KEYS.STAGES.REASSIGNATION]: "Reassignation",
  // [KEYS.STAGES.OFFENSIVE]: "Offensive",
  // [KEYS.STAGES.ALARM]: "Alarm",
  // [KEYS.STAGES.DEFENSE]: "Defense",
  // [KEYS.STAGES.LIBERATION]: "Liberation",
  // [KEYS.STAGES.DEFENSE_RESULTS]: "Defense Results",
  // [KEYS.STAGES.LIBERATION_RESULTS]: "Liberation Results",
  // [KEYS.STAGES.LEARNING]: "Learning",
};

/**Numbers of the zones adjacent to a certain zone. Each zone is a row. */
export const ADJACENT_ZONES = [
  [],
  [2, 5, 4],
  [1, 3, 4, 5, 6],
  [2, 5, 6],
  [1, 2, 5, 8, 7],
  [1, 2, 3, 4, 6, 7, 8, 9],
  [2, 3, 5, 8, 9],
  [4, 5, 8],
  [7, 4, 5, 6, 9],
  [8, 5, 6],
];
