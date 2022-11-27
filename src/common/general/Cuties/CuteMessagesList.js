/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ReactDOM from "react-dom/client";
import { mapValues } from "lodash";

//prettier-ignore
import { checkOptionalValues, checkRequiredValues, typeOf } from "@static/functions";

import { useIndicatedStyles } from "@static/tailwind";

import CuteSlidingList from "./CuteSlidingList";

function CuteMessage({
  Icon,
  title,
  body,
  button,
  secondButton,
  lifeTime = 5000,
  fadeSpeed = "default",
  appeareanceSide,
  closeOnClick = false,
  customDirSty,
  extraIndicators,
  extraIndParams,
  //Non-API props.
  onClose,
}) {
  checkOptionalValues([
    { Icon, type: ["object", "function"] },
    { title, type: ["string", "object"] },
    { body, type: ["string", "object"] },
    { button, onlyFields: ["text", "onClick", "otherProps"] },
    { secondButton, onlyFields: ["text", "onClick", "otherProps"] },
    [{ lifeTime, fadeSpeed }, "n", "mustBe:fast,default,slow"],
    { closeOnClick, type: "boolean" },
    { customDirSty, onlyFields: Object.keys(DIRECTED_STYLES) },
    [{ extraIndicators, extraIndParams }, "array", "object"],
  ]);

  if (secondButton && !button)
    throw Error(
      "No sense for a secondButton without the original button at Cute Alert."
    );

  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES, { extraIndicators, customDirSty });

  const [showing, setShowing] = React.useState(false); //Only to allow it to fade in when mounting.
  const [off, setOff] = React.useState(false); //Only to allow it to fade out to the other side when unmounting.

  var { current: cv } = React.useRef({});

  function close() {
    setOff(true);
    cv.fadeCloserTimer = setTimeout(onClose, FADE_DURATION_BY_SPEED[fadeSpeed]);
  }

  React.useEffect(() => {
    setShowing(true);

    if (lifeTime) cv.lifeCloserTimer = setTimeout(close, lifeTime);

    return () => {
      if (cv.lifeCloserTimer) clearTimeout(cv.lifeCloserTimer);
      if (cv.fadeCloserTimer) clearTimeout(cv.fadeCloserTimer);
    };
  }, []);

  function onButtonClick(event) {
    if (button && button.onClick) button.onClick(close, event);
    else close(); //If no button action specified, closes the Alert.
  }

  function onSecondButtonClick(event) {
    if (secondButton && secondButton.onClick)
      secondButton.onClick(close, event);
    else close(); //If no second button action specified, closes the Alert.
  }

  function onMessageClick() {
    if (closeOnClick) close();
  }

  //prettier-ignore
  const styles = getActiveStyles({ showing, off, button, secondButton, fadeSpeed, appeareanceSide, closeOnClick, ...extraIndParams });

  return (
    <div className={styles.ct} onClick={onMessageClick}>
      {Icon && <Icon className={styles.icon} />}

      <div className={styles.textCt}>
        {typeOf(title, "string") ? (
          <p className={styles.title}>{title}</p>
        ) : (
          title
        )}
        {typeOf(body, "string") ? <p className={styles.body}>{body}</p> : body}
      </div>

      <div className={styles.buttonsCt}>
        {button && (
          <button
            onClick={onButtonClick}
            className={styles.button + styles.leftButton}
            {...(button.otherProps || {})}
          >
            {button.text || "Accept"}
          </button>
        )}
        {secondButton && (
          <button
            onClick={onSecondButtonClick}
            className={styles.button + styles.rightButton}
            {...(secondButton.otherProps || {})}
          >
            {secondButton.text || "Cancel"}
          </button>
        )}
      </div>
    </div>
  );
}

