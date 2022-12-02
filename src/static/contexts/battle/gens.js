export const KEYS = {
  PROTOCOL_TYPES: {
    NO_RETREAT: "noRetreat",
    POWER_LEFT: "powerLeft",
    ALIVE_SOLDIERS: "aliveSoldiers",
  },
};

export const PROTOCOL_TYPES_NAMES = {
  [KEYS.PROTOCOL_TYPES.NO_RETREAT]: "No Retreat",
  [KEYS.PROTOCOL_TYPES.POWER_LEFT]: "Remaining Power",
  [KEYS.PROTOCOL_TYPES.ALIVE_SOLDIERS]: "Alive Soldiers",
};

/**Protocol applied by default to all forces.
 * @type {import("@state/defaultState").RetreatProtocolState} */
export const DEFAULT_PROTOCOL = {
  type: KEYS.PROTOCOL_TYPES.NO_RETREAT,
  amount: 0,
};

/**Period from the moment a defense battle is started to the moment the result is displayed.*/
export const SECONDS_UNTIL_DEFENSE_RESULT = 5;

/**Period from the moment a liberation is dispatched to the moment it is executed and the result is displayed. */
export const SECONDS_UNTIL_LIBERATION = 7;
