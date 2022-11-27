import React from "react";
import { isEqual, mapValues } from "lodash";

import { checkRequiredValues } from "@static/functions";
import { mergeStyles } from "@static/tailwind";

/**
 * This hooks makes it a lot easier and more efficient to implement custom indicators in a component.
 *
 * @template T
 * @param {Array<Indicator>} indicatorsList An array of objects `{ key, directive, condition }`.
 * @param {T} directedStyles Can be an object or an array of directed styles.
 * @param {Object} customization Customize the process.
 * @param {Array<Indicator>} customization.extraIndicators Extra, likely dynamic/variable Indicators. Will be added last to the Indicators list.
 * @param {{[elementKey: string]: string}} customization.customDirSty Custom or extra directed styles, likely dynamic/variable. Will be merged into the default directed styles.
 * @param {(undefinedDirective: string) => void} customization.onUndefinedDirective Callback to execute when an used directive has no defined indicator.
 * @returns A function that accepts the current indicators conditions params, and returns the active styles.
 */
function useIndicatedStyles(
  indicatorsDefinition,
  directedStyles,
  { onUndefinedDirective, extraIndicators, customDirSty } = {}
) {
  checkRequiredValues([
    [{ indicatorsDefinition, directedStyles }, "array", "object"],
    [{ extraIndicators, customDirSty, onUndefinedDirective }, "?a", "?o", "?f"],
  ]);

  const indicatorsList = extraIndicators
    ? indicatorsDefinition.concat(extraIndicators)
    : indicatorsDefinition;

  //Optimized build of indicated styles. Just on mount and only merge when necessary.
  //prettier-ignore
  const indicatedStyles = React.useMemo(() => {
    //Parse directed styles of each element.
    return mapValues(directedStyles, (elementDirSty, elementKey) => {
      if (customDirSty && customDirSty[elementKey]) //With custom directed styles.
        return mapValues(
          parseIndicators(
            elementDirSty + " " + customDirSty[elementKey], //Parse the concatenation default directed styles + custom directed styles...
            indicatorsList,
            onUndefinedDirective
          ),
          (indicatorStyles) => mergeStyles(indicatorStyles) //...then merge the result.
        );
      else //Without custom directed styles. 
        return parseIndicators(elementDirSty, indicatorsList, onUndefinedDirective); //Just parse the default directed styles.
    });
  }, [indicatorsDefinition, directedStyles, onUndefinedDirective, extraIndicators, customDirSty]);

  //Hook memory to re-calculate styles only if the active indicators change.
  const { current: cv } = React.useRef({
    activeIndicators: [],
    activeStyles: mapValues(
      indicatedStyles,
      (elemStyles) => elemStyles.default
    ),
  });

  /**
   * Selects and returns the styles of the active Indicators, by element.
   * @param {ConditionParams} indicatorsConditionsParams The necessary parameters to decide if the Indicator is active or not.
   * @returns {T} Each element styles. These should be directly applied on each appropiate element.
   */
  const getActiveStyles = React.useCallback(
    /**
     * @param {ConditionParams} indicatorsConditionsParams
     * @returns {T}
     */
    (indicatorsConditionsParams) => {
      //Select new active indicators and save their keys (or indexes by default).
      const newActiveIndicators = indicatorsList
        .map((indicator, index) => ({ ...indicator, index })) //1. Save original index because after filtering is lost.
        .filter(({ condition }) => condition(indicatorsConditionsParams)) //2. Filter by passing condition.
        .map(({ key, index }) => key || index); //3. Save key or index of the indicators that passed.

      //Select active styles if the new active indicators are different. Otherwise, just return the already existing active styles.
      if (!isEqual(newActiveIndicators, cv.activeIndicators)) {
        cv.activeIndicators = newActiveIndicators;

        for (let elem in indicatedStyles) {
          //Non-indicated styles.
          cv.activeStyles[elem] = indicatedStyles[elem].default;

          //Active indicators styles.
          cv.activeStyles[elem] = mergeStyles(
            cv.activeStyles[elem],
            ...cv.activeIndicators.map(
              (indicatorKey) => " " + indicatedStyles[elem][indicatorKey]
            )
          );
        }
      }

      return cv.activeStyles;
    },
    [indicatorsList, cv.activeIndicators, cv.activeStyles, indicatedStyles]
  );

  return getActiveStyles;
}

function parseIndicators(
  directedStyles = "",
  indicators,
  onUndefinedDirective
) {
  var defaultStyles = ""; //Non directed or with ignored directives styles.
  var stylesByIndicator = {};

  for (let rawStyle of directedStyles.split(" ")) {
    //Is a directed style?
    if (rawStyle.includes("<") || rawStyle.includes(">")) {
      //Checks: Has both angle brackets and '<' is before '>'.
      if (!rawStyle.includes("<") || !rawStyle.includes(">"))
        throw Error(
          `Directed styles must be wrapped around '<' and '>', but only one angle bracket was found in '${rawStyle}'.`
        );
      if (rawStyle.indexOf("<") > rawStyle.indexOf(">"))
        throw Error(
          "The '<' must go before the '>'. Guess coding isn't for everyone."
        );

      //Separate directives and their indicators styles (wrapped between <>).
      const [directivesString, remainingStyle] = rawStyle.split("<");
      const indicatorsStyles = remainingStyle.replace(">", "");

      for (let directive of directivesString.split(",")) {
        //Find the indicator for the current directive.
        const indicatorIndex = indicators.findIndex(
          (ind) => ind.directive === directive
        );
        const theIndicator = indicators[indicatorIndex];

        //Execute the callback and continue if there's no indicator for the current directive.
        if (!theIndicator) {
          if (onUndefinedDirective) onUndefinedDirective(directive);
          continue;
        }

        //Save styles under the found indicator's key, or it's index if the key doesn't exist.
        const key = theIndicator.key || indicatorIndex;
        stylesByIndicator[key] =
          (stylesByIndicator[key] || "") + //The same directive may appear in another directed style.
          " " +
          indicatorsStyles.replaceAll("'", " "); //Styles may come separated by single quotes; replace these with spaces.
      }
    }
    //Not a directed style, add it as default.
    else defaultStyles += " " + rawStyle;
  }

  return { default: defaultStyles, ...stylesByIndicator };
}

/**
 * @typedef {{[param: string]: any}} ConditionParams
 *
 * @callback IndicatorCondition
 * @param {ConditionParams} indicatorsConditionsParams The necessary parameters to decide if the Indicator is active or not.
 * @returns {boolean} Wether the condition passed or not.
 *
 * @typedef Indicator
 * @property {string} key The Indicator's key. Necessary but also useful to briefly describe the Indicator.
 * @property {string} directive The short-string to use this indicator within the Directed Styles.
 * @property {IndicatorCondition} condition Callback that receive the `indicatorConditionsParams` and decides wether the Indicator is active or not.
 */

export default useIndicatedStyles;
