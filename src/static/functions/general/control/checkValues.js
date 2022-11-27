import { exists, typeOf } from "@static/functions";

/**
 * @param {Array<CheckConfig>} checksConfigList
 * @param {"all-required" | "all-optional"} defaultBehavior
 */
function checkValues(checksConfig, defaultBehavior) {
  if (!Array.isArray(checksConfig) || checksConfig.length === 0)
    throw Error("The checks configuration must be a non-empty array."); //Check that `checksConfigList` is a non-empty array.

  const parsedChecksConfig = parseChecksConfig(checksConfig);

  var configErrors = []; //Check config errors messages stored here to be all displayed as a list at the end.
  var checkFails = []; //Check fails messages stored here to be all displayed as a list at the end.

  //For each configuration item...
  for (let cc = 0; cc < parsedChecksConfig.length; cc++) {
    //Validate config and extract the value and it's key. If validation errors in this config, add them.
    const check = parsedChecksConfig[cc];
    const { valueKey, value, valErrors } = validateCheckConfig(check, cc);
    if (valErrors) configErrors = configErrors.concat(valErrors);
    if (configErrors.length > 0) continue; //Just 1 validation error must abort everything. Continue just to add more validation errors and show them together.

    //Now start the checks.
    const FAIL_MESSAGES = FAILED_CHECK_MESSAGES(
      valueKey,
      value,
      check.exclusiveTypes
    ); //To point which value failed and how.

    //Requirement or optionallity. This process makes sense only when the value doesn't exist.
    if (!exists(value)) {
      let required = defaultBehavior === "all-required";
      if (exists(check.req)) required = check.req;

      //Value doesn't exist. If required, check fails, add fail message and proceed to next item.
      //If optional, proceed to next item so checks are not performed. In both cases, continue with the next config item.
      if (required) checkFails.push(check.msg || FAIL_MESSAGES.REQUIRED);
      continue;
    }

    //Check some fields and only fields.
    if (exists(check.reqFields)) {
      if (typeOf(value) !== "object")
        checkFails.push(FAIL_MESSAGES.NON_OBJECT_FIELDS_CHECK);
      else {
        const missingFields = check.reqFields.filter((f) => !exists(value[f]));
        if (missingFields.length > 0)
          checkFails.push(FAIL_MESSAGES.MISSING_FIELDS(missingFields));
      }
    }
    if (exists(check.onlyFields)) {
      if (typeOf(value) !== "object")
        checkFails.push(FAIL_MESSAGES.NON_OBJECT_FIELDS_CHECK);
      else {
        const invalidFields = Object.keys(value).filter(
          (f) => !check.onlyFields.includes(f)
        );
        if (invalidFields.length > 0)
          checkFails.push(FAIL_MESSAGES.INVALID_FIELDS(invalidFields));
      }
    }

    //Inclusive or exclusively checks a type.
    const rawTypeChecks = {
      single: (value, type) =>
        check.exclusiveTypes ? typeOf(value, type) : !typeOf(value, type),
      multiple: (value, types) =>
        check.exclusiveTypes
          ? types.includes(typeOf(value))
          : !types.includes(typeOf(value)),
    };

    //Check type.
    if (exists(check.type)) {
      //Single type check.
      if (
        typeOf(check.type) === "string" &&
        rawTypeChecks.single(value, check.type)
      )
        checkFails.push(check.msg || FAIL_MESSAGES.SINGLE_TYPE(check.type));
      //Multiple types check.
      else if (rawTypeChecks.multiple(value, check.type))
        checkFails.push(check.msg || FAIL_MESSAGES.TYPES_LIST(check.type));
    }

    //Check items type.
    if (exists(check.itemsType)) {
      if (typeOf(value) !== "array")
        checkFails.push(check.msg || FAIL_MESSAGES.NON_ARRAY_ITEMS_CHECK);
      else {
        const isSingleCheck = typeOf(check.itemsType) === "string";
        const invalidItems = value
          .map((item, index) => ({ item, index }))
          .filter(
            ({ item }) =>
              (isSingleCheck && rawTypeChecks.single(item, check.itemsType)) ||
              rawTypeChecks.multiple(item, check.itemsType)
          );
        if (invalidItems.length > 0) {
          if (isSingleCheck)
            checkFails.push(
              FAIL_MESSAGES.ITEMS_SINGLE_TYPE(invalidItems, check.itemsType)
            );
          else
            checkFails.push(
              FAIL_MESSAGES.ITEMS_TYPES_LIST(invalidItems, check.itemsType)
            );
        }
      }
    }

    //Check fields type.
    if (exists(check.fieldsType)) {
      if (typeOf(value) !== "object")
        checkFails.push(check.msg || FAIL_MESSAGES.NON_OBJECT_FIELDS_CHECK);
      else {
        const isSingleCheck = typeOf(check.fieldsType) === "string";
        const invalidFields = Object.keys(value)
          .map((key) => ({ key, value: value[key] }))
          .filter(
            (field) =>
              (isSingleCheck &&
                rawTypeChecks.single(field.value, check.fieldsType)) ||
              rawTypeChecks.multiple(field.value, check.fieldsType)
          );
        if (invalidFields.length > 0) {
          if (isSingleCheck)
            checkFails.push(
              FAIL_MESSAGES.FIELDS_SINGLE_TYPE(invalidFields, check.fieldsType)
            );
          else
            checkFails.push(
              FAIL_MESSAGES.FIELDS_TYPES_LIST(invalidFields, check.fieldsType)
            );
        }
      }
    }

    //Check enumeration
    if (exists(check.enmr))
      if (!check.enmr.includes(value))
        checkFails.push(check.msg || FAIL_MESSAGES.ENUMERATION);

    //Check with callback
    if (exists(check.ch))
      if (!check.ch(value))
        checkFails.push(check.msg || FAIL_MESSAGES.CALLBACK);
  }

  //If any, display config error messages.
  if (configErrors.length > 0)
    throw Error(
      "There are configuration errors in checkValues:" +
        configErrors.map((err) => `\n> ${err}`).join("")
    );

  //If any, display check fails messages.
  if (checkFails.length > 0)
    throw Error(
      "Some values didn't pass their checks:" +
        checkFails.map((chf) => `\n> ${chf}`).join("")
    );
}

