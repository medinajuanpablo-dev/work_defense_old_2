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
  };
}

export default getHandlers;
