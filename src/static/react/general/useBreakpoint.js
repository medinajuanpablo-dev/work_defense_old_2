import React from "react";

import { checkRequiredValues } from "@static/functions";
import { INTERFACE, ITK } from "@static/contexts/interface"; //Remove this and import or define your app's breakpoints instead.

const BPW = INTERFACE.BREAKPOINTS_WIDTHS;

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
    checkRequiredValues([{ bpName, enmr: Object.keys(BPW) }]);

    const deviceWidth = BPW[currentBpKey];
    const anotherDeviceWidth = BPW[bpName];

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

  for (let bpKey of SORTED_BREAKPOINTS) if (width > BPW[bpKey]) return bpKey;
}

const SORTED_BREAKPOINTS = Object.keys(BPW).sort(
  (bp1, bp2) => BPW[bp2] - BPW[bp1]
);

const LAST_MOBILE_BREAKPOINT = ITK.BREAKPOINTS.VERTICAL_TABLET;

export default useBreakpoint;
