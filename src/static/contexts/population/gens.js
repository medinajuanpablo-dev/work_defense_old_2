/* ==== Population Values ====
These are general values and keys, meaning they are used in multiple and spread places (stages, state and/or static).
Local-use values and keys are defined where they are used. 
*/

export const KEYS = {
  OCCS: {
    FREE: "free",
    REASSIGNED: "reassigned",
    FARMER: "farmer",
    MINER: "miner",
    RECRUIT: "recruit",
    SOLDIER: "soldier",
  },
};

//You may freely add occupations to any category, but adding a new category requires changing the ops and the state code.

/**Civilian population currently producing resources */
export const WORKER_OCCS = {
  [KEYS.OCCS.FARMER]: { SINGULAR: "Farmer", PLURAL: "Farmers" },
  [KEYS.OCCS.MINER]: { SINGULAR: "Miner", PLURAL: "Miners" },
};

/**Civilian population currently being processed for something */
export const PROCESS_OCCS = {
  [KEYS.OCCS.REASSIGNED]: { SINGULAR: "Reassigned", PLURAL: "Reassigned" },
  [KEYS.OCCS.RECRUIT]: { SINGULAR: "Recruit", PLURAL: "Recruits" },
};

/**Civilian population doing nothing */
export const FREE_OCC = { SINGULAR: "Free", PLURAL: "Free" };

/**Military population */
export const MILITARY_OCCS = {
  [KEYS.OCCS.SOLDIER]: { SINGULAR: "Soldier", PLURAL: "Soldiers" },
};

/**Keys of all occupations considered civilian. */
export const CIVILIAN_OCCS_KEYS = [
  KEYS.OCCS.FREE,
  ...Object.keys(WORKER_OCCS),
  ...Object.keys(PROCESS_OCCS),
];
