import { checkRequiredValues } from "@static/functions";

/**
 * Splits the `str` string with the specified `separator`, then checks if each
 * sub-string contains the specified `filter`, returning those that does and those that don't.
 *
 * @param {string} str The string to split and filter.
 * @param {string} separator The string that separates each sub-string.
 * @param {string} filter The string that should be included on a string.
 * @param {boolean} excludeFilter If `true`, the passing strings exclude the filter from them.
 * @returns An object with two arrays: `{ passed, notPassed }`.
 */
function splitAndFilter(str, separator, filter, excludeFilter) {
  checkRequiredValues([
    [{ str, separator, filter, excludeFilter }, "s", "s", "s", "?b"],
  ]);

  const arr = str.split(separator);

  const passed = [];
  const notPassed = [];

  for (let s of arr) {
    if (s.includes(filter))
      passed.push(excludeFilter ? s.replace(filter, "") : s);
    else notPassed.push(s);
  }

  return { passed, notPassed };
}

export default splitAndFilter;
