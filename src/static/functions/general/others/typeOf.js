import {
  ValidType,
  VALID_TYPES,
} from "@static/functions/general/control/checkValues";

/**
 * This function has two functionalities:
 *
 * - With 1 param: Same as the `typeof` keyword, but recognizes `"array"` and `"null"` as separated types from `"object"`.
 * - With 2 params: Checks that `value`'s type is equal to `isOfType`.
 * @param {any} value The value which type is required.
 * @param {ValidType} isOfType If specified, checks that value is of this type.
 * @returns  The value's type.
 */
function typeOf(value, isOfType) {
  var type;

  if (Array.isArray(value)) type = "array";
  else if (value === null) type = "null";
  else type = typeof value;

  //Check type.
  if (isOfType) {
    if (!VALID_TYPES.includes(isOfType))
      throw Error("Invalid type to check: " + isOfType);

    return type === isOfType;
  }
  //Return type.
  else return type;
}

export default typeOf;
