import { random } from "lodash";

import {
  pickRandomItem,
  capped,
  sumProperties,
  forRandom,
  checkRequiredValues,
  checkOptionalValues,
} from "@static/functions";

import { armyOps } from "../army";
import { KEYS as BTK } from "./gens";

const RPK = BTK.PROTOCOL_TYPES;

/* 
Battle steps.
- Build battle forces from the participant forces. 
- Do rounds until there is an amount of forces equal to the amount of winners.
- Build survivor forces from the final winner and retreated forces. 
- Build and return results.

Round steps.
- Select random non-processed and alive soldier from a random force as active.
- Active soldier turn.
- Process retreatments and wiped soldiers.
- Set the active soldier as fighted.

Turn steps.
- Select random soldier from a random another force as target.
- Perform attack to target soldier.
- Process damage and decrease target life. If killed, remove it from it's force.

Attack steps.
- Calculate attacker damage.
- Calculate target defense.
- Calculate and return final damage.
*/

/**
 *
 * @param {{[forceName: string]: {force: Array<SoldierState>, protocol: RetreatProtocolState}}} forcesWithProtocol
 * @param {number} winnerForcesAmount The amount of forces that survived the battle without retreating. Is 1 by default.
 */
export function battle(forcesWithProtocol, winnerForcesAmount = 1) {
  checkOptionalValues([
    [{ forcesWithProtocol, winnerForcesAmount }, "!o", "n"],
  ]);

  var battleForces = buildBattleForces(forcesWithProtocol);
  var rounds = 0;

  //Rounds.
  while (battleContinues()) {
    rounds++;

    //Extract round's fighters soldiers. A fighter soldier is both alive and member of an active force.
    /**@type {{[figtherKey: string]: BattleSoldier}} */
    var roundFighters = {};

    for (let bf in battleForces)
      if (battleForces[bf].state === "active")
        for (let bs in battleForces[bf].aliveSoldiers) {
          const battleSoldier = battleForces[bf].aliveSoldiers[bs];
          roundFighters[fighterKey(battleSoldier)] = battleSoldier;
        }

    //The pending fighters are fighters soldiers that didn't attack yet in this round. The round finishes when there are no more pending fighters.
    var pendingFighters = { ...roundFighters };

    //Turns.
    //prettier-ignore
    while (battleContinues() && Object.values(pendingFighters).length > 0) {
      //Pick a random pending fighter. Remove it from pending fighters.
      const activeSoldier = pickRandomItem(Object.values(pendingFighters));
      delete pendingFighters[fighterKey(activeSoldier)];

      //Pick a random enemy fighter.
      const enemyFighters = Object.values(roundFighters).filter(bs => bs.force !== activeSoldier.force);
      const targetSoldier = pickRandomItem(enemyFighters);

      //Attack that bitch and decrease bitch's life.
      targetSoldier.life = processAttack(activeSoldier, targetSoldier);

      //Bitch died measures.
      if (targetSoldier.life === 0) {
        //Remove the bitch as pending fighter. If it didn't attack before, is not gonna do it now.
        delete pendingFighters[fighterKey(targetSoldier)];

        //Bitch is no longer an alive soldier, now is rock dead.        
        delete battleForces[targetSoldier.force].aliveSoldiers[targetSoldier.key];
        battleForces[targetSoldier.force].deadSoldiers[targetSoldier.key] = targetSoldier;
      }
    }

    //After turns, try retreatments for random forces until all of them have tried it.
    forRandom(Object.values(battleForces), (bf) => {
      if (bf.state === "active") {
        const survivorsList = Object.values(bf.aliveSoldiers);

        if (
          bf.protocol.type === RPK.ALIVE_SOLDIERS &&
          survivorsList.length <= bf.protocol.amount
        )
          bf.state = "retreated";
        else if (
          bf.protocol.type === RPK.POWER_LEFT &&
          sumProperties(survivorsList, ["power"]).power <= bf.protocol.amount
        )
          bf.state = "retreated";

        //If the battle doesn't continue after retreatment, finish so the winner forces don't retreat.
        if (!battleContinues()) return true;
      }
    });
  }

  //Build winner, retreated and wiped forces (of original soldiers). Each of these groups specify the soldiers of
  //each force that belong to that group, so a specific force will probably appear in more than one group.
  var winnerForces = {};
  var retreatedForces = {};
  var killedForces = {};

  for (let forceName in battleForces) {
    const { aliveSoldiers, deadSoldiers, state } = battleForces[forceName];

    //Add dead soldiers to killed forces.
    if (Object.values(deadSoldiers).length > 0)
      killedForces[forceName] = originalSoldiers(deadSoldiers);

    if (Object.values(aliveSoldiers).length > 0) {
      //Winner soldiers are the survivors of active forces.
      if (state === "active")
        winnerForces[forceName] = originalSoldiers(aliveSoldiers);
      //Else they retreated.
      else retreatedForces[forceName] = originalSoldiers(aliveSoldiers);
    }
  }

  //Separated Processes

  /**Battle continues as long as there are more active and alive forces than specified winners. */
  function battleContinues() {
    const activeAndAliveBattleForces = Object.values(battleForces)
      .filter((bf) => Object.keys(bf.aliveSoldiers).length > 0) //Filter alive forces (has at least 1 alive soldier)
      .filter((bf) => bf.state === "active"); //Filter active forces.

    return activeAndAliveBattleForces.length > winnerForcesAmount;
  }

  /**A key that identifies the fighter soldier. */
  function fighterKey({ force, key }) {
    return `${force}_${key}`;
  }

  /**Selects the original soldiers out of the specified battle soldiers.*/
  function originalSoldiers(battleSoldiers) {
    return Object.values(battleSoldiers).map(
      (bs) => forcesWithProtocol[bs.force].force[bs.originalIndex]
    );
  }

  //Return results.
  return { winnerForces, retreatedForces, killedForces, rounds };
}

