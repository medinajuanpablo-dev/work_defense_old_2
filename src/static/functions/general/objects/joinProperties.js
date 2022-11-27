import { checkOptionalValues } from "@static/functions";

/**Joins the string fields of an array of objects into a new object with the results
 * If the fields are not specified, it uses the properties of the first object.
 *
 * It accepts an optional 2nd param `config`:
 *
 * - `separatorStr`: A string to separate each join with. It's a space (`" "`) by default.
 * - `joiningFields`: An array with the keys of the fields that should be merged (instead of the first object ones).
 * - `mergeProcess`: A callback to manually specify the string-joining process when needed. It receives the accumulated and next strings, and should return the resultant string. By default, it's just a concatenation.
 *
 * @param {Array<any>} objects The array of the objects which fields will be joined.
 * @param {{separatorStr: string, joiningFields: Array<string>, mergeProcess: (acc: string, next: string) => string}} config Joining process configuration.
 * @returns {any} A new object with the joined fields.
 */
function joinProperties(objects, config) {
  checkOptionalValues([
    { objects, req: false, type: "array" },
    { config, onlyFields: ["separatorStr", "joiningFields", "mergeProcess"] },
  ]);

  const {
    separatorStr = " ",
    joiningFields = Object.keys(objects[0]),
    mergeProcess,
  } = config || {};

  //Initialize results object.
  var results = {};
  for (let f of joiningFields) results[f] = "";

  //Make the joining.
  for (let joiningObj of objects) {
    checkOptionalValues([{ joiningObj, type: "object" }]);

    for (let f of joiningFields) {
      if (typeof joiningObj[f] !== "string") continue;

      if (mergeProcess)
        results[f] = mergeProcess(results[f], joiningObj[f]) + separatorStr;
      else results[f] += joiningObj[f] + separatorStr;
    }
  }

  //Delete separator at the end of the strings.
  if (separatorStr) {
    for (let f of joiningFields)
      results[f] = results[f].slice(0, results[f].length - separatorStr.length);
  }

  return results;
}

export default joinProperties;
