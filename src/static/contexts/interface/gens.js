/* ==== Interface Values ====
All values related to the interface in a wide way: such as breakpoint widths, general sizes, and multiple
other wide-use values.

These are general values and keys, meaning they are used in multiple and spread places (stages, state and/or static).
Local-use values and keys are defined where they are used. 
*/

export const KEYS = {
  MENUS: {
    POPULATION: "population",
    BUILDINGS: "buildings",
    RESOURCES: "resources",
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
};

// export const MENUS_NAMES = {
//   [KEYS.MENUS.POPULATION]: "Population",
//   [KEYS.MENUS.BUILDINGS]: "Buildings",
//   [KEYS.MENUS.RESOURCES]: "Resources",
// };

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
