import React from "react";

import usgMessagesList from "./general/Cuties/CuteMessagesList";

const displayMessage = usgMessagesList({ maxItems: 3 });

/**
 * @param {Object} params
 * @param {"light-change" | "serious-change" | "critical-change" | "info"} params.type
 * @param {any} params.Icon
 * @param {string} params.title
 * @param {string} params.body
 * @param {string} params.body
 * @param {() => void} params.onUndo
 */
function displayBottomNotif({
  type = "light-change",
  Icon,
  title,
  body,
  onUndo,
}) {
  const config = TYPES_CONFIGURATIONS[type];

  function undo(closeMessage) {
    if (onUndo) onUndo();
    closeMessage();
  }

  displayMessage({
    closeOnClick: true,
    Icon,
    title: title,
    body: <Body body={body} {...config} />,
    button: onUndo ? { text: "Undo", onClick: undo } : { text: "Ok" },
    ...config,
  });
}

function Body({ body, timerColor, lifeTime }) {
  return (
    <>
      <p className="mt-1 text-light text-slate-600 text-sm | sm:text-sm | lg:text-base">
        {body}
      </p>

      {timerColor ? <Timer {...{ lifeTime, timerColor }} /> : body}
    </>
  );
}

function Timer({ lifeTime, timerColor }) {
  const [start, setStart] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setStart(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{ transitionDuration: `${lifeTime - 10}ms` }}
      className={
        timerColor +
        " mt-2 border-1 w-full transition-all ease-linear" +
        (start ? " w-0" : "")
      }
    />
  );
}

//prettier-ignore
const TYPES_CONFIGURATIONS = {
  "light-change": {
    lifeTime: 5000,
    timerColor: "border-slate-500",
    fadeSpeed: "fast",
    customDirSty: {
      ct: "w-screen-11/12 | md:w-screen-7/12 | lg:w-screen-6/12",
      button: "xs:px-3 xs:py-2 | lg:px-8",
    },
  },
  "serious-change": {
    lifeTime: 8000,
    timerColor: "border-amber-500",
    fadeSpeed: "default",
    customDirSty: {
      ct: "w-screen-11/12 text-amber-600 | md:w-screen-7/12 | lg:w-screen-6/12",
      icon: "text-amber-600",
      button: "xs:px-3 xs:py-2 border-amber-600 hover:bg-amber-600 hover:text-slate-100 | lg:px-8",
    },
  },
  "critical-change": {
    lifeTime: 15000,
    timerColor: "border-red-400",
    fadeSpeed: "slow",
    customDirSty: {
      ct: "w-screen-11/12 text-red-500 | md:w-screen-7/12 | lg:w-screen-6/12",
      icon: "text-red-500",
      button: "xs:px-3 xs:py-2 border-red-500 hover:bg-red-500 hover:text-slate-100 | lg:px-8",
    },
  },
  "info": {
    lifeTime: 5000,
    fadeSpeed: "fast",
    customDirSty: {
      ct: "w-screen-11/12 | md:w-screen-7/12 | lg:w-screen-6/12",
      button: "xs:px-3 xs:py-2",
    },
  }
};

export default displayBottomNotif;
