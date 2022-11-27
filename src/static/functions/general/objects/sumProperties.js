import { checkRequiredValues } from "@static/functions";

/**Does two things depending of the value of `objectsLists`:
 * - Array of `object`: Makes multiple sums, one for each specified property, and builds a new object with the result of each sum.
 * - Single `object`: Makes a sum of the numeric properties of it, returning the result.
 *
 * The properties to sum are specified with the 2nd param `addingFields`. If not specified, the properties of the first object are used instead.
 *
 * If a field is missing or non-numeric in some objects, it's just ignored and the sum continues.
 *
 * @param {any} objectsList The lists of objects which properties will be added up.
 * @param {Array<string>} addingFields The list of fields to sum from each object of `objectsList`. If not specified, the fields of the 1st object will be used.
 * @returns {any} An object containing the fields sums results if an objects list was passed, or the numeric result if a single object was passed.
 */
function sumProperties(objectsList, addingFields) {
  checkRequiredValues([
    { objectsList, type: ["array", "object"] },
    { addingFields, req: false, itemsType: "string" },
  ]);

  //Object list case.
  if (Array.isArray(objectsList)) {
    const fields = addingFields ? addingFields : Object.keys(objectsList[0]);
    let resultObject = {};

    for (let obj of objectsList) {
      for (let f of fields) {
        if (typeof obj[f] === "number")
          resultObject[f] = (resultObject[f] || 0) + obj[f];
      }
    }

    return resultObject;
  }

  //Single object case.
  else {
    const singleObject = objectsList;
    const fields = addingFields ? addingFields : Object.keys(singleObject);
    let result = 0;

    for (let f of fields)
      if (typeof singleObject[f] === "number") result += singleObject[f];

    return result;
  }
}

export default sumProperties;
