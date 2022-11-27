/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { parseInt } from "lodash";

import { checkOptionalValues } from "@static/functions";

import CuteInput from "./CuteInput";

/**Intuitive and easy extension of `CuteInput` for time values in a `hour:minutes` format. As is an extension,
 * accepts all the same props and directed styles, except for:
 *
 * - `value` state is now a `time`. The initial value must be of the format `"NN:NN"`, where `N` is a single digit `number`.
 * Can be `null` or empty string to declare an empty field, which will be handled automatically.
 * - `setValue` is now `setTime`. It should not change the time before assigning it. If an unvalid change is done, an error will be thrown.
 *
 * **Extra Indicators**:
 * It also includes four extra Indicators:
 *
 * - _allowed time_ (directive `alw`) and _forbidden time_ (directive `frb`), which depend of the `minTime` and `maxTime` props.
 * - _done time_ (directive `dot`) and _active time_ (directive `act`), which are re-definitions of the _active_ and _done_ Indicators from the CuteInput.
 *
 * **Exported Functions**:
 * Import this file separatedly to import the functions `isValidTime` and `isAllowedTime`.
 *
 * ---
 *
 * @param {Object} props Customize the component with props.
 *
 * @param {string} props.time Turns this into a Controlled Component by forcing the time input's value.
 * @param {(time: string) => void} props.onChange A callback executed on time change. This doesn't execute on external changes through the time prop.
 * @param {string} props.minTime If the time is higher or equal than this, then it's an _Allowed Time_. Otherwise, it's a _Forbidden Time_. It's `"00:00"` by default.
 * @param {string} props.maxTime If the time is lower or equal than this, then it's an _Allowed Time_. Otherwise, it's a _Forbidden Time_. It's `"23:59"` by default.
 * @param {boolean} props.isAllowed Turns this into a Controlled Component by forcing the time allowance state.
 * @param {(isAllowed: boolean) => void} props.onAllowanceChange Callback executed everytime the time allowance changes. This doesn't execute on external changes through the isAllowed prop.
 * @param {boolean} props.textarea If `true`, the input will be a textarea.
 * @param {string} props.label The text appearing as placeholder that will then move to the top left border when focused or valued.
 * @param {number} props.maxLength The maximum amount of characters allowed in the input.
 * @param {boolean} props.allowOverflow If `true`, the input will allow the user to continue writing when the max length is reached.
 * @param {Array<Indicator>} props.extraIndicators An array with Indicators definitions. Check `tailwind/indicatedStyles` for more.
 * @param {ConditionParams} props.extraIndParams An object with the parameters needed for the custom Indicators conditions. Check `tailwind/indicatedStyles` for more.
 * @param {React.RefObject} props.upperRef A ref from the container to control the input, if necessary.
 * @param {JSX.Element} props.noticeElement Pass a an element to be rendered at the right side of the input. A CuteActionNotice is recommended.
 * @param {import("./CuteInput").StylesObject} props.customDirSty An object containing directed styles for each element rendered by the component. They can be non-directed if needed.
 * @param {(focused: boolean) => void} props.onFocusChange A callback to execute when the component focus changes.
 * */
function CuteTimeInput({
  time: ctrlTime,
  onChange,
  minTime = "00:00",
  maxTime = "23:59",
  isAllowed: ctrlIsAllowed,
  onAllowanceChange,
  extraIndicators = [],
  extraIndParams = {},
  ...passProps
}) {
  //prettier-ignore
  checkOptionalValues([
    { minTime, ch: isValidTime }, { maxTime, ch: isValidTime }, 
    { ctrlTime, ch: isValidTime }, { ctrlIsAllowed, type: "boolean" },
    [{ onChange, onAllowanceChange }, "function", "function"],
    [{ extraIndicators, extraIndParams }, "array", "object"]
  ]);

  const [localTime, setLocalTime] = React.useState(null);

  const isTimeControlled = ctrlTime !== undefined;
  const time = isTimeControlled ? ctrlTime : localTime;
  const isEmpty = isEmptyTime(time);

  const [localIsAllowed, setLocalIsAllowed] = React.useState(() =>
    isAllowedTime(time, minTime, maxTime)
  );

  const isAllowanceControlled = ctrlIsAllowed !== undefined;
  const isAllowed = isAllowanceControlled ? ctrlIsAllowed : localIsAllowed;

  const inputRef = React.useRef();
  const { current: cv } = React.useRef({ wasEmpty: isEmpty, changed: false });

  React.useEffect(() => {
    //If controlled and externally set to empty, reset emptiness handling.
    if (isTimeControlled && isEmptyTime(time))
      [cv.wasEmpty, cv.changed] = [true, false];
  }, [time]);

  function setTime(newTime, carretTo) {
    if (!isTimeControlled) setLocalTime(newTime);
    if (onChange) onChange(newTime);
    if (carretTo !== undefined)
      setTimeout(() => {
        inputRef.current.selectionStart = carretTo;
        inputRef.current.selectionEnd = carretTo;
      }, 1);
  }

  function setIsAllowed(newValue) {
    if (!isAllowanceControlled) setLocalIsAllowed(newValue);
    if (onAllowanceChange) onAllowanceChange(newValue);
  }

  //Enable/disable field to write
  function enableEmptyField(focused) {
    if (cv.changed || !cv.wasEmpty) return; //If the user changed something or it wasn't initially empty, avoid this process.

    //If focused and empty, un-empty it and set carret to start.
    if (focused && isEmpty) setTime("00:00", 0);
    //If unfocused and user didn't change anything (still 00:00), then re-set it to empty.
    else if (!focused && time == "00:00") setTime(null);
    //If unfocused and the user typed an hour (changed), never do this process again.
    else if (!focused && !isEmpty && time != "00:00") cv.changed = true;
  }

  //Build and check new time, then set it.
  function input(inputtedValue) {
    if (isEmpty) return;

    const carretAfterInput = inputRef.current.selectionStart;
    const newTime = buildNewTime(inputtedValue, time, carretAfterInput);

    //Update time, carret and allowance with new values.
    if (isValidTime(newTime.value)) {
      const isNewAllowed = isAllowedTime(newTime.value, minTime, maxTime);
      if (isNewAllowed !== isAllowed) setIsAllowed(isNewAllowed);

      setTime(newTime.value, newTime.carret);
    }
    //Everything is back to as it was before the input.
    else setTime(time, carretAfterInput - 1);
  }

  //prettier-ignore
  const timeInputIndParams = { isAllowed, isEmpty };

  return (
    <CuteInput
      value={isEmpty ? EMPTY_TIME : time}
      onChange={input}
      onFocusChange={enableEmptyField}
      upperRef={inputRef}
      extraIndicators={[...TIME_INPUT_INDICATORS, ...extraIndicators]}
      extraIndParams={{ ...timeInputIndParams, ...extraIndParams }}
      {...passProps}
    />
  );
}

