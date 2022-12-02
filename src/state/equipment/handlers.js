/**
 * @param {import("../defaultState").EquipmentState} prevState
 * @param {import("../defaultState").EquipmentState} newState
 */
function getHandlers(prevState, newState) {
  return {
    emptyStorage() {
      for (let typeKey in newState.stored)
        for (let rank in newState.stored[typeKey])
          delete newState.stored[typeKey][rank];

      return newState;
    },

    cancelAllOrders() {
      for (let typeKey in newState.orders)
        for (let rank in newState.orders[typeKey])
          delete newState.orders[typeKey][rank];

      return newState;
    },

    finishAllOrders() {
      for (let typeKey in newState.orders)
        for (let rank in newState.orders[typeKey]) {
          newState.stored[typeKey][rank] =
            (newState.stored[typeKey][rank] || 0) +
            newState.orders[typeKey][rank];
          delete newState.orders[typeKey][rank];
        }

      return newState;
    },

    //

    emptyType({ typeKey }) {
      for (let rank in newState.stored[typeKey])
        delete newState.stored[typeKey][rank];

      return newState;
    },

    cancelTypeOrders({ typeKey }) {
      for (let rank in newState.orders[typeKey])
        delete newState.orders[typeKey][rank];

      return newState;
    },

    addToStorage({ typeKey, rank, amount }) {
      newState.stored[typeKey][rank] =
        (newState.stored[typeKey][rank] || 0) + amount;
      return newState;
    },

    removeFromStorage({ typeKey, rank, amount }) {
      newState.stored[typeKey][rank] -= amount;

      if (newState.stored[typeKey][rank] <= 0)
        delete newState.stored[typeKey][rank];

      return newState;
    },

    setStored({ typeKey, rank, amount }) {
      if (amount > 0) newState.stored[typeKey][rank] = amount;
      else delete newState.stored[typeKey][rank];

      return newState;
    },

    addOrder({ typeKey, rank, amount }) {
      newState.orders[typeKey][rank] = amount;
      return newState;
    },

    cancelOrder({ typeKey, rank }) {
      delete newState.orders[typeKey][rank];
      return newState;
    },

    finishOrder({ typeKey, rank }) {
      newState.stored[typeKey][rank] =
        (newState.stored[typeKey][rank] || 0) + newState.orders[typeKey][rank];
      delete newState.orders[typeKey][rank];
      return newState;
    },
  };
}

export default getHandlers;
