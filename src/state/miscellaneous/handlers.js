import { cloneDeep } from "lodash";

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

/**
 * @param {import("../defaultState").GeneralState} newGeneralState
 */
export function getPreviousGSHandlers(previousGeneralState, newGeneralState) {
  return {
    saveState() {
      const previousGeneralState = cloneDeep(newGeneralState); //Clone the current GeneralState.
      newGeneralState.miscellaneous.previousGS = previousGeneralState; //Set it as the PreviousGeneralState.

      checkPreviousGSDeepness(newGeneralState.miscellaneous.previousGS, 1); //If deepness is the maximum, remove the deepest previousGS.

      return newGeneralState;
    },

    loadState() {
      if (!newGeneralState.miscellaneous.previousGS) return newGeneralState;
      return newGeneralState.miscellaneous.previousGS;
    },

    deleteSavedState() {
      newGeneralState.miscellaneous.previousGS = null;
      return newGeneralState;
    },
  };
}

function checkPreviousGSDeepness(previousGS, deepness) {
  //If reached the deepest without reaching the max depth, just return.
  if (!previousGS) return;

  //If reached the maximum depth, remove the previousGS.
  if (deepness == MISC.PREVIOUS_GS_MAX_DEEPNESS)
    previousGS.miscellaneous.previousGS = null;
  //Else, go deeper.
  else
    checkPreviousGSDeepness(previousGS.miscellaneous.previousGS, deepness + 1);
}

export default getHandlers;
