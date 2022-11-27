import React from "react";

import { checkRequiredValues } from "@static/functions";
import { BREAKPOINTS_WIDTHS } from "@static/values/config"; //Remove this and import or define your app's breakpoints instead.
import { BREAKPOINTS as BPK } from "@static/values/keys";

/**
 * Hook to quickly use reactive breakpoints for responsive behaviors.
 *
 * Returns the current breakpoint name as `name` and a function `isWiderThan` to know if the
 * current breakpoint is wider than a specified one.
 *
 * @returns An object `{ name, isWiderThan }`
 */
function useBreakpoint() {
  const [currentBpKey, setCurrentBpKey] = React.useState(getCurrentBP);

  React.useEffect(() => {
    const updateBreakpoint = () => setCurrentBpKey(getCurrentBP());
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  /**Checks if the current breakpoint is wider than the specified one.
   *
   * @param {string} bpName Breakpoint to compare with the current one.
   * @returns {boolean} The check result.
   */
  function isWiderThan(bpName) {
    checkRequiredValues([{ bpName, enmr: Object.keys(BREAKPOINTS_WIDTHS) }]);

    const deviceWidth = BREAKPOINTS_WIDTHS[currentBpKey];
    const anotherDeviceWidth = BREAKPOINTS_WIDTHS[bpName];

    return deviceWidth > anotherDeviceWidth;
  }

  /**Sugar for checking for the desktop breakpoint.
   * @returns {boolean} `true` if the current screen width is considered "Desktop", `false` otherwise.
   */
  function isDesktop() {
    return isWiderThan(LAST_MOBILE_BREAKPOINT);
  }

  return { name: currentBpKey, isWiderThan, isDesktop };
}

function getCurrentBP() {
  const width = window.innerWidth;

  for (let bpKey of SORTED_BREAKPOINTS)
    if (width > BREAKPOINTS_WIDTHS[bpKey]) return bpKey;
}

const SORTED_BREAKPOINTS = Object.keys(BREAKPOINTS_WIDTHS).sort(
  (bp1, bp2) => BREAKPOINTS_WIDTHS[bp2] - BREAKPOINTS_WIDTHS[bp1]
);

const LAST_MOBILE_BREAKPOINT = BPK.VERTICAL_TABLET;

export default useBreakpoint;
