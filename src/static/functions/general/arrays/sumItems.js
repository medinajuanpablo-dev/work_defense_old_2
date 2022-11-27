import { checkRequiredValues, typeOf } from "@static/functions";

/**Performs a sum of all numeric items in an array. The array may contain non-numeric items, which will
 * just be ignored in the sum process.
 *
 * @param {Array<number>} array
 * @returns {number} The result of the sum.
 */
function sumItems(array) {
  checkRequiredValues([{ array, type: "array" }]);

  var result = 0;

  for (let n of array) if (typeOf(n, "number")) result += n;

  return result;
}

export default sumItems;
