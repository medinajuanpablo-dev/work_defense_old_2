import React from "react";
import { chunk, random } from "lodash";
import { BsExclamationTriangle, BsCheckCircle } from "react-icons/bs";

import { StageMainScreen, ContinueButton, LineTitle } from "@common/index";
import { useGeneralStateUpdator } from "@state/hooks";
import { useIndicatedStyles } from "@static/tailwind";

import { MISC, MIK } from "@static/contexts/miscellaneous";

function SightingStage() {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES);

  const updateGS = useGeneralStateUpdator("miscellaneous");

  function endStage() {
    updateGS.miscellaneous.stageForward();
  }

  const invasion = true;

  const alarm = invasion
    ? { Icon: BsExclamationTriangle, text: "Invasion incoming!" }
    : { Icon: BsCheckCircle, text: "No enemies in sight." };

  const styles = getActiveStyles({ invasion });

  return (
    <StageMainScreen stageKey={MIK.STAGES.SIGHTING}>
      <p className={styles.stageName}>Sighting Stage</p>

      <p className={styles.alarm}>
        <alarm.Icon className={styles.alarmIcon} /> {alarm.text}
      </p>

      {invasion ? (
        <>
          <p className={styles.intel}>
            <span className={styles.intelTitle}>Quick intel report</span>
            The enemy's estimated power is{" "}
            <span className={styles.intelPower}>192</span> and they're splitting
            their forces in <span className={styles.intelGroups}>3</span>{" "}
            groups.
          </p>

          <LineTitle subtitle size="smaller">
            Reported risks of attack
          </LineTitle>

          <div className={styles.zonesCt}>
            {chunk(Object.keys(MISC.ACTIVE_ZONES), 3).map((zonesRow, index) => (
              <div key={index} className={styles.zonesRow}>
                {zonesRow.map((z) => (
                  <ZoneBox key={z} zoneKey={z} />
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className={styles.intel}>
          <span className={styles.intelTitle}>Quick intel report</span>
          Currently no invaders are threatening our Outpost. We may proceed
          safely.
        </p>
      )}

      <ContinueButton
        subMessage={
          invasion
            ? ""
            : "This will advance straight to the Offensive Stage due to the lack of invasion."
        }
        unlocked={!invasion}
        onClick={endStage}
      />
    </StageMainScreen>
  );
}

//prettier-ignore
const DIRECTED_STYLES = {
  stageName: "text-center text-xl text-slate-700 text-light pb-1 border-slate-400 border-b-1 w-9/12 mx-auto",

  alarm: "mt-6 flex justify-center items-center py-2 w-8/12 mx-auto border-1 border-dotted rounded-md border-opacity-70 text-red-700 text-light border-red-600 || ni<border-emerald-600'text-emerald-700>",
  alarmIcon: "mr-2 text-xl ",

  intel: "mt-6 relative p-3 pt-4 text-center border-1 border-sky-700 border-opacity-30 rounded-md text-light text-sm text-slate-700",
  intelTitle: "absolute px-2 bg-slate-100 text-sky-700 left-2 -top-2 text-xs",
  intelPower: "text-default text-yellow-700 text-base mx-1",
  intelGroups: "text-default text-sky-700 text-base mx-1",

  zonesCt: "border-slate-400 mt-6 flex flex-col -mx-1",
  zonesRow: "border-slate-400 h-24 flex my-3px",
  zone: "border-slate-400 border-1 rounded-sm h-full w-4/12 mx-3px flex flex-col justify-center items-center p-2 text-slate-600 border-emerald-600 border-opacity-60",
  zoneName: "text-sm text-center leading-tight",
  zoneNameExtra: "text-xs text-slate-400 text-light",
  zoneRisk: "mt-2 text-emerald-600",
};

const INDICATORS = [
  { key: "noInvasion", directive: "ni", condition: (p) => !p.invasion },
];

function ZoneBox({ zoneKey }) {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(ZONE_BOX_INDICATORS, ZONE_BOX_DIR_STY);

  const styles = getActiveStyles({});

  return (
    <div className={styles.ct}>
      <p className={styles.name}>
        {MISC.ACTIVE_ZONES[zoneKey]} <br />{" "}
        <span className={styles.nameExtra}>zone</span>
      </p>
      <p className={styles.risk}>2 %</p>
    </div>
  );
}

//prettier-ignore
const ZONE_BOX_DIR_STY = {
  ct: "border-slate-400 border-1 rounded-sm h-full w-4/12 mx-3px flex flex-col justify-center items-center p-2 text-slate-600 border-emerald-600 border-opacity-60",
  name: "text-sm text-center leading-tight",
  nameExtra: "text-xs text-slate-400 text-light",
  risk: "mt-2 text-emerald-600",
};

const ZONE_BOX_INDICATORS = [];

export default SightingStage;
