import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { mapValues, isEqual } from "lodash";

import { checkRequiredValues, exists } from "@static/functions";

import armyActions, { ArmyActions } from "./army/actions";
import buildingsActions, { BuildingsActions } from "./buildings/actions";
import equipmentActions, { EquipmentActions } from "./equipment/actions";
import interfaceActions, { InterfaceActions } from "./interface/actions";
import invasionActions, { InvasionActions } from "./invasion/actions";
import miscActions, { MiscellaneousActions } from "./miscellaneous/actions";
import populationActions, { PopulationActions } from "./population/actions";
import resourcesActions, { ResourcesActions } from "./resources/actions";
import techsActions, { TechnologiesActions } from "./technologies/actions";

//Import and add actions of new states here.
/**
 * @typedef {Object} AllActions
 * @property {ArmyActions} army
 * @property {BuildingsActions} buildings
 * @property {EquipmentActions} equipment
 * @property {InterfaceActions} interface
 * @property {InvasionActions} invasion
 * @property {MiscellaneousActions} miscellaneous
 * @property {PopulationActions} population
 * @property {ResourcesActions} resources
 * @property {TechnologiesActions} technologies
 */
const ALL_ACTIONS = {
  army: armyActions,
  buildings: buildingsActions,
  equipment: equipmentActions,
  interface: interfaceActions,
  invasion: invasionActions,
  miscellaneous: miscActions,
  population: populationActions,
  resources: resourcesActions,
  technologies: techsActions,
};

/**
 * Quick and easy reader/subscriber of Redux's general state. Just specify the desired state fields
 * and sub-fields if wanted.
 *
 * ### Features.
 *
 * - Verifies that the specified state fields and sub-fields effectively exist. Throws an error if not.
 * - Returns a simple object with them.
 * - Provokes a re-render whenever and only one of the specified states changed.
 *
 * ### Example
 *
 * ```
 * const gs = useGeneralStateReader("money.current", "lives");
 * console.log(gs.money); // { current: aNumber }
 * console.log(gs.current); // undefined
 * console.log(gs.lives); // { count: anotherNumber }
 * ```
 *
 * ---
 *
 * @param  {...string} stateKeysList
 * @returns {import("@state/defaultState").GeneralState} An object with the wanted state values.
 */
export function useGeneralStateReader(...stateKeysList) {
  checkRequiredValues([{ stateKeysList, itemsType: "string" }]);

  return useSelector((state) => {
    var returningState = {};

    for (let stateKey of stateKeysList) {
      const [key, subKey] = stateKey.split(".");

      if (!exists(state[key]))
        throw Error(`State field '${key}' doesn't exist.`);
      if (exists(subKey) && !exists(state[key][subKey]))
        throw Error(`State sub-field '${key}.${subKey}' doesn't exist.`);

      //Select state sub-field.
      if (subKey) {
        returningState[key] = {
          ...(returningState[key] || {}), //Could have already selected a sub-field of this field.
          [subKey]: state[key][subKey],
        };
      }
      //Select entire state field.
      else returningState[key] = state[key];
    }

    return returningState;
  }, isEqual);
}

/**
 * Quick and easy writer of Redux's general state. Just specify the name of the states you wish to update and
 * you will get all actions for those states ready-to-use (already wrapped with `dispatch`), or specify nothing
 * and get _all_ the actions!
 *
 * ### Features.
 *
 * - Verifies that the specified states effectively exist. Throws an error if not.
 * - Returns a simple object with all the actions of the specified states already wrapped within a `dispatch` call.
 * - Actions are divided in sub-objects with the name of the state they update.
 * - The output is documented with JSDoc so the IntelliSense will suggest available actions for each state and their descriptions.
 *
 * ### Example.
 *
 * ```
 * const updateGS = useGeneralStateUpdator("Money"); //Error! there is no state called "Money".
 *
 * const updateGS = useGeneralStateUpdator("money");
 * updateGS.money.deposit(53); //Same as dispatch(actions.money.deposit(aNumber))
 * updateGS.lives.anihilate(); //Error! actions for the `lives` state were not requested
 * ```
 *
 * ---
 *
 * @param  { ...string } actionsNamesList
 * @returns {AllActions} An object with the dispatch-wrapped actions ready to be called.
 */
export function useGeneralStateUpdator(...actionsNamesList) {
  checkRequiredValues([{ actionsNamesList, itemsType: "string" }]);

  const dispatch = useDispatch();

  return React.useMemo(() => {
    if (actionsNamesList.length == 0)
      actionsNamesList = Object.keys(ALL_ACTIONS);

    var readyActions = {};

    for (let stateKey of actionsNamesList) {
      if (!exists(ALL_ACTIONS[stateKey]))
        throw Error(
          `State '${stateKey}' doesn't exist or doesn't export any action.`
        );

      //All actions of a state.
      readyActions[stateKey] = mapValues(ALL_ACTIONS[stateKey], (rawAction) => {
        return (...actionParams) => dispatch(rawAction(...actionParams));
      });
    }

    return readyActions;
  }, [dispatch]);
}
