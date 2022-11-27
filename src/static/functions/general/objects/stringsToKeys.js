import { camelCase } from "lodash";

import { checkRequiredValues, typeOf } from "@static/functions";

/**Converts an array or object of strings into an object which keys are the strings.
 *
 * ```
 * ["One", "TWO", "Thrée"] => {one: "One", two: "TWO", three: "Thrée"}
 * {anything: "One", something: "TWO", irrelevant: "Thrée"} => {one: "One", two: "TWO", three: "Thrée"}
 * ```
 *
 * Specially useful to map standarized keys.
 *
 * @param {Array<string> | { [x: string]: string }} arrayOrObject The array/object with the strings which will be turned into keys.
 * @returns {{[x: string]: string}} An object which properties keys are the strings from the array.
 */
function stringsToKeys(arrayOrObject) {
  checkRequiredValues([{ arrayOrObject, type: ["array", "object"] }]);

  var arrayOfStrings;

  //Check that the items/fields are strings.
  if (typeOf(arrayOrObject, "array")) {
    checkRequiredValues([{ arrayOrObject, itemsType: "string" }]);
    arrayOfStrings = arrayOrObject;
  } else {
    checkRequiredValues([{ arrayOrObject, fieldsType: "string" }]);
    arrayOfStrings = Object.values(arrayOrObject);
  }

  return arrayOfStrings.reduce((acc, a) => ({ ...acc, [camelCase(a)]: a }), {});
}

export default stringsToKeys;
