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

    showSummarySection({ sectionKey }) {
      newState.generalMenus.summaryShowingSections.push(sectionKey);
      return newState;
    },

    hideSummarySection({ sectionKey }) {
      newState.generalMenus.summaryShowingSections.slice(
        newState.generalMenus.summaryShowingSections.indexOf(sectionKey),
        1
      );
      return newState;
    },
  };
}

export default getHandlers;
