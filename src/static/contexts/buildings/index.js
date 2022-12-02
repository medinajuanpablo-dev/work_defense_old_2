import * as operations from "./ops";
import * as gens from "./gens";

const { KEYS, ...generals } = gens;

export const buildingsOps = operations;
export const BUILDINGS = generals;
export const BDK = KEYS;
