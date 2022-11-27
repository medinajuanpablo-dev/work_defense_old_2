import { cloneDeep } from "lodash";

/** Applies a filter to any object and returns another object with the filtered fields.
 * The returned object contains _deep clones_ of the filtered fields.
 *
 * @template T
 * @param {{[key: string]: T}} object The object to filter
 * @param {(value: T, key: string) => boolean} filterCallback The filter callback to execute for each field.
 * @returns {{[key: string]: T}} A *new* object with the filtered fields
 */
function filterObject(object, filterCallback) {
  // checkOptionalValues([
  //   { objects, req: false, type: "array" },
  //   { config, onlyFields: ["separatorStr", "joiningFields", "mergeProcess"] },
  // ]);

  var filteredObject = {};

  const filteredKeys = Object.keys(object).filter((key) =>
    filterCallback(object[key], key)
  );

  for (let key of filteredKeys) filteredObject[key] = cloneDeep(object[key]);

  return filteredObject;
}

export default filterObject;
