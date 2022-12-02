import React from "react";

import { useIndicatedStyles } from "@static/tailwind";
import { typeOf } from "@static/functions";

/**
 * @param {Object} props
 * @param {"default" | "smaller" | "larger"} props.size
 * @param {boolean} props.subtitle
 * @param {any} props.customDirSty
 */
function LineTitle({ size = "default", children, subtitle, customDirSty }) {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES, { customDirSty });

  //prettier-ignore
  const styles = getActiveStyles({ subtitle, size });

  return (
    <div className={styles.ct}>
      <div className={styles.line} />
      {typeOf(children, "string") ? (
        <p className={styles.text}>{children}</p>
      ) : (
        children
      )}
      <div className={styles.line} />
    </div>
  );
}

//prettier-ignore
const DIRECTED_STYLES = {
  ct: "mt-4 flex items-center || sm<mt-2> lg<mt-6> st<w-3/4'mx-auto>",
  line: "flex-1 h-0 border-t-1 border-gray-700 || st<border-gray-400>",
  text: "flex-initial text-gray-800 text-opacity-90 px-3 text-xl || sm<text-base> lg<text-2xl>",
};

//prettier-ignore
const INDICATORS = [
  { key: "subtitle", directive: "st", condition: (p) => p.subtitle },
  { key: "smaller", directive: "sm", condition: (p) => p.size == "smaller" },
  { key: "larger", directive: "lg", condition: (p) => p.size == "larger" },
];

export default LineTitle;
