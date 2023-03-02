import { merge as mergeObjects, cloneDeep } from "lodash";
import { useState } from "react";

import {
  checkRequiredValues,
  checkOptionalValues,
  typeOf,
} from "@static/functions";

/**
 * This hook enhances the default `useState` to make it easier to handle an Object state.
 * - _Want to update just some fields and leave the rest unaffected?_ Use the `merge` function passing
 * it the updated fields, and it will merge those fields into the state without touching the rest.
 * This will, of course, provoke a re-render.
 *
 * @template T
 * @param {T | () => T} initialState The initial state. Is `null` by default.
 */
function useObjectState(initialState = null) {
  checkOptionalValues([{ initialState, type: ["object", "function"] }]);

  const [state, setState] = useState(() =>
    cloneDeep(typeOf(initialState, "function") ? initialState() : initialState)
  );

  /**
   * Replaces the object state.
   *
   * The callback will receive a deep copy of the previous state, so it can be safely mutated and returned and still provoke a
   * re-render. No need to manually clone it.
   *
   * _A case where this won't work_: As this function will always trigger an update, it's not useful on the case of using the callback
   * with the previous state to "decide" whether to update or not. For that purpose use the `rawSet` function.
   *
   * @param {T | (prev: T) => T} newState The full new state, or a callback that shall return the full new state.
   */
  function replace(newState) {
    checkRequiredValues([{ newState, type: ["object", "function"] }]);

    if (typeOf(newState, "object")) setState(cloneDeep(newState));
    else setState((prev) => newState(cloneDeep(prev)));
  }

  /**
   * Deeply merges the specified object `partialState` into the object state.
   * By default, the merging object can't contain fields the current state doesn't have.
   *
   * _Note_: Use this function with caution to update a state containing a list of objects. For example,
   * if the state is something like `{ list: listOfObjects, ...otherFields }`, the merge won't do anything when
   * passing a smaller `list`.
   * @param {T} partialState The object to merge.
   * @param {boolean} allowNewFields If `true`, the merging object may contain new fields (the current state doesn't have) that will be added.
   */
  function merge(partialState, allowNewFields) {
    checkRequiredValues([
      { allowNewFields, req: false, type: "boolean" },
      {
        partialState,
        type: "object",
        onlyFields: allowNewFields ? undefined : Object.keys(state),
      },
    ]);

    setState((prev) => mergeObjects(cloneDeep(prev), partialState));
  }

  return {
    /**@type {T} */
    get: state,
    replace,
    merge,

    /**
     * Just the raw "original" setState provided by the `useState` hook. Doesn't clone the previous state when using a function.
     *
     * _Probable use case:_ Check something on the previous state with the callback form, to decide if effectively updating or not.
     */
    rawSet: setState,
  };
}

export default useObjectState;
