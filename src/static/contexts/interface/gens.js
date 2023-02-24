/* ==== Interface Values ====
All values related to the interface in a wide way: such as breakpoint widths, general sizes, and multiple
other wide-use values.

These are general values and keys, meaning they are used in multiple and spread places (stages, state and/or static).
Local-use values and keys are defined where they are used. 
*/

import {} from "../miscellaneous";

export const KEYS = {
  MENUS: {
    POPULATION: "population",
    BUILDINGS: "buildings",
    RESOURCES: "resources",
  },

  SUB_MENUS: {
    ARMY_LIST: "armyList",
    ARMOR_DETAILS: "armorDetails",
    WEAPONS_DETAILS: "weaponsDetails",
  },

  BREAKPOINTS: {
    MONITOR: "monitor",
    WIDE_LAPTOP: "wideLaptop",
    LAPTOP: "laptop",
    HORIZONTAL_TABLET: "horizontalTablet",
    VERTICAL_TABLET: "verticalTablet",
    PHONE: "phone",
    SMALL_PHONE: "smallPhone",
  },

  NOTIFICATION_TYPES: {
    EMERGENCY: "emergency",
    DANGER: "danger",
    WARNING: "warning",
    FINE: "fine",
    INFO: "info",
  },

  //Keys for capacity status for the currently stored amount.
  CAPACITY_STATUS: {
    FINE: "fine",
    NEAR_MAX: "nearMax",
    ALMOST_MAXED: "almostMaxed",
    MAXED: "maxed",
  },

  //Keys for capacity status after some production is completed.
  AFTER_CAPACITY_STATUS: {
    SAFELY_STORABLE: "safelyStorable",
    BARELY_STORABLE: "barelyStorable",
    MOST_STORABLE: "mostStorable",
    NOT_STORABLE: "notStorable",
  },
};

/**Width Pixels of each breakpoint */
export const BREAKPOINTS_WIDTHS = {
  [KEYS.BREAKPOINTS.MONITOR]: 1500,
  [KEYS.BREAKPOINTS.WIDE_LAPTOP]: 1280,
  [KEYS.BREAKPOINTS.LAPTOP]: 1024,
  [KEYS.BREAKPOINTS.HORIZONTAL_TABLET]: 768,
  [KEYS.BREAKPOINTS.VERTICAL_TABLET]: 500,
  [KEYS.BREAKPOINTS.PHONE]: 350,
  [KEYS.BREAKPOINTS.SMALL_PHONE]: 0,
};

/**The amount of miliseconds the scroll to the top lasts when doing it automatically. */
export const SCROLL_TO_TOP_DURATION = 500;

/**Indicators used in a lot of places to style capacity warnings. */
//prettier-ignore
export const CAPACITY_INDICATORS = [
  //"fine" is doesn't have an indicator, it's the default styles.
  { key: "maxed", directive: "mx", condition: p => p.status == KEYS.CAPACITY_STATUS.MAXED },
  { key: "nearMax", directive: "nmx", condition: p => p.status == KEYS.CAPACITY_STATUS.NEAR_MAX },
  { key: "almostMaxed", directive: "amx", condition: p => p.status == KEYS.CAPACITY_STATUS.ALMOST_MAXED },
]

/**Similar to CAPACITY_INDICATORS, used to style capacity warnings but AFTER production is completed. */
//prettier-ignore
export const AFTER_CAPACITY_INDICATORS = [
  //"safelyStorable" doesn't have an indicator, it's the default styles.
  { key: "barelyStorable", directive: "bs", condition: p => p.status == KEYS.AFTER_CAPACITY_STATUS.BARELY_STORABLE },
  { key: "mostStorable", directive: "ms", condition: p => p.status == KEYS.AFTER_CAPACITY_STATUS.MOST_STORABLE },
  { key: "notStorable", directive: "ns", condition: p => p.status == KEYS.AFTER_CAPACITY_STATUS.NOT_STORABLE },
]
