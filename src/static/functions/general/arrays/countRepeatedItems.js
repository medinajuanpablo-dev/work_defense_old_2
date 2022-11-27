import { isEqual, camelCase } from "lodash";

import { checkRequiredValues } from "@static/functions";

/**Counts the repeated items in the specified array, returning an object with each item's identifier and the amount
 * of times it's repeated. The used identifier depends of the item's type. Supports the following types:
 *
 * - `number` or `string`: The returned object contain the number or string itself as key.
 *
 * - **Named** `function`: The returned object contain the function's name as key. **MUST BE NAMED**, otherwise an error will be thrown.
 *
 * - `object`: This includes Arrays as well. The returned object identify the item object with the first value of it that is a `string`, or use the first field's key if no string is found.
 *
 * Other types will simply be ignored.
 * @param {Array<number | string | { [x: string]: any } | Function>} array The array to count from.
 * @param {(objectItem: any) => any} objectPreProcess A function to execute to every object before processing them. Useful to transform objects before counting.
 * @returns {{[itemIdentifier: string]: number}} The object with the repetition count for each item.
 */
function countRepeatedItems(array, objectPreProcess) {
  checkRequiredValues([[{ array, objectPreProcess }, "array", "?function"]]);

  const count = {};

  var previousObjects = {};

  for (let item of array) {
    switch (typeof item) {
      case "number":
      case "string":
        count[item] = (count[item] || 0) + 1;
        break;

      case "function":
        count[item.name] = (count[item.name] || 0) + 1;
        break;

      case "object":
        //Check for all already counted objects to find the same. If found, add one to that count. If not found, add the object to be counted.
        let alreadyCounted = false;
        const objectItem = objectPreProcess ? objectPreProcess(item) : item;

        checkRequiredValues([
          { objectItem, type: "object", msg: "Invalid pre-processed item" },
        ]);

        for (let objName in previousObjects) {
          if (isEqual(previousObjects[objName], objectItem)) {
            alreadyCounted = true;
            count[objName] += 1;
            break;
          }
        }

        if (!alreadyCounted) {
          let objName = `object_${Object.keys(objectItem)[0]}`;
          for (let f in objectItem)
            if (typeof objectItem[f] === "string") {
              objName = `object_${camelCase(objectItem[f])}`;
              break;
            }

          if (previousObjects[objName])
            objName += `_${Object.values(previousObjects).length}`;

          previousObjects[objName] = objectItem;
          count[objName] = 1;
        }

        break;

      default:
    }
  }

  // console.log(previousObjects);

  return count;
}

export default countRepeatedItems;
