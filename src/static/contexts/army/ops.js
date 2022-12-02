import { cloneDeep, random } from "lodash";

//prettier-ignore
import { sumProperties, checkRequiredValues, checkOptionalValues } from "@static/functions";

/**
 * Creates a brand new soldier (fully new object) with customized stats.
 * @param {Object} params
 * @param {number} params.number
 * @param {number} params.level
 * @param {number} params.weaponRank
 * @param {number} params.armorRank
 * @returns {SoldierState} The created soldier.
 */
export function createSoldier({ number, level, weaponRank, armorRank }) {
  checkOptionalValues([
    { number, req: true, type: "number" },
    [{ level, weaponRank, armorRank }, "n", "n", "n"],
  ]);

  var soldier = cloneDeep(BLANK_SOLDIER);

  soldier.number = number;
  if (level) soldier.ce.level = level;
  if (weaponRank) soldier.gear.weaponRank = weaponRank;
  if (armorRank) soldier.gear.armorRank = armorRank;

  return soldier;
}

/**
 * Calculates the maximum CE level a soldier can have when graduating from an academy of the specified level.
 * @param {number} academyLevel
 * @returns {number} The maximum CE level for a just-graduated soldier.
 */
export function maxGraduationCE(academyLevel) {
  checkRequiredValues([{ academyLevel, type: "number" }]);

  return (
    BLANK_SOLDIER.ce.level + academyLevel * GRADUATION_CE_PER_ACADEMY_LEVEL //Base soldier level + levels provided by the academy.
  );
}

/**
 * Creates a graduated soldier of the specified level from an academy of the specified level.
 * If the graduation level is higher than allowed by the academy, an error is thrown.
 * @param {number} ofLevel The level of the graduated soldier.
 * @param {number} academyLevel The current level of the academy.
 * @returns {SoldierState} The graduated soldier.
 */
export function createGraduatedSoldier(ofLevel, academyLevel) {
  checkRequiredValues([[{ ofLevel, academyLevel }, "n", "n"]]);

  if (ofLevel > maxGraduationCE(academyLevel))
    throw Error(
      `Can't graduate a soldier of level ${ofLevel} from an academy of level ${academyLevel}.`
    );

  return createSoldier({ level: ofLevel });
}

/**
 * Tells the amount of Dlogs to recruit a soldier of the specified level.
 * @param {number} level
 * @returns {number} Cost in Dlogs.
 */
export function recruitmentCost(level) {
  checkRequiredValues([{ level, type: "number" }]);

  return TRAINMENT_COST_PER_CE * level;
}

/**
 * Calculates the power of a force or a single soldier.
 * @param {Array<SoldierState>} force The force to calculate the power of. Can be a single soldier.
 * @returns {number} The power of the specified force.
 */
export function powerOf(force) {
  checkRequiredValues([{ force, itemsType: "object" }]);

  const _force = Array.isArray(force) ? force : [force];

  var power = 0;

  for (let soldier of _force) {
    const gearPower = sumProperties(soldier.gear) * POWER.GEAR_RANK_FACTOR;
    const levelPower = soldier.ce.level * POWER.LEVEL_FACTOR;

    power += levelPower * gearPower;
  }

  return power;
}

/**
 * Calculates the amount of combat experience progress gained by the soldiers in the `winnerForce` for defeating the `defeatedForce`.
 * @param {Array<SoldierState>} defeatedForce
 * @param {Array<SoldierState>} winnerForce
 * @returns An array with the gained CE progress for each winner soldier in the same order they were passed.
 */
export function experienceFor(defeatedForce, winnerForce) {
  checkRequiredValues([
    { defeatedForce, itemsType: "object" },
    { winnerForce, itemsType: "object" },
  ]);

  const dpp = powerOf(defeatedForce); // dpp == defeated power points
  const dppPerWinnerSoldier = dpp / winnerForce.length;

  //Despite all soldiers having the same dpp, each gains a different random amount of experience per dpp.
  const { min, max } = CE.LEARN_PER_POWER_POINT;

  return winnerForce.map(() => {
    const experiencePerDPP = random(min, max, true);
    return experiencePerDPP * dppPerWinnerSoldier;
  });
}

/**
 * Tells the required experience (CE progress) for a soldier to level up from `levelFrom` to `levelTo`.
 * @param {number} levelFrom The current CE level of a soldier.
 * @param {number} levelTo The CE level to which the soldier may level up.
 * @returns The amount of required CE progress needed.
 */
export function requiredExpFor(levelFrom, levelTo) {
  checkRequiredValues([
    { levelFrom, type: "number" },
    { levelTo, type: "number", ch: () => levelTo <= levelFrom },
  ]);

  const { BASE, GROW } = CE.REQUIRED_EXP;

  var requiredExp = 0;

  for (let level = levelFrom + 1; level <= levelTo; level++)
    requiredExp += BASE * Math.exp(level * GROW);

  return requiredExp;
}

/**
 * Calculates how many levels the specified soldier gained, it's new CE values, and useful percentages,
 * for a specified gained experience.
 *
 * **IMPORTANT**: The passed soldier is _not_ mutated.
 * @param {SoldierState} soldier
 * @param {number} gainedExp
 */
