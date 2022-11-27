import { checkRequiredValues, pickRandomItem } from "@static/functions";

/**A _random_ version of `forEach`. The `callback` processes a random item until all of them are processed.
 *
 * **Break iteration**: The `callback` can return `true` at any moment to instantly `break` the loop.
 *
 * @template T
 * @param {Array<T>} array The array to iterate randomly.
 * @param {{(randomItem: T, randomIndex: number) => boolean}} callback The function to call on each iteration. Receives the item and it's index as 1st and 2nd params respectively.
 */
function forRandom(array, callback) {
  checkRequiredValues([[{ array, callback }, "array", "function"]]);

  var unProcessedIndexes = array.map((v, i) => i);

  while (unProcessedIndexes.length > 0) {
    const randomIndex = pickRandomItem(unProcessedIndexes, true);
    if (callback(array[randomIndex], randomIndex)) return;
  }
}

export default forRandom;
