import { checkRequiredValues } from "@static/functions";

/**Creates a customizable async repeating process. See the documentation for more.
 *
 * @param {{startIndex: number, endIndex: number, msRepeat: number, firstImmediate: boolean}} config The repeating configuration object.
 * @param {(currentIndex: number) => void} process The process to be repeated. Receives the `currentIndex` as parameter.
 * @returns An object with two imperative functions `{ start, cancel }`.
 */
function createRepeatingProcess(config, process) {
  //prettier-ignore
  checkRequiredValues([
    { config, onlyFields: ["startIndex", "endIndex", "msRepeat", "firstImmediate"] },
  ]);

  const { startIndex = 0, endIndex, msRepeat, firstImmediate = false } = config;

  checkRequiredValues([
    { endIndex, ch: (v) => v >= 0 },
    { msRepeat, ch: (v) => v > 0 },
    { startIndex, req: false, ch: (v) => v >= 0 },
    { firstImmediate, req: false, type: "boolean" },
  ]);

  var intervalId, executions, current;

  return {
    /**
     * @returns {Promise<number>} The number of executions when resolving.
     */
    start() {
      return new Promise((resolve) => {
        executions = 0;
        current = startIndex;

        function oneIteration() {
          process(current);
          executions++;

          if (current === endIndex) {
            if (intervalId) clearInterval(intervalId);

            resolve(executions);
            return;
          }

          current = current + (endIndex > startIndex ? +1 : -1);
        }

        if (firstImmediate) oneIteration();
        intervalId = setInterval(() => oneIteration(), msRepeat);
      });
    },

    cancel() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = undefined;
      }
    },
  };
}

export default createRepeatingProcess;
