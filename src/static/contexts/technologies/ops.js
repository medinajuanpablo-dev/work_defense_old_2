import { KEYS as TEK } from "./gens";

/**
 * Returns the status of the technology at the specified index of the specified column.
 * @param {Array<{researched: boolean}>} techsColumnResearchState The research state of a certain column of technologies.
 * @param {number} techIndex The index of the technology which status is requested.
 * @returns The status key.
 */
export function getStatus(techsColumnResearchState, techIndex) {
  if (techsColumnResearchState[techIndex].researched)
    return TEK.STATUS.RESEARCHED;

  if (techIndex === 0 || techsColumnResearchState[techIndex - 1].researched)
    return TEK.STATUS.AVAILABLE;

  return TEK.STATUS.LOCKED;
}

//========================================================================================================
//------------------------------------ Local values used in the ops only ---------------------------------
//========================================================================================================
