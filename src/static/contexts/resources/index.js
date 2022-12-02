import * as operations from "./ops";
import * as gens from "./gens";

const { KEYS, ...generals } = gens;

export const resourcesOps = operations;
export const RESOURCES = generals;
export const REK = KEYS;
