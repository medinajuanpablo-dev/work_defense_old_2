import { mapValues } from "lodash";

export const STATE_NAME = "Army";

//prettier-ignore
export const TYPES = mapValues({ 
    
  EMPTY_ALL_FORCES: 0, NULL_ALL_PROTOCOLS: 0, ALL_TO_FREE: 0, //Simple Actions

  //Parameterized Actions
  ADD_FREE_FORCE: 0, REMOVE_FREE_FORCE: 0, SET_FREE_FORCE: 0, ADD_FRESH_SOLDIERS: 0, //Free Force Actions.
  ADD_DEFENSE_FORCE: 0, REMOVE_DEFENSE_FORCE: 0, SET_DEFENSE_FORCE: 0, SET_DEFENSE_PROTOCOL: 0, REASSIGN_DEFENSE: 0, //Defense actions.
  FORM_UNIT: 0, DISSOLVE_UNIT: 0, ADD_UNIT_FORCE: 0, REMOVE_UNIT_FORCE: 0, SET_UNIT_FORCE: 0, ASSIGN_FORCE_TO_UNIT: 0, REASSIGN_FORCE_FROM_UNIT: 0, SET_UNIT_PROTOCOL: 0, //Units actions.
  

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {ArmyActions} */
const ACTION_CREATORS = {
  emptyAllForces: () => ({ type: TYPES.EMPTY_ALL_FORCES }),
  nullAllProtocols: () => ({ type: TYPES.NULL_ALL_PROTOCOLS }),
  allToFree: () => ({ type: TYPES.ALL_TO_FREE }),
  newSoldierCreated: () => ({ type: TYPES.NEW_SOLDIER_CREATED }),

  addFreeForce: (force) => ({
    type: TYPES.ADD_FREE_FORCE,
    params: { force },
  }),
  removeFreeForce: (soldiersIndexes) => ({
    type: TYPES.REMOVE_FREE_FORCE,
    params: { soldiersIndexes },
  }),
  setFreeForce: (force) => ({
    type: TYPES.SET_FREE_FORCE,
    params: { force },
  }),
  addFreshSoldiers: (freshForce) => ({
    type: TYPES.ADD_FRESH_SOLDIERS,
    params: { freshForce },
  }),
  addDefenseForce: (zoneKey, force) => ({
    type: TYPES.ADD_DEFENSE_FORCE,
    params: { zoneKey, force },
  }),
  removeDefenseForce: (zoneKey, soldiersIndexes) => ({
    type: TYPES.REMOVE_DEFENSE_FORCE,
    params: { zoneKey, soldiersIndexes },
  }),
  setDefenseForce: (zoneKey, force) => ({
    type: TYPES.SET_DEFENSE_FORCE,
    params: { zoneKey, force },
  }),
  formUnit: (name, force, protocol) => ({
    type: TYPES.FORM_UNIT,
    params: { name, force, protocol },
  }),
  dissolveUnit: (unitKey) => ({
    type: TYPES.DISSOLVE_UNIT,
    params: { unitKey },
  }),
  addUnitForce: (unitKey, force) => ({
    type: TYPES.ADD_UNIT_FORCE,
    params: { unitKey, force },
  }),
  removeUnitForce: (unitKey, soldiersIndexes) => ({
    type: TYPES.REMOVE_UNIT_FORCE,
    params: { unitKey, soldiersIndexes },
  }),
  setUnitForce: (unitKey, force) => ({
    type: TYPES.SET_UNIT_FORCE,
    params: { unitKey, force },
  }),
  assignForceToUnit: (unitKey, soldiersIndexes) => ({
    type: TYPES.ASSIGN_FORCE_TO_UNIT,
    params: { unitKey, soldiersIndexes },
  }),
  reassignForceFromUnit: (unitKey, soldiersIndexes) => ({
    type: TYPES.REASSIGN_FORCE_FROM_UNIT,
    params: { unitKey, soldiersIndexes },
  }),
  setDefenseProtocol: (zoneKey, protocol) => ({
    type: TYPES.SET_DEFENSE_PROTOCOL,
    params: { zoneKey, protocol },
  }),
  setUnitProtocol: (unitKey, protocol) => ({
    type: TYPES.SET_UNIT_PROTOCOL,
    params: { unitKey, protocol },
  }),
  reassignDefense: (originZoneKey, destinationZoneKey, soldiersIndexes) => ({
    type: TYPES.REASSIGN_DEFENSE,
    params: { originZoneKey, destinationZoneKey, soldiersIndexes },
  }),
};

export default ACTION_CREATORS;

/** _DISCLAIMER_: "removing" a force is completely deleting it from existance. It's NOT moved to the free zone.
 * @typedef ArmyActions
 * @property {() => any} emptyAllForces Removes all forces. This doesn't dissolve the liberation units.
 * @property {() => any} nullAllProtocols Sets the whole army to have "no protocol" protocols, from both zones defenses and liberation units.
 * @property {() => any} allToFree Moves all forces to the Free zone. This doesn't dissolve the liberation units.
 * @property {() => any} newSoldierCreated Moves all forces to the Free zone. This doesn't dissolve the liberation units.
 * @property {(force: SoldierState[]) => any} addFreeForce Adds the specified force to the (end of the) Free Force.
 * @property {(soldiersIndexes: number[]) => any} removeFreeForce Removes the soldiers at the specified indexes from the Free Force.
 * @property {(force: SoldierState[]) => any} setFreeForce Sets the Free Force.
 * @property {(freshForce: SoldierState[]) => any} addFreshSoldiers Adds the specified force of fresh soldiers to the army, adding them to the (end of the) Free Force.
 * @property {(zoneKey: string, force: SoldierState[]) => any} addDefenseForce Adds the specified force to the (end of the) specified zone's Defense force.
 * @property {(zoneKey: string, soldiersIndexes: number[]) => any} removeDefenseForce Removes the soldiers at the specified indexes from the specified zone's Defense force.
 * @property {(zoneKey: string, force: SoldierState[]) => any} setDefenseForce Sets the force of the specified zone's Defense.
 * @property {(name: string, force: SoldierState[], protocol: RetreatProtocolState) => any} formUnit Forms a new Liberation Unit. If specified a force and/or protocol, they will be set to the formed unit.
 * @property {(unitKey: string) => any} dissolveUnit Removes the Liberation Unit of the specified unitKey. This removes the unit's force.
 * @property {(unitKey: string, force: SoldierState[]) => any} addUnitForce Add the specified force to the Liberation Unit of the specified unitKey.
 * @property {(unitKey: string, soldiersIndexes: number[]) => any} removeUnitForce Remove the soldiers at the specified indexes from the Liberation Unit of the specified unitKey.
 * @property {(unitKey: string, force: SoldierState[]) => any} setUnitForce Sets the force of the Liberation Unit of the specified unitKey.
 * @property {(unitKey: string, soldiersIndexes: number[]) => any} assignForceToUnit Moves the soldiers at the specified indexes from the Free Force to the Liberation Unit of the specified unitKey.
 * @property {(unitKey: string, soldiersIndexes: number[]) => any} reassignForceFromUnit Moves the soldiers at the specified indexes from the Liberation Unit of the specified unitKey to the Free Force.
 * @property {(zoneKey: string, protocol: RetreatProtocolState) => any} setDefenseProtocol Sets the battle protocol of the specified zone's Defense.
 * @property {(unitKey: string, protocol: RetreatProtocolState) => any} setUnitProtocol Sets the battle protocol of the Liberation Unit at the specified index.
 * @property {(originZoneKey: string, destinationZoneKey: string, soldiersIndexes: number[]) => any} reassignDefense Moves the soldiers at the specified indexes from the origin zone defense force to the destination zone defense force.
 */

/**
 * @typedef {import("@state/defaultState").SoldierState} SoldierState
 * @typedef {import("@state/defaultState").RetreatProtocolState} RetreatProtocolState
 */
