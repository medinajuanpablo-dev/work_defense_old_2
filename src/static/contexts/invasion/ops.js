import { random, cloneDeep, mapValues } from "lodash";

//prettier-ignore
import { sumItems, capped, pickRandomItem, checkRequiredValues } from "@static/functions";

import { armyOps } from "../army";
import { miscOps } from "../miscellaneous";
import { MISC } from "../miscellaneous";

/**
 * Tells the amount of _full_ tempos until the first/next invasion from the specified tempo, and the number of the incomming invasion.
 * @param {number} tempo The current tempo.
 */
//prettier-ignore
export function getSights(tempo) {
  checkRequiredValues([{ tempo, type: "number" }]);

  if (tempo <= FIRST_INVASION_TEMPO)
    return {
      temposUntilInvasion: FIRST_INVASION_TEMPO - tempo,
      invasionNumber: 1,
    };

  const temposSinceFirstInvasion = tempo - FIRST_INVASION_TEMPO;

  return {
    temposUntilInvasion: tempo % TEMPOS_FOR_EACH_INVASION,
    invasionNumber: 1 + Math.floor((1 + temposSinceFirstInvasion) / TEMPOS_FOR_EACH_INVASION),
  };
}

/**
 * Creates an enemy soldier for the specified invasion number.
 * @param {number} invasionNumber
 */
function createEnemySoldier(invasionNumber) {
  checkRequiredValues([{ invasionNumber, type: "number" }]);

  const { CE_LEVEL_PER_INVASION: CE_LEVEL, GEAR_PER_INVASION: GEAR } =
    ENEMY_SOLDIER_GENERATION;

  return armyOps.createSoldier({
    level: miscOps.randomIncrease(CE_LEVEL, invasionNumber),
    armorRank: miscOps.randomIncrease(GEAR, invasionNumber),
    weaponRank: miscOps.randomIncrease(GEAR, invasionNumber),
  });
}

/**
 * Creates the enemy force for the specified invasion number.
 * @param {number} invasionNumber
 */
export function createInvasionForce(invasionNumber) {
  checkRequiredValues([{ invasionNumber, type: "number" }]);

  const amount = miscOps.randomIncrease(INVADERS, invasionNumber);

  return Array(amount)
    .fill(false)
    .map(() => createEnemySoldier(invasionNumber));
}

/**
 * Tells the menace count of the specified enemy force.
 * @param {Array<SoldierState>} force
 */
export function enemiesMenace(force) {
  checkRequiredValues([{ force, itemsType: "object" }]);

  return (
    MENACE.PER_ENEMY_LEVEL * sumItems(force.map((soldier) => soldier.ce.level))
  );
}

/**
 * Tells the number of attacks for the specified invasion number.
 * @param {number} invasionNumber
 */
function attacksAmount(invasionNumber) {
  checkRequiredValues([{ invasionNumber, type: "number" }]);

  const FIA = FIRST_INVASIONS_ATTACKS;

  if (invasionNumber < FIA.INVASIONS_WITH_1_ATTACK_MAX) {
    return 1;
  } else if (invasionNumber < FIA.INVASIONS_WITH_2_ATTACKS_MAX) {
    return random(1, 2);
  } else {
    return random(1, MAX_ZONES_ATTACKED);
  }
}

/**
 * Calculates each zone's risk of being attacked in the specified number of invasion, and the number of
 * danger zones (which tells the number of attacks).
 * @param {number} invasionNumber
 */
export function risksFor(invasionNumber) {
  checkRequiredValues([{ invasionNumber, type: "number" }]);

  const attacks = attacksAmount(invasionNumber);
  const zeroRisks = mapValues(MISC.ACTIVE_ZONES, () => 0);

  const zonesRisks = operateZonesRisks({
    points: 100 * attacks,
    zonesRisks: zeroRisks,
    operatingZonesKeys: Object.keys(zeroRisks),
    invasionNumber,
    operation: "give",
    maxRiskPieceParams: MAX_RISK_PIECE.GENERATION,
  });

  const dangerZones = Object.keys(zonesRisks)
    .sort((z1, z2) => zonesRisks[z2] - zonesRisks[z1])
    .slice(0, attacks);

  return { zonesRisks, dangerZones };
}

