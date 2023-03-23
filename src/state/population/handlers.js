import { merge } from "lodash";

import defaultState from "@state/defaultState";

import { PPK } from "@static/contexts/population";

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

    clearRecruits() {
      newState.recruitsLevels = {};
      newState.count[PPK.OCCS.RECRUIT] = 0;
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

    setRecruits({ recruitsLevels }) {
      const newCount = Object.values(recruitsLevels).reduce(
        (acc, inLevel) => acc + inLevel
      );
      const difference = newCount - newState.count[PPK.OCCS.RECRUIT];

      newState.recruitsLevels = recruitsLevels;
      newState.count[PPK.OCCS.RECRUIT] = newCount;
      newState.count.total += difference;
      return newState;
    },

    //

    clear() {
      return defaultState.population;
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
