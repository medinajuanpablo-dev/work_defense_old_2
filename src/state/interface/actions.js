import { mapValues } from "lodash";

export const STATE_NAME = "Interface";

//prettier-ignore
export const TYPES = mapValues({ 
    
  DEFAULT_EVERYTHING: 0, //Simple Actions

  SHOW_SUMMARY_SECTION: 0, HIDE_SUMMARY_SECTION: 0, //Parameterized Actions

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {InterfaceActions} */
const ACTION_CREATORS = {
  defaultEverything: () => ({ type: TYPES.DEFAULT_EVERYTHING }),

  showSummarySection: (sectionKey) => ({
    type: TYPES.SHOW_SUMMARY_SECTION,
    params: { sectionKey },
  }),
  hideSummarySection: (sectionKey) => ({
    type: TYPES.HIDE_SUMMARY_SECTION,
    params: { sectionKey },
  }),
};

export default ACTION_CREATORS;

/**
 * @typedef InterfaceActions
 * @property {() => any} defaultEverything Sets all interface state to default values.
 * @property {(sectionKey: string) => any} showSummarySection Sets the specified section of a general menu's summary, as visible.
 * @property {(sectionKey: string) => any} hideSummarySection Sets the specified section of a general menu's summary, as hidden.
 */
