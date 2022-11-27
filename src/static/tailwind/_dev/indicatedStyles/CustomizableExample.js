/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { useIndicatedStyles } from "@static/tailwind";

//Customizable Indicated Component example.

function CustomizableExample({
  customDirSty = {},
  extraIndicators = [],
  extraIndParams = {},
  message,
}) {
  const [b1Pressed, setB1Pressed] = React.useState(false);
  const [b2Pressed, setB2Pressed] = React.useState(false);

  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES, { extraIndicators, customDirSty });

  //prettier-ignore
  const styles = getActiveStyles({ ...extraIndParams, b1Pressed, b2Pressed });

  return (
    <div className={styles.container}>
      <p className={styles.title}>It's time to choose</p>
      <button
        onClick={() => setB1Pressed(!b1Pressed)}
        className={styles.button1}
      >
        {b1Pressed ? "Untoggle 1" : "Toggle 1"}
      </button>{" "}
      <button
        onClick={() => setB2Pressed(!b2Pressed)}
        className={styles.button2}
      >
        {b2Pressed ? "Untoggle 2" : "Toggle 2"}
      </button>
      <p className={styles.warning}>
        {message || (
          <>
            {b1Pressed || b2Pressed
              ? b1Pressed && b2Pressed
                ? "Both"
                : "One"
              : "None"}{" "}
            pressed
          </>
        )}
      </p>
    </div>
  );
}

//prettier-ignore
const DIRECTED_STYLES = {
  container: "text-center my-8 border-4 border-blue-500 rounded-md py-16 bg-gray-200 || bA<border-purple-500> b2<border-green-500> b1<border-red-500>",
  title: "text-5xl subtext-strong text-gray-700 mb-16 || bA<text-purple-500> b2<text-green-500> b1<text-red-500>",
  button1: "mx-4 text-lg border-2 border-red-500 py-2 px-6 rounded-xl text-red-500 focus:outline-none transition-color duration-100 hover:text-white hover:bg-red-500 || b1<text-white'bg-red-500>",
  button2: "mx-4 text-lg border-2 border-green-500 py-2 px-6 rounded-xl text-green-500 focus:outline-none transition-color duration-100 hover:text-white hover:bg-green-500 || b2<text-white'bg-green-500>",
  warning: "mt-12 border-t-2 border-black mx-64 pt-8 text-2xl transform || bA<text-purple-500'border-purple-500> b1,b2<text-pink-500'border-pink-500>",
};

//prettier-ignore
const INDICATORS = [
  { key: "b1Pressed", directive: "b1", condition: (p) => p.b1Pressed },
  { key: "b2Pressed", directive: "b2", condition: (p) => p.b2Pressed },
  { key: "allPressed", directive: "bA", condition: (p) => p.b1Pressed && p.b2Pressed },
];

//Fully and cleanly customizes child styles from outside, even with a brand new Indicator.
function FatherExample() {
  const [titleHovered, setTitleHovered] = React.useState(false);

  return (
    <>
      <p
        onMouseEnter={() => setTitleHovered(true)}
        onMouseLeave={() => setTitleHovered(false)}
        className={FATHER_STYLES.title}
      >
        Hello son, It's me!
      </p>
      <p className={FATHER_STYLES.message}>(Hover the father's greetings)</p>
      <CustomizableExample
        extraIndicators={CHILD_CUSTOMIZATION.EXTRA_INDICATORS}
        extraIndParams={{ titleHovered }}
        customDirSty={CHILD_CUSTOMIZATION.CUSTOM_DIR_STY}
        message={titleHovered ? "Hello me, it's son!" : undefined}
      />
    </>
  );
}

//In a case like this, where the father is not an Indicated Component,
//it might be cleaner to keep everything for the child in a separated spot.

//prettier-ignore
const FATHER_STYLES = {
  //Father is not an Indicated Component. Therefore it's styles are not indicable.
  title: "text-center text-purple-500 text-3xl cursor-default select-none", 
  message: "text-center text-gray-600 text-sm mt-2 select-none",
};

//prettier-ignore
const CHILD_CUSTOMIZATION = {
  //When pressing both buttons, now everything will turn gray instead of purple.
  CUSTOM_DIR_STY: {
    container: "|| th<border-blue-500> bA<border-gray-500>",
    title: "|| th<text-blue-500> bA<text-gray-500>",
    warning: "|| th<border-blue-500'text-blue-500> bA<text-gray-500'border-gray-500>",
  },
  EXTRA_INDICATORS: [
    { key: "titleHovered", directive: "th", condition: (p) => p.titleHovered }
  ]
};

export default FatherExample;
