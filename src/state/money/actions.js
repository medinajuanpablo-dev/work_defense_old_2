import { mapValues } from "lodash";

export const STATE_NAME = "Money";

//prettier-ignore
export const TYPES = mapValues({ 
    
  EMPTY_MONEY: 0, FREEZE: 0, WATCH: 0, ACTIVATE: 0, //Simple Actions

  DEPOSIT: 0, WITHDRAW: 0, //Parameterized Actions

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {MoneyActions} */
const ACTION_CREATORS = {
  emptyMoney: () => ({ type: TYPES.EMPTY_MONEY }),
  freeze: () => ({ type: TYPES.FREEZE }),
  watch: () => ({ type: TYPES.WATCH }),
  activate: () => ({ type: TYPES.ACTIVATE }),

  deposit: (amount) => ({
    type: TYPES.DEPOSIT,
    params: { amount },
  }),
  withdraw: (amount) => ({
    type: TYPES.WITHDRAW,
    params: { amount },
  }),
};

export default ACTION_CREATORS;

//Is not necessary nor useful to specify the actions outputs.

/**
 * @typedef {Object} MoneyActions
 * @property {() => any} emptyMoney Sets the money to zero.
 * @property {() => any} freeze Sets the money state as frozen.
 * @property {() => any} watch Sets the money state as watched.
 * @property {() => any} activate Sets the money state as active.
 * @property {(amount: number) => any} deposit Adds the specified amount of money.
 * @property {(amount: number) => any} withdraw Extracts the specified amount of money.
 */
