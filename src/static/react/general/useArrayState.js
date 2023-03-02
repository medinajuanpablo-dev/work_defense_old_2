import { merge as mergeObjects, cloneDeep } from "lodash";
import { useState } from "react";

import { checkRequiredValues, typeOf } from "@static/functions";

/**Hook for easily handling an array state. Returns an `item` property that contains useful functions to handle items.
 * All of them documented individually.
 * @template T
 * @param {Array<T> | () => Array<T>} initialState The initial state. Is `null` by default.
 */
function useArrayState(initialState = null) {
  checkRequiredValues([{ initialState, type: ["array", "function"] }]);

  const [array, setArray] = useState(
    cloneDeep(typeOf(initialState, "function") ? initialState() : initialState)
  );

  //Whole-array functions.

  /**
   * Completely replaces the array state with the specified one.
   *
   * The callback will receive a deep copy of the previous state, so it can be safely mutated and returned and still provoke a
   * re-render. No need to manually clone it.
   *
   * _A case where this won't work_: As this function will always trigger an update, it's not useful on the case of using the callback
   * with the previous state to "decide" whether to update or not. For that purpose use the `rawSet` function.
   *
   * @param {React.SetStateAction<Array<T>>} newState The array that will be the new state.
   */
  function replace(newState) {
    checkRequiredValues([{ newState, type: ["array", "function"] }]);

    if (typeOf(newState, "array")) setArray(cloneDeep(newState));
    else setArray((prev) => newState(cloneDeep(prev)));
  }

  /**
   * Adds the passed array at the end of the current array state.
   *
   * The callback will receive a deep copy of the previous state, so it can be safely mutated and returned and still provoke a
   * re-render. No need to manually clone it.
   *
   * @param {Array<T> | (prev: T) => Array<T>} array The array to concat. Can be a callback that receives the current array state as only parameter.
   */
  function concat(array) {
    checkRequiredValues([{ array, type: ["array", "function"] }]);

    setArray((prev) => {
      const prevClone = cloneDeep(prev);
      if (typeOf(array, "function")) return prevClone.concat(array(prevClone));
      else return prevClone.concat(array);
    });
  }

  //Per-item functions.

  /**
   * Sets the item in the specified `index`. The passed `newItem` will replace the previous item by default, but it can also be
   * a `function` (which will receive the previous item) or, if it's an `object`, can be _merged_ with the previous item.
   * @param {number} index The position of the item to set.
   * @param {T | (prevItem: T) => T } newItem The new value to set.
   * @param {boolean} doMerge If `true` and the item is an `object`, the `newItem` will be _merged_ into the previous one.
   */
  function setItem(index, newItem, doMerge) {
    checkRequiredValues([
      { index, type: "number", ch: (v) => v >= 0 && v < array.length },
      [{ newItem, doMerge }, "", "?boolean"],
    ]);

    setArray((prev) => {
      const prevClone = cloneDeep(prev);

      switch (typeof newItem) {
        case "object":
          if (doMerge && prevClone[index])
            prevClone[index] = mergeObjects(prevClone[index], newItem);
          else prevClone[index] = newItem;
          break;

        case "function":
          prevClone[index] = newItem(prevClone[index]);
          break;

        default:
          prevClone[index] = newItem;
      }

      return prevClone;
    });
  }

  /**
   * Adds the specified `item` at the end of the array state. This will provoke a re-render.
   * @param {T} item The item to add.
   */
  function pushItem(item) {
    checkRequiredValues([{ item }]);
    setArray((prev) => [...prev, item]); //Shallow copy is enough to make React re-render.
  }

  /**
   * Removes the item at the specified `index`. This will provoke a re-render.
   * @param {number} index The position of the item to be removed.
   */
  function removeItem(index) {
    checkRequiredValues([
      { index, type: "number", ch: (v) => v >= 0 && v <= array.length - 1 },
    ]);
    setArray((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  }

  return {
    /** The current array state.
     * @type {Array<T>} */
    get: array,
    /**Whole-array management functions. */
    wholeArray: {
      replace,
      concat,
      /**
       * Just the raw "original" setState provided by the `useState` hook. Doesn't clone the previous state when using a function.
       *
       * _Probable use case:_ Check something on the previous state with the callback form, to decide if effectively updating or not.
       */
      rawSet: setArray,
    },
    /**Per-item management functions. */
    perItem: {
      set: setItem,
      push: pushItem,
      remove: removeItem,
    },
  };
}

export default useArrayState;
