import React from "react";

import { useIndicatedStyles } from "@static/tailwind";

/**A fast-use button with a ton of customization props to quickly fit every possible need and keep everything standarized.
 *
 * @param {Object} props
 * @param {string | JSX.Element} props.children The button content; most likely text.
 * @param {React.Component} props.Icon The Component of the icon to display inside the button. Can be alone.
 * @param {"default" | "larger" | "smaller"} props.size Prestyled sizes for font and spaces.
 * @param {"left" | "right"} props.iconSide The side of the `Icon` relative to the `text`. Is `left` by default.
 * @param {"slate" | "purple" | "indigo" | "red" | "orange" | "yellow" | "emerald"} props.color Prestyled colors for border and font (including the `Icon`). Is `slate` by default.
 * @param {"default" | "lighter" | "stronger"} props.colorStrength Determines the strength of the selected color.
 * @param {"default" | "faster" | "slower" | "instant"} props.transitionSpeed The `default` speed is 300ms, changing in +150ms or -150ms with `slower` or `faster` respectively, while `instant` will remove the transition.
 * @param {StylesObject} props.customDirSty An object containing directed styles for each element rendered by the component. They can be non-directed if needed.
 * @param {"outline-and-filled" | "always-outline" | "always-filled"} props.stylesBehavior Tells how the colors should behave on hover and focus.
 * - `outline-and-filled`:  _This is the default behavior_. Will be outline by default and filled on hover or focus.
 * - `always-outline`: Will be always outline, but with changed color strength on hover or focus.
 * - `always-filled`: Will be always filled, but with changed color strength on hover or focus.
 */
function CuteButton({
  children,
  Icon,
  size = "default",
  iconSide = "left",
  color = "slate",
  colorStrength = "default",
  transitionSpeed = "default",
  stylesBehavior,
  customDirSty,
  ...buttonProps
}) {
  //prettier-ignore
  const dirSty = { ...DIRECTED_STYLES, color: COLOR_STYLES[colorStrength][color] };
  const iconOnly = !children;

  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, dirSty, { customDirSty });

  //prettier-ignore
  const styles = getActiveStyles({ size, iconSide, color, iconOnly, transitionSpeed, stylesBehavior });

  return (
    <button {...buttonProps} className={styles.button + " " + styles.color}>
      {Icon && iconSide == "left" && <Icon className={styles.icon} />}
      {children}
      {Icon && iconSide == "right" && <Icon className={styles.icon} />}
    </button>
  );
}

//prettier-ignore
/**
 * @typedef {Object} StylesObject
 * @property {string} button Default Styles: `"flex mx-auto items-center justify-center py-2 px-8 border-1 rounded-md transition-color duration-300 || it<transition-none> ft<duration-150> st<duration-450> sm<text-sm'px-6> lg<text-lg'px-10>"`
 * @property {string} icon Default Styles: `"text-lg | io<ml-0'mr-0> il<mr-2> ir<ml-2> sm<text-base> lg<text-xl>"`
 */
const DIRECTED_STYLES = {
  button: "flex mx-auto items-center justify-center py-2 px-8 border-1 rounded-md transition-color duration-300 || it<transition-none> ft<duration-150> st<duration-450> sm<text-sm'px-6> lg<text-lg'px-10>",
  icon: "text-lg | io<ml-0'mr-0> il<mr-2> ir<ml-2> sm<text-base> lg<text-xl>",
};

//prettier-ignore
const INDICATORS = [
  { key: "smaller", directive: "sm", condition: (p) => p.size == "smaller" },
  { key: "larger", directive: "lg", condition: (p) => p.size == "larger" },
  { key: "iconRight", directive: "ir", condition: (p) => p.iconSide == "right"},
  { key: "iconLeft", directive: "il", condition: (p) => p.iconSide == "left" },
  { key: "iconOnly", directive: "io", condition: (p) => p.iconOnly },
  { key: "fasterTransition", directive: "ft", condition: (p) => p.transitionSpeed == "faster" },
  { key: "slowerTransition", directive: "st", condition: (p) => p.transitionSpeed == "slower" },
  { key: "instantTransition", directive: "it", condition: (p) => p.transitionSpeed == "instant" },

  { key: "always-outline", directive: "ao", condition: (p) => p.stylesBehavior == "always-outline" },
  { key: "always-filled", directive: "af", condition: (p) => p.stylesBehavior == "always-filled" },
];

