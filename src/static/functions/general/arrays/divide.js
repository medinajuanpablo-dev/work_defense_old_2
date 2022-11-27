import { cloneDeep } from "lodash";

import { checkRequiredValues } from "@static/functions";

/**
 * Divides the provided array into as many sub-arrays as the specified divisions.
 *
 * **Important**: Items in sub-arrays are deep clones of the originals, so they can be safely modified.
 * @template T
 * @param {Array<T>} array The array to divide.
 * @param {number} divisions The amount of sub-arrays.
 * @returns {Array<Array<T>>} The divided groups.
 */
function divide(array, divisions) {
  checkRequiredValues([
    { array, type: "array" },
    { divisions, ch: (v) => v <= array.length },
  ]);

  const _array = cloneDeep(array);

  if (divisions === 1) return _array;

  var subArrays = [];

  for (let g = 0; g < divisions; g++)
    subArrays.push(
      _array.slice(
        Math.floor((g / divisions) * _array.length), //This math magic here.
        Math.floor(((g + 1) / divisions) * _array.length)
      )
    );

  return subArrays;
}

export default divide;
