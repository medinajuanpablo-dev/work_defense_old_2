/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { sumItems, checkOptionalValues } from "@static/functions";
import { useIndicatedStyles } from "@static/tailwind";
import { useObjectState } from "@static/react";

import a from "./useSlidingListState";

/**
 * Display a List of items that smoothly slide when adding or removing them.
 *
 * Has a set of important _limitations_ that must be understood before use.
 *
 * **NOTE**: When talking about `length` we refer to the `width` when using horizontal direction, and `height` when using vertical direction.
 *
 * ---
 *
 * ### **Limitations**
 * 1. **REQUIRES** that the `items` list is a normal, keyed `object`. Any other type will throw an error.
 * 2. **REQUIRES** that the key of each `item` is completely different from any item that existed since the mounting of the Component. In other case, the `removing` behavior will not work properly.
 * 3. All items are `absolute`ly positioned, so the container sizes won't scale with them and must be manually set.
 *
 * ### **useSlidingListState**
 * This hook automatically complies with the requirements and makes it a lot easier and faster to use the Component.
 *
 * _You may use the example code as a template on how to use this Component._
 *
 * @param {Object} props
 * @param {{[itemKey: string]: any}} props.items The list of items. It's recommended to build them with the output of `useSlidingListState`.
 * @param {number} props.offset The translation offset for all items, in pixels.
 * @param {"horizontal" | "vertical" | "reverse-horizontal" | "reverse-vertical"} props.direction
 * @param {StylesObject} props.customDirSty An object to specify directed styles to any of the component's rendered elements, except the Items.
 * @param {ItemStylesObject} props.itemsCustomDirSty An object to specify directed styles to any of an Items's rendered elements.
 */
function CuteSlidingList({
  items,
  offset = 0,
  direction = "horizontal",
  customDirSty,
  itemsCustomDirSty,
}) {
  //prettier-ignore
  checkOptionalValues([
    { items, req: true, type: "object" },
    { offset, type: "number" },
    { direction, enmr: ["horizontal", "vertical", "reverse-horizontal", "reverse-vertical"] },
  ])

  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES, {customDirSty});
  const lengths = useObjectState({});

  const [isReverse, isVertical] = React.useMemo(
    () => [direction.includes("reverse"), direction.includes("vertical")],
    [direction]
  );

  //If items are emptied also empty the widths.
  React.useEffect(() => {
    if (Object.keys(items).length == 0 && Object.keys(lengths.get).length > 0)
      lengths.replace({});
  }, [items]);

  /**Get an item's exact translation based on other items widths */
  function getTranslation(itemKey) {
    //Get the keys of all items after the specified item.
    const itemsKeys = Object.keys(items);
    const itemIndex = itemsKeys.findIndex((it) => it == itemKey);
    const afterItemsKeys = itemsKeys.slice(itemIndex);

    //Calculate the length sum of all after items.
    const widthSum = sumItems(afterItemsKeys.map((it) => lengths.get[it]));

    const translation = widthSum - offset;

    return isReverse ? -translation : translation;
  }

  /**Save item length if existant and not already saved. */
  function saveItemLength(itemKey, w) {
    if (w > 0 && !lengths.get[itemKey]) lengths.merge({ [itemKey]: w }, true);
  }

  const styles = getActiveStyles({ direction });

  return (
    <div className={styles.ct}>
      {Object.keys(items).map((it) => (
        <Item
          saveLength={(w) => saveItemLength(it, w)}
          key={it}
          translation={getTranslation(it)}
          content={items[it]}
          vertical={isVertical}
          customDirSty={itemsCustomDirSty}
        />
      ))}
    </div>
  );
}

//prettier-ignore
/**
 * @typedef {Object} StylesObject
 * @property {string} ct **CNR**. Default Styles: `"flex || vt<flex-column> rhz<flex-row-reverse> rvt<flex-column-reverse>"`
 */
const DIRECTED_STYLES = {
  ct: "vt<flex-column> rhz<flex-row-reverse> rvt<flex-column-reverse>",
};

//prettier-ignore
const INDICATORS = [
  { key: "horizontal", directive: "hz", condition: p => p.direction == "horizontal" },
  { key: "vertical", directive: "vt", condition: p => p.direction == "vertical" },
  { key: "reverse-horizontal", directive: "rhz", condition: p => p.direction == "reverse-horizontal" },
  { key: "reverse-vertical", directive: "rvt", condition: p => p.direction == "reverse-vertical" },
]

function Item({ content, saveLength, translation, vertical, customDirSty }) {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(ITEM_INDICATORS, ITEM_DIRECTED_STYLES, { customDirSty });

  const visible = content && content != "removed";
  const styles = getActiveStyles({ visible });

  return (
    <div
      ref={(r) => r && saveLength(vertical ? r.offsetHeight : r.offsetWidth)}
      style={{
        transform: `translate${vertical ? "Y" : "X"}(${translation}px)`,
      }}
      className={styles.ct}
    >
      {content}
    </div>
  );
}

/**
 * @typedef {Object} ItemStylesObject
 * @property {string} ct **CNR**. Default Styles: `"absolute transition-all duration-500 opacity-100 || vi<opacity-0>"`
 */
const ITEM_DIRECTED_STYLES = {
  ct: "absolute z-50 transition-all duration-500 opacity-100 || vi<opacity-0>",
};

const ITEM_INDICATORS = [
  { key: "visible", directive: "vi", condition: (p) => !p.visible },
];

export const useSlidingListState = a;

/**
 * @typedef {import("@static/tailwind/useIndicatedStyles").Indicator} Indicator
 * @typedef {import("@static/tailwind/useIndicatedStyles").ConditionParams} ConditionParams
 * */

export default CuteSlidingList;
