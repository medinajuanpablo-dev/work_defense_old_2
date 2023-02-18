import React from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { BsBoxArrowRight } from "react-icons/bs";

import { useIndicatedStyles } from "@static/tailwind";

function ContinueButton({ subMessage, onClick, customDirSty }) {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES, { customDirSty });
  const [locked, setLocked] = React.useState(true);

  const styles = getActiveStyles({ locked });

  const LockIcon = locked ? FaLock : FaLockOpen;

  return (
    <>
      <div className={styles.ct}>
        <button onClick={() => setLocked(!locked)} className={styles.lock}>
          <LockIcon className={styles.lockIcon} />
        </button>
        <button onClick={onClick} disabled={locked} className={styles.continue}>
          Save and Proceed
          <BsBoxArrowRight className={styles.continueIcon} />
        </button>
      </div>

      {subMessage && <p className={styles.subMessage}>{subMessage}</p>}
    </>
  );
}

//prettier-ignore
const DIRECTED_STYLES = {
  ct: "mt-8 pt-6 flex justify-center border-t-2 border-dotted border-slate-300",

  lock: "mr-4 p-2 border-1 border-indigo-400 text-indigo-400 rounded-md pb-8px || ul<border-orange-400'text-orange-400>",
  lockIcon: "text-2xl",

  continue: "w-8/12 flex justify-center items-center bg-slate-400 text-slate-100 rounded-md py-2 || ul<bg-indigo-500>",
  continueIcon: "ml-2 mb-3px text-2xl",

  subMessage: "mt-6 text-xs text-light text-slate-500 text-center px-2",
};

const INDICATORS = [
  { key: "unlocked", directive: "ul", condition: (p) => !p.locked },
];

export default ContinueButton;
