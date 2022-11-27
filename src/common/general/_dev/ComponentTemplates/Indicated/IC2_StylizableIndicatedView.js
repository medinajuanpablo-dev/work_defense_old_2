import React from "react";

import { checkOptionalValues } from "@static/functions";

import { useIndicatedStyles } from "@static/tailwind";

//Interface with customizable styles changes: elements styles will change with events and all default/event styles
//are both statically defined and customizable trough props.

/**
 * @param {Object} props
 * @param {StylesObject} props.customDirSty An object containing directed styles for each element rendered by the component. They can be non-directed if needed.
 */
function StylizableIndicatedView({ customDirSty }) {
  checkOptionalValues([
    { customDirSty, onlyFields: Object.keys(DIRECTED_STYLES) },
  ]);

  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES, { customDirSty });

  const styles = getActiveStyles({});

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

export default StylizableIndicatedView;
