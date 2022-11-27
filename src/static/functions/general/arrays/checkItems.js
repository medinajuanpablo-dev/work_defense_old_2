import { checkRequiredValues } from "@static/functions";

/**
 * Processes items in an `array` through a `checker` until a number of successes (checker returns `true`),
 * in which it returns `true`; otherwise, it returns `false`.
 *
 * **Note**: The single-success case could be done with `array.find(checker)`, but more successes until
 * truth would require more annoying code. This solves that for quick checks.
 *
 * @template T
 * @param {Array<T>} array The array which items will be compared.
 * @param {number} successesForTruth The aumount of successes until `true` is returned.
 * @param {(item: T, index: number) => boolean} checker A callback that receives each item (and it's index as optional 2nd param) and must return a boolean.
 * @returns {boolean} `true` if an amount of successes equal to `successesForTruth` is achieved (1 by default), or `false` otherwise.
 */
function checkItems(array, successesForTruth, checker) {
  checkRequiredValues([
    [{ array, successesForTruth, checker }, "array", "number", "function"],
  ]);

  var successes = 0;

  for (let i = 0; i < array.length; i++) {
    if (checker(array[i], i)) {
      successes += 1;

      if (successes === successesForTruth) return true;
    }
  }

  return false;
}

export default checkItems;