/** Reads the specified check configuration and returns a detailed check configuration.
 * @param {Array<CheckConfig | QuickChecks>} checksConfigList
 * @returns {Array<CheckConfig>}
 */
function parseChecksConfig(checksConfigList) {
  var errors = [];
  var parsedList = [];

  for (let cc = 0; cc < checksConfigList.length; cc++) {
    const checkConfig = checksConfigList[cc];
    const PARSE_ERRORS = CONFIG_PARSE_ERRORS(cc); //To point the number of check where the error is.
    const type = typeOf(checkConfig);

    if (type !== "array" && type !== "object") {
      errors.push(PARSE_ERRORS.INVALID_CHECK);
      continue;
    }

    //Detailed check config. Add it as-is.
    if (type === "object") parsedList.push(checkConfig);
    //Quick check. Proceed to parse/validate and build a detailed check config.
    else {
      const [values, ...quickChecks] = checkConfig;

      //First element must be an object of values.
      if (typeOf(values) !== "object") {
        errors.push(PARSE_ERRORS.FIRST_ELEMENT_NOT_VALUES(values));
        continue;
      }

      //Must have as many quickChecks as number of values.
      if (quickChecks.length !== Object.keys(values).length) {
        errors.push(
          PARSE_ERRORS.MISTMATCH_VALUES_CHECKS(quickChecks, Object.keys(values))
        );
        continue;
      }

      //Build the detailed check config.
      const detailedCheckConfig = quickChecks.map((qc, index) => {
        const checkingKey = Object.keys(values)[index];
        const checkingValue = Object.values(values)[index];

        var checkConfig = { [checkingKey]: checkingValue };

        //Valid requirement token.
        if (qc.charAt(0) === "!" || qc.charAt(0) === "?") {
          checkConfig.req = qc.charAt(0) === "!";
          qc = qc.substring(1);
        }

        //And...
        if (qc !== "") {
          //Valid type letter or..
          if (qc.length === 1 && VALID_TYPES.includes(parseTypeLetter(qc)))
            checkConfig.type = parseTypeLetter(qc);
          //Valid type string or...
          else if (VALID_TYPES.includes(qc)) checkConfig.type = qc;
          //Valid simplified enumeration or...
          else if (qc.includes(":")) {
            const [mustBe, enmr] = qc.split(":");
            if (mustBe === "mustBe" && enmr.length !== 0)
              checkConfig.enmr = enmr.split(",");
          }
          //Invalid quick check error.
          else {
            errors.push(
              PARSE_ERRORS.INVALID_QUICK_CHECK(qc, checkingKey, index)
            );
            return null;
          }
        }

        return checkConfig;
      });

      parsedList = parsedList.concat(detailedCheckConfig);
    }
  }

  if (errors.length > 0)
    throw Error(
      "There are parsing errors in checkValues:" +
        errors.map((err) => `\n> ${err}`).join("")
    );

  return parsedList;
}

