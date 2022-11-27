/**
 * Checks if a value exists. A value doesn't exist if it's `null` or `undefined`.
 * @param {any} value The value to check it's existence.
 * @returns {boolean} `false` if the value doesn't exist; `true` otherwise.
 */

function exists(value) {
  return value !== undefined && value !== null;
}

export default exists;
