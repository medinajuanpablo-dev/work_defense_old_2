import { camelCase, snakeCase } from "lodash";

import {
  countRepeatedItems,
  checkRequiredValues,
  checkOptionalValues,
} from "@static/functions";

/**A function that takes an enumeration of strings or numbers, and builds Indicators from them, where each Indicator condition
 * depends of one value from the enumeration.
 *
 * ---
 *
 * **Example:** We want to style a component depending of a prop called `type`, which might value one of `TYPES`.
 *
 * ```
 * //...component's code. It receives `type` as prop.
 *
 * const TYPES = ["big", "medium", "small", "very-small"]; //`type` will be one of these.
 *
 * const INDICATORS = buildEnumIndicators(TYPES, "type"); //We use the function to quickly add indicators for each one of those types.
 *
 * //We can just use the indicators directives like any other indicator. The directives are always the paramNameFirstLetters + enumValue all in lower case. Better with an example:
 * const DIRECTED_STYLES = {
 *    ct: "...defaultContainerStyles || tbig<text-xl'otherBigStyles> tmedium<text-lg'otherMediumStyles> tsmall<text-base'otherSmallStyles> tverysmall<text-sm'otherVerySmallStyles>",
 * }
 * ```
 *
 * ---
 *
 * **Short Directives Example:** Same example as before but using the `short` feature.
 *
 * ```
 * //...component's code. It receives `verticalSide` as prop.
 *
 * const VERTICAL_SIDES = ["top", "bottom", "vertical"]; //Values CAN'T have the same initial letter, so using "both" instead of "vertical" would throw an error.
 *
 * const INDICATORS = buildEnumIndicators(VERTICAL_SIDES, "verticalSide", { short: true });
 *
 * //The directives are shortened here and follow this form: paramNameFirstLetters + enumValueFirstLetter all in lower case.
 * const DIRECTED_STYLES = {
 *    ct: "...defaultContainerStyles || vst<topSideStyles> vsb<bottomSideStyles> vsv<bothSidesStyles>",
 * } *
 *
 * ```
 *
 * ---
 *
 * @param {Array<string | number> | {[key: string]: string | number}} enumeration The values to build indicators with. Can be an array or an object.
 * @param {string} conditionParamName The param of which the indicators conditions depend and that might be equal to one of the values in the specified `enumr`.
 * @param {Object} config Configure the process.
 * @param {string} config.prefix A prefix to add to the indicators keys and directives.
 * @param {boolean} config.short If `true`, short directives will be used instead of the full ones. The values names **can't** have the same first letter.
 * @returns {Array<Indicator>} The built indicators.
 */
function buildEnumIndicators(enumeration, conditionParamName, config = {}) {
  checkRequiredValues([
    { enumeration, type: ["array", "object"] },
    { conditionParamName, type: "string" },
    { config, onlyFields: ["prefix", "short"] },
  ]);
  const { prefix, short } = config;
  checkOptionalValues([[{ prefix, short }, "s", "b"]]);

  const enumr = Array.isArray(enumeration)
    ? enumeration
    : Object.values(enumeration);

  if (
    short &&
    Object.values(
      countRepeatedItems(enumr.map((value) => value.charAt(0)))
    ).findIndex((item) => item > 1) >= 0
  )
    throw Error(
      "The Short Directives feature was applied, but some values of the enumeration share the same first letter. Make sure that doesn't happen."
    );

  function directiveBuilder(value) {
    const paramNameFirstLetters = snakeCase(conditionParamName)
      .split("_")
      .map((word) => word.charAt(0))
      .join("");

    return (
      (prefix ? prefix : "") +
      paramNameFirstLetters +
      (short ? value.charAt(0).toLowerCase() : camelCase(value).toLowerCase())
    );
  }

  return enumr.map((value) => {
    return {
      key: camelCase(`${prefix}_${value}`),
      directive: directiveBuilder(value),
      condition: (p) => p[conditionParamName] === value,
    };
  });
}

/**
 * @typedef {import("./useIndicatedStyles").Indicator} Indicator
 */

export default buildEnumIndicators;
