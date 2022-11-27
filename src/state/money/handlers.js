import { MONEY_STATE as MNK } from "@static/values/keys";

// function getCommonHandling (prevState, newState){
//   const add = (resourceKey, amount) => {
//     newState[resourceKey] = prevState[resourceKey] + amount;
//     return newState;
//   };

//   const drain = (resourceKey, amount) => {
//     newState[resourceKey] = prevState[resourceKey] - amount;
//     return newState;
//   };

//   return { add, drain };
// };

function getHandlers(prevState, newState) {
  // const common = getCommonHandling(prevState, newState);

  return {
    emptyMoney() {
      newState.current = 0;
      return newState;
    },

    freeze() {
      newState.state = MNK.FROZEN;
      return newState;
    },

    watch() {
      newState.state = MNK.WATCHED;
      return newState;
    },

    activate() {
      newState.state = MNK.FREE_USE;
      return newState;
    },

    //

    deposit({ amount }) {
      newState.current += amount;
      return newState;
    },

    withdraw({ amount }) {
      newState.current -= amount;
      return newState;
    },
  };
}

export default getHandlers;
