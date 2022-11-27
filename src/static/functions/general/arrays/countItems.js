import { checkRequiredValues, typeOf } from "@static/functions";

/**Counts the items in an array that, when processed by a `checkerCallback`, make it return `true`.
 *
 * - **Count a single type of check**: Just pass the `checkerCallback` as 2nd parameter.
 *
 * - **Count multiple types of checks**: Want to make multiple checks over the array and count for each one separatedly.
 * Pass an object with the following fields: `{ checkName: checkerCallback }`.
 *
 * @template T
 * @param {Array<T>} array The array which items shall be counted.
 * @param {{[checkName: string]: CheckerCallback<T>} | CheckerCallback<T>} checkers The function/s that checks every item. It receives a generic item and should return `true` if that item passes, or `false` otherwise.
 */
function countItems(array, checkers) {
  checkRequiredValues([
    { array, type: "array" },
    { checkers, type: ["function", "object"] },
  ]);

  if (typeOf(checkers, "object"))
    checkRequiredValues([{ checkers, fieldsType: "function" }]);

  switch (typeof checkers) {
    case "function":
      const singleChecker = checkers;
      let count = 0;

      for (let i = 0; i < array.length; i++)
        if (singleChecker(array[i], i)) count += 1;

      return count;

    case "object":
      let countObject = {};

      for (let f in checkers)
        for (let i = 0; i < array.length; i++)
          if (checkers[f](array[i], i))
            countObject[f] = (countObject[f] || 0) + 1;

      return countObject;

    default:
  }
}

/**
 * @template U
 * @callback CheckerCallback
 * @param {U} item A generic item of the array.
 * @returns {boolean} `true` if that item passes, or `false` otherwise.
 */

export default countItems;
