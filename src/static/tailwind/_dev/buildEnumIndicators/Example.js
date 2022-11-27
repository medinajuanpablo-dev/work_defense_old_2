import React from "react";

import { useIndicatedStyles, buildEnumIndicators } from "@static/tailwind";

const TYPES = {
  BIG: "big",
  MEDIUM: "medium",
  SMALL: "small",
  VERY_SMALL: "very-small",
}; //Imagine this is imported from elsewhere

function Example() {
  return (
    <>
      <p className="mt-2 text-light text-gray-700">
        These texts are styled by enumeration:
      </p>
      {Object.values(TYPES).map((textType) => (
        <Text key={textType} type={textType}>
          Cute Text — {textType}
        </Text>
      ))}
    </>
  );
}

//This is a component we want to style by enumeration through a simple prop.
function Text({ type, children }) {
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES);

  const styles = getActiveStyles({ type });

  return <p className={styles.text}>{children}</p>;
}

const DIRECTED_STYLES = {
  text: "text-light mt-4 || tb<text-xl'text-red-500> tm<text-lg'text-purple-500> ts<text-base'text-yellow-500> tv<text-sm'text-green-500>",
};

const INDICATORS = buildEnumIndicators(TYPES, "type", { short: true });

export default Example;
