/* ==== Invasion Values ====
All values related to invasion and enemies: risks, attacks, scouting, generation of enemy
soldiers and forces, occupations, etc...

These are general values and keys, meaning they are used in multiple and spread places (stages, state and/or static).
Local-use values and keys are defined where they are used. 
*/

export const KEYS = {
  RISK_LEVELS: {
    EMERGENCY: "emergency",
    DANGER: "danger",
    WARNING: "warning",
    CAUTION: "caution",
    MINOR_THREAT: "minorThreat",
    PEACEFUL: "peaceful",
  },
};

/**Amount of _simultaneous_ occupations to declare the game over. */
export const OCCUPATIONS_TO_LOSE = 4;

/**Discrete risk levels for users.
 * **WARNING**: These must be ordered from the highest `minRisk` to the lowest! */
//prettier-ignore
export const RISKS_LEVELS = {
  [KEYS.RISK_LEVELS.EMERGENCY]: { minRisk: 80, name: "Emergency", color: "red" },
  [KEYS.RISK_LEVELS.DANGER]: { minRisk: 50, name: "Danger", color: "orange" },
  [KEYS.RISK_LEVELS.WARNING]: { minRisk: 25, name: "Warning", color: "olive" },
  [KEYS.RISK_LEVELS.CAUTION]: { minRisk: 10, name: "Caution", color: "yellow" },
  [KEYS.RISK_LEVELS.MINOR_THREAT]: { minRisk: 1, name: "Minor Threat", color: "lightgreen" },
  [KEYS.RISK_LEVELS.PEACEFUL]: { minRisk: 0, name: "Peaceful", color: "gray" },
};
