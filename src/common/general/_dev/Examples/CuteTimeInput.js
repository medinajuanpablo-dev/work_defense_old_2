import React from "react";
import { IoWarningOutline, IoCheckmark } from "react-icons/io5";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import { CuteTimeInput, CuteActionNotice } from "@common/index";
import { buildEnumIndicators } from "@static/tailwind";

function CuteTimeInputExample() {
  const [time, setTime] = React.useState(null);
  const [isAllowed, setIsAllowed] = React.useState();

  return (
    <>
      <div className="flex justify-center mt-16 px-8 md:px-32 lg:px-64 xl:px-96">
        <CuteTimeInput
          time={time}
          onChange={(time) => setTime(time)}
          minTime="10:00"
          maxTime="22:00"
          isAllowed={isAllowed}
          onAllowanceChange={(isAllowed) => setIsAllowed(isAllowed)}
          label="Hora"
          customDirSty={{ ct: "w-32" }}
          noticeElement={
            time && isAllowed !== undefined ? (
              <Notification type={isAllowed ? "fine" : "error"} />
            ) : undefined
          }
        />
      </div>
      <button
        onClick={() => setTime(time ? null : "10:12")}
        className="w-56 mr-4 mt-8 border-1 border-gray-600 py-2"
      >
        {time ? "Clean externally" : "Set 10:12 externally"}
      </button>
      <button
        onClick={() => setIsAllowed(!isAllowed)}
        className="w-56 mt-8 border-1 border-gray-600 py-2"
      >
        Set {isAllowed ? "Forbidden" : "Allowed"} externally
      </button>
    </>
  );
}

const NOTIFICATIONS_TYPES = {
  error: {
    ButtonIcon: IoWarningOutline,
    Icon: IoWarningOutline,
    title: "Campo Inválido",
    body: "La hora debe ser entre las 10 y las 22.",
  },
  fine: {
    ButtonIcon: IoCheckmark,
    Icon: IoCheckmark,
    title: "¡Correcto!",
    body: "La hora ingresada es válida.",
  },
  inactive: {
    ButtonIcon: AiOutlineQuestionCircle,
    Icon: AiOutlineQuestionCircle,
    title: "Inactivo",
    body: "El campo debe activarse antes de ingresar una hora.",
  },
};

function Notification({ type, specificBody }) {
  return (
    //prettier-ignore
    <CuteActionNotice
      {...NOTIFICATIONS_TYPES[type]}
      body={NOTIFICATIONS_TYPES[type].body || specificBody}
      extraIndicators={buildEnumIndicators(Object.keys(NOTIFICATIONS_TYPES), "type", { short: true })}
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

export default CuteTimeInputExample;
