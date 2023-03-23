import { mapValues } from "lodash";

export const STATE_NAME = "Equipment";

//prettier-ignore
export const TYPES = mapValues({ 
    
  EMPTY_STORAGE: 0, CANCEL_ALL_ORDERS: 0, FINISH_ALL_ORDERS: 0, //Simple Actions

  //Parameterized Actions
  EMPTY_TYPE: 0, CANCEL_TYPE_ORDERS: 0,
  ADD_TO_STORAGE: 0, REMOVE_FROM_STORAGE: 0, SET_STORED: 0,
  ADD_ORDER: 0, CANCEL_ORDER: 0, FINISH_ORDER: 0,
  SET_ALL_STORED: 0, SET_ALL_ORDERS: 0,

  CLEAR: 0, REPLACE: 0, MERGE: 0,

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {EquipmentActions} */
const ACTION_CREATORS = {
  emptyStorage: () => ({ type: TYPES.EMPTY_STORAGE }),
  cancelAllOrders: () => ({ type: TYPES.CANCEL_ALL_ORDERS }),
  finishAllOrders: () => ({ type: TYPES.FINISH_ALL_ORDERS }),

  emptyType: (typeKey) => ({
    type: TYPES.EMPTY_TYPE,
    params: { typeKey },
  }),
  cancelTypeOrders: (typeKey) => ({
    type: TYPES.CANCEL_TYPE_ORDERS,
    params: { typeKey },
  }),
  addToStorage: (typeKey, rank, amount) => ({
    type: TYPES.ADD_TO_STORAGE,
    params: { typeKey, rank, amount },
  }),
  removeFromStorage: (typeKey, rank, amount) => ({
    type: TYPES.REMOVE_FROM_STORAGE,
    params: { typeKey, rank, amount },
  }),
  setStored: (typeKey, rank, amount) => ({
    type: TYPES.SET_STORED,
    params: { typeKey, rank, amount },
  }),
  addOrder: (typeKey, rank, amount) => ({
    type: TYPES.ADD_ORDER,
    params: { typeKey, rank, amount },
  }),
  cancelOrder: (typeKey, rank, amount) => ({
    type: TYPES.CANCEL_ORDER,
    params: { typeKey, rank, amount },
  }),
  finishOrder: (typeKey, rank) => ({
    type: TYPES.FINISH_ORDER,
    params: { typeKey, rank },
  }),
  setAllStored: (newStoredEquipment) => ({
    type: TYPES.SET_ALL_STORED,
    params: { newStoredEquipment },
  }),
  setAllOrders: (newOrderedEquipment) => ({
    type: TYPES.SET_ALL_ORDERS,
    params: { newOrderedEquipment },
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

  CLEAR: 0,
  REPLACE: 0,
  MERGE: 0,
};

export default ACTION_CREATORS;

/**
 * @typedef {Object} EquipmentActions
 * @property {() => any} emptyStorage Removes all the stored equipment.
 * @property {() => any} cancelAllOrders Removes all the equipment crafting orders.
 * @property {() => any} finishAllOrders Removes all the equipment crafting orders and adds them as stored.
 * @property {(typeKey: string) => any} emptyType Removes all the stored equipment of the specified type.
 * @property {(typeKey: string) => any} cancelTypeOrders Removes all the equipment crafting orders of the specified type.
 * @property {(typeKey: string, rank: number, amount: number) => any} addToStorage Adds the specified amount to the specified type and rank of stored equipment.
 * @property {(typeKey: string, rank: number, amount: number) => any} removeFromStorage Removes the specified amount from the specified type and rank of stored equipment. If the amount falls to zero, the rank is completely removed.
 * @property {(typeKey: string, rank: number, amount: number) => any} setStored Sets the specified amount of the specified type and rank of stored equipment. If the amount is zero, the rank is completely removed.
 * @property {(typeKey: string, rank: number, amount: number) => any} addOrder Adds a craft order of the specified equipment type and rank, in the specified amount.
 * @property {(typeKey: string, rank: number, amount: number) => any} cancelOrder Cancels the craft order of the specified equipment type and rank, in the specified amount.
 * @property {(typeKey: string, rank: number) => any} finishOrder Removes the craft order of the specified equipment type and rank, and adds the equipment as stored.
 * @property {(newStoredEquipment: import("../defaultState").OrderedEquipmentState) => any} setAllStored Set all stored equipment.
 * @property {(newOrderedEquipment: import("../defaultState").OrderedEquipmentState) => any} setAllOrders Set all ordered equipment.
 *
 * @property {() => any} clear Resets this state.
 * @property {(newState: import("@state/defaultState").InvasionState) => any} replace Completely replaces this state with the specified `newState`.
 * @property {(partialState: import("@state/defaultState").InvasionState) => any} merge Deeply merges the specified `partialState` into the existing state.
 */
