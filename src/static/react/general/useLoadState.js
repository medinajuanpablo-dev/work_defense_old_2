import React from "react";

import {
  checkOptionalValues,
  checkRequiredValues,
  mustBe,
} from "@static/functions";
import { useIndicatedStyles } from "@static/tailwind";

/**
 * Easy handling of loading situations. Integrated with indicatedStyles to handle styles for each situation,
 * just pass the directed styles using the pre-defined indicators.
 *
 * The situations are:
 *
 * - **Holding**: `{ key: "holding", directive: "ldHo" }` The process is holding and nothing is happening.
 * - **Loading**: `{ key: "loading", directive: "ldLo" }` The load is currently ongoing.
 * - **Success**: `{ key: "success", directive: "ldSu" }` The load finished successfully.
 * - **Error**: `{ key: "error", directive: "ldEr" }` The load finished with errors.
 *
 * ## Use.
 *
 * The hook returns an object with a bunch of properties:
 *
 * - `message`: The current situation related message.
 * - `styles`: The current situation styles.
 * - `set`: A `function` to set the new situation by key. Second param receives a message for that situation.
 * - `is`: A `function` that tells is the specified situation is the current one.
 *
 * @template T
 * @param {Object} config
 *
 * @param {LoadingSituation} config.initialSituation The initial situation's key.
 * @param {string} config.initialMessage The initial situation's related message.
 * @param {T} config.loadingStyles Loading styles.
 * @param {Array<Indicator>} config.extraIndicators Extra indicators for the loading styles.
 * @param {ConditionParams} config.extraIndParams Extra indicators condition params for the loading styles.
 * @returns `{ set, is, message, styles }`
 */
function useLoadState({
  initialSituation = LOADING_SITUATIONS.HOLDING,
  initialMessage = "",
  loadingStyles = {},
  extraIndicators,
  extraIndParams,
}) {
  checkOptionalValues([
    [{ initialSituation, initialMessage }, mustBe(LOADING_SITUATIONS), "s"],
    [{ loadingStyles, extraIndicators, extraIndParams }, "o", "a", "o"],
  ]);

  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, loadingStyles, { extraIndicators });

  const [situation, setSituation] = React.useState(initialSituation);
  const [message, setMessage] = React.useState(initialMessage);

  /**
   * Sets the current situation and it's associated message.
   * @param {LoadingSituation} situation The new situation key.
   * @param {string} relatedMessage The situation associated message.
   */
  function set(situation, relatedMessage = "") {
    checkRequiredValues([
      [{ situation, relatedMessage }, mustBe(LOADING_SITUATIONS), "?s"],
    ]);

    setSituation(situation);
    setMessage(relatedMessage);
  }

  /**
   * Tells if the current loading situation is one of the specified `comparingSituations`
   * @param {...LoadingSituation} comparingSituations
   */
  function is(...comparingSituations) {
    for (let compSit of comparingSituations) {
      checkRequiredValues([[{ compSit }, mustBe(LOADING_SITUATIONS)]]);
      if (situation === compSit) return true;
    }

    return false;
  }

  return {
    set,
    is,
    /**The message associated to the current situation. */
    message,
    /**The styles of the current situation. Apply them directly on the appropiate elements. */
    styles: getActiveStyles({ is, ...extraIndParams }),
  };
}

/**
 * @typedef {"holding" | "loading" | "success" | "error"} LoadingSituation
 * Enumeration of all loading situations.
 */
const LOADING_SITUATIONS = {
  HOLDING: "holding",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

/**@type {Array<Indicator>} */
const INDICATORS = [
  { directive: "ldHo", condition: (p) => p.is(LOADING_SITUATIONS.HOLDING) },
  { directive: "ldGo", condition: (p) => p.is(LOADING_SITUATIONS.LOADING) },
  { directive: "ldSu", condition: (p) => p.is(LOADING_SITUATIONS.SUCCESS) },
  { directive: "ldEr", condition: (p) => p.is(LOADING_SITUATIONS.ERROR) },
];

/**
 * @typedef {import("@static/tailwind/useIndicatedStyles").ConditionParams} ConditionParams
 * @typedef {import("@static/tailwind/useIndicatedStyles").Indicator} Indicator
 */

export default useLoadState;
