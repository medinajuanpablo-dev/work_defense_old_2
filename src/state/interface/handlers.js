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
  };
}

export default getHandlers;