/**
 * Calculates the base quality of a scouting expedition, which is the quality provided by the
 * Scouts Guild level (or the same as an expedition without investment).
 * @param {number} guildLevel
 */
export function baseExpeditionQuality(guildLevel) {
  const BSQ = BASE_SCOUTING_QUALITY;
  return BSQ.BASE + guildLevel * BSQ.INCREASE;
}

/**
 * Calculates the quality of a scouting expedition by the specified guild level, with the specified
 * investment, and against the specified enemy force.
 * @param {number} guildLevel
 * @param {number} investment
 * @param {Array<SoldierState>} enemyForce
 */
export function expeditionQuality(guildLevel, investment, enemyForce) {
  checkRequiredValues([
    [{ guildLevel, investment }, "n", "n"],
    { enemyForce, itemsType: "object" },
  ]);

  const base = baseExpeditionQuality(guildLevel); //Quality given by the guild (without investment)

  const pureQuality = base * (1 + investment * INVESTMENT_DLOG_IMPACT); //Quality without menace.
  const menaceFactor = 1 / (enemiesMenace(enemyForce) * MENACE.IMPACT);

  return Math.round(pureQuality * menaceFactor); //Final quality.
}

/**
 * Tells if an scouting expedition can be sent with the specified conditions.
 * @param {number} expeditionsDone The amount of expeditions send until the moment of the call.
 * @param {number} investment The investment intended.
 * @param {boolean} returnBoolean If `true`, a boolean will be returned instead of the answer.
 */
export function canScout(expeditionsDone, investment, returnBoolean) {
  checkRequiredValues([
    [{ expeditionsDone, investment, returnBoolean }, "n", "n", "?b"],
  ]);

  if (expeditionsDone >= MAX_EXPEDITIONS_PER_TEMPO)
    return returnBoolean ? false : "maxed-out";
  if (investment < MIN_SCOUTING_INVESTMENT)
    return returnBoolean ? false : "low-investment";

  return returnBoolean ? true : "allowed";
}

/**
 * Performs a scouting process over the specified zones risks and danger zones, with the specified expedition quality,
 * on the specified invasion number. Then returns the new zones risks.
 * @param {Object} params
 * @param {number} params.invasionNumber
 * @param {ZonesRisks} params.zonesRisks
 * @param {Array<string>} params.dangerZones
 * @param {number} params.expeditionQuality
 */
export function scout({
  invasionNumber,
  zonesRisks,
  dangerZones,
  expeditionQuality,
}) {
  checkRequiredValues([
    [{ invasionNumber, expeditionQuality }, "n", "n"],
    { dangerZones, itemsType: "string" },
    { zonesRisks, fieldsType: "number" },
  ]);

  const totalPoints = expeditionQuality * dangerZones.length;
  const nonDangerZones = Object.keys(zonesRisks).filter(
    (z) => !dangerZones.includes(z)
  );

  var scoutedZonesRisks = zonesRisks;

  //Taking points from non-danger zones.
  scoutedZonesRisks = operateZonesRisks({
    points: totalPoints,
    zonesRisks: scoutedZonesRisks,
    operatingZonesKeys: nonDangerZones,
    invasionNumber,
    operation: "take",
    maxRiskPieceParams: MAX_RISK_PIECE.SCOUTING_TAKE,
  });

  //Adding points to danger zones.
  scoutedZonesRisks = operateZonesRisks({
    points: totalPoints,
    zonesRisks: scoutedZonesRisks,
    operatingZonesKeys: dangerZones,
    invasionNumber,
    operation: "give",
    maxRiskPieceParams: MAX_RISK_PIECE.SCOUTING_GIVE,
  });

  return scoutedZonesRisks;
}

/**
 * Selects the zones that will be attacked from the specified zones risks and amount of attacks.
 * @param {ZonesRisks} zonesRisks
 * @param {number} attacksAmount
 */