//prettier-ignore
/**
 * @typedef {Object} StylesObject
 * @property {string} ct **CNR**. Default Styles: `"flex justify-start items-center text-gray-800 bg-gray-100 rounded-xl z-50 transform transition-all opacity-0 border-1 border-transparent my-1 px-2 py-2 | xs:py-3 | sm:my-2 sm:px-4 | lg:px-6 || ift<-translate-y-10> oft<opacity-0'translate-y-10> ifb<translate-y-10> ofb<opacity-0'-translate-y-10> ff<duration-100> df<duration-200> sf<duration-400> sh<opacity-100'translate-y-0> coc<hover:border-gray-500'hover:cursor-pointer>"`
 * @property {string} icon **CS**. Default Styles: `"flex-none text-gray-700 h-6 w-6 | sm:h-8 sm:w-8 | lg:h-10 lg:w-10"`
 * @property {string} textCt **CWC**. Default Styles: `"text-left ml-3 | sm:ml-4 | md:ml-6 || 1b<w-2/3> 2b<w-2/3'md:w-8/12>"`
 * @property {string} title **CS**. Default Styles: `"text-xl"`
 * @property {string} body **CS**. Default Styles: `"mt-1 text-lg"`
 * @property {string} buttonsCt **CNR**. Default Styles: `"flex-1 flex justify-end"`
 * @property {string} button **CWC**. Default Styles: `"ml-4 text-lg border-1 border-gray-700 rounded-lg py-2 px-4 hover:bg-gray-500 hover:text-gray-100 transition duration-100"`
 * @property {string} leftButton **CS**. Default Styles: `""`
 * @property {string} rightButton **CS**. Default Styles: `""`
 */
const DIRECTED_STYLES = {
  ct: "flex justify-start items-center text-gray-800 bg-gray-100 rounded-xl z-50 transform transition-all opacity-0 border-1 border-transparent my-1 px-2 py-2 | xs:py-3 | sm:my-2 sm:px-4 | lg:px-6 || ift<-translate-y-10> oft<opacity-0'translate-y-10> ifb<translate-y-10> ofb<opacity-0'-translate-y-10> ff<duration-100> df<duration-200> sf<duration-400> sh<opacity-100'translate-y-0> coc<hover:border-gray-500'hover:cursor-pointer>",

  icon: "flex-none text-gray-700 h-6 w-6 | sm:h-8 sm:w-8 | lg:h-10 lg:w-10",
  textCt: "text-left ml-3 | sm:ml-4 | md:ml-6 || 1b<w-2/3> 2b<w-2/3'md:w-8/12>",
  title: "text-sm | sm:text-base | lg:text-lg",
  body: "mt-1 text-light text-xs | sm:text-sm | lg:text-base",

  buttonsCt: "flex-1 flex flex-col items-end | md:flex-row md:justify-end md:items-center",
  button: "border-1 border-gray-700 rounded-lg hover:bg-gray-500 hover:text-gray-100 transition duration-100 ml-2 text-xs py-1 px-1 | xs:px-2 | md:px-3 md:py-2 | sm:text-base | lg:text-lg",
  leftButton: "",
  rightButton: "mt-1 | md:mt-0",
};

//prettier-ignore
const INDICATORS = [
  { key: "showing", directive: "sh", condition: p => p.showing },
  { key: "oneButton", directive: "1b", condition: p => p.button },
  { key: "twoButtons", directive: "2b", condition: p => p.secondButton },
  { key: "fastFade", directive: "ff", condition: p => p.fadeSpeed == "fast" },
  { key: "defaultFade", directive: "df", condition: p => p.fadeSpeed == "default" },
  { key: "slowFade", directive: "sf", condition: p => p.fadeSpeed == "slow" },
  { key: "inFromTop", directive: "ift", condition: p => !p.showing && p.appeareanceSide == "top" }, //Initial position when the Message appears from the top.
  { key: "inFromBottom", directive: "ifb", condition: p => !p.showing && p.appeareanceSide == "bottom" }, //Initial position when the Message appears from the bottom.
  { key: "outFromTop", directive: "oft", condition: p => p.off && p.appeareanceSide == "top" }, //Final position when the Message appears from the top.
  { key: "outFromBottom", directive: "ofb", condition: p => p.off && p.appeareanceSide == "bottom" }, //Final position when the Message appears from the bottom.
  { key: "closeOnClick", directive: "coc", condition: p => p.closeOnClick },
];

/**Message's fade in-out duration in miliseconds */
const FADE_DURATION_BY_SPEED = { fast: 100, default: 200, slow: 400 };

function CuteMessagesList({ appeareanceSide, messagesConfig }) {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(LIST_INDICATORS, LIST_DIRECTED_STYLES);

  const messages = mapValues(messagesConfig, (msg) => <CuteMessage {...msg} />);

  const styles = getActiveStyles({ appeareanceSide });

  return (
    <CuteSlidingList
      direction="reverse-vertical"
      customDirSty={{ ct: styles.listCt }}
      items={messages}
      offset={LIST_OFFSET}
    />
  );
}

