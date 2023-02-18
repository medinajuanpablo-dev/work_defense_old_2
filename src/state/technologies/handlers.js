import { TECHS } from "@static/contexts/technologies";

/**
 * @param {import("../defaultState").TechnologiesState} prevState
 * @param {import("../defaultState").TechnologiesState} newState
 */
function getHandlers(prevState, newState) {
  return {
    allUnresearched() {
      for (let category of Object.values(newState.tree))
        for (let column of Object.values(category))
          for (let tech of column) tech.researched = false;

      return newState;
    },

    allResearched() {
      for (let category of Object.values(newState.tree))
        for (let column of Object.values(category))
          for (let tech of column) tech.researched = true;

      return newState;
    },

    emptyPoints() {
      newState.researchPoints = 0;
      return newState;
    },

    addCostPoints() {
      newState.researchPoints += TECHS.RESEARCH_COST;
      return newState;
    },

    removeCostPoints() {
      newState.researchPoints -= TECHS.RESEARCH_COST;
      return newState;
    },

    //

    categoryResearched({ categoryKey }) {
      for (let column of Object.values(newState.tree[categoryKey]))
        for (let tech of column) tech.researched = true;

      return newState;
    },

    categoryUnresearched({ categoryKey }) {
      for (let column of Object.values(newState.tree[categoryKey]))
        for (let tech of column) tech.researched = false;

      return newState;
    },

    columnResearched({ columnKey }) {
      for (let tech of newState.tree[TECHS.COLUMNS[columnKey].CATEGORY_KEY][
        columnKey
      ])
        tech.researched = true;

      return newState;
    },

    columnUnresearched({ columnKey }) {
      for (let tech of newState.tree[TECHS.COLUMNS[columnKey].CATEGORY_KEY][
        columnKey
      ])
        tech.researched = false;

      return newState;
    },

    research({ columnKey }) {
      for (let tech of newState.tree[TECHS.COLUMNS[columnKey].CATEGORY_KEY][
        columnKey
      ])
        if (!tech.researched) {
          tech.researched = true;
          break;
        }

      return newState;
    },

    unresearch({ columnKey }) {
      const reversedColumnState = [
        ...newState.tree[TECHS.COLUMNS[columnKey].CATEGORY_KEY][columnKey],
      ].reverse(); //Reverse mutates the array, so we make a shallow copy.

      for (let tech of reversedColumnState)
        if (tech.researched) {
          tech.researched = false;
          break;
        }

      return newState;
    },

    addPoints({ amount }) {
      newState.researchPoints += amount;
      return newState;
    },

    removePoints({ amount }) {
      newState.researchPoints -= amount;
      return newState;
    },

    setPoints({ points }) {
      newState.researchPoints = points;
      return newState;
    },
  };
}

export default getHandlers;