export function selectAttackedZones(zonesRisks, attacksAmount) {
  checkRequiredValues([
    { zonesRisks, fieldsType: "number" },
    { attacksAmount, type: "number" },
  ]);

  var attackedZones = [];

  //Sort zones from lowest risk to highest.
  var sortedZones = Object.keys(zonesRisks).sort(
    (z1, z2) => zonesRisks[z1] - zonesRisks[z2]
  );

  //Select 100% risk zones as attacked zones. If all attacked zones were selected here, return them.
  for (let z of [...sortedZones].reverse()) {
    if (zonesRisks[z] === 100) {
      attackedZones.push(z);
      sortedZones.splice(sortedZones.indexOf(z), 1);

      if (attackedZones.length === attacksAmount) return attackedZones;
    }
  }

  //Pick a probability from 0 to 99 and test sorted risks. Repeat until getting all attacked zones.
  while (attackedZones.length < attacksAmount) {
    const p = random(0, 99);

    for (let z of sortedZones)
      if (p < zonesRisks[z]) {
        attackedZones.push(z);
        sortedZones.splice(sortedZones.indexOf(z), 1);
        break;
      }
  }

  return attackedZones;
}

//Local Types

/**
 * @typedef {{[zoneKey: string]: number}} ZonesRisks
 */

//Local Functions.

/**
 * Randomly takes or gives the specified amount of points from/into the specified zones risks, based on the specified
 * invasion number and max risk piece params.
 * @param {Object} params
 * @param {number} params.points The number of points to take/give
 * @param {ZonesRisks} params.zonesRisks The zones risks to operate with. _NOT MUTATED_.
 * @param {Array<string>} params.operatingZonesKeys The keys of the zones to operate with.
 * @param {number} params.invasionNumber The number of the comming invasion.
 * @param {"take" | "give"} params.operation The operation to perform.
 * @param {{BASE: number, DECREASE_PER_INVASION: number, LOWER_CAP: number}} params.maxRiskPieceParams Parameters to calculate the max risk piece.
 * @returns {ZonesRisks} The new zones risks.
 */
function operateZonesRisks({
  points,
  zonesRisks,
  operatingZonesKeys,
  invasionNumber,
  operation,
  maxRiskPieceParams,
}) {
  const mrpp = maxRiskPieceParams;
  const maxRiskPiece = capped(
    mrpp.BASE - invasionNumber * mrpp.DECREASE_PER_INVASION,
    { min: mrpp.LOWER_CAP }
  );

  var newZonesRisks = cloneDeep(zonesRisks);
  var remainingRisk = points;

  if (operation === "take")
    while (
      remainingRisk > 0 &&
      operatingZonesKeys.some((z) => newZonesRisks[z] > 0)
    ) {
      const z = pickRandomItem(operatingZonesKeys);

      if (newZonesRisks[z] === 0) continue;

      const riskPiece = capped(
        capped(random(1, maxRiskPiece), { max: newZonesRisks[z] }),
        { max: remainingRisk }
      );

      newZonesRisks[z] -= riskPiece;
      remainingRisk -= riskPiece;
    }
  else
    while (
      remainingRisk > 0 &&
      operatingZonesKeys.some((z) => newZonesRisks[z] < 100)
    ) {
      const z = pickRandomItem(operatingZonesKeys);

      if (newZonesRisks[z] === 100) continue;

      const until100 = 100 - newZonesRisks[z];
      const riskPiece = capped(
        capped(random(1, maxRiskPiece), { max: until100 }),
        { max: remainingRisk }
      );

      newZonesRisks[z] += riskPiece;
      remainingRisk -= riskPiece;
    }

  return newZonesRisks;
}

//========================================================================================================
//------------------------------------ Local values used in the ops only ---------------------------------
//========================================================================================================

/**Tempo in which the first invasion will ocurr. */
const FIRST_INVASION_TEMPO = 10;

/**One invasion will happen every this amount of tempos. */
const TEMPOS_FOR_EACH_INVASION = 2;

