import React from "react";
import { mapValues } from "lodash";
import { IoWarningOutline, IoCheckmark } from "react-icons/io5";

import { useObjectState } from "@static/react";
import { CuteInput, CuteActionNotice } from "@common/index";
import { buildEnumIndicators } from "@static/tailwind";

function CuteInputExample() {
  const form = useObjectState(mapValues(FORM_CONFIG, () => ""));
  const errors = useObjectState(mapValues(FORM_CONFIG, () => false));

  function setFieldValue(fieldKey, newValue) {
    const { validator } = FORM_CONFIG[fieldKey];

    if (validator && !validator(newValue)) errors.merge({ [fieldKey]: true });
    else errors.merge({ [fieldKey]: false });

    form.merge({ [fieldKey]: newValue });
  }

  return (
    <>
      <div className="mt-4 px-8 md:px-32 lg:px-64 xl:px-96">
        {Object.keys(FORM_CONFIG).map((f) => (
          <CuteInput
            key={f}
            textarea={FORM_CONFIG[f].textarea}
            maxLength={FORM_CONFIG[f].maxLength}
            customDirSty={FORM_CONFIG[f].customDirSty}
            label={FORM_CONFIG[f].label}
            extraIndicators={FORM_CONFIG[f].extraIndicators}
            value={form.get[f]}
            onChange={(v) => setFieldValue(f, v)}
            extraIndParams={{ error: errors.get[f] }}
            noticeElement={
              form.get[f] ? (
                <Notification
                  type={errors.get[f] ? "error" : "fine"}
                  specificBody={FORM_CONFIG[f].errorMessage}
                />
              ) : undefined
            }
          />
        ))}
      </div>
      <button
        onClick={() =>
          errors.replace(mapValues(FORM_CONFIG, () => false)) ||
          form.replace(mapValues(FORM_CONFIG, () => ""))
        }
        className="mt-8 border-1 border-gray-800 py-2 px-4"
      >
        Clean all
      </button>{" "}
      <button
        onClick={() => form.replace(mapValues(FORM_CONFIG, () => "gg"))}
        className="mt-8 border-1 border-gray-800 py-2 px-4"
      >
        GG all
      </button>{" "}
    </>
  );
}

const CUSTOM_INDICATORS = [
  { key: "invalid", directive: "iv", condition: (p) => p.error },
];

const FORM_CONFIG = {
  name: {
    label: "First Name (one word)",
    customDirSty: {
      ct: "my-4 w-full transition-color duration-200 || ac<border-blue-300> do<border-green-600> iv<border-red-600>",
      label: "|| ac<text-blue-500> do<text-green-600> iv<text-red-600>",
    },
    extraIndicators: CUSTOM_INDICATORS,
    validator: (v) => !v.trim().includes(" "),
    errorMessage: "No puede tener espacios.",
  },
  lastName: {
    label: "Last Name (one word)",
    customDirSty: {
      ct: "my-4 w-full transition-color duration-500 || ac<border-blue-300> do<border-green-600> iv<border-red-600>",
      label: "|| ac<text-blue-500> do<text-green-600> iv<text-red-600>",
    },
    extraIndicators: CUSTOM_INDICATORS,
    validator: (v) => !v.trim().includes(" "),
    errorMessage: "No puede tener espacios.",
  },
  description: {
    label: "Description",
    customDirSty: {
      ct: "my-4 w-full iv<border-red-500>",
    },
    extraIndicators: CUSTOM_INDICATORS,
    textarea: true,
    validator: (v) => v.length <= 10,
    errorMessage: "No puede tener más de 10 caracteres.",
  },
};

function Notification({ type, specificBody }) {
  return (
    <CuteActionNotice
      {...NOTIFICATIONS_TYPES[type]}
      body={NOTIFICATIONS_TYPES[type].body || specificBody}
      extraIndicators={buildEnumIndicators(
        Object.keys(NOTIFICATIONS_TYPES),
        "type",
        { short: true }
      )}
      extraIndParams={{ type }}
      customDirSty={{
        buttonIcon: "te<text-red-500> tf<text-green-500>",
        noticeIcon: "te<text-red-500> tf<text-green-500>",
        noticeCt: "te<border-red-500> tf<border-green-500>",
        noticeTumor: "te<border-red-500> tf<border-green-500>",
      }}
      position="right"
      behavior="hover"
    />
  );
}

const NOTIFICATIONS_TYPES = {
  error: {
    ButtonIcon: IoWarningOutline,
    Icon: IoWarningOutline,
    title: "Campo Inválido",
  },
  fine: {
    ButtonIcon: IoCheckmark,
    Icon: IoCheckmark,
    title: "¡Correcto!",
    body: "No hay problemas con este campo.",
  },
};

export default CuteInputExample;
