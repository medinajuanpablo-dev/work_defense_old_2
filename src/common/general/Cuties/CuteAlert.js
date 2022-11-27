/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ReactDOM from "react-dom/client";

import { checkOptionalValues, typeOf } from "@static/functions";
import { useCustomizableStyles } from "@static/react";

import CuteModal from "./CuteModal";

function CuteAlert({
  Icon,
  title,
  body,
  button,
  secondButton,
  onClose,
  customStyles,
}) {
  checkOptionalValues([
    { Icon, type: ["object", "function"] },
    { title, type: ["string", "object"] },
    { body, type: ["string", "object"] },
    { button, onlyFields: ["text", "onClick", "mode"] },
    { secondButton, onlyFields: ["text", "onClick"] },
    { customStyles, onlyFields: Object.keys(STYLES) },
  ]);

  if (secondButton && !button)
    throw Error(
      "No sense for a secondButton without the original button at Cute Alert."
    );

  const [visible, setVisible] = React.useState(false);

  const { current: cv } = React.useRef({ closeReason: null });

  function open() {
    setVisible(true);
  }

  function close() {
    setVisible(false);
  }

  React.useEffect(open, [displayChain]); //Re-open when another Alert is displayed.

  function onModalClose(finished, reason) {
    if (!finished) close();
    else if (onClose) {
      if (reason == "default") cv.closeReason = "default";
      onClose(cv.closeReason);
    }
  }

  function onButtonClick(event) {
    cv.closeReason = "button";

    if (button && button.onClick) button.onClick(close, event);
    else close(); //If no button action specified, closes the Alert.
  }

  function onSecondButtonClick(event) {
    cv.closeReason = "secondButton";

    if (secondButton && secondButton.onClick)
      secondButton.onClick(close, event);
    else close(); //If no second button action specified, closes the Alert.
  }

  //prettier-ignore
  const styles = useCustomizableStyles(STYLES, customStyles);

  return (
    <CuteModal visible={visible} onClose={onModalClose}>
      {Icon && <Icon className={styles.icon} />}
      {typeOf(title, "string") ? (
        <p className={styles.title}>{title}</p>
      ) : (
        title
      )}
      {typeOf(body, "string") ? <p className={styles.body}>{body}</p> : body}

      <div className={styles.buttonsCt}>
        {button && (
          <button
            onClick={onButtonClick}
            className={styles.leftButton}
            {...(button.otherProps || {})}
          >
            {button.text || "Accept"}
          </button>
        )}
        {secondButton && (
          <button
            onClick={onSecondButtonClick}
            className={styles.rightButton}
            {...(secondButton.otherProps || {})}
          >
            {secondButton.text || "Cancel"}
          </button>
        )}
      </div>
    </CuteModal>
  );
}

//prettier-ignore
/**
 * @typedef {Object} StylesObject
 * @property {string} icon **CS**. Default Styles: `"mx-auto text-gray-700 h-10 w-10 | xs:h-12 xs:w-12 | sm:h-14 sm:w-14 | lg:h-16 lg:w-16"`
 * @property {string} title **CS**. Default Styles: `"text-center mt-4 text-xl | xs:text-2xl | sm:text-3xl"`
 * @property {string} body **CS**. Default Styles: `"text-justify mt-6 mb-2 text-sm text-light | xs:text-base | sm:text-lg | lg:mt-8 lg:mb-3 lg:text-xl"`
 * @property {string} buttonsCt **CS**. Default Styles: `"text-center mt-6 | lg:mt-8"`
 * @property {string} leftButton **CS**. Default Styles: `"border-1 border-gray-700 rounded-lg hover:bg-gray-500 hover:text-gray-100 transition duration-100 mx-2 py-2 px-3 text-sm | xs:px-4 xs:text-lg xs:mx-3 | sm:px-6 sm:text-xl sm:mx-4 | lg:px-8 lg:mx-6"`
 * @property {string} rightButton **CS**. Default Styles: `"border-1 border-gray-700 rounded-lg hover:bg-gray-500 hover:text-gray-100 transition duration-100 mx-2 py-2 px-3 text-sm | xs:px-4 xs:text-lg xs:mx-3 | sm:px-6 sm:text-xl sm:mx-4 | lg:px-8 lg:mx-6"`
 */
const STYLES = {
  icon: "mx-auto text-gray-700 h-10 w-10 | xs:h-12 xs:w-12 | sm:h-14 sm:w-14 | lg:h-16 lg:w-16",
  title: "text-center mt-4 text-xl | xs:text-2xl | sm:text-3xl",
  body: "text-justify mt-6 mb-2 text-sm text-light | xs:text-base | sm:text-lg | lg:mt-8 lg:mb-3 lg:text-xl",

  buttonsCt: "text-center mt-6 | lg:mt-8",
  leftButton: "border-1 border-gray-700 rounded-lg hover:bg-gray-500 hover:text-gray-100 transition duration-100 mx-2 py-2 px-3 text-sm | xs:px-4 xs:text-lg xs:mx-3 | sm:px-6 sm:text-xl sm:mx-4 | lg:px-8 lg:mx-6",
  rightButton: "border-1 border-gray-700 rounded-lg hover:bg-gray-500 hover:text-gray-100 transition duration-100 mx-2 py-2 px-3 text-sm | xs:px-4 xs:text-lg xs:mx-3 | sm:px-6 sm:text-xl sm:mx-4 | lg:px-8 lg:mx-6",
};

/* ---------------- IMPERATIVE API ----------------- */

const alertDOMRoot = (() => {
  var alertElement = document.createElement("div");
  alertElement.id = "alertElement";
  document.body.append(alertElement);
  return ReactDOM.createRoot(alertElement);
})();

var displayChain = 0;

/**
 * Imperatively displays a CuteAlert component.
 * @param {Object} props
 * @param {React.Component} props.Icon An Icon component.
 * @param {string | JSX.Element} props.title The Alert text title.
 * @param {string | JSX.Element} props.body The Alert text body.
 * @param {NotificationButton} props.button The button parameters. By default, the text is "Accept" and it closes the Alert.
 * @param {NotificationButton} props.secondButton The second button parameters. This button can't exist alone. By default, the text is "Cancel" and it closes the Alert.
 * @param {(reason: "default" | "button" | "secondButton") => void} props.onClose Callback to execute when the Alert is closed. It receives a param with the closing reason: by default behavior (clicking outside or pressing Escape), by the first button or by the second button.
 * @param {StylesObject} props.customStyles An object containing custom styles for each element rendered by the component. **Non-directed**
 */
function displayCuteAlert(props) {
  alertDOMRoot.render(<CuteAlert displayChain={displayChain++} {...props} />);
}

export default displayCuteAlert;

/**
 * @typedef {import("@static/tailwind/useIndicatedStyles").Indicator} Indicator
 * @typedef {import("@static/tailwind/useIndicatedStyles").ConditionParams} ConditionParams
 * */

/**
 * @typedef {Object} NotificationButton
 * @property {string} text The text to be displayed in the button.
 * @property {OnClickCallback} onClick Callback function to be called on click. Receives a `closeAlert` callback as param. If not specified, the button just closes the alert.
 * @property {any} otherProps More props/attributes to pass directly to the button element.
 *
 * @callback OnClickCallback
 * @param {() => void} closeAlert Function to close the currently displaying alert.
 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event The click event.
 */
