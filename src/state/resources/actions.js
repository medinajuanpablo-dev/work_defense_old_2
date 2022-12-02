import { mapValues } from "lodash";

export const STATE_NAME = "Resources";

//prettier-ignore
export const TYPES = mapValues({ 
    
  EMPTY_ALL: 0, //Simple Actions

  ADD_RESOURCE: 0, REMOVE_RESOURCE: 0, SET_RESOURCE: 0, //Parameterized Actions

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {ResourcesActions} */
const ACTION_CREATORS = {
  emptyAll: () => ({ type: TYPES.EMPTY_ALL }),

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
};

export default ACTION_CREATORS;

/**
 * @typedef ResourcesActions
 * @property {() => any} emptyAll Sets all resources to zero.
 * @property {(resourceKey: string, amount: number) => any} addResource Adds the specified amount to the specified resource
 * @property {(resourceKey: string, amount: number) => any} removeResource Removes the specified amount from the specified resource
 * @property {(resourceKey: string, amount: number) => any} setResource Sets the specified amount to the specified resource
 */
