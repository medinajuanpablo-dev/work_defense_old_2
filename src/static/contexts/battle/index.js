/* ==== Battle Values ====
All values related to battle in all forms, both defense and liberations: To generate battle soldiers, and 
miscellaneous battle values.

These are general values and keys, meaning they are used in multiple and spread places (stages, state and/or static).
Local-use values and keys are defined where they are used. 
*/

import * as operations from "./ops";
import * as gens from "./gens";

const { KEYS, ...generals } = gens;

export const battleOps = operations;
export const BATTLE = generals;
export const BTK = KEYS;