/**Creates battle values for each force of the battle. For each force, it contains the protocol, alive soldiers,
 * the dead soldiers and the current state of the force (active or retreated).
 * @param {{[forceName: string]: {force: Array<SoldierState>, protocol: RetreatProtocolState}}} forcesWithProtocol
 * @returns {{[forceName: string]: BattleForce}}
 */
export function buildBattleForces(forcesWithProtocol) {
  var battleForces = {};

  for (let forceName in forcesWithProtocol) {
    checkRequiredValues([
      {
        battleForce: forcesWithProtocol[forceName],
        someFields: ["force", "protocol"],
      },
    ]);

    const { force, protocol } = forcesWithProtocol[forceName];

    var forceBattleSoldiers = {};

    for (let s = 0; s < force.length; s++) {
      const battleSoldier = buildBattleSoldier(force[s], s, forceName);
      forceBattleSoldiers[battleSoldier.key] = battleSoldier;
    }

    battleForces[forceName] = {
      protocol,
      aliveSoldiers: forceBattleSoldiers,
      deadSoldiers: {},
      state: "active",
    };
  }

  return battleForces;
}

/**
 * Builds the battle stats of a soldier from it's passive values (CE and gear).
 * @param {SoldierState} soldier The soldier which associated battleSoldier will be built.
 * @param {number} soldierIndex Original soldier index in the original force.
 * @param {string} forceName
 * @returns {BattleSoldier} The built battleSoldier.
 */