/** Checker of the checker. Makes sure all check configuration fields are correct.
 * @param {CheckConfig} checkConfig */
function validateCheckConfig(checkConfig, index) {
  var errors = [];
  const ERROR_MESSAGES = SINGLE_CONFIG_ERROR_MESSAGES(index); //To point the number of check where the error is.
  //prettier-ignore
  const {type,itemsType,fieldsType,exclusiveTypes,enmr,msg,req,ch,reqFields,onlyFields,...valuesList} = checkConfig; //Destructuration necessary to find the value and it's also useful.

  //Validate that one value is provided, not more nor less.
  if (Object.keys(valuesList).length === 0)
    errors.push(ERROR_MESSAGES.NO_VALUE);
  else if (Object.keys(valuesList).length > 1)
    errors.push(ERROR_MESSAGES.MULTIPLE_VALUES(valuesList));

  //Validate msg config field: Must be a string.
  if (exists(msg) && typeOf(msg) !== "string")
    errors.push(ERROR_MESSAGES.INVALID_ERROR_MESSAGE(msg));

  //Validate req config field: Must be a boolean.
  if (exists(req) && typeOf(req) !== "boolean")
    errors.push(ERROR_MESSAGES.INVALID_REQ_CHECK(req));

  //Validate someFields and onlyFields config fields: Must be a non-empty array of strings.
  function validateFieldsCheckConfig(config, which) {
    if (typeOf(config) !== "array")
      errors.push(ERROR_MESSAGES.INVALID_FIELDS_CHECK(config, which));
    else if (config.length === 0)
      errors.push(ERROR_MESSAGES.EMPTY_FIELDS_CHECK(config, which));
    else
      for (let f of config)
        if (typeOf(f) !== "string")
          errors.push(ERROR_MESSAGES.FIELDS_CHECK_NON_STRING(f, which));
        else if (f.length === 0)
          errors.push(ERROR_MESSAGES.FIELDS_CHECK_EMPTY_STRING(which));
  }
  if (exists(reqFields)) validateFieldsCheckConfig(reqFields, "someFields");
  if (exists(onlyFields)) validateFieldsCheckConfig(onlyFields, "onlyFields");

  if (exists(exclusiveTypes) && !typeOf(exclusiveTypes, "boolean"))
    errors.push(ERROR_MESSAGES.INVALID_EXCLUSIVE_TYPES_SETTING(exclusiveTypes));

  //Validate type and itemsType config fields: Must be a valid type string or a non-empty array of them.
  function validateTypeCheckConfig(config, which) {
    if (typeOf(config) !== "string" && typeOf(config) !== "array")
      errors.push(ERROR_MESSAGES.INVALID_TYPE_CHECK(config, which));
    else if (typeOf(config) === "array" && config.length === 0)
      errors.push(ERROR_MESSAGES.EMPTY_TYPE_CHECK(which));
    else
      for (let t of Array.isArray(config) ? config : [config])
        if (!VALID_TYPES.includes(t))
          errors.push(ERROR_MESSAGES.TYPE_CHECK_INVALID_STRING(t, which));
  }
  if (exists(type)) validateTypeCheckConfig(type, "type");
  if (exists(itemsType)) validateTypeCheckConfig(itemsType, "itemsType");
  if (exists(fieldsType)) validateTypeCheckConfig(fieldsType, "fieldsType");

  //Validate enmr config field: Must be a non-empty array of strings or numbers.
  if (exists(enmr)) {
    if (!Array.isArray(enmr))
      errors.push(ERROR_MESSAGES.INVALID_ENMR_CHECK(enmr));
    else if (enmr.length === 0) errors.push(ERROR_MESSAGES.EMPTY_ENMR_CHECK);
    else
      enmr.forEach((item, i) => {
        if (typeOf(item) !== "string" && typeOf(item) !== "number")
          errors.push(ERROR_MESSAGES.ENMR_CHECK_INVALID_VALUE(item, i));
      });
  }

  //Validate ch config field: Must be a function.
  if (exists(ch) && typeOf(ch) !== "function")
    errors.push(ERROR_MESSAGES.INVALID_CALLBACK);

  return errors.length > 0
    ? { valErrors: errors }
    : {
        valueKey: Object.keys(valuesList)[0],
        value: Object.values(valuesList)[0],
      };
}

