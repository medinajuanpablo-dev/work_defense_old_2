import React from "react";

import { checkOptionalValues } from "@static/functions";
import { useCustomizableStyles } from "@static/react";

//Interface with customizable static styles: elements styles are never gonna change with events and styles
//are both statically defined and customizable trough props.

/**
 * @param {Object} props
 * @param {StylesObject} props.customStyles An object containing custom styles for each element rendered by the component. **Non-directed**
 */
function StylizableStaticView({ customStyles }) {
  checkOptionalValues([{ customStyles, onlyFields: Object.keys(STYLES) }]);

  const styles = useCustomizableStyles(STYLES, customStyles);

  return <div className={styles.ct}>Something</div>;
}

//prettier-ignore
/**
 * @typedef {Object} StylesObject
 * @property {string} ct **CNR**. Default Styles: `"p-2"`
 */
const STYLES = {
  ct: "p-2",
};

export default StylizableStaticView;
