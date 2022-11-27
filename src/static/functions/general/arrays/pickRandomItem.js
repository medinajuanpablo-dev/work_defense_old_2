import { checkRequiredValues } from "@static/functions";

/**
 * Picks a random item from the specified array, which can be removed too if wanted.
 *
 * @template T
 * @param {Array<T>} array The array from which a random item will be picked.
 * @param {boolean} removePicked If `true`, the picked item will also be removed from the array.
 * @returns {T} The picked random item or `undefined` if there are no items to pick.
 */
function pickRandomItem(array, removePicked) {
  checkRequiredValues([[{ array, removePicked }, "array", "?boolean"]]);

  if (array.length === 0) return undefined;

  const randomIndex = Math.floor(Math.random() * array.length);
  const randomItem = array[randomIndex];

  if (removePicked) array.splice(randomIndex, 1);

  return randomItem;
}

export default pickRandomItem;