/**
 * @callback CustomChecker
 * @param {any} v The value, so it can be checked.
 * @returns {boolean} The custom check result.
 *
 * @typedef {"array" | "object" | "number" | "string" | "function" | "boolean" | "undefined" | "symbol" | "bigint"} ValidType
 *
 * @typedef CheckConfig
 * @property {ValidType | Array<ValidType>} type The allowed type or list of types for the value.
 * @property {Array<string | number>} enmr An enumeration of possible strings or numbers the value might be. If it's not one of these, the check fails.
 * @property {string} msg An extra error message when the check fails.
 * @property {boolean} req If `true`, the value is required. If `false`, the value is optional.
 * @property {CustomChecker} ch A custom checker callback that receives the value as parameter.
 * @property {Array<string>} reqFields The required fields this object must contain, but not necessarily the only ones. Implicitly controls that value is an object.
 * @property {Array<string>} onlyFields The only fields this object might contain, but not necessarily all required. Implicitly controls that value is an object.
 * @property {ValidType | Array<ValidType>} itemsType Allowed type or list of types for the items of an array. Implicitly controls that value is an array.
 * @property {ValidType | Array<ValidType>} fieldsType Allowed type or list of types for the fields of an object. Implicitly controls that value is an object.
 * @property {boolean} exclusiveTypes If `true`, all types checks will be exclusive (checks the value is NOT of the specified types) rather than inclusive (default).
 *
 * @typedef {Array<any>} QuickChecks
 */

export const VALID_TYPES = [
  ...["array", "object", "number", "string", "function"],
  ...["boolean", "undefined", "symbol", "bigint", "null"],
];

//prettier-ignore
function parseTypeLetter(typeLetter){
  switch(typeLetter){
    case "a": return "array";
    case "o": return "object";
    case "n": return "number";
    case "s": return "string";
    case "f": return "function";
    case "b": return "boolean";
    case "u": return "undefined";
    default: return "invalid";
  }
}

//prettier-ignore
const FAILED_CHECK_MESSAGES = (valueKey, value, exclusiveTypes) => ({
  REQUIRED: 
    `Value '${valueKey}' is required, so it should exist but is '${value}'.`,
  NON_OBJECT_FIELDS_CHECK: 
    `Value '${valueKey}' must be an object to perform field checks, but is '${typeOf(value)}'`,
  MISSING_FIELDS: (missingFields) =>
    `Value '${valueKey}' is missing fields: ${missingFields.join(", ")}`,
  INVALID_FIELDS: (invalidFields) => 
    `Value '${valueKey}' contains invalid fields: ${invalidFields.join(", ")}`,
  SINGLE_TYPE: (type) =>
    `Value '${valueKey}' should ${exclusiveTypes ? "NOT " : ""}be '${type}' but ${exclusiveTypes ? "it is" : `is '${typeOf(value)}'`} `,
  TYPES_LIST: (typesList) =>
    `Value '${valueKey}' should ${exclusiveTypes ? "NOT " : ""}be ${typesList.join(" or ")} but is '${typeOf(value)}'`,
  NON_ARRAY_ITEMS_CHECK: 
    `Value ${valueKey} must be an array to perform items check, but is '${typeOf(value)}'`,
  ITEMS_SINGLE_TYPE: (invalidItems, type) =>
    `Items of '${valueKey}' should ${exclusiveTypes ? "NOT " : ""}be ${type}s, but it contains: ${invalidItems.map((ii) => `${typeOf(ii.item)} [${ii.index}]`).join(", ")}`,
  ITEMS_TYPES_LIST: (invalidItems, typesList) =>
    `Items of '${valueKey}' should ${exclusiveTypes ? "NOT " : ""}be ${typesList.map(t => t + "s").join(" or ")}, but it contains: ${invalidItems.map((ii) => `${typeOf(ii.item)} [${ii.index}]`).join(", ")}`, 
  FIELDS_SINGLE_TYPE: (invalidFields, type) =>
    `Fields of '${valueKey}' should ${exclusiveTypes ? "NOT " : ""}be ${type}s, but it contains: ${invalidFields.map((ivf) => `'${ivf.key}' (${typeOf(ivf.value)})`).join(", ")}`,
  FIELDS_TYPES_LIST: (invalidFields, typesList) =>
    `Fields of '${valueKey}' should ${exclusiveTypes ? "NOT " : ""}be ${typesList.map(t => t + "s").join(" or ")}, but it contains: ${invalidFields.map((ivf) => `'${ivf.key}' (${typeOf(ivf.value)})`).join(", ")}`, 
  ENUMERATION: 
    `Value '${valueKey}' should be one of the specified enumeration but is '${value}'. Note: if checking string-numbers, the value must be a string-number too.`,
  CALLBACK: 
    `Value '${valueKey}' doesn't pass the specified check callback."`,  
});

