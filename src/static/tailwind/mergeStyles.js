import colors from "tailwindcss/colors";

import { checkRequiredValues } from "@static/functions";

function mergeStyles(...classNames) {
  checkRequiredValues([{ classNames, itemsType: "string" }]);

  var stylesList = classNames.join(" ").split(" ");
  var recognized = {}; //Indexes of styles recognized by the same recognizer, under the recognizer as key.

  for (let s = 0; s < stylesList.length; s++) {
    for (let rec of RECOGNIZERS) {
      const style = stylesList[s];

      //If the style includes a tailwind directive (like 'hover:'), add it to the beginning of the recognizer.
      if (style.includes(":")) rec = `${style.split(":")[0]}:${rec}`;

      //It's a tokenized recognizer
      tokenized: for (let t of Object.values(TOKENS_VALUES))
        if (rec.includes(t.token))
          for (let v of t.values)
            if (recognizes(style, rec.replace(t.token, v))) {
              if (recognized[rec]) recognized[rec].push(s);
              else recognized[rec] = [s];
              break tokenized;
            }

      //It's a specific recognizer.
      if (recognizes(style, rec)) {
        if (recognized[rec]) recognized[rec].push(s);
        else recognized[rec] = [s];
      }
    }
  }

  //Mark removing styles as undefined. Last recognized style of a recognizer remains.
  for (let rec in recognized)
    for (let s of recognized[rec].slice(0, recognized[rec].length - 1))
      stylesList[s] = undefined;

  return stylesList.filter((style) => style !== undefined).join(" ");
}

/**Check the if the built recognizer is at the start of the style.*/
function recognizes(rawStyle, builtRecognizer) {
  //If "negative" style, ignore the minus.
  const style = rawStyle.charAt(0) === "-" ? rawStyle.slice(1) : rawStyle;

  return style.trim().slice(0, builtRecognizer.length) === builtRecognizer;
}

/** All possible values that replace a Recognizer's token. */
const TOKENS_VALUES = {
  color: { token: "C", values: [...Object.keys(colors), "transparent"] },
  size: {
    token: "S",
    values: (() => {
      var sizes = ["xs", "sm", "base", "md", "lg", "xl"];
      for (let xl = 2; xl < 20; xl += 0.5) sizes.push(`${xl}xl`);
      return sizes;
    })(),
  },
};

//prettier-ignore
/**A recognizer is the common part of the styles that modify the same property and is used to differentiate a
 * style over similar others. A token can be added to reference enumerations used in multiple types of styles.
 *
 * If a style is recognized by a specific recognizer, all styles recognizable by the same recognizer will be
 * replaced. Styles based on a different or undefined recognizer won't be affected.
 *
 * Avoid being too generic: a style might be replaced by an unrelated/unwanted one.
 * Example: using an all-directions token for margin will cause _any_ margin (in any direction or axis) to
 * replace _any_ other margin. Thus, mt-4 will be replaced by mx-auto and viceversa, causing confusing bugs.
 *
 * In general: Use tokens only if you are sure all those styles should replace each other.
 *  */
const RECOGNIZERS = [
  "text-C", //Text color. eg: C=blue in text-blue-500
  "bg-C", //Background color. eg: C=red in bg-red-600
  "border-C", //Border color. eg: C=yellow in border-yellow-900
  "text-S", //Text size. eg: S=2xl in text-2xl

  //Non tokenized
  "m-", "my", "mx", "mt", "mb", "ml", "mr", //Margin
  "p-", "py", "px", "pt", "pb", "pl", "pr", //Padding
  "text-opacity", "border-opacity", "opacity", //Opacity
  "top", "left", "bottom", "right", //Inset
  "w", "h", //Width and Height

  "translate-x", "translate-y", "cursor", "z", "justify", "items", "visible" //Others
];

export default mergeStyles;
