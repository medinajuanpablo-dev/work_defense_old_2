/* ==== Technologies Values ====
These are general values and keys, meaning they are used in multiple and spread places (stages, state and/or static).
Local-use values and keys are defined where they are used. 
*/

export const KEYS = {
  CATEGORIES: {
    ECONOMIC: "economic",
    MILITARY: "military",
  },

  COLUMNS: {
    PRODUCTION: "production",
    CAPITALISM: "capitalism",
    CONTROL: "control",
    WAR: "war",
  },

  STATUS: {
    RESEARCHED: "researched",
    AVAILABLE: "available",
    LOCKED: "locked",
  },
};

/**Amount of Research Points spent for aquiring a new technology. */
export const RESEARCH_COST = 1;

/**Name of each technology column. */
export const COLUMNS = {
  [KEYS.COLUMNS.PRODUCTION]: { NAME: "Production", CATEGORY_KEY: "Economic" },
  [KEYS.COLUMNS.CAPITALISM]: { NAME: "Capitalism", CATEGORY_KEY: "Economic" },
  [KEYS.COLUMNS.CONTROL]: { NAME: "Control", CATEGORY_KEY: "Military" },
  [KEYS.COLUMNS.WAR]: { NAME: "War", CATEGORY_KEY: "Military" },
};

/**Name of each technology category. */
export const CATEGORIES_NAMES = {
  [KEYS.CATEGORIES.ECONOMIC]: "Economic",
  [KEYS.CATEGORIES.MILITARY]: "Military",
};

/**Tree of technologies by category and then by column. Although the categories and columns are referred by key,
 * the technologies themselves are accessed by index within their column. */
//prettier-ignore
export const TREE = {
  [KEYS.CATEGORIES.ECONOMIC]: {
    [KEYS.COLUMNS.PRODUCTION]: [
      {
        NAME: "Supplied",
        DESCRIPTION: "+50% of final capacity for all resources storage.",
      },
      {
        NAME: "Rations",
        DESCRIPTION: "-35% of workers mantainment.",
      },
      {
        NAME: "Crops Efficiency",
        DESCRIPTION: "Doubled final farmers efficiency",
      },
      {
        NAME: "Soil Measurement",
        DESCRIPTION: "Doubled final miners efficiency",
      },
      {
        NAME: "Devoted Farmers",
        DESCRIPTION: "Farmers live in their own farms, therefore don't need houses.",
      },
      {
        NAME: "Self-sufficient Farmers",
        DESCRIPTION: "Farmers eat from their own farms, therefore don't need mantainment.",
      },
    ],
    [KEYS.COLUMNS.CAPITALISM]: [
      {
        NAME: "Efficiency",
        DESCRIPTION: "+50% of final Dlogs produced in every Sess.",
      },
      {
        NAME: "Recycling",
        DESCRIPTION: "All buildings upgrades cost -25%.",
      },
      {
        NAME: "Plannification",
        DESCRIPTION: "+50% of final Dlogs produced in every Sess.",
      },
      {
        NAME: "Master Craftmen",
        DESCRIPTION: "All equipment fabrication cost -25%.",
      },
      {
        NAME: "Investment",
        DESCRIPTION: "10% of the total produced resources amount is added as Dlogs too.",
      },
      {
        NAME: "Assets",
        DESCRIPTION: "10% of the total produced resources amount is added as Dlogs too.",
      },
    ],
  },
  [KEYS.CATEGORIES.MILITARY]: {
    [KEYS.COLUMNS.CONTROL]: [
      {
        NAME: "Scouting Plans",
        DESCRIPTION: "+25% of final quality for all scouting expeditions.",
      },
      {
        NAME: "Sentinnels",
        DESCRIPTION: "Initial risks are more focused on fewer zones.",
      },
      {
        NAME: "Bribery",
        DESCRIPTION: "Enemies in occupied zones can be bribed to hold buildings destruction for another tempo. The bribe price depends of the occupant force power.",
      },
      {
        NAME: "Emergency Call",
        DESCRIPTION: "A Liberation Unit can be emergency-added into the defense force of an attacked zone just before the attack. This dissolves the unit.",
      },
      {
        NAME: "Scouting Expertise",
        DESCRIPTION: "Doubles the final quality for all scouting expeditions. This does NOT stack with Scouting Plans.",
      },
      {
        NAME: "Distraction Sacrifice",
        DESCRIPTION: "Paying a certain cost of Dlogs and people, an attack can be redirected to an arbitrary zone. This can be used once per tempo and people used for the distraction is lost.",
      },
    ],
    [KEYS.COLUMNS.WAR]: [
      {
        NAME: "Veteran Teaching",
        DESCRIPTION: "All soldiers graduate with 25% more Combat Experience.",
      },
      {
        NAME: "More Offensive",
        DESCRIPTION: "Two Liberation Units can be formed.",
      },
      {
        NAME: "Training Efficiency",
        DESCRIPTION: "Soldiers cost -33% to train.",
      },
      {
        NAME: "Unlimited Offensive",
        DESCRIPTION: "Both Liberation Units are free to form.",
      },
      {
        NAME: "Team Work",
        DESCRIPTION: "Every soldier in a zone gain 2% of Combat Experience for each soldier in the same zone. Works for defense only. This buff is lost and re-calculated after reassignation.",
      },
      {
        NAME: "Fast Learners",
        DESCRIPTION: "All soldiers gain +50% of Combat Experience in the Learning Stage.",
      },
    ],
  },
};
