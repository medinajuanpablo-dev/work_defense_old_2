import { camelCase, merge } from "lodash";

import { exists, sliceByIndexes } from "@static/functions";
import defaultState from "@state/defaultState";

import { MISC, MIK } from "@static/contexts/miscellaneous";
import { BATTLE } from "@static/contexts/battle";

const ZNK = MIK.ZONES;

/**
 * @param {import("../defaultState").ArmyState} prevState
 * @param {import("../defaultState").ArmyState} newState
 */
function getCommonHandling(prevState, newState) {
  /**Selects the army section of the specified key.*/
  function selectArmySection(sectionKey) {
    //Free Zone.
    if (sectionKey == ZNK.FREE_ZONE) return newState.freeZone;
    //Defense.
    else if (Object.keys(MISC.ACTIVE_ZONES).includes(sectionKey))
      return newState.zonesDefense[sectionKey];
    //Liberation Unit.
    else if (exists(newState.liberationUnits[sectionKey]))
      return newState.liberationUnits[sectionKey];
    //Error.
    else throw Error("Invalid army section key.");
  }

  /**Adds the specified force to the specified army section force. */
  function addForceTo(sectionKey, force) {
    const armySection = selectArmySection(sectionKey);
    armySection.force.push(...force);
  }

  /**Removes the soldiers at the specified indexes from the specified army section force, and returns the removed force.
   * If the soldiers indexes are not specified, extracts the whole force.   */
  function extractForceFrom(sectionKey, soldiersIndexes) {
    const armySection = selectArmySection(sectionKey);

    const result = exists(soldiersIndexes)
      ? sliceByIndexes(armySection.force, soldiersIndexes)
      : { remaining: [], extracted: armySection.force };

    armySection.force = result.remaining;
    return result.extracted;
  }

  /**Sets the force of the specified army section. */
  function setForceOf(sectionKey, force) {
    const armySection = selectArmySection(sectionKey);
    armySection.force = force;
  }

  /**Moves the soldiers at the specified indexes from the specified origin section force to the (end of the)
   * destination section force. If the soldiers indexes are not specified, moves the whole origin section's force. */
  function moveSectionForce(
    originSectionKey,
    destinationSectionKey,
    soldiersIndexes
  ) {
    const movingForce = extractForceFrom(originSectionKey, soldiersIndexes);
    addForceTo(destinationSectionKey, movingForce);
  }

  return {
    selectArmySection,
    addForceTo,
    extractForceFrom,
    setForceOf,
    moveSectionForce,
  };
}

/**
 * @param {import("../defaultState").ArmyState} prevState
 * @param {import("../defaultState").ArmyState} newState
 */
function getHandlers(prevState, newState) {
  const common = getCommonHandling(prevState, newState);

  const nonFreeSectionsKeys = [
    ...Object.keys(MISC.ACTIVE_ZONES),
    ...Object.keys(newState.liberationUnits),
  ];

  return {
    emptyAllForces() {
      for (let sectionKey of [ZNK.FREE_ZONE, ...nonFreeSectionsKeys])
        common.extractForceFrom(sectionKey);

      return newState;
    },

    nullAllProtocols() {
      for (let sectionKey of nonFreeSectionsKeys)
        common.selectArmySection(sectionKey).protocol = BATTLE.DEFAULT_PROTOCOL;

      return newState;
    },

    allToFree() {
      for (let sectionKey of nonFreeSectionsKeys)
        common.moveSectionForce(sectionKey, ZNK.FREE_ZONE);

      return newState;
    },

    newSoldierCreated() {
      newState.soldierCreationCounter += 1;
      return newState;
    },

    //

    addFreeForce({ force }) {
      common.addForceTo(ZNK.FREE_ZONE, force);
      return newState;
    },

    removeFreeForce({ soldiersIndexes }) {
      common.extractForceFrom(ZNK.FREE_ZONE, soldiersIndexes);
      return newState;
    },

    setFreeForce({ force }) {
      common.setForceOf(ZNK.FREE_ZONE, force);
      return newState;
    },

    addFreshSoldiers({ freshForce }) {
      //Assign numbers to the fresh soldiers.
      var number = newState.soldierCreationCounter;
      const newForce = freshForce.map((soldier) => ({
        ...soldier,
        number: ++number,
      }));

      common.addForceTo(ZNK.FREE_ZONE, newForce);
      newState.soldierCreationCounter = number;
      return newState;
    },

    addDefenseForce({ zoneKey, force }) {
      common.addForceTo(zoneKey, force);
      return newState;
    },

    removeDefenseForce({ zoneKey, soldiersIndexes }) {
      common.extractForceFrom(zoneKey, soldiersIndexes);
      return newState;
    },

    setDefenseForce({ zoneKey, force }) {
      common.setForceOf(zoneKey, force);
      return newState;
    },

    formUnit({ name, force, protocol }) {
      var newLiberationUnit = { name, force: [] };
      if (force) newLiberationUnit.force = force;
      if (protocol) newLiberationUnit.protocol = protocol;

      const unitKey = camelCase(name);
      newState.liberationUnits[unitKey] = newLiberationUnit;

      return newState;
    },

    dissolveUnit({ unitKey }) {
      delete newState.liberationUnits[unitKey];
      return newState;
    },

    addUnitForce({ unitKey, force }) {
      common.addForceTo(unitKey, force);
      return newState;
    },

    removeUnitForce({ unitKey, soldiersIndexes }) {
      common.extractForceFrom(unitKey, soldiersIndexes);
      return newState;
    },

    setUnitForce({ unitKey, force }) {
      common.setForceOf(unitKey, force);
      return newState;
    },

    assignForceToUnit({ unitKey, soldiersIndexes }) {
      common.moveSectionForce(ZNK.FREE_ZONE, unitKey, soldiersIndexes);
      return newState;
    },

    reassignForceFromUnit({ unitKey, soldiersIndexes }) {
      common.moveSectionForce(unitKey, ZNK.FREE_ZONE, soldiersIndexes);
      return newState;
    },

    setDefenseProtocol({ zoneKey, protocol }) {
      common.selectArmySection(zoneKey).protocol = protocol;
      return newState;
    },

    setUnitProtocol({ unitKey, protocol }) {
      common.selectArmySection(unitKey).protocol = protocol;
      return newState;
    },

    reassignDefense({ originZoneKey, destinationZoneKey, soldiersIndexes }) {
      common.moveSectionForce(
        originZoneKey,
        destinationZoneKey,
        soldiersIndexes
      );
      return newState;
    },

    setSoldiers({ completeSoldiers }) {
      var force;

      for (let { roleCode, ...soldier } of completeSoldiers) {
        //Find force the soldier belongs to.
        if (roleCode == "free") force = newState.freeZone.force;
        else {
          const [doing, at] = roleCode.split("-");

          if (doing == "def" && newState.zonesDefense[at])
            force = newState.zonesDefense[at].force;
          else if (doing == "unit" && newState.liberationUnits[camelCase(at)])
            //'at' is the unit name, and the unitKey is always the name in camelCase by definition.
            force = newState.liberationUnits[camelCase(at)].force;
          else
            throw Error(
              `Unrecognizable roleCode '${roleCode}' when setting army.`
            );
        }

        //Find and replace the soldier in it's force.
        force[force.findIndex((s) => s.number == soldier.number)] = soldier;
      }

      return newState;
    },

    //

    clear() {
      return defaultState.army;
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
