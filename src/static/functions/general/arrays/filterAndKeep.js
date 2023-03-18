import { checkRequiredValues } from "../control/checkValues";

/**Filters the specified array and returns a `passed` array of the items that passed the
 * filter and a `filtered` array with the items that didn't.
 * @template T
 * @param {Array<T>} array The array to filter
 * @param {(item: T, index: number) => boolean} conditionCallback The callback containing the filtering condition.
 * @returns {{passed: Array<T>, filtered: Array<T>}} A `passed` array of the items that passed the
 * filter and a `filtered` array with the items that didn't.
 */
function filterAndKeep(array, conditionCallback) {
  checkRequiredValues([
    { array, type: "array" },
    { conditionCallback, type: "function" },
  ]);

  var passed = [];
  var filtered = [];

  for (let i = 0; i < array.length; i++) {
    if (conditionCallback(array[i], i)) passed.push(array[i]);
    else filtered.push(array[i]);
  }

  return { passed, filtered };
}

export default filterAndKeep;
