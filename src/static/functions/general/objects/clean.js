import { isEmpty } from "lodash";

import { checkRequiredValues, typeOf } from "@static/functions";

/**
 * Deletes fields of various types from every specified object. An array of exceptions is accepted to specify which falsy values should not be deleted.
 *
 * Deleted types by default: `null`, `undefined`, zero, `false`, negative numbers, empty arrays or objects.
 *
 * **Warning**: This function mutates the provided objects.
 * @param {Array<{[x: string]: any}>} objectsList The array of objects to clean. Can be a single object too.
 * @param {Array<"null" | "undefined" | "zero" | "false" | "negative" | "empty">} exceptions
 */
function clean(objectsList, exceptions = []) {
  checkRequiredValues([
    { objectsList, type: ["array"] },
    {
      exceptions,
      type: "array",
      ch: (v) => v.every((i) => EXCEPTIONS.includes(i)),
    },
  ]);

  const _objectsList = Array.isArray(objectsList) ? objectsList : [objectsList];

  const exc = {
    null: exceptions.includes("null"),
    undefined: exceptions.includes("undefined"),
    zero: exceptions.includes("zero"),
    false: exceptions.includes("false"),
    negative: exceptions.includes("negative"),
    empty: exceptions.includes("empty"),
  };

  for (let object of _objectsList) {
    for (let key in object) {
      const v = object[key];

      if (!exc.null && v === null) delete object[key];
      else if (!exc.undefined && v === undefined) delete object[key];
      else if (!exc.zero && v === 0) delete object[key];
      else if (!exc.false && v === false) delete object[key];
      else if (!exc.negative && v < 0) delete object[key];
      else if (
        !exc.empty &&
        (typeOf(v, "object") || typeOf(v, "array")) &&
        isEmpty(v)
      )
        delete object[key];
    }
  }
}

const EXCEPTIONS = ["null", "undefined", "zero", "false", "number", "empty"];

export default clean;
