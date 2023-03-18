//General purpose functions imports. Keep them separated to ease updating.
import a1 from "./general/arrays/checkItems";
import a2 from "./general/arrays/pickFurtherItem";
import a3 from "./general/arrays/pickRandomItem";
import a4 from "./general/arrays/forRandom";
import a5 from "./general/arrays/countRepeatedItems";
import a6 from "./general/arrays/countItems";
import a7 from "./general/arrays/sliceByIndexes";
import a8 from "./general/arrays/sumItems";
import a9 from "./general/arrays/divide";
import a10 from "./general/arrays/filterAndKeep";

import c2 from "./general/control/exists";
import {
  checkOptionalValues as c6,
  checkRequiredValues as c7,
  mustBe as c8,
} from "./general/control/checkValues";

import o2 from "./general/objects/joinProperties";
import o3 from "./general/objects/stringsToKeys";
import o4 from "./general/objects/sumProperties";
import o5 from "./general/objects/clean";
import o6 from "./general/objects/filterObject";

import h1 from "./general/others/capped";
import h2 from "./general/others/typeOf";

import p1 from "./general/processes/createRepeatingProcess";
import p2 from "./general/processes/wait";

import s1 from "./general/strings/splitAndFilter";
import s2 from "./general/strings/includesGroup";

//General purpose functions exports. Keep them separated to ease updating.
export const checkItems = a1;
export const pickFurtherItem = a2;
export const pickRandomItem = a3;
export const forRandom = a4;
export const countRepeatedItems = a5;
export const countItems = a6;
export const sliceByIndexes = a7;
export const sumItems = a8;
export const divide = a9;
export const filterAndKeep = a10;

export const exists = c2;
export const checkOptionalValues = c6;
export const checkRequiredValues = c7;
export const mustBe = c8;

export const joinProperties = o2;
export const stringsToKeys = o3;
export const sumProperties = o4;
export const clean = o5;
export const filterObject = o6;

export const capped = h1;
export const typeOf = h2;

export const createRepeatingProcess = p1;
export const wait = p2;

export const splitAndFilter = s1;
export const includesGroup = s2;
