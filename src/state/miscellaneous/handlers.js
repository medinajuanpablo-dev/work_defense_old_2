import { capped, pickFurtherItem } from "@static/functions";

import { MISC } from "@static/contexts/miscellaneous";

//Ordered Stages Keys List
const OSKL = Object.keys(MISC.ORDERED_STAGES);

/**
 * @param {import("../defaultState").MiscellaneousState} prevState
 * @param {import("../defaultState").MiscellaneousState} newState
 */
function getHandlers(prevState, newState) {
  // const common = getCommonHandling(prevState, newState);

  return {
    stageBackwards() {
      const stageIndex = OSKL.indexOf(prevState.stage);
      const prevStageIndex = capped(stageIndex - 1, { min: 0 });
      newState.stage = OSKL[prevStageIndex];
      return newState;
    },

    stageForward() {
      const stageIndex = OSKL.indexOf(prevState.stage);
      const nextStageIndex = capped(stageIndex + 1, {
        max: OSKL.length - 1,
      });
      newState.stage = OSKL[nextStageIndex];
      return newState;
    },

    toFirst() {
      newState.stage = OSKL[0];
      return newState;
    },

    toLast() {
      newState.stage = OSKL.at(-1);
      return newState;
    },

    nothing() {
      return newState;
    },

    //

    toStage({ stageKey }) {
      newState.stage = stageKey;
      return newState;
    },

    advanceStages({ number }) {
      newState.stage = pickFurtherItem(OSKL, prevState.stage, number);
      return newState;
    },
  };
}

export default getHandlers;
