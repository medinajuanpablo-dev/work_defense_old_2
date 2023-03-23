import { merge } from "lodash";

import defaultState from "@state/defaultState";

/**
 * @param {import("../defaultState").ResourcesState} prevState
 * @param {import("../defaultState").ResourcesState} newState
 */
function getHandlers(prevState, newState) {
  return {
    emptyAll() {
      for (let resourceKey in newState.stored) newState.stored[resourceKey] = 0;
      return newState;
    },
    saveAsPrev() {
      newState.storedPrevTempo = { ...newState.stored };
    },

    //

    addResource({ resourceKey, amount }) {
      newState.stored[resourceKey] += amount;
      return newState;
    },

    removeResource({ resourceKey, amount }) {
      newState.stored[resourceKey] -= amount;
      return newState;
    },

    setResource({ resourceKey, amount }) {
      newState.stored[resourceKey] = amount;
      return newState;
    },

    //

    clear() {
      return defaultState.resources;
    },

    replace({ newState: specifiedNewState }) {
      return specifiedNewState;
    },

    merge({ partialState }) {
      return merge(newState, partialState);
    },
  };
}

export default getHandlers;
