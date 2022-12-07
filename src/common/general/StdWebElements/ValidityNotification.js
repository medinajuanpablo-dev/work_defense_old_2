import React from "react";
import { IoWarningOutline, IoCheckmark } from "react-icons/io5";

import { CuteActionNotice } from "@common/index";
import { checkOptionalValues } from "@static/functions";

/**
 * An simpler application of `CuteActionNotice` configured to be quickly usable.
 * @param {Object} props
 * @param {"error" | "fine"} props.type
 * @param {string} props.specificBody
 * @param {"left" | "right"} props.position The notification position relative to the button.
 * @param {"default" | "large" | "larger"} props.size The icon size.
 * @param {"hover" | "focus"} props.behavior When the message popup shows up and hides. Is `"focus"` by default.
 * - If `"focus"`, it will show up on focus and hide on blur.
 * - If `"hover"`, it will only show up on hover and hide on un-hover.
 */
function ValidityNotification({
  type,
  title,
  body,
  position = "right",
  size = "default",
  behavior = "focus",
}) {
  checkOptionalValues([
    { t: type, enmr: Object.keys(NOTIFICATIONS_TYPES) },
    [{ title, body }, "string", "string"],
    [{ position, behavior }, "mustBe:left,right", "mustBe:hover,focus"],
  ]);

  return (
    <CuteActionNotice
      {...NOTIFICATIONS_TYPES[type]}
      body={body || NOTIFICATIONS_TYPES[type].body}
      title={title || NOTIFICATIONS_TYPES[type].title}
      extraIndicators={INDICATORS}
      extraIndParams={{ type, size }}
      customDirSty={STYLES}
      position={position}
      behavior={behavior}
    />
  );
}

const NOTIFICATIONS_TYPES = {
  error: {
    ButtonIcon: IoWarningOutline,
    Icon: IoWarningOutline,
    title: "Error",
    body: "Something is wrong in this field",
  },
  fine: {
    ButtonIcon: IoCheckmark,
    Icon: IoCheckmark,
    title: "All Good",
    body: "There's no trouble with this field",
  },
};

const INDICATORS = [
  { key: "fine", directive: "fi", condition: (p) => p.type == "fine" },
  { key: "error", directive: "er", condition: (p) => p.type == "error" },
  { key: "large", directive: "lg", condition: (p) => p.size == "large" },
  { key: "larger", directive: "lgr", condition: (p) => p.size == "larger" },
];

const STYLES = {
  buttonCt: "lg<w-7'h-7'xs:w-8'xs:h-8> lgr<w-9'h-9'xs:w-10'xs:h-10>",
  buttonIcon: "er<text-red-500> fi<text-green-500>",
  noticeIcon: "er<text-red-500> fi<text-green-500>",
  noticeCt: "er<border-red-500> fi<border-green-500>",
  noticeTumor: "er<border-red-500> fi<border-green-500>",
};

export default ValidityNotification;
