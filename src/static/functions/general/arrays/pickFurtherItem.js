import { isEqual } from "lodash";

import { checkRequiredValues } from "@static/functions";

/**
 * Picks a further item in the passed `arrayToPickFrom` that is `stepsFurther` positions ahead the `referenceItem`.
 * Works cyclically, so when reached the end of the array, it will continue counting from the beginning.
 *
 * @template T
 * @param {Array<T>} array The array from which the item will be picked.
 * @param {T} referenceItem The item from which steps will be counted.
 * @param {number} stepsFurther Amount of positions ahead of `referenceItem` to count until picking an item.
 * @param {boolean} nonCyclic If `false`, the process won't work cyclically, thus returning `undefined` when reaching the end of the array without finishing.
 * @returns {T} The picked item, or `undefined` if `nonCyclic` and the end of the array was reached.
 */
function pickFurtherItem(array, referenceItem, stepsFurther, nonCyclic) {
  //prettier-ignore
  checkRequiredValues([
    [{ array, referenceItem, nonCyclic }, "array", "", "?boolean"],
    {
      stepsFurther, type: "number", ch: (v) => v >= array.length,
      msg: "The amount of stepsFurther can't be higher nor equal than the number of items in the array",
    },
  ]);

  const referenceIndex = array.findIndex((item) =>
    isEqual(item, referenceItem)
  );

  if (referenceIndex < 0)
    throw Error("The array doesn't contain the reference item.");

  const remainingLength = array.length - 1 - referenceIndex;

  var furtherIndex;
  if (remainingLength >= stepsFurther)
    furtherIndex = referenceIndex + stepsFurther;
  else {
    furtherIndex = stepsFurther - remainingLength - 1;
    if (nonCyclic) return undefined;
  }

  return array[furtherIndex];
}

export default pickFurtherItem;
