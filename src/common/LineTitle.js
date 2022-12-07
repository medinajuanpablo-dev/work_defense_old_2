import React from "react";

import { useIndicatedStyles } from "@static/tailwind";
import { typeOf } from "@static/functions";

/**
 * @param {Object} props
 * @param {"default" | "smaller" | "larger"} props.size
 * @param {boolean} props.subtitle
 * @param {"y-large" | "t-large" | "b-large" | "y-small" | "t-small" | "b-small" | "none"} props.margin
 * @param {any} props.customDirSty
 */
function LineTitle({
  size = "default",
  margin = "t-large",
  children,
  subtitle,
  customDirSty,
}) {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES, { customDirSty });

  //prettier-ignore
  const styles = getActiveStyles({ subtitle, size, margin });

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
  ct: "flex items-center || yl<my-6> tl<mt-6> bl<mb-6> ys<my-3> ts<mt-3> bs<mb-3> st<w-3/4'mx-auto>",
  line: "flex-1 h-0 border-t-1 border-gray-500 || st<border-gray-300>",
  text: "flex-initial text-light text-gray-500 px-3 text-lg || sm<text-base> lg<text-xl>",
};

//prettier-ignore
const INDICATORS = [
  { key: "subtitle", directive: "st", condition: (p) => p.subtitle },
  { key: "smaller", directive: "sm", condition: (p) => p.size == "smaller" },
  { key: "larger", directive: "lg", condition: (p) => p.size == "larger" },

  { key: "my-large", directive: "yl", condition: p => p.margin == "y-large" },
  { key: "mt-large", directive: "tl", condition: p => p.margin == "t-large" },
  { key: "mb-large", directive: "bl", condition: p => p.margin == "b-large" },
  { key: "my-small", directive: "ys", condition: p => p.margin == "y-small" },
  { key: "mt-small", directive: "ts", condition: p => p.margin == "t-small" },
  { key: "mb-small", directive: "bs", condition: p => p.margin == "b-small" },
];

export default LineTitle;
