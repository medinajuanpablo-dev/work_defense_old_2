/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { checkOptionalValues } from "@static/functions";
import { useIndicatedStyles } from "@static/tailwind";

/**
 * @param {Object} props Customize the Component with props.
 *
 * @param {string} props.value Turns this into a Controlled Component by forcing the input's value.
 * @param {(value: string) => void} props.onChange Callback executed on value change. This doesn't execute on external changes through the `value` prop.
 * @param {boolean} props.textarea If `true`, the input will be a textarea.
 * @param {string} props.label The text appearing as placeholder that will then move to the top left border when focused or valued.
 * @param {number} props.maxLength The maximum amount of characters allowed in the input.
 * @param {boolean} props.allowOverflow If `true`, the input will allow the user to continue writing when the max length is reached.
 * @param {Array<Indicator>} props.extraIndicators An array with Indicators definitions. Check `tailwind/indicatedStyles` for more.
 * @param {ConditionParams} props.extraIndParams An object with the parameters needed for the custom Indicators conditions. Check `tailwind/indicatedStyles` for more.
 * @param {React.RefObject} props.upperRef A ref from the container to control the input, if necessary.
 * @param {JSX.Element} props.noticeElement Pass a an element to be rendered at the right side of the input. A CuteActionNotice is recommended.
 * @param {StylesObject} props.customDirSty An object containing directed styles for each element rendered by the component. They can be non-directed if needed.
 * @param {(focused: boolean) => void} props.onFocusChange A callback to execute when the component focus changes.
 */
function CuteInput({
  label = "Input",
  value: ctrlValue,
  onChange,
  textarea,
  maxLength,
  allowOverflow,
  upperRef: upperInputRef,
  noticeElement,
  onFocusChange,
  customDirSty,
  extraIndicators,
  extraIndParams,
  ...passProps
}) {
  checkOptionalValues([
    [{ ctrlValue, onChange, label }, "string", "function", "string"],
    [{ textarea, maxLength, allowOverflow }, "boolean", "number", "boolean"],
    { customDirSty, onlyFields: Object.keys(DIRECTED_STYLES) },
    [{ extraIndicators, extraIndParams }, "array", "object"],
  ]);

  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES, { customDirSty, extraIndicators });

  const [localValue, setLocalValue] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const ownInputRef = React.useRef();

  const isControlled = ctrlValue !== undefined;
  const value = isControlled ? ctrlValue : localValue;

  function setValue(newValue) {
    if (!maxLength || allowOverflow || newValue.length <= maxLength) {
      if (!isControlled) setLocalValue(newValue);
      if (onChange) onChange(newValue);
    }
  }

  React.useEffect(() => {
    if (onFocusChange) onFocusChange(focused);
  }, [focused]);

  const inputRef = upperInputRef || ownInputRef;

  function focus(doFocus) {
    setFocused((wasFocused) => (wasFocused !== doFocus ? doFocus : wasFocused));
    if (doFocus) inputRef.current.focus();
  }

  //prettier-ignore
  const styles = getActiveStyles({ value, focused, hovered, maxLength, textarea, ...extraIndParams });

  const inputProps = {
    className: styles.input,
    ref: inputRef,
    value,
    onChange: (e) => setValue(e.target.value),
    onFocus: () => focus(true),
    onBlur: () => focus(false),
    ...passProps,
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={styles.ct}
    >
      <span onClick={focus} className={styles.label}>
        {label}
      </span>
      {textarea ? <textarea {...inputProps} /> : <input {...inputProps} />}

      {noticeElement && <div className={styles.noticeCt}>{noticeElement}</div>}
    </div>
  );
}

//prettier-ignore
/**
 * @typedef {Object} StylesObject
 * @property {string} ct **CS**. Default Styles: `"relative flex items-center justify-between text-base inline-block pb-2 pt-3 px-4 text-light border-1 border-gray-400 rounded-lg outline-none || ac<border-gray-800> do<border-gray-400>"`
 * @property {string} input **CNR**. Default Styles: `"w-full border-none outline-none"`
 * @property {string} label **CWC**. Default Styles: `"absolute left-2 top-3 -translate-y-px px-2 cursor-text text-light text-italic text-gray-500 transform transition-all duration-500 || fo,do<text-black'text-xs'-translate-y-5.5'bg-white> ac<text-gray-900>"`
 * @property {string} noticeCt **CNR**. Default Styles: `"|| ta<self-start>"`
 */
const DIRECTED_STYLES = {
  ct: "relative flex items-center justify-between text-base inline-block pb-2 pt-3 px-4 text-light border-1 border-gray-400 rounded-lg outline-none || ac<border-gray-800> do<border-gray-400>",
  input: "w-full border-none outline-none",
  label: "absolute left-2 top-3 -translate-y-px px-2 cursor-text text-light text-italic text-gray-500 transform transition-all duration-500 || fo,do<text-black'text-xs'-translate-y-5.5'bg-white> ac<text-gray-900>",
  noticeCt: "|| ta<self-start>"
};

//prettier-ignore
const INDICATORS = [
  { key: "done", directive: "do", condition: (p) => !p.focused && p.value.length > 0 },
  { key: "focus", directive: "fo", condition: (p) => p.focused },
  { key: "active", directive: "ac", condition: (p) => p.hovered || p.focused },
  { key: "maxed", directive: "mx", condition: (p) => p.maxLength && p.value.length >= p.maxLength },
  { key: "textArea", directive: "ta", condition: p => p.textarea }
];

/**
 * @typedef {import("@static/tailwind/useIndicatedStyles").Indicator} Indicator
 * @typedef {import("@static/tailwind/useIndicatedStyles").ConditionParams} ConditionParams
 * */

export default CuteInput;
