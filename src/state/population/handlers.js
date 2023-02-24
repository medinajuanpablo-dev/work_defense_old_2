/**
 * @param {import("../defaultState").PopulationState} prevState
 * @param {import("../defaultState").PopulationState} newState
 */
function getHandlers(prevState, newState) {
  return {
    anihilation() {
      for (let occKey in newState.count) newState.count[occKey] = 0;
      return newState;
    },

    clearRecruitsLevels() {
      newState.recruitsLevels = {};
      return newState;
    },

    //

    addOccupationPeople({ occupationKey, amount }) {
      newState.count[occupationKey] += amount;
      newState.count.total += amount;
      return newState;
    },

    removeOccupationPeople({ occupationKey, amount }) {
      newState.count[occupationKey] -= amount;
      newState.count.total -= amount;
      return newState;
    },

    setOccupationPeople({ occupationKey, amount }) {
      const difference = amount - newState.count[occupationKey];

      newState.count[occupationKey] = amount;
      newState.count.total += difference;
      return newState;
    },

    setRecruitsLevels({ recruitsLevels }) {
      newState.recruitsLevels = recruitsLevels;
      return newState;
    },
  };
}

export default getHandlers;
