// This file contains the state structure and keys, as well as the default values for each field.

import { MONEY_STATE as MSK } from "@static/values/keys";

/**Error thrown when some actions were defined but not handled by the reducer.
 * @param {string} stateName @param {string} type */
export function unhandledActionError(stateName, type) {
  throw Error(
    (stateName || "A state") +
      " contains actions types it's reducer is not handling. Unhandled type: " +
      (type || "--Pass action type to error throwing--")
  );
}

// ==== State's structure and default values ====

/**
 * @typedef GeneralState
 * @property {{ current: number, state: string }} money The amount of money and the state of the account.
 * @property {{ count: number }} lives The amount of lives
 */

/**@type {GeneralState} */
const DEFAULT_GENERAL_STATE = {
  money: {
    current: 0,
    state: MSK.FREE_USE,
  },
  lives: {
    count: 0,
  },
};

export default (() => {
  // Here do changes and processes on the default state before exporting.

  return DEFAULT_GENERAL_STATE;
})();
