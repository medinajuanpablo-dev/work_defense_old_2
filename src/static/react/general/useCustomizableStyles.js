import { useMemo } from "react";
import { mapValues } from "lodash";

import { joinProperties, checkRequiredValues } from "@static/functions";
import { mergeStyles } from "@static/tailwind";

/** Hook to easily implement customizable styles in any Component. It's not necessary that customStyles is always present.
 *
 * @template T
 * @param {T} defaultStyles The Styles Object to be customized.
 * @param {any} customStyles The customizer Styles Object.
 * @return {T} The final customized Styles Object.
 */
function useCustomizableStyles(defaultStyles, customStyles = {}) {
  return useMemo(() => {
    //Control types and that customStyles contain only element keys present in defaultStyles.
    checkRequiredValues([
      { defaultStyles, type: "object" },
      {
        customStyles,
        req: false,
        type: "object",
        onlyFields: Object.keys(defaultStyles),
      },
    ]);

    //Merge the joined styles of every customized element only; mergeStyles is an expensive function. Return final customized Styles Object.
    var mergedStyles = { ...defaultStyles };
    for (let elementKey in customStyles) {
      mergedStyles[elementKey] = mergeStyles(
        defaultStyles[elementKey] + " " + customStyles[elementKey]
      );
    }

    return mergedStyles;
  }, [defaultStyles, customStyles]);
}

export default useCustomizableStyles;
