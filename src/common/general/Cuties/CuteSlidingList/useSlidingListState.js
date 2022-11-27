import { useRef } from "react";
import { isEmpty } from "lodash";

import { useObjectState } from "@static/react";
import { checkOptionalValues } from "@static/functions";

/**
 * Hook to ease the use of the `CuteSlidingList` component.
 *
 * Exposes three basic functions `replace`, `add`, `remove` to easily manage the state.
 *
 * @template T
 * @param {{[key: string]: T}} initialItems Must be a normal, keyed `object`.
 */
function useSlidingListState(initialItems = {}) {
  checkOptionalValues([{ initialItems, type: "object" }]);

  const state = useObjectState(initialItems);

  const { current: cv } = useRef({
    count: Object.keys(initialItems).length + 1,
  });

  return {
    /**The current items.
     * @type {{[key: string]: T}} */
    get: state.get,
    /**
     * Adds the specified items to the list.
     * @param  {...T} itemsList
     */
    add(...itemsList) {
      for (let item of itemsList) {
        state.merge({ [cv.count]: item }, true);
        cv.count++;
      }
    },
    /**
     * Removes the items with the specified keys from the list.
     * @param  {...string} itemsKeys
     */
    remove(...itemsKeys) {
      state.replace((itemsList) => {
        for (let i of itemsKeys) delete itemsList[i];
        return itemsList;
      });
    },
    /**
     * Completely replaces the items list with the specified one.
     * @param {{[key: string]: T}} newItems
     */
    replace(newItems) {
      state.replace(newItems);
    },
  };
}

export default useSlidingListState;