export function processLearn(soldier, gainedExp) {
  const { level: prevLevel, progress: prevExp } = soldier.ce;

  var remainingExp = gainedExp + prevExp;
  var reachedLevel = prevLevel;

  while (true) {
    const requiredForNextLvl = requiredExpFor(reachedLevel, reachedLevel + 1);

    if (remainingExp >= requiredForNextLvl) {
      remainingExp -= requiredForNextLvl;
      reachedLevel++;
    } else break;
  }

  return {
    newCE: { level: reachedLevel, progress: remainingExp },
    gainedLevels: reachedLevel - prevLevel,
    prevPercentage: (prevExp / requiredExpFor(prevLevel, prevLevel + 1)) * 100,
    newPercentage:
      (remainingExp / requiredExpFor(reachedLevel, reachedLevel + 1)) * 100,
  };
}

/**
 * Calculates the mantainment cost of the specified force.
 * @param {Array<SoldierState>} force
 * @param {boolean} reposing Specify if the force is reposing.
 */
export function forceMantainment(force, reposing) {
  if (reposing) return MANTAINMENT.SOLDIER_IN_REPOSE * force.length;

  const M = MANTAINMENT.SOLDIER_IN_DUTY;
  var total = 0;

  for (let soldier of force) {
    const increases = Math.floor(soldier.ce.level / M.LEVELS_PER_INCREASE);
    total += M.BASE + increases * M.PER_INCREASE;
  }

  return total;
}

//========================================================================================================
//------------------------------------ Local values used in the ops only ---------------------------------
//========================================================================================================

/** @type {SoldierState} */
const BLANK_SOLDIER = {
  number: NaN,
  ce: {
    level: 1,
    progress: 0,
  },
  gear: {
    weaponRank: 0,
    armorRank: 0,
  },
};

/**Trainment cost in Dlogs for each CE level of the graduated soldier. */
const TRAINMENT_COST_PER_CE = 2;

/**Combat Experience level a soldier receives when graduating, per each Academy Level.
 * This adds up with the default `BASE_SOLDIER` CE level. */
const GRADUATION_CE_PER_ACADEMY_LEVEL = 1;

/**Values to calculate the power of a soldier. */
const POWER = {
  /**Power for each CE level of a soldier. */
  LEVEL_FACTOR: 1,
  /**Power for each gear rank of a soldier. */
  GEAR_RANK_FACTOR: 0.35,
};

/**Values to calculate adquired and required CE progress points. */
const CE = {
  /**Range of CE Progress points obtained for each Power point of beaten enemies. */
  LEARN_PER_POWER_POINT: { min: 5, max: 15 },
  /**The base required experience and how quickly it increases from there. */
  REQUIRED_EXP: { BASE: 10, GROW: 0.1 },
};

/**Values to calculate Mantainment cost in Food for a single soldier. */
const MANTAINMENT = {
  /**Cost for a soldier in repose (in the Free Zone). */
  SOLDIER_IN_REPOSE: 1,
  /**To calculate for a soldier in duty. */
  SOLDIER_IN_DUTY: {
    /**Base cost. */
    BASE: 1,
    /**Amount of added cost for each "increase". */
    PER_INCREASE: 0.5,
    /**Amount of the soldier's CE levels to consider a "increase". */
    LEVELS_PER_INCREASE: 2,
  },
};

/**
 * @typedef {import("@state/defaultState").SoldierState} SoldierState
 */

// //Level up log.
// log +=
//   gainedLevels > 0
//     ? `\nLevel: ${soldier.CE.level} -> ${newLevel}.`
//     : `\nLevel: ${newLevel}.`;

// //Progress log. Shows new if didn't level up only.
// log +=
//   "\nProgress to next level: " +
//   (gainedLevels
//     ? `${floor(newPerc)}%`
//     : `${floor(prevPerc)}% -> ${floor(newPerc)}%`);

// // log += `\nprev={leve l:${soldier.CE.level},progress:${soldier.CE.progress}}\nnew={level:${newLevel},progress:${remaining}}`;

// /**
//  * Builds a description log for the specified force.
//  * @param {Array<Soldier>} force
//  * @param {string} forceName
//  */
// export function buildForceDescription(force, forceName) {
//   checkValues({
//     force: { v: force, type: "array" },
//     forceName: { v: forceName, type: "string" },
//   });

//   var d = `\n\t==== ${forceName} Details ====`;

//   d += `\n\n> Soldiers: ${force.length}`;
//   d += `\n> Force Power: ${powerOf(force)}`;
//   d += "\n\n";

//   force.forEach((soldier, index) => {
//     const { gear, ce } = soldier;
//     var sd = `${index + 1}> ${powerOf(soldier).toPrecision(2)} Power.`;
//     sd += `\nLevel ${ce.level} of Combat Experience.`;
//     sd += `\nWeapon rank ${gear.weapon} — Armor rank ${gear.armor}`;

//     d += "\n\n" + sd;
//   });

//   return d;
// }
