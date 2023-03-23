import React from "react";
import { chunk, random } from "lodash";
import { BsExclamationTriangle, BsCheckCircle } from "react-icons/bs";

import { StageMainScreen, ContinueButton, LineTitle } from "@common/index";
import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";
import { useIndicatedStyles } from "@static/tailwind";

import { MISC, MIK } from "@static/contexts/miscellaneous";
import { invasionOps } from "@static/contexts/invasion";
import { armyOps } from "@static/contexts/army";

function SightingStage() {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES);

  const updateGS = useGeneralStateUpdator("miscellaneous", "invasion");
  const gs = useGeneralStateReader("miscellaneous");

  const ts = gs.miscellaneous.tempState;

  function setInitialValues() {
    //Once-only calculations (because they're random and we don't want them to be re-done on refresh).
    if (!ts) {
      const sights = invasionOps.getSights(gs.miscellaneous.tempo);

      if (sights.temposUntilInvasion > 0) {
        updateGS.miscellaneous.replaceTempState({ incomingInvasion: null });
        return;
      }

      const invasionForce = invasionOps.createInvasionForce(
        sights.invasionNumber
      );
      const risks = invasionOps.risksFor(sights.invasionNumber);

      updateGS.miscellaneous.replaceTempState({
        incomingInvasion: sights.invasionNumber,
        invasionPower: armyOps.powerOf(invasionForce),
        invasionForce,
        risks,
      });
    }
  }

  React.useEffect(setInitialValues, []);
  if (!ts) return null;

  function endStage() {
    updateGS.invasion.merge({
      defense: {
        fullInvasionForce: ts.invasionForce,
        risks: ts.risks.zonesRisks,
        dangerZones: ts.risks.dangerZones,
      },
    });

    updateGS.miscellaneous.stageForward();
  }

  const alarm = ts.incomingInvasion
    ? {
        Icon: BsExclamationTriangle,
        text: `Invasion ${ts.incomingInvasion} incoming!`,
      }
    : { Icon: BsCheckCircle, text: "No enemies in sight." };

  const styles = getActiveStyles(ts);

  return (
    <StageMainScreen stageKey={MIK.STAGES.SIGHTING}>
      <p className={styles.stageName}>Sighting Stage</p>

      <p className={styles.alarm}>
        <alarm.Icon className={styles.alarmIcon} /> {alarm.text}
      </p>

      {ts.incomingInvasion ? (
        <>
          <p className={styles.intel}>
            <span className={styles.intelTitle}>Quick intel report</span>
            The enemy's power is{" "}
            <span className={styles.intelPower}>
              {ts.invasionPower.toFixed(ts.invasionPower > 1 ? 0 : 1)}
            </span>{" "}
            {ts.risks.dangerZones.length > 1 ? (
              <>
                and they're splitting their forces in{" "}
                <span className={styles.intelGroups}>
                  {ts.risks.dangerZones.length}
                </span>{" "}
                groups.
              </>
            ) : (
              "and they will perform a single attack with their whole force."
            )}
          </p>

          <LineTitle subtitle size="smaller">
            Reported risks of attack
          </LineTitle>

          <div className={styles.zonesCt}>
            {chunk(Object.keys(MISC.REAL_ZONES), 3).map((zonesRow, index) => (
              <div key={index} className={styles.zonesRow}>
                {zonesRow.map((z) => (
                  <ZoneBox risk={ts.risks.zonesRisks[z]} key={z} zoneKey={z} />
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
          ts.incomingInvasion
            ? ""
            : "This will advance straight to the Offensive Stage due to the lack of invasion."
        }
        unlocked={!ts.incomingInvasion}
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
  { key: "noInvasion", directive: "ni", condition: (p) => !p.incomingInvasion },
];

function ZoneBox({ zoneKey, risk }) {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(ZONE_BOX_INDICATORS, ZONE_BOX_DIR_STY);

  const isCommandZone = zoneKey == MIK.ZONES.COMMAND;

  const styles = getActiveStyles({ risk, isCommandZone });

  return (
    <div className={styles.ct}>
      <p className={styles.name}>
        {MISC.REAL_ZONES[zoneKey]} <br />{" "}
        <span className={styles.nameExtra}>zone</span>
      </p>
      {!isCommandZone && <p className={styles.risk}>{risk} %</p>}
    </div>
  );
}

//prettier-ignore
const ZONE_BOX_DIR_STY = {
  ct: "border-slate-400 border-1 rounded-sm h-full w-4/12 mx-3px flex flex-col justify-center items-center p-2 text-slate-600 border-emerald-600 bg-emerald-600 bg-opacity-5 border-opacity-60 || lr<border-lime-600'bg-lime-600> mr<border-amber-600'bg-lime-600> hr<border-orange-600'bg-orange-600> cr<border-red-600'bg-red-600> cz<border-slate-400'bg-slate-400'text-slate-400'text-light>",
  name: "text-sm text-center leading-tight",
  nameExtra: "text-xs text-slate-400 text-light",
  risk: "mt-2 text-emerald-600 || lr<text-lime-600> mr<text-amber-600> hr<text-orange-600> cr<text-red-600> cz<text-slate-400'text-sm'text-light>",
};

const ZONE_BOX_INDICATORS = [
  { key: "lowRisk", directive: "lr", condition: (p) => p.risk > 0 },
  { key: "moderateRisk", directive: "mr", condition: (p) => p.risk > 10 },
  { key: "highRisk", directive: "hr", condition: (p) => p.risk > 33 },
  { key: "criticalRisk", directive: "cr", condition: (p) => p.risk > 66 },
  { key: "isCommandZone", directive: "cz", condition: (p) => p.isCommandZone },
];

export default SightingStage;
