/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { FiCheck } from "react-icons/fi";

import { checkOptionalValues } from "@static/functions";

import { useIndicatedStyles } from "@static/tailwind";

/**
 * @param {Object} props
 * @param {boolean} props.checked Turns this into a Controlled Component by forcing the checked state of the Checkbox.
 * @param {(isChecked: boolean) => void} props.onChange Callback to be executed on check change. This doesn't execute on external changes through the `checked` prop.
 * @param {string} props.label The text aside the checkbox.
 * @param {"left" | "right"} props.labelPosition The position of the label relative to the check-box. Is `"right"` by default.
 * @param {Array<Indicator>} props.extraIndicators An array with Indicators definitions. Check `tailwind/indicatedStyles` for more.
 * @param {ConditionParams} props.extraIndParams An object with the parameters needed for the custom Indicators conditions. Check `tailwind/indicatedStyles` for more.
 * @param {StylesObject} props.customDirSty An object containing directed styles for each element rendered by the component. They can be non-directed if needed.
 */
function CuteCheckbox({
  checked: ctrlChecked,
  onChange,
  labelPosition = "right",
  label,
  customDirSty,
  extraIndicators,
  extraIndParams,
}) {
  checkOptionalValues([
    [{ controllerChecked: ctrlChecked, onChange }, "boolean", "function"],
    [{ label, labelPosition }, "string", "mustBe:left,right"],
    { customDirSty, onlyFields: Object.keys(DIRECTED_STYLES) },
    [{ extraIndicators, extraIndParams }, "array", "object"],
  ]);

  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES, { extraIndicators, customDirSty });

  const [hovered, setHovered] = React.useState(false);
  const [localChecked, setLocalChecked] = React.useState(false);

  const isControlled = ctrlChecked !== undefined;
  const checked = isControlled ? ctrlChecked : localChecked;

  function setChecked(newValue) {
    if (!isControlled) setLocalChecked(newValue);
    if (onChange) onChange(newValue);
  }

  //prettier-ignore
  const styles = getActiveStyles({ checked, hovered, ...extraIndParams });

  return (
    <div
      onClick={(e) => setChecked(!checked, e)}
      onMouseLeave={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}
      className={styles.ct}
    >
      {labelPosition === "left" && !!label && (
        <p className={styles.label}>{label}</p>
      )}
      <div className={styles.box}>
        <FiCheck className={styles.check} />
      </div>
      {labelPosition === "right" && !!label && (
        <p className={styles.label}>{label}</p>
      )}
    </div>
  );
}

//prettier-ignore
/**
 * @typedef {Object} StylesObject
 * @property {string} ct **CNR**. Default Styles: `"flex items-center cursor-pointer justify-center"`
 * @property {string} label **CS**. Default Styles: `"mx-2 text-gray-700 select-none text-light leading-none transition-color duration-200 pt-px || ho<text-blue-400>"`
 * @property {string} check **CS**. Default Styles: `"w-full h-full opacity-0 stroke-2 transition-opacity duration-200 || ch<opacity-100>"`
 * @property {string} box **CS**. Default Styles: `"rounded-sm border-1 border-gray-600 w-5 h-5 transition-color duration-200 || ho<border-blue-400>"`
 */
const DIRECTED_STYLES = {
  ct: "flex items-center cursor-pointer justify-center",
  label: "mx-2 text-gray-700 select-none text-light leading-none transition-color duration-200 pt-px || ho<text-blue-400>",
  check: "w-full h-full opacity-0 stroke-2 transition-opacity duration-200 || ch<opacity-100>",
  box: "rounded-sm border-1 border-gray-600 w-5 h-5 transition-color duration-200 || ho<border-blue-400>",
};

//prettier-ignore
const INDICATORS = [
  { key: "hovered", directive: "ho", condition: (p) => p.hovered },
  { key: "checked", directive: "ch", condition: (p) => p.checked },
];

/**
 * @typedef {import("@static/tailwind/useIndicatedStyles").Indicator} Indicator
 * @typedef {import("@static/tailwind/useIndicatedStyles").ConditionParams} ConditionParams
 * */

export default CuteCheckbox;
