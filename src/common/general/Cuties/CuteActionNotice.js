/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { checkOptionalValues } from "@static/functions";
import { useFocusSensor } from "@static/react";
import { useIndicatedStyles } from "@static/tailwind";

/**A button that shows a notice when pressed.
 *
 * @param {Object} props
 * @param {Array<Indicator>} props.extraIndicators An array with Indicators definitions. Check `tailwind/indicatedStyles` for more.
 * @param {ConditionParams} props.extraIndParams An object with the parameters needed for the custom Indicators conditions. Check `tailwind/indicatedStyles` for more.
 * @param {StylesObject} props.customDirSty An object containing directed styles for each element rendered by the component. They can be non-directed if needed.
 * @param {React.Component} props.ButtonIcon The Icon Component to show as the clickable action.
 * @param {React.Component} props.Icon The Icon Component to show aside the notice text.
 * @param {string} props.title The notice title text.
 * @param {string} props.body The notice main text part.
 * @param {"left" | "right"} props.position The notice position relative to the button.
 * @param {boolean} props.showing Turns this into a Controlled Component by forcing the showing state of the notification message.
 * @param {(showing: boolean) => void} props.onSwitch Callback executed when the notification shows/hides. This doesn't execute on external changes through the `showing` prop.
 * @param {boolean} props.hideOnEscape If `false`, the message popup won't hide on Escape. It's `true` by default.
 * @param {"focus" | "hover" | "external"} props.behavior When the message popup shows up and hides. Is `"focus"` by default.
 * - If `"focus"`, it will show up on focus and hide on blur.
 * - If `"hover"`, it will only show up on hover and hide on un-hover.
 * - If `"external"`, it won't react on anything and has to be controlled from outside.
 */
function CuteActionNotice({
  ButtonIcon,
  Icon,
  title,
  body,
  position = "left",
  hideOnEscape = true,
  behavior = "focus",
  showing: ctrlShowing,
  onSwitch,
  customDirSty,
  extraIndicators,
  extraIndParams,
}) {
  checkOptionalValues([
    [{ title, body, onSwitch, ctrlShowing }, "s", "s", "f", "b"],
    [{ position, hideOnEscape }, "mustBe:left,right", "boolean"],
    { behavior, enmr: ["focus", "hover", "external"] },
    { customDirSty, onlyFields: Object.keys(DIRECTED_STYLES) },
    [{ extraIndParams, extraIndicators }, "object", "array"],
  ]);

  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES, { customDirSty, extraIndicators });

  const [hovered, setHovered] = React.useState(false);
  const [localShowing, setLocalShowing] = React.useState(false);

  const isControlled = ctrlShowing !== undefined;
  const showing = isControlled ? ctrlShowing : localShowing;

  function setShowing(newValue) {
    if (!isControlled) setLocalShowing(newValue);
    if (onSwitch) onSwitch(newValue);
  }

  const ctRef = React.useRef();
  const ctFocus = useFocusSensor(ctRef, { focusedByDefault: showing });

  //prettier-ignore
  React.useEffect(() => {
    if (hideOnEscape) {
      const onKeyPress = (e) => e.key == "Escape" && setShowing((isShowing) => (isShowing ? false : isShowing)); //Close on escape, if showing.
      window.addEventListener("keydown", onKeyPress);
      return () => window.removeEventListener("keydown", onKeyPress);
    }
  }, []);

  React.useEffect(() => {
    if (behavior == "focus" && ctFocus.focused !== showing)
      ctFocus.setFocused(showing); //If showing changed and is different than focus, sync the focus with it.
  }, [showing]);

  React.useEffect(() => {
    if (behavior == "focus" && ctFocus.focused !== showing)
      setShowing(ctFocus.focused); //If focus changed and is different than showing, sync the showing with it.
  }, [ctFocus.focused]);

  function onMouseMoved(entered) {
    if (behavior == "hover") setShowing(entered); //Open/Close on hover/unhover when hover behavior.
    if (behavior != "external") setHovered(entered); //Always do this to highlight the Icon, except when doing external control.
  }

  //prettier-ignore
  const styles = getActiveStyles({ hovered, showing, position, behavior, ...extraIndParams });

  return (
    <div className={styles.ct}>
      <div
        ref={ctRef}
        onMouseLeave={() => onMouseMoved(false)}
        onMouseEnter={() => onMouseMoved(true)}
        className={styles.buttonCt}
      >
        <ButtonIcon className={styles.buttonIcon} />
      </div>

      <div className={styles.noticeCt}>
        {Icon && <Icon className={styles.noticeIcon} />}
        <div className={styles.noticeTextCt}>
          {title && <p className={styles.noticeTitle}>{title}</p>}
          {body && <p className={styles.noticeBody}>{body}</p>}
        </div>
        <div className={styles.noticeTumor} />
      </div>
    </div>
  );
}

