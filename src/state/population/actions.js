import { mapValues } from "lodash";

export const STATE_NAME = "Population";

//prettier-ignore
export const TYPES = mapValues({ 
    
  ANIHILATION: 0, //Simple Actions

  ADD_OCCUPATION_PEOPLE: 0, SET_OCCUPATION_PEOPLE: 0, REMOVE_OCCUPATION_PEOPLE: 0, //Parameterized Actions

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {PopulationActions} */
const ACTION_CREATORS = {
  anihilation: () => ({ type: TYPES.ANIHILATION }),

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
};

export default ACTION_CREATORS;

/**
 * @typedef PopulationActions
 * @property {() => any} anihilation Removes all non-army population.
 * @property {(occupationKey: string, amount: number) => any} addOccupationPeople Adds the specified amount of people to the specified occupation.
 * @property {(occupationKey: string, amount: number) => any} removeOccupationPeople Removes the specified amount of people from the specified occupation.
 * @property {(occupationKey: string, amount: number) => any} setOccupationPeople Sets the specified amount of people to the specified occupation.
 */
