/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { checkOptionalValues } from "@static/functions";

import { useIndicatedStyles } from "@static/tailwind";

//Interface with customizable styles changes and customizable change events: elements styles will change with events,
//all default/event styles are both statically defined and customizable through props,
//and change events are customizable through props too.

/**
 * @param {Object} props
 * @param {Array<Indicator>} props.extraIndicators An array with extra Indicators.
 * @param {ConditionParams} props.extraIndParams An object with the parameters needed for the extra Indicators conditions.
 * @param {StylesObject} props.customDirSty An object containing directed styles for each element rendered by the component. They can be non-directed if needed.
 */
function CustomizableIndView({
  customDirSty = {},
  extraIndicators = [],
  extraIndParams = {},
}) {
  checkOptionalValues([
    { customDirSty, onlyFields: Object.keys(DIRECTED_STYLES) },
    [{ extraIndicators, extraIndParams }, "array", "object"],
  ]);

  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES, { extraIndicators, customDirSty });

  //prettier-ignore
  const styles = getActiveStyles({ ...extraIndParams });

  return <div className={styles.ct}>Something</div>;
}

//prettier-ignore
/**
 * @typedef {Object} StylesObject
 * @property {string} ct **CNR**. Default Styles: `"p-2"`
 */
const DIRECTED_STYLES = {
  ct: "p-2",
};

//prettier-ignore
const INDICATORS = [];

/**
 * @typedef {import("@static/tailwind/useIndicatedStyles").Indicator} Indicator
 * @typedef {import("@static/tailwind/useIndicatedStyles").ConditionParams} ConditionParams
 * */

export default CustomizableIndView;
