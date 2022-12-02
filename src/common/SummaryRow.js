import React from "react";

import { CuteActionNotice, AsyncMounter } from "@common/index";
import { buildEnumIndicators, useIndicatedStyles } from "@static/tailwind";

import { ITK } from "@static/contexts/interface";

/**
 * @param {Object} props
 * @param {React.Component} props.Icon
 * @param {string} props.label
 * @param {string} props.text
 * @param {string} props.amount
 * @param {"gray" | "green" | "red" | "blue" | "purple" | "yellow"} props.color
 * @param {"default" | "smaller" | "larger"} props.size
 * @param {boolean} props.outstand
 * @param {boolean} props.async
 * @param {any} props.notificationsConfig
 * @param {any} props.customDirSty
 */
function SummaryRow({
  Icon,
  label,
  text,
  amount,
  color = "gray",
  size = "default",
  outstand,
  notificationsConfig,
  customDirSty,
}) {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES, { customDirSty });

  const styles = getActiveStyles({ outstand, color, size });

  const parsedText = React.useMemo(() => parseText(text), [text]);

  const labelElement = <span className={styles.label}>{label}</span>;
  const amountElement = <span className={styles.amount}>{amount}</span>;

  return (
    <div className={styles.ct}>
      {Icon && <Icon className={styles.icon} />}
      <p className={styles.text}>
        {parsedText.left}
        {parsedText.goesFirst === TOKENS.LABEL ? labelElement : amountElement}
        {parsedText.middle}
        {parsedText.goesFirst === TOKENS.AMOUNT ? labelElement : amountElement}
        {parsedText.right}
      </p>

      {notificationsConfig && (
        <AsyncMounter>
          <div className={styles.notifList}>
            {notificationsConfig.map((notifConfig, index) => (
              <CuteActionNotice
                customDirSty={NOTIFICATION_CUSTOMIZATION.DIRECTED_STYLES}
                extraIndicators={NOTIFICATION_CUSTOMIZATION.EXTRA_INDICATORS}
                extraIndParams={notifConfig}
                key={index}
                {...notifConfig}
              />
            ))}
          </div>
        </AsyncMounter>
      )}
    </div>
  );
}

//prettier-ignore
const DIRECTED_STYLES = {
  ct: "flex items-center || os<justify-center'mx-auto'p-2'border-1'rounded-md> clg<border-green-500> clr<border-red-500> clb<border-blue-500> clp<border-purple-500> clgr<border-gray-500> cly<border-yellow-600>",
  icon: "text-opacity-80 w-7 h-7 flex-none || sm<w-6'h-6> lg<w-8'h-8> clg<text-green-500> clr<text-red-500> clb<text-blue-500> clp<text-purple-500> clgr<text-gray-500> cly<text-yellow-600>",
  text: "text-light text-gray-700 ml-2 || sm<text-sm> lg<text-lg>",
  label: "text-strong || sm<text-sm> lg<text-lg>",
  amount: "text-default text-lg mx-1 || sm<text-base> lg<text-xl> clg<text-green-500> clr<text-red-500> clb<text-blue-500> clp<text-purple-500> clgr<text-gray-500> cly<text-yellow-600>",
  notifList: "flex-1 flex justify-end",
};

//prettier-ignore
const INDICATORS = [
  { key: "outstand", directive: "os", condition: p => p.outstand },
  { key: "color_green", directive: "clg", condition: (p) => p.color === "green" },
  { key: "color_red", directive: "clr", condition: (p) => p.color === "red" },
  { key: "color_blue", directive: "clb", condition: (p) => p.color === "blue" },
  { key: "color_purple", directive: "clp", condition: (p) => p.color === "purple" },
  { key: "color_gray", directive: "clgr", condition: (p) => p.color === "gray" },
  { key: "color_yellow", directive: "cly", condition: p => p.color == "yellow" },
  { key: "smaller", directive: "sm", condition: p => p.size == "smaller" },
  { key: "larger", directive: "lg", condition: p => p.size == "larger" },
];

//prettier-ignore
const NOTIFICATION_CUSTOMIZATION = {
  DIRECTED_STYLES: {
    ct: "ml-1 | xs:ml-2",
    buttonCt: "|| si<text-gray-500> sf<text-green-400> sw<text-yellow-600> sd<text-yellow-800> se<text-red-500>",
    noticeCt: "|| si<border-blue-500> sf<border-green-400> sw<border-yellow-600> sd<border-yellow-800> se<border-red-500>",
    noticeIcon: "|| si<text-blue-500> sf<text-green-400> sw<text-yellow-600> sd<text-yellow-800> se<text-red-500>",
    noticeTumor: "|| si<border-blue-500> sf<border-green-400> sw<border-yellow-600> sd<border-yellow-800> se<border-red-500>",
  },
  EXTRA_INDICATORS: buildEnumIndicators(ITK.NOTIFICATION_TYPES, "state", { short: true }),
}

function parseText(text) {
  //If a token is missing, just automatically add it at the end.
  for (let t in TOKENS) if (!text.includes(TOKENS[t])) text = text + TOKENS[t];

  var left, middle, right, goesFirst; //Texts between label and amount.

  const [leftLabel, rightLabel] = text.split(TOKENS.LABEL);

  if (leftLabel.includes(TOKENS.AMOUNT)) {
    left = leftLabel.split(TOKENS.AMOUNT)[0];
    middle = leftLabel.split(TOKENS.AMOUNT)[1];
    right = rightLabel;
    goesFirst = TOKENS.AMOUNT;
  } else {
    middle = rightLabel.split(TOKENS.AMOUNT)[0];
    right = rightLabel.split(TOKENS.AMOUNT)[1];
    left = leftLabel;
    goesFirst = TOKENS.LABEL;
  }

  return { left, middle, right, goesFirst };
}

const TOKENS = { LABEL: "<L>", AMOUNT: "<A>" };

export default SummaryRow;
