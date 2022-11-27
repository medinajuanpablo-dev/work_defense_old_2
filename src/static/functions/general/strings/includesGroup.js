import { checkRequiredValues } from "@static/functions";

/**
 * Quick and intuitive groupal inclusion test.
 *
 * - **If `"all"`**: Tests if the `string` includes all strings in the array.
 * - **If `"any"`**: Tests if the `string` includes at least one of the strings in the array.
 *
 * @param {string} string The string to test inclusion
 * @param {Array<string>} array The array which items may be included in the `string`.
 * @param {"all" | "any"} objective The test objective.
 */
function includesGroup(string, array, objective) {
  checkRequiredValues([
    [{ string, objective }, "string", "mustBe:all,any"],
    { array, itemsType: "string" },
  ]);

  var inclusions = [];

  for (let s of array) {
    if (string.includes(s)) {
      if (objective === "any") return true;

      inclusions.push(s);
    }
  }

  return inclusions.length === array.length;
}

export default includesGroup;
