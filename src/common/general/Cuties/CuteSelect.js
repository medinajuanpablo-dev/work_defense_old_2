import React from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import { GrClose, GrCheckmark } from "react-icons/gr";

import { checkOptionalValues, mustBe, typeOf } from "@static/functions";
import { useIndicatedStyles } from "@static/tailwind";
import { useFocusSensor, useObjectState } from "@static/react";

/**Easy and Cute option selector.
 *
 * ### Example of `options`:
 *
 * ```
 * const HATED_MEALS = {
 *    sandwiches: { text: "I hate sandwiches", Icon: NoSandwichesIcon },
 *    eggs: { text: "I despise boiled eggs" },
 *    pizza: { text: "I'm a horrible being but I hate pizza", SelectedIcon: HorribleBeingIcon }
 * }
 * ```
 *
 * ### Supported specifications for each option:
 *
 * - `text [string]`: The displayed text in that option.
 * - `Icon [Component]`: An Icon Component to show aside the text.
 * - `SelectedIcon [Component]`: Icon Component to show when the option is selected.
 *
 * @param {Object} props Customize the component with props.
 *
 * @param {string} props.label The text indicating what is going to be selected.
 * @param {string} props.selectedKey Turns this into a Controlled Component by forcing the currently selected option key.
 * @param {(selectedKey: string) => void} props.onSelection Callback executed when an option is selected. This doesn't execute on external changes through the selectedKey prop.
 * @param {boolean} props.listVisible Turns this into a Controlled Component by forcing if the list is visible or not.
 * @param {(listVisible: boolean) => void} props.onToggle Callback executed when the list visibility changes. This doesn't execute on external changes through the listVisible prop.
 * @param {string} props.hoveredOption Turns this into a Controlled Component by forcing the currently hovered option.
 * @param {(hoveredOption: string) => void} props.onHoveredOptionChange Callback executed when the hovered option changes. This doesn't execute on external changes through the hoveredOption prop.
 * @param {boolean} props.showOnFocus If `false`, the list won't open on focus (click). Is `true` by default.
 * @param {boolean} props.hideOnBlur If `false`, the list won't hide on blur. Is `true` by default.
 * @param {boolean} props.hideOnEscape If `false`, the list won't hide on Escape. Is `true` by default.
 * @param {{[optionKey: string]: Option}} props.options The displayed options, see below for an example. It must be an `object` and each field is an option with an obligatory key and another `object` as value. The object-value contains the showing text, among other specifications.
 * @param {StylesObject} props.customDirSty An object to specify directed styles to any of the component's rendered elements, except Options.
 * @param {OptionStylesObject} props.optionCustomDirSty An object to specify directed styles to any of an Option's rendered elements.
 * @param {Array<Indicator>} props.extraIndicators  An array of extra indicators that may come within the `customDirSty`.
 * @param {Array<Indicator>} props.optionExtraIndicators An array of extra indicators that may come within the `optionCustomDirSty`.
 * @param {ConditionParams} props.extraIndParams An object of the extra needed parameters for the `extraIndicators`.
 * @param {ConditionParams} props.optionExtraIndParams An object of the extra needed parameters for the `optionExtraIndicators`.
 */
