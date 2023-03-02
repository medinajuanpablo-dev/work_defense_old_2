import React from "react";

import { MISC } from "@static/contexts/miscellaneous";

import TEXTS from "./texts";

function Tutorial({ stageKey }) {
  return (
    <div className={STYLES.ct}>
      <p className={STYLES.title}>
        {MISC.ORDERED_STAGES[stageKey]} Stage Fundamentals
      </p>

      <div>
        {TEXTS[stageKey].map((section, index) => (
          <React.Fragment key={index}>
            <p className={STYLES.sectionTitle}>{section.title}</p>
            <p className={STYLES.sectionBody}>{section.body}</p>
          </React.Fragment>
        ))}
      </div>

      <div className={STYLES.bottom} />
    </div>
  );
}

//prettier-ignore
const STYLES = {
  ct: "flex flex-col items-center relative py-2 -mr-4 h-screen-9/12 overflow-y-scroll pl-2 pr-8",
  title: "text-indigo-700 border-b-1 border-indigo-700 border-opacity-30 pb-1 text-center text-light text-lg",

  sectionTitle: "mt-8 w-full",
  sectionBody: "mt-2 w-full text-sm leading-relaxed tracking-wide text-light",

  bottom: "mt-10 w-full border-t-1 border-slate-400 border-opacity-80 w-9/12 mx-auto",
};

export default Tutorial;