//prettier-ignore
const CONFIG_PARSE_ERRORS = index => ({
  INVALID_CHECK: 
    `The check number ${index + 1} is invalid as is not a detailed check config (object) nor a quick check config (array).`,
  FIRST_ELEMENT_NOT_VALUES: firstElement =>
    `The check number ${index + 1} is invalid. The first element of a quick check must be an object with the values to check, but is '${typeOf(firstElement)}'`,
  MISTMATCH_VALUES_CHECKS: (quickChecks, values) =>
    `The check number ${index + 1} is invalid. The number of quick checks (${quickChecks.length}) must be equal to the number of checking values (${values.length}).`,
  INVALID_QUICK_CHECK: (qcString, checkingKey, position) => 
    `The check number ${index + 1} is invalid. The quick check '${qcString}' at position ${position} for the value '${checkingKey}' is invalid.`,
})

//prettier-ignore
const SINGLE_CONFIG_ERROR_MESSAGES = (index) => ({
  MULTIPLE_VALUES: (valuesList) =>
    `The check number ${index + 1} is invalid. It contains multiple (${Object.keys(valuesList).length}) values to check.`,
  NO_VALUE: 
    `The check number ${index + 1} is invalid. No value to check was provided (or the value has the same name as one of the check fields).`,
  INVALID_ERROR_MESSAGE: (msg) =>
    `The check number ${index + 1} is invalid. The error message 'msg' must be a string but is '${typeOf(msg)}'.`,
  INVALID_REQ_CHECK: (req) =>
    `The check number ${index + 1} is invalid. The check field 'req' must be a boolean but is '${typeOf(req)}'.`,
  INVALID_FIELDS_CHECK: (config, which) =>
    `The check number ${index + 1} is invalid. The check field '${which}' must be an array of strings, but is '${typeOf(config)}'.`, //For someFields and onlyFields
  EMPTY_FIELDS_CHECK: (config, which) =>
    `The check number ${index + 1} is invalid. The check field '${which}' is empty.`,
  FIELDS_CHECK_NON_STRING: (fieldKey, which) =>
    `The check number ${index + 1} is invalid. The check field '${which}' contains a field that should be a string but is '${typeOf(fieldKey)}'.`,
  FIELDS_CHECK_EMPTY_STRING: (which) =>
    `The check number ${index + 1} is invalid. The check field '${which}' contains an empty string.`,
  INVALID_TYPE_CHECK: (type, which) =>
    `The check number ${index + 1} is invalid. The check field '${which}' must be a string or a non-empty array, but is '${typeOf(type)}'.`,
  EMPTY_TYPE_CHECK: (which) =>
    `The check number ${index + 1} is invalid. The check field '${which}' is an empty array.`,
  TYPE_CHECK_INVALID_STRING: (string, which) =>
    `The check number ${index + 1} is invalid. The check field '${which}' contains an invalid type string: '${string}'.`,
  INVALID_EXCLUSIVE_TYPES_SETTING: (exclusiveTypes) => 
    `The check number ${index + 1} is invalid. The check field 'exclusiveTypes' must be a boolean, but is ${typeOf(exclusiveTypes)}.`,
  INVALID_ENMR_CHECK: (enmr) => 
    `The check number ${index + 1} is invalid. The check field 'enmr' must be an array, but is '${typeOf(enmr)}'`,   
  EMPTY_ENMR_CHECK: 
    `The check number ${index + 1} is invalid. The check field 'enmr' is an empty array, which makes no sense as checks will never pass.`,
  ENMR_CHECK_INVALID_VALUE: (value, position) => 
    `The check number ${index + 1} is invalid. Every value in 'enmr' must be a string or number, but value at position ${position} is ${typeOf(value)}.`,
  INVALID_CALLBACK: 
    `The check number ${index + 1} is invalid. The check callback 'ch' must be a function.`,
});

/**Short and secure values checks. All required by default.
 * @param {Array<CheckConfig | QuickChecks>} checksConfig
 */
export function checkRequiredValues(checksConfig) {
  return checkValues(checksConfig, "all-required");
}

/**Short and secure values checks. All optional by default.
 * @param {Array<CheckConfig | QuickChecks>} checksConfig
 */
export function checkOptionalValues(checksConfig) {
  return checkValues(checksConfig, "all-optional");
}

/**
 * Builds a simplified enumeration check config out of an array or the values of an object.
 * @param {Array<Array<string | number> | {[x: string]: string | number}>} enums
 */
export function mustBe(...enums) {
  var totalEnmr = [];

  for (let e of enums) {
    checkRequiredValues([{ e, type: ["array", "object"] }]);
    totalEnmr = totalEnmr.concat(typeOf(e) === "array" ? e : Object.values(e));
  }

  return `mustBe:${totalEnmr.join(",")}`;
}
