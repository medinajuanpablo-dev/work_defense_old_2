import { mapValues } from "lodash";

export const STATE_NAME = "Lives";

//prettier-ignore
export const TYPES = mapValues({ 
    
  ANIHILATE: 0, //Simple Actions

  DIE: 0, LIVE: 0, //Parameterized Actions

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {LivesActions} */
const ACTION_CREATORS = {
  anihilate: () => ({ type: TYPES.ANIHILATE }),

  die: (amount) => ({
    type: TYPES.DIE,
    params: { amount },
  }),
  live: (amount) => ({
    type: TYPES.LIVE,
    params: { amount },
  }),
};

export default ACTION_CREATORS;

//Is not necessary nor useful to specify the actions outputs.

/**
 * @typedef {Object} LivesActions
 * @property {() => any} anihilate Kills everyone
 * @property {(amount: number) => any} die Kills the specified amount (of what?)
 * @property {(amount: number) => any} live Adds the specified amount of lives (of what?)
 */
