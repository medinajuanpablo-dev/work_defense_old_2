/**
 * @param {import("../defaultState").AllBuildingsState} prevState
 * @param {import("../defaultState").AllBuildingsState} newState
 */
function getHandlers(prevState, newState) {
  return {
    allZero() {
      for (let buildingKey in newState) newState[buildingKey].level = 0;
      return newState;
    },

    allLevelUp() {
      for (let buildingKey in newState) newState[buildingKey].level += 1;
      return newState;
    },

    allLevelDown() {
      for (let buildingKey in newState) newState[buildingKey].level -= 1;
      return newState;
    },

    allPaid() {
      for (let buildingKey in newState)
        newState[buildingKey].occupantsBillPaid = true;
      return newState;
    },

    allUnpaid() {
      for (let buildingKey in newState)
        newState[buildingKey].occupantsBillPaid = false;
      return newState;
    },

    //

    setLevel({ buildingKey, level }) {
      newState[buildingKey].level = level;
      return newState;
    },

    levelUp({ buildingKey }) {
      newState[buildingKey].level += 1;
      return newState;
    },

    levelDown({ buildingKey }) {
      newState[buildingKey].level -= 1;
      return newState;
    },

    payBill({ buildingKey }) {
      newState[buildingKey].occupantsBillPaid = true;
      return newState;
    },

    unpayBill({ buildingKey }) {
      newState[buildingKey].occupantsBillPaid = false;
      return newState;
    },
  };
}

export default getHandlers;
