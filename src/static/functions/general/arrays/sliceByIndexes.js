import { cloneDeep } from "lodash";

import { checkRequiredValues } from "@static/functions";

/**Divides an array according to the specified indexes, extracting the items at those indexes into a new array
 * while removing them from the original. The original array is _not mutated_. 
 * 
 * By default, the object-items in the returned arrays are _deep clones_ of those in the original array.
 *
 * @template T
 * @param {Array<T>} array The array to slice.
 * @param {Array<number>} indexes The list of indexes to extract from the `array`.
 * @param {boolean} useShallowClone If `true`, all object-items in the returned arrays will be just references to the same original items (shallow clone).
 * @returns {{extracted: Array<T>, remaining: Array<T>}} The extracted array with the items at every specified index, and the remaining array.
 */
function sliceByIndexes(array, indexes, useShallowClone) {
  checkRequiredValues([[{ array, indexes, useShallowClone }, "a", "a", "b"]]);

  const sortedIndexes = indexes.sort((i1, i2) => i2 - i1);
  var remainingArray = [...array];
  var extractedArray = [];

  sortedIndexes.forEach((index, i) => {
    checkRequiredValues([
      { index, type: "number", ch: (v) => v >= 0 && v < array.length },
    ]);

    extractedArray[i] = remainingArray.splice(index, 1)[0];
  });

  return {
    remaining: useShallowClone ? remainingArray : cloneDeep(remainingArray),
    extracted: useShallowClone ? extractedArray.reverse() : cloneDeep(extractedArray).reverse(),
  };
}

export default sliceByIndexes;
