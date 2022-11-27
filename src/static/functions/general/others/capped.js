import { checkRequiredValues, exists } from "@static/functions";

/**Sets superior and/or inferior cap to a `number`.
 *
 * @param {number} number The raw non-capped number.
 * @param {{ max: number, min: number }} caps Superior (`max`) and/or inferior (`min`) caps.
 * @returns {number} The capped number.
 */
function capped(number, caps) {
  checkRequiredValues([
    { number, type: "number" },
    { caps, onlyFields: ["max", "min"], fieldsType: "number" },
  ]);

  const { min, max } = caps;

  if (exists(max) && number > max) return max;
  if (exists(min) && number < min) return min;

  return number;
}

export default capped;
