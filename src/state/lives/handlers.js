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
    anihilate() {
      newState.count = 0;
      return newState;
    },

    //

    die({ amount }) {
      newState.count -= amount;
      return newState;
    },

    live({ amount }) {
      newState.count += amount;
      return newState;
    },
  };
}

export default getHandlers;