//prettier-ignore
function CuteSelect({
  label = DEFAULT_LABEL,
  options = DEFAULT_OPTIONS,
  selectedKey: ctrlSelectedKey,
  onSelection,
  listVisible: ctrlListVisible,
  onToggle,
  hoveredOption: ctrlHoveredOption,
  onHoveredOptionChange,
  showOnFocus = true,
  hideOnBlur = true,
  hideOnEscape = true,
  optionCustomDirSty,
  optionExtraIndicators,
  optionExtraIndParams,
  customDirSty,
  extraIndicators,
  extraIndParams,
}) {
  checkOptionalValues([
    [{ ctrlSelectedKey, onSelection }, mustBe(Object.keys(options)), "f"],
    [{ ctrlListVisible, onToggle }, "b", "f"],
    [{ ctrlHoveredOption, onHoveredOptionChange }, mustBe(Object.keys(options)), "f"],
    [{ options, label, showOnFocus, hideOnEscape, hideOnBlur }, "o", "s", "b", "b", "b"],
    { customDirSty, onlyFields: Object.keys(DIRECTED_STYLES) },
    [{ extraIndicators, extraIndParams }, "array", "object"],
  ]);

  for (let oneOption of Object.values(options))
    checkOptionalValues([
      { oneOption, onlyFields: ["text", "Icon", "SelectedIcon"] },
    ]);

  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES, { customDirSty, extraIndicators });

  const localState = useObjectState({ listVisible: false, selectedKey: null, hoveredOption: null })
  const [hover, setHover] = React.useState(false);

  const isControlled = {
    listVisible: ctrlListVisible !== undefined,
    selectedKey: ctrlSelectedKey !== undefined,
    hoveredOption: ctrlHoveredOption !== undefined,
  };
  const state = {
    listVisible: isControlled.listVisible ? ctrlListVisible : localState.get.listVisible,
    // listVisible: isControlled.listVisible ? ctrlListVisible : localListVisible,
    selectedKey: isControlled.selectedKey ? ctrlSelectedKey : localState.get.selectedKey,
    hoveredOption: isControlled.hoveredOption ? ctrlHoveredOption : localState.get.hoveredOption,
  };

  function setListVisible(visible) {
    localState.rawSet(prev => {
      const v = typeOf(visible, "function") ? visible(prev.listVisible) : visible;

      if (!isControlled.listVisible) return { ...prev, listVisible: v };
      
      if (onToggle) onToggle(visible);

      // Ignore the 'Cannot update...' error. Doesn't affect.
      return prev;
    })
  }

  const displayRef = React.useRef();
  const displayFocus = useFocusSensor(displayRef, { focusedByDefault: state.listVisible });

  React.useEffect(() => {
    if (hideOnEscape) {
      const onKeyPress = (e) => e.key == "Escape" && setListVisible((lv) => (lv ? false : lv)); //Close on escape, if showing.
      window.addEventListener("keydown", onKeyPress);
      return () => window.removeEventListener("keydown", onKeyPress);
    }
  }, [])

  React.useEffect(() => {
    if ((showOnFocus || hideOnBlur) && !displayFocus.focused) setHoveredOption(null); //Unhover options on blur.
    if (displayFocus.focused != state.listVisible) {
      if(displayFocus.focused && showOnFocus) setListVisible(true);
      else if(!displayFocus.focused && hideOnBlur) setListVisible(false);
    } //If focus changed and is different than listVisible, sync listVisible with it based on props specifications.
  }, [displayFocus.focused]);

  React.useEffect(() => {
    if ((showOnFocus || hideOnBlur) && displayFocus.focused != state.listVisible) 
      displayFocus.setFocused(state.listVisible); //If listVisible changed and is different than focus, sync focus with it.
  }, [state.listVisible]);

  function setSelectedKey(optionKey) {
    const newSelectedKey = state.selectedKey !== optionKey ? optionKey : null;

    if (!isControlled.selectedKey) localState.merge({ selectedKey: newSelectedKey });
    if (onSelection) onSelection(newSelectedKey);
    
    setHoveredOption(null);
    setListVisible(false);
  }

  function setHoveredOption(optionKey) {
    if (!isControlled.hoveredOption) localState.merge({ hoveredOption: optionKey });
    if (onHoveredOptionChange) onHoveredOptionChange(optionKey)
  }

  const styles = getActiveStyles({ hover, ...state, ...extraIndParams });

  return (
    <div className={styles.ct}>
      <div
        ref={displayRef}
        className={styles.displayCt}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => state.listVisible && setListVisible(false)}
      >
        <p className={styles.displayLabel}>{label}</p>
        <p className={styles.displaySelectionText}>
          {state.hoveredOption
            ? options[state.hoveredOption].text
            : state.selectedKey
            ? options[state.selectedKey].text
            : Object.values(options)[0].text}
        </p>
        <IoMdArrowDropup className={styles.displayIcon} />
      </div>

      <div className={styles.listCt}>
        {Object.keys(options).map((opKey) => {
          var Icon = options[opKey].Icon || GoArrowLeft;
          if (state.selectedKey === opKey) {
            if (state.hoveredOption === opKey) Icon = GrClose;
            else Icon = options[opKey].SelectedIcon || GrCheckmark;
          }

          return (
            <Option
              customDirSty={optionCustomDirSty}
              extraIndicators={optionExtraIndicators}
              extraIndParams={optionExtraIndParams}
              listVisible={state.listVisible}
              key={opKey}
              onClick={() => setSelectedKey(opKey)}
              hovered={state.hoveredOption == opKey}
              onHoverChange={(hovered) =>
                setHoveredOption(hovered ? opKey : null)
              }
              Icon={Icon}
              text={options[opKey].text}
              selected={state.selectedKey === opKey}
            />
          );
        })}
      </div>
    </div>
  );
}

const DEFAULT_LABEL = "Select";

const DEFAULT_OPTIONS = {
  none: { text: "No options specified" },
};

//prettier-ignore
/**
 * @typedef {Object} StylesObject
 * @property {string} ct **CNR**. Default Styles: `"relative rounded-md"`
 * @property {string} displayCt **CS**. Default Styles: `"relative flex pb-2 pt-3 px-4 justify-between items-center cursor-pointer border-gray-400 border-1 rounded-lg || hov,lv<border-gray-900>"`
 * @property {string} displayLabel **CWC**. Default Styles: `"absolute italic top-3 left-2 px-2 bg-white text-gray-500 text-light transform transition-all duration-500 || lv,hov<text-gray-900> lv,ose<-translate-y-5.5'text-xs>"`
 * @property {string} displaySelectionText **CS**. Default Styles: `"text-light text-lg text-gray-700 text-opacity-0 || oho,ose<text-opacity-100>"`
 * @property {string} displayIcon **CS**. Default Styles: `"h-6 w-6 transform transition-transform duration-500 text-gray-500 || lv,hov<text-gray-900> lv<rotate-180>"`
 * @property {string} listCt **CWC**. Default Styles: `"absolute -z-10 w-full py-2 border-l-1 border-r-1 rounded-b-lg border-b-1 border-gray-700 px-4 left-0 top-10 transform transition-all opacity-0 translate-y-24 duration-500 || lv<z-50> lv<opacity-100> lv<translate-x-0>""`
 */