export function buildBattleSoldier(soldier, soldierIndex, forceName) {
  checkRequiredValues([[{ soldier, soldierIndex, forceName }, "o", "n", "s"]]);

  const { ce, gear } = soldier;

  const BSG = BATTLE_SOLDIER_GENERATION;

  return {
    key: `bs${soldierIndex}`,
    force: forceName,
    life: BSG.LIFE_PER_CE_LEVEL * ce.level,
    damage: {
      max: BSG.DAMAGE.MAX_PER_ARMOR_RANK * gear.weaponRank,
      get min() {
        const F = BSG.DAMAGE.MIN_PER_CE_LEVEL;
        return capped(F * ce.level, { max: this.max });
      },
    },
    defense: {
      max: BSG.DEFENSE.MAX_PER_ARMOR_RANK * gear.armorRank,
      get min() {
        const F = BSG.DEFENSE.MIN_PER_CE_LEVEL;
        return capped(F * ce.level, { max: this.max });
      },
    },
    power: armyOps.powerOf(soldier),
    originalIndex: soldierIndex,
  };
}

/**
 * Process an attack from the `attacker` soldier to the `target` soldier.
 * @param {BattleSoldier} attacker
 * @param {BattleSoldier} target
 * @returns The target's remaining life.
 */
export function processAttack(attacker, target) {
  checkRequiredValues([[{ attacker, target }, "o", "o"]]);

  const { damage } = attacker;
  const { defense, life } = target;

  const effectiveDamage = random(damage.min, damage.max, true);
  const effectiveDefense = random(defense.min, defense.max, true);

  const finalDamage = capped(effectiveDamage - effectiveDefense, { min: 0 });

  return capped(life - finalDamage, { min: 0 });
}

//========================================================================================================
//------------------------------------ Local values used in the ops only ---------------------------------
//========================================================================================================

/**Values to generate Battle Soldiers. */
const BATTLE_SOLDIER_GENERATION = {
  /**Life points for each CE level of the soldier. */
  LIFE_PER_CE_LEVEL: 10,
  /**To calculate Defense min and max points. */
  DEFENSE: {
    /**Defense minimal value for each CE level. */
    MIN_PER_CE_LEVEL: 4,
    /**Defense maximum value for each Armor rank. */
    MAX_PER_ARMOR_RANK: 8,
  },
  /**To calculate Damage min and max points. */
  DAMAGE: {
    /**Damage minimal value for each CE level. */
    MIN_PER_CE_LEVEL: 8,
    /**Damage maximum value for each Armor rank. */
    MAX_PER_ARMOR_RANK: 16,
  },
};

/**Name of each force and the individual soldier in the battle log. */
// const NAMES_IN_LOG = {
//   DEFENSE: { force: "Defense", soldier: "Def" },
//   LIBERATION: { force: "Lib. Unit", soldier: "Lib" },
//   INVADERS: { force: "Invaders", soldier: "Inv" },
//   OCCUPANTS: { force: "Occupants", soldier: "Occ" },
// };

/**
 * @typedef {import("@state/defaultState").SoldierState} SoldierState
 * @typedef {import("@state/defaultState").RetreatProtocolState} RetreatProtocolState
 *
 * @typedef BattleForce
 * @property {RetreatProtocolState} protocol Retreat protocol of this BattleForce
 * @property {{[soldierKey: string]: BattleSoldier}} aliveSoldiers BattleSoldiers currently alive (life > 0) in this BattleForce.
 * @property {{[soldierKey: string]: BattleSoldier}} deadSoldiers BattleSoldiers currently dead (life <= 0) in this BattleForce.
 * @property {"active" | "retreated"} state State in battle of this BattleForce.
 *
 * @typedef BattleSoldier
 * @property {string} key The string that identifies the battle soldier in it's force.
 * @property {string} force The name of the force the soldier belongs to. Is the same as the original force.
 * @property {number} life The amount of damage a soldier can take until death. If higher than 0, the soldier is considered alive, otherwise is dead.
 * @property {{min: number, max: number}} defense The amount of damage absorved (not taken from `life`) when being attacked.
 * @property {{min: number, max: number}} damage The base amount of life that would be taken from a target soldier on attack.
 * @property {number} power The battle soldier power count.
 * @property {number} originalIndex Index to identify the original soldier from which the battle soldier was created.
 */