/**Maximum amount of zones that can be attacked in a single invasion. */
const MAX_ZONES_ATTACKED = 3;

/**Numbers of invasions that have a lower maximum amount of attacks, counting from the first invasion. */
const FIRST_INVASIONS_ATTACKS = {
  INVASIONS_WITH_1_ATTACK_MAX: 2, //This is X. Invasions 1 to X can be attacked 1 time only.
  INVASIONS_WITH_2_ATTACKS_MAX: 2, //This is Y. Invasions X to Y can be attacked 1 or 2 times only.
};

/**Values to calculate the amount of enemy soldiers in a specific invasion. */
const INVADERS = {
  base: 1,
  increase: { min: 0.5, max: 1 }, //Per Invasion
};

/**Values to generate enemy soldiers. */
const ENEMY_SOLDIER_GENERATION = {
  /**Enemy soldier CE level based on the invasion number. */
  CE_LEVEL_PER_INVASION: {
    base: 1,
    increase: { min: 0.35, max: 0.5 }, //Per Invasion
  },
  /**Enemy soldier gear ranks based on the invasion number. */
  GEAR_PER_INVASION: {
    base: 1,
    increase: { min: 0.2, max: 0.35 }, //Per Invasion
  },
};

/**Value that indicate how equally the risk is distributed among zones both when generating and scouting.
 * More equal risks mean more unpredictable attacks. */
const MAX_RISK_PIECE = {
  /**The lower this value, the more equally risks are distributed when generating them. */
  GENERATION: { BASE: 100, DECREASE_PER_INVASION: 2, LOWER_CAP: 20 },
  /**The lower this value, the more equally risks are taken from non-danger zones when scouting. */
  SCOUTING_TAKE: { BASE: 30, DECREASE_PER_INVASION: 2, LOWER_CAP: 10 },
  /**The lower this value, the more equally risks are given to danger zones when scouting. */
  SCOUTING_GIVE: { BASE: 30, DECREASE_PER_INVASION: 2, LOWER_CAP: 10 },
};

/**Maximum amount of scouting expeditions in a single tempo. */
const MAX_EXPEDITIONS_PER_TEMPO = 3;

/**Minimum amount of Dlogs required to dispatch a scouting expedition. */
const MIN_SCOUTING_INVESTMENT = 1;

/**Values to calculate a scouting expedition base quality. */
const BASE_SCOUTING_QUALITY = {
  BASE: 10,
  INCREASE: 20, //Per Guild Level.
};

/**The percentage the scouting expedition quality is improved by each Dlog of investment. */
const INVESTMENT_DLOG_IMPACT = 0.25;

/**Menace of enemy forces decreases the scouting quality in an inverse proportion. */
const MENACE = {
  /**How much menace an enemy soldier level implies. */
  PER_ENEMY_LEVEL: 1,
  /**How much each menace point decreases a scouting expedition quality. */
  IMPACT: 0.35,
};

// Completely useless. It's way better to just divide it straightforward.

// /**
//  * Divides the provided enemy force into the specified amount of sub-forces. The process intends to give each
//  * sub-force a similar power.
//  * @param {Array<Soldier>} enemyForce
//  * @param {number} divisionsAmount
//  */
//  export function divideEnemyForce(enemyForce, divisionsAmount) {
//   //Sort the force by power and divide it in as many groups as divisions.
//   const groups = divide(
//     enemyForce.sort((s2, s1) => armyOps.powerOf(s2) - armyOps.powerOf(s1)),
//     divisionsAmount
//   );

//   //Shuffle and divide group each into more sub-groups: as many as divisions.
//   const subGrouped = groups.map((g) => divide(shuffle(g), divisionsAmount));

//   //For each division, pick 1 random subgroup of each group.
//   const divisions = Array(divisionsAmount)
//     .fill()
//     .map(() => []);

//   for (let div of divisions)
//     for (let g of subGrouped) div.push(...pickRandomItem(g, true));

//   return divisions;
// }
