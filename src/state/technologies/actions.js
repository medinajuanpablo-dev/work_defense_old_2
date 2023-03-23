import { mapValues } from "lodash";

export const STATE_NAME = "Techs";

//prettier-ignore
export const TYPES = mapValues({ 
  
  //Simple Actions
  ALL_UNRESEARCHED: 0, ALL_RESEARCHED: 0,
  EMPTY_POINTS: 0, ADD_COST_POINTS: 0, REMOVE_COST_POINTS: 0,

  //Parameterized Actions
  CATEGORY_RESEARCHED: 0, CATEGORY_UNRESEARCHED: 0,
  COLUMN_RESEARCHED: 0, COLUMN_UNRESEARCHED: 0,
  RESEARCH: 0, UNRESEARCH: 0,
  ADD_POINTS: 0, REMOVE_POINTS: 0, SET_POINTS: 0,
  SET_TREE: 0,

  CLEAR: 0, REPLACE: 0, MERGE: 0,

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {TechnologiesActions} */
const ACTION_CREATORS = {
  allUnresearched: () => ({ type: TYPES.ALL_UNRESEARCHED }),
  allResearched: () => ({ type: TYPES.ALL_RESEARCHED }),
  emptyPoints: () => ({ type: TYPES.EMPTY_POINTS }),
  addCostPoints: () => ({ type: TYPES.ADD_COST_POINTS }),
  removeCostPoints: () => ({ type: TYPES.REMOVE_COST_POINTS }),

  categoryResearched: (categoryKey) => ({
    type: TYPES.CATEGORY_RESEARCHED,
    params: { categoryKey },
  }),
  categoryUnresearched: (categoryKey) => ({
    type: TYPES.CATEGORY_UNRESEARCHED,
    params: { categoryKey },
  }),
  columnResearched: (columnKey) => ({
    type: TYPES.COLUMN_RESEARCHED,
    params: { columnKey },
  }),
  columnUnresearched: (columnKey) => ({
    type: TYPES.COLUMN_UNRESEARCHED,
    params: { columnKey },
  }),
  research: (columnKey) => ({
    type: TYPES.RESEARCH,
    params: { columnKey },
  }),
  unresearch: (columnKey) => ({
    type: TYPES.UNRESEARCH,
    params: { columnKey },
  }),
  addPoints: (amount) => ({
    type: TYPES.ADD_POINTS,
    params: { amount },
  }),
  removePoints: (amount) => ({
    type: TYPES.REMOVE_POINTS,
    params: { amount },
  }),
  setPoints: (points) => ({
    type: TYPES.SET_POINTS,
    params: { points },
  }),
  setTree: (techsTree) => ({
    type: TYPES.SET_TREE,
    params: { techsTree },
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
 * @typedef TechnologiesActions
 * @property {() => any} allUnresearched Set all technologies as researched.
 * @property {() => any} allResearched Set all technologies as unresearched.
 * @property {() => any} emptyPoints Set the remaining research points to zero.
 * @property {() => any} addCostPoints Add as much points as one research cost (specified at the techs general values).
 * @property {() => any} removeCostPoints Remove as much points as one research cost (specified at the techs general values).
 * @property {(categoryKey: string) => any} categoryResearched Set all technologies in a category as researched.
 * @property {(categoryKey: string) => any} categoryUnresearched Set all technologies in a category as unresearched.
 * @property {(columnKey: string) => any} columnResearched Set all technologies in a column as researched.
 * @property {(columnKey: string) => any} columnUnresearched Set all technologies in a column as researched.
 * @property {(columnKey: string) => any} research Research the next unresearched technology in the specified column. This doesn't affect the research points (change them with another action).
 * @property {(columnKey: string) => any} unresearch Unresearch the last researched technology in the specified column. This doesn't affect the research points (change them with another action).
 * @property {(amount: number) => any} addPoints Add a certain amount of research points.
 * @property {(amount: number) => any} removePoints Remove a certain amount of research points.
 * @property {(amount: number) => any} setPoints Set the remaining research points to the specified amount.
 * @property {(techsTree) => any} setTree Set the whole technologies tree state.
 *
 * @property {() => any} clear Resets this state.
 * @property {(newState: import("@state/defaultState").InvasionState) => any} replace Completely replaces this state with the specified `newState`.
 * @property {(partialState: import("@state/defaultState").InvasionState) => any} merge Deeply merges the specified `partialState` into the existing state.
 */