const LIST_OFFSET = -20;

//prettier-ignore
const LIST_DIRECTED_STYLES = {
  listCt: "fixed left-0 w-screen flex justify-center || tl<top-0> bl<bottom-0>",
};

//prettier-ignore
const LIST_INDICATORS = [
  { key: "topList", directive: "tl", condition: p => p.appeareanceSide == "top" },
  { key: "bottomList", directive: "bl", condition: p => p.appeareanceSide == "bottom" },
];

/* ---------------- IMPERATIVE API ----------------- */

/**
 * Returns a function to imperatively and globaly display multiple `CuteMessages` without attaching them to any Component (they live until imperatively closed).
 * @param {Object} configuration
 * @param {number} configuration.maxItems Maximum number of messages that can be displayed in this list. Is `3` by default.
 * @param {"bottom" | "top"} configuration.appeareanceSide Side of the screen from which the Messages will fade in. Is from the bottom by default.
 * @returns The `displayCuteMessage` function.
 */
function usgMessagesList({ maxItems = 3, appeareanceSide = "bottom" } = {}) {
  checkOptionalValues([
    [{ maxItems, appeareanceSide }, "n", "mustBe:bottom,top"],
  ]);

  const listDOMRoot = (() => {
    //Create and append listElement to body. Create and return ReactDOM root.
    var listElement = document.createElement("div");
    listElement.id = "messagesListElement";
    document.body.append(listElement);
    return ReactDOM.createRoot(listElement);
  })();

  var messages = {};
  var count = 0;

  //Renders the list into the listElement.
  function render() {
    const messagesConfig = mapValues(messages, (msg, mk) => ({
      key: mk,
      onClose: () => close(mk),
      ...msg,
    }));

    listDOMRoot.render(
      <CuteMessagesList {...{ messagesConfig, appeareanceSide }} />
    );
  }

  //Removes the specified message and re-renders.
  function close(messageKey) {
    if (messages[messageKey]) {
      delete messages[messageKey]; //Remove the specified message.
      render();
    }
  }

  /**
   * Adds a new `CuteMessage`.
   * @param {Object} props Configuration of the Message.
   * @param {React.Component} props.Icon An Icon component.
   * @param {string | JSX.Element} props.title The Alert text title.
   * @param {string | JSX.Element} props.body The Alert text body.
   * @param {NotificationButton} props.button The button parameters. By default, the text is "Accept" and it closes the Message.
   * @param {NotificationButton} props.secondButton The second button parameters. This button can't exist alone. By default, the text is "Cancel" and it closes the Message.
   * @param {number} props.lifeTime The amount of miliseconds until the Message is automatically closed. If `0`, the Message is never closed automatically. Is `5000` (5 seconds) by default.
   * @param {"fast" | "default" | "slow"} props.fadeSpeed Speed of the fade in and fade off animation.
   * @param {boolean} props.closeOnClick If `true`, the Message is closed when clicking on it (anywhere except buttons). Is `false` by default.
   * @param {Array<Indicator>} props.extraIndicators An array with extra Indicators.
   * @param {ConditionParams} props.extraIndParams An object with the parameters needed for the extra Indicators conditions.
   * @param {StylesObject} props.customDirSty An object containing directed styles for each element rendered by the component. They can be non-directed if needed.
   */
  function displayCuteMessage(props) {
    checkRequiredValues([{ props, req: false, type: "object" }]);

    //If maxed out the amount of messages, remove the first one.
    if (Object.keys(messages).length == maxItems)
      close(Object.keys(messages)[0]);

    //Add new message.
    const messageKey = `m${count}`;
    messages[messageKey] = { appeareanceSide, ...props };
    count++;

    //Render new message list (including the new message).
    render();
  }

  return displayCuteMessage;
}

export default usgMessagesList;

/**
 * @typedef {import("@static/tailwind/useIndicatedStyles").Indicator} Indicator
 * @typedef {import("@static/tailwind/useIndicatedStyles").ConditionParams} ConditionParams
 * */

/**
 * @typedef {Object} NotificationButton
 * @property {string} text The text to be displayed in the button.
 * @property {OnClickCallback} onClick Callback function to be called on click. If not specified, the button just closes the alert.
 * @property {any} otherProps More props/attributes to pass directly to the button element.
 *
 * @callback OnClickCallback
 * @param {() => void} closeMessage Function to close the currently displaying message.
 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event The click event.
 */
