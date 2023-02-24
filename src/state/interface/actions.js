import { mapValues } from "lodash";

export const STATE_NAME = "Interface";

//prettier-ignore
export const TYPES = mapValues({ 
    
  DEFAULT_EVERYTHING: 0, //Simple Actions

  SET_SUMMARY_SECTION_VISIBILITY: 0, SET_VISIBLE_MENU: 0, SET_VISIBLE_SUB_MENU: 0  //Parameterized Actions

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {InterfaceActions} */
const ACTION_CREATORS = {
  defaultEverything: () => ({ type: TYPES.DEFAULT_EVERYTHING }),

  setSummarySectionVisibility: (menuKey, sectionKey, visible) => ({
    type: TYPES.SET_SUMMARY_SECTION_VISIBILITY,
    params: { menuKey, sectionKey, visible },
  }),
  setVisibleMenu: (menuKey) => ({
    type: TYPES.SET_VISIBLE_MENU,
    params: { menuKey },
  }),
  setVisibleSubMenu: (subMenuKey) => ({
    type: TYPES.SET_VISIBLE_SUB_MENU,
    params: { subMenuKey },
  }),
};

export default ACTION_CREATORS;

/**
 * @typedef InterfaceActions
 * @property {() => any} defaultEverything Sets all interface state to default values.
 * @property {(menuKey: string, sectionKey: string, visible: boolean) => any} setSummarySectionVisibility Sets the specified section of a general menu's summary visibility.
 * @property {(menuKey: string) => any} setVisibleMenu Sets the menu visible to show it.
 * @property {(subMenuKey: string) => any} setVisibleSubMenu Sets the submenu visible to show it.
 */
