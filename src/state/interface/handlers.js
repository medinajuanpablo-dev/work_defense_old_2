import defaultState from "../defaultState";

/**
 * @param {import("../defaultState").InterfaceState} prevState
 * @param {import("../defaultState").InterfaceState} newState
 */
function getHandlers(prevState, newState) {
  return {
    defaultEverything() {
      newState.generalMenus = defaultState.interface.generalMenus;
      return newState;
    },

    //

    setSummarySectionVisibility({ menuKey, sectionKey, visible }) {
      newState.shownSummarySections[menuKey][sectionKey] = visible;
      return newState;
    },

    setVisibleMenu({ menuKey }) {
      newState.visibleMenu = { menu: menuKey, subMenu: null };
      return newState;
    },
    setVisibleSubMenu({ subMenuKey }) {
      newState.visibleMenu.subMenu = subMenuKey;
      return newState;
    },
  };
}

export default getHandlers;
