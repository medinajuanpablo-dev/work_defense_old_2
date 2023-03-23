import { mapValues } from "lodash";

export const STATE_NAME = "Invasion";

//prettier-ignore
export const TYPES = mapValues({ 
    
  CLEAN_DEFENSE: 0, CLEAN_LIBERATIONS: 0, CLEAN_OCCUPATIONS: 0, //Simple Actions

  //Parameterized Actions
  SET_RISKS: 0, SET_DANGER_ZONES: 0, SET_INVASION_FORCE: 0,
  ADD_ATTACK: 0, SET_ATTACK_RESULT: 0,
  SET_LIBERATION_DATA: 0, SET_OCCUPATION: 0,

  CLEAR: 0, REPLACE: 0, MERGE: 0,

}, (v, k) => `${STATE_NAME.toUpperCase()}_${k}` );

/**@type {InvasionActions} */
const ACTION_CREATORS = {
  cleanDefense: () => ({ type: TYPES.CLEAN_DEFENSE }),
  cleanLiberations: () => ({ type: TYPES.CLEAN_LIBERATIONS }),
  cleanOccupations: () => ({ type: TYPES.CLEAN_OCCUPATIONS }),

  setRisks: (zonesRisks) => ({
    type: TYPES.SET_RISKS,
    params: { zonesRisks },
  }),
  setDangerZones: (dangerZones) => ({
    type: TYPES.SET_DANGER_ZONES,
    params: { dangerZones },
  }),
  setInvasionForce: (invasionForce) => ({
    type: TYPES.SET_INVASION_FORCE,
    params: { invasionForce },
  }),
  addAttack: (attackedZoneKey, attackForce, attackProtocol) => ({
    type: TYPES.ADD_ATTACK,
    params: { attackedZoneKey, attackForce, attackProtocol },
  }),
  setAttackResult: (attackedZoneKey, results) => ({
    type: TYPES.SET_ATTACK_RESULT,
    params: { attackedZoneKey, results },
  }),
  setLiberationData: (targetZoneKey, data) => ({
    type: TYPES.SET_LIBERATION_DATA,
    params: { targetZoneKey, data },
  }),
  setOccupation: (occupiedZoneKey, occupationData) => ({
    type: TYPES.SET_OCCUPATION,
    params: { occupiedZoneKey, occupationData },
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
 * @typedef InvasionActions
 * @property {() => any} cleanDefense Sets risks to zero, no danger zones and empty results. Has nothing to do with the defense army.
 * @property {() => any} cleanLiberations Sets empty results.
 * @property {() => any} cleanOccupations Removes all occupations.
 * @property {(zonesRisks: { [activeZoneKey: string]: number }) => any} setRisks Sets each zone's risk of being attacked.
 * @property {(dangerZones) => any} setDangerZones Sets the zones to which risk is focused when scouting.
 * @property {(invasionForce: Array<SoldierState>) => any} setInvasionForce Sets the full invasion force.
 * @property {(attackedZoneKey: string, attackForce: SoldierState[], attackProtocol: RetreatProtocolState) => any} addAttack Adds a new attack to the specified zone by an enemy division with the specified force and protocol.
 * @property {(attackedZoneKey: string, results: any) => any} setAttackResult Sets the specified battle results for the specified attacked zone.
 * @property {(targetZoneKey: string, data: any) => any} setLiberationData Sets the data of a liberation attempt to the specified target zone.
 * @property {(occupiedZoneKey: string, occupationData: any) => any} setOccupation Sets an occupation on the specified zone with the specified data.
 *
 * @property {() => any} clear Resets this state.
 * @property {(newState: import("@state/defaultState").InvasionState) => any} replace Completely replaces this state with the specified `newState`.
 * @property {(partialState: import("@state/defaultState").InvasionState) => any} merge Deeply merges the specified `partialState` into the existing state.
 */

/**
 * @typedef {import("@state/defaultState").SoldierState} SoldierState
 * @typedef {import("@state/defaultState").RetreatProtocolState} RetreatProtocolState
 */
