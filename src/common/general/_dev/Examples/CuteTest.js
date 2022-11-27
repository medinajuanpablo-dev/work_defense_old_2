import React from "react";

import { checkRequiredValues, joinProperties } from "@static/functions";

import { mergeStyles } from "@static/tailwind";
import { mapValues } from "lodash";

function CuteTestExample() {
  return (
    <div className="relative mt-4 px-8 md:px-32 lg:px-64 xl:px-96">
      <div className="relative w-64 h-32 p-4 flex border-2 border-gray-700 mx-auto justify-center items-center">
        <div className="absolute right-8 w-8 h-8 bg-indigo-600 flex justify-center items-center text-gray-100">
          :D
        </div>
      </div>
    </div>
  );
}

/**
 * @param {Object} props
 * @param {{ct: string}} props.customStyles An object containing custom styles for each element rendered by the component. **Non-directed**
 */
function StylizableStaticView({ customStyles = {} }) {
  checkRequiredValues([{ customStyles, onlyFields: Object.keys(STYLES) }]);

  const styles = React.useMemo(
    () =>
      mapValues(joinProperties([STYLES, customStyles]), (elementStyles) =>
        mergeStyles(elementStyles)
      ),
    [customStyles]
  );

  return <div className={styles.ct}>Something</div>;
}

//prettier-ignore
const STYLES = {
  ct: "p-2",
};

export default CuteTestExample;
