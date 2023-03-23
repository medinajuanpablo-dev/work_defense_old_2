import { mapValues } from "lodash";

export const STATE_NAME = "Misc";

//prettier-ignore
export const TYPES = mapValues({ 
    
  STAGE_BACKWARDS: 0, STAGE_FORWARD: 0, TO_FIRST: 0, TO_LAST: 0, NOTHING: 0, CLEAR_TEMP_STATE: 0, //Simple Actions

  TO_STAGE: 0, ADVANCE_STAGES: 0, REPLACE_TEMP_STATE: 0, MERGE_TEMP_STATE: 0,  //Parameterized Actions

  CLEAR: 0, REPLACE: 0, MERGE: 0,

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}`);

//prettier-ignore
export const PREVIOUS_GS_TYPES = mapValues({

  SAVE: 0, LOAD: 0, DELETE: 0, //Simple Actions
  
}, (v, k) => `PREVIOUS_GS_${k}`);

/**@type {MiscellaneousActions} */
const ACTION_CREATORS = {
  stageBackwards: () => ({ type: TYPES.STAGE_BACKWARDS }),
  stageForward: () => ({ type: TYPES.STAGE_FORWARD }),
  toFirst: () => ({ type: TYPES.TO_FIRST }),
  toLast: () => ({ type: TYPES.TO_LAST }),
  nothing: () => ({ type: TYPES.NOTHING }),
  clearTempState: () => ({ type: TYPES.CLEAR_TEMP_STATE }),

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
  replaceTempState: (newTempState) => ({
    type: TYPES.REPLACE_TEMP_STATE,
    params: { newTempState },
  }),
  mergeTempState: (partialTempState) => ({
    type: TYPES.MERGE_TEMP_STATE,
    params: { partialTempState },
  }),

  clear: () => ({ type: TYPES.CLEAR }),
  replace: (newState) => ({
    type: TYPES.REPLACE,
    params: { newState },
  }),
  merge: (partialState) => ({
    type: TYPES.MERGE,
    params: { partialState },
  }),
};

export default ACTION_CREATORS;

/**
 * @typedef MiscellaneousActions
 * @property {() => any} stageBackwards Move to the previous stage.
 * @property {() => any} stageForward Move to the next stage and clear the tempState.
 * @property {() => any} toFirst Move to the first stage.
 * @property {() => any} toLast Move to the last stage.
 * @property {() => any} nothing Does absolutely nothing.
 * @property {() => any} saveState Saves the current general state as the previous general state.
 * @property {() => any} loadState Sets the previous general state as the current general state.
 * @property {() => any} deleteSavedState Deletes all the saved previous general state.
 * @property {() => any} clearTempState Deletes the current temporal state.
 * @property {(stageKey: string) => any} toStage Move to the specified stage.
 * @property {(number: number) => any} advanceStages Advance the specified number of stages and clear the tempState. This is cyclical.
 * @property {(newTempState: any) => any} replaceTempState Completely replaces the temporal state with the specified one.
 * @property {(partialTempState: any) => any} mergeTempState Merges the specified object into the temporal state. Throws an error if an unknown key is recognized.
 *
 * @property {() => any} clear Resets this state.
 * @property {(newState: import("@state/defaultState").InvasionState) => any} replace Completely replaces this state with the specified `newState`.
 * @property {(partialState: import("@state/defaultState").InvasionState) => any} merge Deeply merges the specified `partialState` into the existing state.
 */
