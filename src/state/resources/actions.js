import { mapValues } from "lodash";

export const STATE_NAME = "Resources";

//prettier-ignore
export const TYPES = mapValues({ 
    
  EMPTY_ALL: 0, //Simple Actions

  ADD_RESOURCE: 0, REMOVE_RESOURCE: 0, SET_RESOURCE: 0, SAVE_AS_PREV: 0, //Parameterized Actions

  CLEAR: 0, REPLACE: 0, MERGE: 0,

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {ResourcesActions} */
const ACTION_CREATORS = {
  emptyAll: () => ({ type: TYPES.EMPTY_ALL }),
  saveAsPrev: () => ({ type: TYPES.SAVE_AS_PREV }),

  addResource: (resourceKey, amount) => ({
    type: TYPES.ADD_RESOURCE,
    params: { resourceKey, amount },
  }),
  removeResource: (resourceKey, amount) => ({
    type: TYPES.REMOVE_RESOURCE,
    params: { resourceKey, amount },
  }),
  setResource: (resourceKey, amount) => ({
    type: TYPES.SET_RESOURCE,
    params: { resourceKey, amount },
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
 * @typedef ResourcesActions
 * @property {() => any} emptyAll Sets all resources to zero.
 * @property {() => any} saveAsPrev Saves the currently stored resources as the previous tempo resources.
 * @property {(resourceKey: string, amount: number) => any} addResource Adds the specified amount to the specified resource
 * @property {(resourceKey: string, amount: number) => any} removeResource Removes the specified amount from the specified resource
 * @property {(resourceKey: string, amount: number) => any} setResource Sets the specified amount to the specified resource
 *
 * @property {() => any} clear Resets this state.
 * @property {(newState: import("@state/defaultState").InvasionState) => any} replace Completely replaces this state with the specified `newState`.
 * @property {(partialState: import("@state/defaultState").InvasionState) => any} merge Deeply merges the specified `partialState` into the existing state.
 */