const EMPTY_TIME = "- - : - -";

/**Builds a new time with the inputted value and the carret position after input, then returning
 * the built time and the new position for the carret.*/
function buildNewTime(inputtedValue, currentTime, carretAfterInput) {
  var currentTimeArray = currentTime.split("");

  //A new value was inputted. The carret moved 1 forward. Replace new character.
  if (inputtedValue.length === 6) {
    const newCharIndex = carretAfterInput - 1;
    const replacingIndex = newCharIndex === 2 ? 3 : newCharIndex;

    currentTimeArray[replacingIndex] = inputtedValue.charAt(newCharIndex);

    return { value: currentTimeArray.join(""), carret: replacingIndex + 1 };
  }

  //A number was deleted. The carret moved 1 backwards. Replace the deleted char with a zero.
  else {
    const deletedCharIndex = carretAfterInput;
    const replacingIndex = deletedCharIndex === 2 ? 1 : deletedCharIndex;

    currentTimeArray[replacingIndex] = 0;

    return { value: currentTimeArray.join(""), carret: replacingIndex };
  }
}

/**Makes multiple checks over the new time.*/
export function isValidTime(newTime) {
  if (isEmptyTime(newTime)) return true; //Empty time is valid.

  //Five characters and 3rd character must be a ":"
  if (newTime.length !== 5) return false; //Five characters, not more nor less.
  if (newTime.charAt(2) !== ":") return false; //3rd character must be a ":".

  //Every digit must be an integer
  const [hourStr, minutesStr] = newTime.split(":");
  if (
    isNaN(parseInt(hourStr.charAt(0))) ||
    isNaN(parseInt(hourStr.charAt(1))) ||
    isNaN(parseInt(minutesStr.charAt(0))) ||
    isNaN(parseInt(minutesStr.charAt(1)))
  )
    return false;

  //Hour between 0 and 23. Minutes between 0 and 59.
  if (hourStr < 0 || hourStr > 23) return false;
  if (minutesStr < 0 || minutesStr > 59) return false;

  return true;
}

export function isAllowedTime(time, min, max) {
  if (isEmptyTime(time)) return false;

  const [hourStr, minutesStr] = time.split(":");
  const [minHourStr, minMinutesStr] = min.split(":");
  const [maxHourStr, maxMinutesStr] = max.split(":");

  const timeTotalMinutes = hourStr * 60 + minutesStr * 1;
  const minTotalMinutes = minHourStr * 60 + minMinutesStr * 1;
  const maxTotalMinutes = maxHourStr * 60 + maxMinutesStr * 1;

  if (minTotalMinutes >= maxTotalMinutes)
    throw Error(
      `CuteTimeInput: The minTime (${min}) is higher or equal than the maxTime (${max}).`
    );

  return (
    timeTotalMinutes >= minTotalMinutes && timeTotalMinutes <= maxTotalMinutes
  );
}

function isEmptyTime(time) {
  return time === null || time === "";
}

//prettier-ignore
const TIME_INPUT_INDICATORS = [
  { key: "allowedTime", directive: "alw", condition: (p) => p.isAllowedTime },
  { key: "forbiddenTime",  directive: "frb", condition: (p) => !p.isAllowedTime },
  { key: "doneTime", directive: "dot", condition: (p) => !p.focused && !p.isEmpty },
  { key: "activeTime", directive: "act", condition: p => p.hovered || p.focused }
];

/**
 * @typedef {import("@static/tailwind/useIndicatedStyles").Indicator} Indicator
 * @typedef {import("@static/tailwind/useIndicatedStyles").ConditionParams} ConditionParams
 */

export default CuteTimeInput;
