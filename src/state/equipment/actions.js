import { mapValues } from "lodash";

export const STATE_NAME = "Equipment";

//prettier-ignore
export const TYPES = mapValues({ 
    
  EMPTY_STORAGE: 0, CANCEL_ALL_ORDERS: 0, FINISH_ALL_ORDERS: 0, //Simple Actions

  //Parameterized Actions
  EMPTY_TYPE: 0, CANCEL_TYPE_ORDERS: 0,
  ADD_TO_STORAGE: 0, REMOVE_FROM_STORAGE: 0, SET_STORED: 0,
  ADD_ORDER: 0, CANCEL_ORDER: 0, FINISH_ORDER: 0,

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
 */