const DIRECTED_STYLES = {
  ct: "relative rounded-md",
  displayCt: "relative flex pb-2 pt-3 px-4 justify-between items-center cursor-pointer border-gray-400 border-1 rounded-lg || hov,lv<border-gray-900>",
  displayLabel: "absolute italic top-3 left-2 px-2 bg-white text-gray-500 text-light transform transition-all duration-500 || lv<text-gray-900'-translate-y-5.5'text-xs> hov<text-gray-900> ose<-translate-y-5.5'text-xs>",
  displaySelectionText: "text-light text-lg text-gray-700 text-opacity-0 || oho,ose<text-opacity-100>",
  displayIcon: "h-6 w-6 transform transition-transform duration-500 text-gray-500 || lv<text-gray-900'rotate-180> hov<text-gray-900>",
  listCt: "absolute -z-10 w-full py-2 border-l-1 border-r-1 rounded-b-lg border-b-1 border-gray-700 px-4 left-0 top-10 transform transition-all opacity-0 translate-y-24 duration-500 || lv<z-50'opacity-100'translate-y-0>",
};

//prettier-ignore
const INDICATORS = [
  { key: "oneSelected", directive: "ose", condition: (p) => !!p.selectedKey },
  { key: "listVisible", directive: "lv", condition: (p) => p.listVisible },
  { key: "oneHovered", directive: "oho", condition: (p) => !!p.hoveredOption },
  { key: "hover", directive: "hov", condition: (p) => p.hover },
];

function Option({
  listVisible,
  Icon,
  text,
  selected,
  onClick,
  hovered: ctrlHovered,
  onHoverChange,
  customDirSty,
  extraIndicators,
  extraIndParams,
  ...passProps
}) {
  checkOptionalValues([
    { customDirSty, onlyFields: Object.keys(OPTION_DIRECTED_STYLES) },
    [{ extraIndicators, extraIndParams }, "array", "object"],
  ]);

  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(OPTION_INDICATORS, OPTION_DIRECTED_STYLES, { customDirSty, extraIndicators });

  // const [localHovered, setLocalHovered] = React.useState(false); //It's always controlled, no local state.

  // const isControlled = ctrlHovered !== undefined; //Always controlled
  const hovered = ctrlHovered; //Always controlled, no need to select between controller and local.

  function setHovered(newValue) {
    if (listVisible) {
      // if (!isControlled) setLocalHovered(hovered); //Always controlled, so this isn't necessary.
      onHoverChange(newValue); //The callback is always present so no need to check it's existance.
    }
  }

  //If the list toggles off, unhover the option.
  React.useEffect(() => {
    if (!listVisible && hovered) setHovered(false);
  }, [listVisible]);

  //prettier-ignore
  const styles = getActiveStyles({ listVisible, hovered, selected, ...extraIndParams });

  return (
    <div
      {...passProps}
      onClick={() => listVisible && onClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={styles.ct}
    >
      <p className={styles.text}>{text}</p>
      <Icon className={styles.icon} />
    </div>
  );
}

//prettier-ignore
/**
 * @typedef {Object} OptionStylesObject
 * @property {string} ct **CNR**. Default Styles: `"relative py-1 flex justify-between items-center cursor-default || op<cursor-pointer>"`
 * @property {string} text **CS**. Default Styles: `"text-base text-gray-500 text-light transition-all duration-200 || ho,se<text-gray-800>"`
 * @property {string} icon **CS**. Default Styles: `"absolute w-4 h-4 text-gray-500 transform opacity-0 transition-all -right-10 duration-200 || ho,se<-translate-x-10'opacity-100>"`
 */
const OPTION_DIRECTED_STYLES = {
  ct: "relative py-1 flex justify-between items-center cursor-default || op<cursor-pointer>",
  text: "text-base text-gray-500 text-light transition-all duration-200 || ho,se<text-gray-800>",
  icon: "absolute w-4 h-4 text-gray-500 transform opacity-0 transition-all -right-10 duration-200 || ho,se<-translate-x-10'opacity-100>",
};

//prettier-ignore
const OPTION_INDICATORS = [
  { key: "operational", directive: "op", condition: (p) => p.listVisible },
  { key: "hover", directive: "ho", condition: (p) => p.listVisible && p.hovered },
  { key: "selected", directive: "se", condition: (p) => p.selected },
];

/**
 * @typedef {{text: string, Icon: React.Component, SelectedIcon: React.Component}} Option
 * @typedef {import("@static/tailwind/useIndicatedStyles").Indicator} Indicator
 * @typedef {import("@static/tailwind/useIndicatedStyles").ConditionParams} ConditionParams
 */

export default CuteSelect;
