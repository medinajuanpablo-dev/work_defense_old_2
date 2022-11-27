import React from "react";
import { mapValues } from "lodash";

import {
  createRepeatingProcess,
  wait,
  checkRequiredValues,
} from "@static/functions";

import { useObjectState } from "@static/react";

/**
 * @typedef AnimationsDefinition
 * @property {number} msTrans Seconds of one transition in the animation's `stylesChain`.
 * @property {Array<string>} stylesChain The succession of styles that compose the animation.
 * @property {string} commonStyles Always-applied styles, present in all steps of the chain.
 * @property {boolean} finishedByDefault If `true`, the last style of the chain will be applied by default.
 * @property {"ease-linear" | "ease-in" | "ease-out" | "ease-in-out"} transitionType The transition progress function. Is "ease-linear" by default.
 */

/**
 * This hook permits the easy use of animations the tailwind and React way, right on the component,
 * imperatively choosing where to start them (which can't be done with CSS).
 *
 * @param {{[x: string]: AnimationsDefinition}} animationsDefinitions The animations definitions and configuration.
 * @returns `{ transStyles, startAnimations, restoreAnimations, cancelAnimations, isOngoing  }`.
 *
 * @see `/hooks/useTransitions/Instructions.md`
 */
function useTwAnimation(animationsDefinitions) {
  React.useMemo(() => {
    checkRequiredValues([{ animationsDefinitions, type: "object" }]);

    //prettier-ignore
    for (let animDef of Object.values(animationsDefinitions)) {
      checkRequiredValues([
        { animDef, onlyFields: ["msTrans", "stylesChain", "commonStyles", "finishedByDefault", "transitionType"] },
      ]);

      const { msTrans, stylesChain, commonStyles, finishedByDefault, transitionType } = animDef;

      checkRequiredValues([
        { stylesChain, itemsType: "string" },
        [{ msTrans, finishedByDefault, commonStyles }, "number", "?boolean", "?string"],
        [{ transitionType }, "?mustBe:ease-linear,ease-in,ease-out,ease-in-out"],
      ])
    }
  }, []);

  /**Save the current styles indexes as state. This will be used and set. */
  const transStylesIndexes = useObjectState(
    mapValues(animationsDefinitions, (animDef) => {
      const { stylesChain, finishedByDefault } = animDef;
      return finishedByDefault ? stylesChain.length - 1 : 0;
    })
  );

  var { current: ongoingStylesIterations } = React.useRef({});
  var { current: restoring } = React.useRef([]);
  var { current: forcedCancellations } = React.useRef({});

  /**
   * Starts the specified animations. The process is asynchronous and resolves when the longest
   * animation (transition chain) finished, returning an object with the cancelled animations
   * and it's reason. Can be done in both directions of the stylesChain (forward or reverse).
   *
   * **The start is cancelled in five cases:**
   * * Unknown animation key or non-string value. Throws an error.
   * * Middle-animation.
   * * Straight animation when in final style.
   * * Reverse animation when in initial style.
   * * Restoring animation.
   *
   * @param {string | Array<string>} animationsKeys Keys of the animations to begin.
   * @param {boolean} reverse When `true`, the animations will happen in reverse.
   * @param {number} delay Amount of miliseconds before starting the animations.
   * @returns {Promise<{[animationKey: string]: string}>} An object with the cancel reason of each animation by it's key. It's `null` if all animations succeeded.
   * */
  async function startAnimations(animationsKeys, reverse, delay) {
    checkRequiredValues([
      { animationsKeys, type: ["string", "array"] },
      { reverse, type: "boolean", req: false },
      { delay, type: "number", req: false, ch: (v) => v > 0 },
    ]);

    var maxTransitionChainDuration = 0;
    var cancelledStarts = {};

    const startOneAnimation = (animKey) => {
      checkRequiredValues([
        { animKey, enmr: Object.keys(animationsDefinitions) },
      ]);

      const trStyleIndex = transStylesIndexes.get[animKey];
      const { msTrans, stylesChain } = animationsDefinitions[animKey];

      //Checks.
      if (trStyleIndex > 0 && trStyleIndex < stylesChain.length - 1) {
        cancelledStarts[animKey] = "Middle chain. Start cancelled.";
        return;
      } else if (!reverse && trStyleIndex === stylesChain.length - 1) {
        cancelledStarts[animKey] =
          "Already in the last style. Forward start cancelled.";
        return;
      } else if (reverse && trStyleIndex === 0) {
        cancelledStarts[animKey] =
          "Already in the first style. Reverse start cancelled.";
        return;
      } else if (restoring.includes(animKey)) {
        cancelledStarts[animKey] = "Restoring animation. Start cancelled.";
        return;
      }

      //The first transition would be to the second or pre-last style of the chain, depending of the
      //direction. We want the first transition to START immediately, then sequantially wait the duration
      //to start each one of the rest. Each transition itself is handled by CSS and lasts the duration.
      const repeatConfig = {
        startIndex: reverse ? stylesChain.length - 2 : 1, //For 10 styles array, starts at indexes 1 or 8.
        endIndex: reverse ? 0 : stylesChain.length - 1,
        firstImmediate: true,
        msRepeat: msTrans,
      };

      //Calculating the duration of the longest transition chain.
      //Each chain lasts msTrans multiplied by the amount of transitions.
      const repetitions =
        Math.abs(repeatConfig.endIndex - repeatConfig.startIndex) + 1;

      maxTransitionChainDuration = Math.max(
        maxTransitionChainDuration,
        msTrans * repetitions
      );

      //Create trans styles iterating process, save it so it can be cancelled, and start it.
      const iterateAnimTransStyles = createRepeatingProcess(
        repeatConfig,
        (current) => transStylesIndexes.merge({ [animKey]: current })
      );

      ongoingStylesIterations[animKey] = iterateAnimTransStyles;
      iterateAnimTransStyles.start();
    };

    if (delay) await wait(delay);

    (Array.isArray(animationsKeys) ? animationsKeys : [animationsKeys]).forEach(
      (animKey) => startOneAnimation(animKey)
    );

    //After all chains started, we just wait for the longest to finish.
    await wait(maxTransitionChainDuration);

    //Some animations could have been cancelled in the wait, so we include those here. ASYNC NIGHTMARE.
    const allCancellations = { ...cancelledStarts, ...forcedCancellations };

    return Object.keys(allCancellations).length > 0 ? allCancellations : null;
  }

  /**Restores the specified animations to their default styles, which'd be the first element of the
   * stylesChain array. If finishedByDefault, will be restored to the last one.
   *
   * **If called at an animation's end, it should be called when not cancelled only.**
   *
   * The process is asynchronous and resolves when the longest animation (transition chain) finishes.
   *
   * @param {Array<string> | string} animationsKeys The keys of the animations to be restored.*/
  async function restoreAnimations(animationsKeys) {
    checkRequiredValues([{ animationsKeys, type: ["string", "array"] }]);

    var maxRestoreDuration = 0;
    const restored = {};
    const restoringIndexes = [];

    (Array.isArray(animationsKeys) ? animationsKeys : [animationsKeys]).forEach(
      (animKey) => {
        checkRequiredValues([
          { animKey, enmr: Object.keys(animationsDefinitions) },
        ]);

        const { stylesChain, finishedByDefault, msTrans } =
          animationsDefinitions[animKey];

        //Add animation as restoring
        restoringIndexes.push(restoring.push(animKey) - 1);

        maxRestoreDuration = Math.max(maxRestoreDuration, msTrans);
        restored[animKey] = finishedByDefault ? stylesChain.length - 1 : 0;
      }
    );

    //It's always better to update a state just once.
    transStylesIndexes.replace(restored);

    //Wait for the longest transition to finish.
    await wait(maxRestoreDuration);

    //Remove animations from restoring.
    for (let i = restoringIndexes.length; i >= 0; i--) restoring.splice(i, 1);
  }

  /**Cancels specified keys animations if they are ongoing at the moment of the call. Useful to be called in Effects cleanup functions.
   * @param {Array<string> | string} animationsKeys The keys of the animations to be cancelled. If not specified, all animations will be cancelled.
   * @returns {boolean} `false` if there were no animations to cancel, `true` otherwise. */
  function cancelAnimations(animationsKeys) {
    if (Object.keys(ongoingStylesIterations).length === 0) return false;

    checkRequiredValues([{ animationsKeys, type: ["string", "array"] }]);

    const cancellingAnimationsKeys = animationsKeys
      ? Array.isArray(animationsKeys)
        ? animationsKeys
        : [animationsKeys]
      : Object.keys(ongoingStylesIterations);

    for (let animKey of cancellingAnimationsKeys) {
      ongoingStylesIterations[animKey].cancel();
      delete ongoingStylesIterations[animKey];
      forcedCancellations[animKey] = "Animation cancellation forced.";
    }

    return true;
  }

  /**Tells if the animation of the specified key is ongoing at the moment of the call.
   * @param {string} animKey Key of the animation to check.
   * @returns {boolean} `true` if the animation is ongoing, `false` otherwise.
   */
  function isOngoing(animKey) {
    checkRequiredValues([
      { animKey, enmr: Object.keys(animationsDefinitions) },
    ]);

    const trStyleIndex = transStylesIndexes.get[animKey];
    const { stylesChain } = animationsDefinitions[animKey];
    return trStyleIndex > 0 && trStyleIndex < stylesChain.length - 1;
  }

  return {
    transStyles: mapValues(animationsDefinitions, (animDef, animKey) => {
      const currentTrStyleIndex = transStylesIndexes.get[animKey];
      const {
        msTrans,
        stylesChain,
        commonStyles,
        transitionType = "ease-linear",
      } = animDef;

      return ` transition-all ${transitionType} ${commonStyles} ${stylesChain[currentTrStyleIndex]} duration-${msTrans}`;
    }),
    startAnimations,
    restoreAnimations,
    cancelAnimations,
    isOngoing,
  };
}

export default useTwAnimation;
