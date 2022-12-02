import { mapValues } from "lodash";

export const STATE_NAME = "Buildings";

//prettier-ignore
export const TYPES = mapValues({ 
    
  ALL_UNPAID: 0, ALL_PAID: 0, ALL_ZERO: 0, ALL_LEVEL_UP: 0, ALL_LEVEL_DOWN: 0, //Simple Actions

  SET_LEVEL: 0, LEVEL_UP: 0, LEVEL_DOWN: 0, PAY_BILL: 0, UNPAY_BILL: 0, //Parameterized Actions

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {BuildingsActions} */
const ACTION_CREATORS = {
  allZero: () => ({ type: TYPES.ALL_ZERO }),
  allLevelUp: () => ({ type: TYPES.ALL_LEVEL_UP }),
  allLevelDown: () => ({ type: TYPES.ALL_LEVEL_DOWN }),
  allPaid: () => ({ type: TYPES.ALL_PAID }),
  allUnpaid: () => ({ type: TYPES.ALL_UNPAID }),

  setLevel: (buildingKey, level) => ({
    type: TYPES.SET_LEVEL,
    params: { buildingKey, level },
  }),
  levelUp: (buildingKey) => ({
    type: TYPES.LEVEL_UP,
    params: { buildingKey },
  }),
  levelDown: (buildingKey) => ({
    type: TYPES.LEVEL_DOWN,
    params: { buildingKey },
  }),
  payBill: (buildingKey) => ({
    type: TYPES.PAY_BILL,
    params: { buildingKey },
  }),
  unpayBill: (buildingKey) => ({
    type: TYPES.UNPAY_BILL,
    params: { buildingKey },
  }),
};

export default ACTION_CREATORS;

/**
 * @typedef BuildingsActions
 * @property {() => any} allZero Set all buildings level to zero.
 * @property {() => any} allLevelUp Increase one level to all buildings.
 * @property {() => any} allLevelDown Decrease one level to all buildings.
 * @property {() => any} allPaid Set all buildings bill as unpaid.
 * @property {() => any} allUnpaid Set all buildings bill as paid.
 * @property {(buildingKey: string, level: number) => any} setLevel Set the specified level to the specified building.
 * @property {(buildingKey: string) => any} levelUp Increase one level to the specified building.
 * @property {(buildingKey: string) => any} levelDown Decrease one level to the specified building.
 * @property {(buildingKey: string) => any} payBill Set the specified building bill as paid.
 * @property {(buildingKey: string) => any} unpayBill Set the specified building bill as unpaid.
 */