//prettier-ignore
//What a fucking mess...
const COLOR_STYLES = {
  default: {
    slate: "text-slate-600 border-slate-400 hover:text-slate-100 hover:bg-slate-600 focus:text-slate-100 focus:bg-slate-400 || "
    + " ao<hover:text-slate-700'hover:border-slate-500'focus:border-slate-400'hover:bg-transparent'focus:text-slate-500'focus:bg-transparent>"
    + " af<text-slate-100'bg-slate-500>",
  
    purple: "text-purple-600 border-purple-400 hover:text-slate-100 hover:bg-purple-600 focus:text-slate-100 focus:bg-purple-400 || "
      + " ao<hover:text-purple-700'hover:border-purple-500'focus:border-purple-400'hover:bg-transparent'focus:text-purple-500'focus:bg-transparent>"
      + " af<text-slate-100'bg-purple-500>",
    
    indigo: "text-indigo-600 border-indigo-400 hover:text-slate-100 hover:bg-indigo-600 focus:text-slate-100 focus:bg-indigo-400 || "
      + " ao<hover:text-indigo-700'hover:border-indigo-500'focus:border-indigo-400'hover:bg-transparent'focus:text-indigo-500'focus:bg-transparent>"
      + " af<text-slate-100'bg-indigo-500>",
    
    red: "text-red-600 border-red-400 hover:text-slate-100 hover:bg-red-500 focus:text-slate-100 focus:bg-red-400 || "
      + " ao<hover:text-red-700'hover:border-red-500'focus:border-red-400'hover:bg-transparent'focus:text-red-500'focus:bg-transparent>"
      + " af<text-slate-100'bg-red-500>",
    
    orange: "text-orange-600 border-orange-400 hover:text-slate-100 hover:bg-orange-600 focus:text-slate-100 focus:bg-orange-400 || "
      + " ao<hover:text-orange-700'hover:border-orange-500'focus:border-orange-400'hover:bg-transparent'focus:text-orange-500'focus:bg-transparent>"
      + " af<text-slate-100'bg-orange-500>",
    
    yellow: "text-yellow-600 border-yellow-400 hover:text-slate-100 hover:bg-yellow-500 focus:text-slate-100 focus:bg-yellow-400 || "
      + " ao<hover:text-yellow-700'hover:border-yellow-500'focus:border-yellow-400'hover:bg-transparent'focus:text-yellow-500'focus:bg-transparent>"
      + " af<text-slate-100'bg-yellow-500>",
    
    emerald: "text-emerald-600 border-emerald-400 hover:text-slate-100 hover:bg-emerald-600 focus:text-slate-100 focus:bg-emerald-400 || "
      + " ao<hover:text-emerald-700'hover:border-emerald-500'focus:border-emerald-400'hover:bg-transparent'focus:text-emerald-500'focus:bg-transparent>"
      + " af<text-slate-100'bg-emerald-500>",
  },
  lighter: {
    slate: "text-slate-500 border-slate-300 hover:text-slate-100 hover:bg-slate-500 focus:text-slate-100 focus:bg-slate-300 || "
      + " ao<hover:text-slate-600'hover:border-slate-400'focus:border-slate-300'hover:bg-transparent'focus:text-slate-400'focus:bg-transparent>"
      + " af<text-slate-100'bg-slate-400>",
  
    purple: "text-purple-500 border-purple-300 hover:text-slate-100 hover:bg-purple-500 focus:text-slate-100 focus:bg-purple-300 || "
      + " ao<hover:text-purple-600'hover:border-purple-400'focus:border-purple-300'hover:bg-transparent'focus:text-purple-400'focus:bg-transparent>"
      + " af<text-slate-100'bg-purple-400>",
    
    indigo: "text-indigo-500 border-indigo-300 hover:text-slate-100 hover:bg-indigo-500 focus:text-slate-100 focus:bg-indigo-300 || "
      + " ao<hover:text-indigo-600'hover:border-indigo-400'focus:border-indigo-300'hover:bg-transparent'focus:text-indigo-400'focus:bg-transparent>"
      + " af<text-slate-100'bg-indigo-400>",
    
    red: "text-red-500 border-red-300 hover:text-slate-100 hover:bg-red-500 focus:text-slate-100 focus:bg-red-300 || "
      + " ao<hover:text-red-600'hover:border-red-400'focus:border-red-300'hover:bg-transparent'focus:text-red-400'focus:bg-transparent>"
      + " af<text-slate-100'bg-red-400>",
    
    orange: "text-orange-500 border-orange-300 hover:text-slate-100 hover:bg-orange-500 focus:text-slate-100 focus:bg-orange-300 || "
      + " ao<hover:text-orange-600'hover:border-orange-400'focus:border-orange-300'hover:bg-transparent'focus:text-orange-400'focus:bg-transparent>"
      + " af<text-slate-100'bg-orange-400>",
    
    yellow: "text-yellow-500 border-yellow-300 hover:text-slate-100 hover:bg-yellow-500 focus:text-slate-100 focus:bg-yellow-300 || "
      + " ao<hover:text-yellow-600'hover:border-yellow-400'focus:border-yellow-300'hover:bg-transparent'focus:text-yellow-400'focus:bg-transparent>"
      + " af<text-slate-100'bg-yellow-400>",
    
    emerald: "text-emerald-400 border-emerald-300 hover:text-slate-100 hover:bg-emerald-500 focus:text-slate-100 focus:bg-emerald-300 || "
      + " ao<hover:text-emerald-600'hover:border-emerald-400'focus:border-emerald-300'hover:bg-transparent'focus:text-emerald-400'focus:bg-transparent>"
      + " af<text-slate-100'bg-emerald-400>",
  },
  stronger: {
    slate: "text-slate-700 border-slate-500 hover:text-slate-100 hover:bg-slate-700 focus:text-slate-100 focus:bg-slate-500 || "
    + " ao<hover:text-slate-800'hover:border-slate-600'focus:border-slate-500'hover:bg-transparent'focus:text-slate-600'focus:bg-transparent>"
    + " af<text-slate-100'bg-slate-600>",
  
    purple: "text-purple-700 border-purple-500 hover:text-slate-100 hover:bg-purple-700 focus:text-slate-100 focus:bg-purple-500 || "
      + " ao<hover:text-purple-800'hover:border-purple-600'focus:border-purple-500'hover:bg-transparent'focus:text-purple-600'focus:bg-transparent>"
      + " af<text-slate-100'bg-purple-600>",
    
    indigo: "text-indigo-700 border-indigo-500 hover:text-slate-100 hover:bg-indigo-700 focus:text-slate-100 focus:bg-indigo-500 || "
      + " ao<hover:text-indigo-800'hover:border-indigo-600'focus:border-indigo-500'hover:bg-transparent'focus:text-indigo-600'focus:bg-transparent>"
      + " af<text-slate-100'bg-indigo-600>",
    
    red: "text-red-700 border-red-500 hover:text-slate-100 hover:bg-red-700 focus:text-slate-100 focus:bg-red-500 || "
      + " ao<hover:text-red-800'hover:border-red-600'focus:border-red-500'hover:bg-transparent'focus:text-red-600'focus:bg-transparent>"
      + " af<text-slate-100'bg-red-600>",
    
    orange: "text-orange-700 border-orange-500 hover:text-slate-100 hover:bg-orange-700 focus:text-slate-100 focus:bg-orange-500 || "
      + " ao<hover:text-orange-800'hover:border-orange-600'focus:border-orange-500'hover:bg-transparent'focus:text-orange-600'focus:bg-transparent>"
      + " af<text-slate-100'bg-orange-600>",
    
    yellow: "text-yellow-700 border-yellow-500 hover:text-slate-100 hover:bg-yellow-700 focus:text-slate-100 focus:bg-yellow-500 || "
      + " ao<hover:text-yellow-800'hover:border-yellow-600'focus:border-yellow-500'hover:bg-transparent'focus:text-yellow-600'focus:bg-transparent>"
      + " af<text-slate-100'bg-yellow-600>",
    
    emerald: "text-emerald-700 border-emerald-500 hover:text-slate-100 hover:bg-emerald-700 focus:text-slate-100 focus:bg-emerald-500 || "
      + " ao<hover:text-emerald-800'hover:border-emerald-600'focus:border-emerald-500'hover:bg-transparent'focus:text-emerald-600'focus:bg-transparent>"
      + " af<text-slate-100'bg-emerald-600>",
  },
};

export default CuteButton;
