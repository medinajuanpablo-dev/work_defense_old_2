import { merge } from "lodash";

import defaultState from "@state/defaultState";

import { BATTLE } from "@static/contexts/battle";

/**
 * @param {import("../defaultState").InvasionState} prevState
 * @param {import("../defaultState").InvasionState} newState
 */
function getHandlers(prevState, newState) {
  return {
    cleanDefense() {
      newState.defense = defaultState.invasion.defense;
      return newState;
    },

    cleanLiberations() {
      newState.liberations = defaultState.invasion.liberations;
      return newState;
    },

    cleanOccupations() {
      newState.occupations = defaultState.invasion.occupations;
      return newState;
    },

    //

    setRisks({ zonesRisks }) {
      newState.defense.risks = zonesRisks;
      return newState;
    },

    setDangerZones({ dangerZones }) {
      newState.defense.dangerZones = dangerZones;
      return newState;
    },

    setInvasionForce({ invasionForce }) {
      newState.defense.fullInvasionForce = invasionForce;
      return newState;
    },

    addAttack({ attackedZoneKey, attackForce, attackProtocol }) {
      newState.defense.attacks[attackedZoneKey] = {
        enemyDivision: {
          force: attackForce,
          protocol: attackProtocol || BATTLE.DEFAULT_PROTOCOL,
        },
        results: null,
      };

      return newState;
    },

    setAttackResult({ attackedZoneKey, results }) {
      newState.defense.attacks[attackedZoneKey].results = results;
      return newState;
    },

    setLiberationData({ targetZoneKey, data }) {
      newState.liberations[targetZoneKey] = data;
      return newState;
    },

    setOccupation({ occupiedZoneKey, occupationData }) {
      newState.occupations[occupiedZoneKey] = occupationData;
      return newState;
    },

    //

    clear() {
      return defaultState.invasion;
    },

    replace({ newState: specifiedNewState }) {
      return specifiedNewState;
    },

    merge({ partialState }) {
      return merge(newState, partialState);
    },
  };
}

export default getHandlers;
