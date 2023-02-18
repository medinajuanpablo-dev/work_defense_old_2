import { mapValues } from "lodash";

export const STATE_NAME = "Misc";

//prettier-ignore
export const TYPES = mapValues({ 
    
  STAGE_BACKWARDS: 0, STAGE_FORWARD: 0, TO_FIRST: 0, TO_LAST: 0, NOTHING: 0, //Simple Actions

  TO_STAGE: 0, ADVANCE_STAGES: 0, //Parameterized Actions

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}`);

//prettier-ignore
export const PREVIOUS_GS_TYPES = mapValues(
  {
    SAVE: 0, LOAD: 0, DELETE: 0, //Simple Actions
  },
  (v, k) => `PREVIOUS_GS_${k}`
);

/**@type {MiscellaneousActions} */
const ACTION_CREATORS = {
  stageBackwards: () => ({ type: TYPES.STAGE_BACKWARDS }),
  stageForward: () => ({ type: TYPES.STAGE_FORWARD }),
  toFirst: () => ({ type: TYPES.TO_FIRST }),
  toLast: () => ({ type: TYPES.TO_LAST }),
  nothing: () => ({ type: TYPES.NOTHING }),

  saveState: () => ({ type: PREVIOUS_GS_TYPES.SAVE }),
  loadState: () => ({ type: PREVIOUS_GS_TYPES.LOAD }),
  deleteSavedState: () => ({ type: PREVIOUS_GS_TYPES.DELETE }),

  toStage: (stageKey) => ({
    type: TYPES.TO_STAGE,
    params: { stageKey },
  }),
  advanceStages: (number) => ({
    type: TYPES.ADVANCE_STAGES,
    params: { number },
  }),
};

export default ACTION_CREATORS;

/**
 * @typedef MiscellaneousActions
 * @property {() => any} stageBackwards Move to the previous stage.
 * @property {() => any} stageForward Move to the next stage.
 * @property {() => any} toFirst Move to the first stage.
 * @property {() => any} toLast Move to the last stage.
 * @property {() => any} nothing Does absolutely nothing.
 * @property {() => any} saveState Saves the current general state as the previous general state.
 * @property {() => any} loadState Sets the previous general state as the current general state.
 * @property {() => any} deleteSavedState Deletes all the saved previous general state.
 * @property {(stageKey: string) => any} toStage Move to the specified stage.
 * @property {(number: number) => any} advanceStages Advance the specified number of stages. This is cyclical.
 */
