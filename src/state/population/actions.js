import { mapValues } from "lodash";

export const STATE_NAME = "Population";

//prettier-ignore
export const TYPES = mapValues({ 
    
  ANIHILATION: 0, //Simple Actions

 //Parameterized Actions
  ADD_OCCUPATION_PEOPLE: 0, SET_OCCUPATION_PEOPLE: 0, REMOVE_OCCUPATION_PEOPLE: 0,
  SET_RECRUITS: 0, CLEAR_RECRUITS: 0,

  CLEAR: 0, REPLACE: 0, MERGE: 0,

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {PopulationActions} */
const ACTION_CREATORS = {
  anihilation: () => ({ type: TYPES.ANIHILATION }),
  clearRecruits: () => ({ type: TYPES.CLEAR_RECRUITS }),

  addOccupationPeople: (occupationKey, amount) => ({
    type: TYPES.ADD_OCCUPATION_PEOPLE,
    params: { occupationKey, amount },
  }),
  removeOccupationPeople: (occupationKey, amount) => ({
    type: TYPES.REMOVE_OCCUPATION_PEOPLE,
    params: { occupationKey, amount },
  }),
  setOccupationPeople: (occupationKey, amount) => ({
    type: TYPES.SET_OCCUPATION_PEOPLE,
    params: { occupationKey, amount },
  }),
  setRecruits: (recruitsLevels) => ({
    type: TYPES.SET_RECRUITS,
    params: { recruitsLevels },
  }),

  clear: () => ({ type: TYPES.CLEAR }),
  replace: (newState) => ({
    type: TYPES.REPLACE,
    params: { newState },
  }),
  merge: (partialState) => ({
    type: TYPES.MERGE,
    params: { partialState },
  }),
};

export default ACTION_CREATORS;

/**
 * @typedef PopulationActions
 * @property {() => any} anihilation Removes all non-army population.
 * @property {() => any} clearRecruits Clears the ordered recruits levels.
 * @property {(occupationKey: string, amount: number) => any} addOccupationPeople Adds the specified amount of people to the specified occupation.
 * @property {(occupationKey: string, amount: number) => any} removeOccupationPeople Removes the specified amount of people from the specified occupation.
 * @property {(occupationKey: string, amount: number) => any} setOccupationPeople Sets the specified amount of people to the specified occupation.
 * @property {(recruitsLevels: number[]) => any} setRecruits Sets the ordered recruits levels.
 *
 * @property {() => any} clear Resets this state.
 * @property {(newState: import("@state/defaultState").InvasionState) => any} replace Completely replaces this state with the specified `newState`.
 * @property {(partialState: import("@state/defaultState").InvasionState) => any} merge Deeply merges the specified `partialState` into the existing state.
 */
