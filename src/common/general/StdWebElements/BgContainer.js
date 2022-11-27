import React from "react";

import { useIndicatedStyles } from "@static/tailwind";
import { checkOptionalValues } from "@static/functions";

/**
 * Container for a page's section with image background. Allows the image to be width-fluid (filling whole page width)
 * while keeping the content with limited width. It also allows an overlay with discrete opacity.
 * @param {Object} props
 * @param {"light" | "medium" | "strong" | "very-strong" } props.overlay The overlay strength over the background. Leave `undefined` to disable.
 * @param {string} props.bgClassName Classes for the background's fluid container.
 * @param {string} props.className Classes for the content's container.
 * @param {string} props.imgSrc The background image source string.
 */
function BgContainer({
  children,
  bgClassName,
  imgSrc,
  className,
  overlay,
  ...props
}) {
  checkOptionalValues([
    { overlay, enmr: ["light", "medium", "strong", "very-strong"] },
    [{ bgClassName, className, imgSrc }, "s", "s", "!s"],
  ]);

  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES);

  const styles = getActiveStyles({ overlay });

  const content = (
    <div className={styles.contentCt + " " + className} {...props}>
      {children}
    </div>
  );

  return (
    <div className={bgClassName} style={{ backgroundImage: `url(${imgSrc})` }}>
      {overlay ? <div className={styles.overlay}>{content} </div> : content}
    </div>
  );
}

//prettier-ignore
const DIRECTED_STYLES = {
  contentCt: "max-w-screen-2xl mx-auto",
  overlay: "w-full h-full || ol<bg-black'bg-opacity-25> om<bg-black'bg-opacity-40> os<bg-black'bg-opacity-60> ov<bg-black'bg-opacity-80>",
};

//prettier-ignore
const INDICATORS = [
  {key: "light", directive: "ol", condition: p => p.overlay == "light"},
  {key: "medium", directive: "om", condition: p => p.overlay == "medium"},
  {key: "strong", directive: "os", condition: p => p.overlay == "strong"},
  {key: "very-strong", directive: "ov", condition: p => p.overlay == "very-strong"},
]

export default BgContainer;