//prettier-ignore
/**
 * @typedef {Object} StylesObject
 * @property {string} ct **CNR**. Default Styles: `"relative select-none"`
 * @property {string} buttonCt **CS**. Default Styles: `"relative w-5 h-5 text-gray-700 z-20 focus:outline-none | xs:w-6 xs:h-6 || ne<cursor-pointer> ho,sh<text-blue-500>"`
 * @property {string} buttonIcon **CNR**. Default Styles: `"w-full h-full"`
 * @property {string} noticeCt **CWC**. Default Styles: `"absolute transform -translate-y-6 visible-0 opacity-0 bg-white z-50 w-64 py-3 px-4 border-b-2 border-gray-500 rounded-xl text-gray-700 flex items-center bottom-10 transition-all duration-300 lightly-shadowed-box | xs:w-72 || le<-right-3> ri<-left-3> sh<opacity-100'visible-1'translate-y-0>"`
 * @property {string} noticeIcon **CS**. Default Styles: `"w-8 h-8 stroke-1 flex-none | xs:w-10 xs:h-10"`
 * @property {string} noticeTextCt **CS**. Default Styles: `"pl-2"`
 * @property {string} noticeTitle **CS**. Default Styles: `"text-xs text-strong | xs:text-sm"`
 * @property {string} noticeBody **CS**. Default Styles: `"text-ss text-light | xs:text-xs"`
 * @property {string} noticeTumor **CWC**. Default Styles: `"absolute -bottom-1 w-2 h-2 bg-white transform rotate-45 border-b-2 border-r-2 translate-y-px rounded-sm border-gray-500 || le<right-5> ri<left-5>"`
 */
const DIRECTED_STYLES = {
  ct: "relative select-none",

  buttonCt: "relative w-5 h-5 text-gray-700 z-20 focus:outline-none | xs:w-6 xs:h-6 || ne<cursor-pointer> ho,sh<text-blue-500>",
  buttonIcon: "w-full h-full",

  noticeCt: "absolute transform -translate-y-6 visible-0 opacity-0 bg-white z-50 w-64 py-3 px-4 border-b-2 border-gray-500 rounded-xl text-gray-700 flex items-center bottom-10 transition-all duration-300 lightly-shadowed-box | xs:w-72 || le<-right-3> ri<-left-3> sh<opacity-100'visible-1'translate-y-0>",
  noticeIcon: "w-8 h-8 stroke-1 flex-none | xs:w-10 xs:h-10",
  noticeTextCt: "pl-2",
  noticeTitle: "text-xs text-strong | xs:text-sm",
  noticeBody: "text-ss text-light | xs:text-xs",
  noticeTumor: "absolute -bottom-1 w-2 h-2 bg-white transform rotate-45 border-b-2 border-r-2 translate-y-px rounded-sm border-gray-500 || le<right-5> ri<left-5>",
};

//prettier-ignore
const INDICATORS = [
  { key: "hovered", directive: "ho", condition: (p) => p.hovered },
  { key: "showing", directive: "sh", condition: (p) => p.showing },
  { key: "left", directive: "le", condition: p => p.position == "left" },
  { key: "right", directive: "ri", condition: p => p.position == "right" },
  { key: "notExternal", directive: "ne", condition: p => p.behavior != "external" }
];

/**
 * @typedef {import("@static/tailwind/useIndicatedStyles").Indicator} Indicator
 * @typedef {import("@static/tailwind/useIndicatedStyles").ConditionParams} ConditionParams
 * */

export default CuteActionNotice;
