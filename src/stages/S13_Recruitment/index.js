import React from "react";
import {
  GiGraduateCap,
  GiMedal,
  GiTwoCoins,
  GiArcheryTarget,
} from "react-icons/gi";

import { StageMainScreen, ContinueButton } from "@common/index";
import { useIndicatedStyles } from "@static/tailwind";
import { useGeneralStateUpdator, useGeneralStateReader } from "@state/hooks";
import { useObjectState } from "@static/react";

import { MIK } from "@static/contexts/miscellaneous";
import { armyOps } from "@static/contexts/army";
import { BDK } from "@static/contexts/buildings";
import { REK } from "@static/contexts/resources";

const ACK = BDK.NAMES.ACADEMY;

function RecruitmentStage() {
  //prettier-ignore
  const gs = useGeneralStateReader("army", "resources.stored", `buildings.${ACK}`);
  const updateGS = useGeneralStateUpdator(
    "population",
    "miscellaneous",
    "resources"
  );

  const tempState = useObjectState({ recruits: {}, dlogs: 0 });

  const allLevels = React.useMemo(() => {
    const maxLevel = armyOps.maxGraduationCE(gs.buildings[ACK].level);

    var armyByLevel = {};
    for (let n = 1; n <= maxLevel; n++) armyByLevel[n] = 0; //This might be avoidable, but it's done for safety of values (all levels are zero by default, none is left undefined).
    for (let soldier of armyOps.getAllArmyForce(gs.army))
      armyByLevel[soldier.ce.level] += 1;

    return Array(maxLevel)
      .fill(0)
      .map((_, index) => ({
        number: index + 1,
        cost: armyOps.recruitmentCost(index + 1),
        inArmy: armyByLevel[index + 1],
      }));
  }, [gs.buildings, gs.army]);

  function setInitialValues() {
    var recruits = {};
    for (let lvl of allLevels) recruits[lvl.number] = 0;

    tempState.replace({
      recruits,
      dlogs: gs.resources.stored[REK.NAMES.DLOGS],
    });
  }

  React.useEffect(setInitialValues, []);

  function endStage() {
    updateGS.population.setRecruits(tempState.get.recruits);
    updateGS.resources.setResource(REK.NAMES.DLOGS, tempState.get.dlogs);

    updateGS.miscellaneous.stageForward();
  }

  function orderTraining(lvl) {
    tempState.replace((prev) => {
      prev.recruits[lvl.number] += 1;
      prev.dlogs -= lvl.cost;
      return prev;
    });
  }

  return (
    <StageMainScreen
      onUndo={setInitialValues}
      stageKey={MIK.STAGES.RECRUITMENT}
    >
      <p className={STYLES.stageName}>Recruitment Stage</p>

      <div className={STYLES.summary}>
        <p className={STYLES.dlogs}>
          <GiTwoCoins className={STYLES.dlogsIcon} />
          {tempState.get.dlogs}
        </p>
        <p className={STYLES.academy}>
          <GiGraduateCap className={STYLES.academyIcon} />
          {gs.buildings[ACK].level > 0 ? (
            <>
              Academy Level:{" "}
              <span className={STYLES.academyLevel}>
                {gs.buildings[ACK].level}
              </span>
            </>
          ) : (
            "Academy not built"
          )}
        </p>
      </div>

      {allLevels.map((lvl) => (
        <LevelRow
          key={lvl.number}
          affordable={lvl.cost <= tempState.get.dlogs}
          existing={lvl.inArmy}
          ordered={tempState.get.recruits[lvl.number]}
          onTrain={() => orderTraining(lvl)}
          {...lvl}
        />
      ))}

      <ContinueButton onClick={endStage} />
    </StageMainScreen>
  );
}

//prettier-ignore
const STYLES = {
  stageName: "text-center text-xl text-slate-700 text-light pb-1 border-slate-400 border-b-1 w-9/12 mx-auto",

  summary: "my-8 flex justify-center mx-3",
  dlogs: "w-4/12 mr-1 shrink-0 flex items-center justify-center border-1 text-yellow-600 border-yellow-500 py-2 text-xl rounded-md",
  dlogsIcon: "text-3xl mr-3 text-yellow-500",
  academy: "grow ml-1 flex justify-center items-center text-slate-600 text-light border-1 border-slate-300 rounded-md py-2 ",
  academyIcon: "mr-2 text-3xl",
  academyLevel: "text-default ml-2 text-lg",
};

function LevelRow({ number, cost, affordable, existing, ordered, onTrain }) {
  const getActiveStyles = useIndicatedStyles(LEVEL_INDICATORS, LEVEL_DIR_STY);

  var unavailable;
  if (!affordable) {
    if (ordered > 0) unavailable = "Can't afford more.";
    else unavailable = "Not affordable";
  }

  const styles = getActiveStyles({ unavailable });

  return (
    <div className={styles.ct}>
      <div className={styles.details}>
        <p className={styles.level}>
          <GiMedal className={styles.levelIcon} /> {number}
        </p>
        <p className={styles.stored}>
          <span className={styles.storedAmount}>{existing}</span> in army
        </p>
        <p className={styles.cost}>
          <GiTwoCoins className={styles.costIcon} /> {cost.toFixed(1)}
        </p>
      </div>

      <div className={styles.craft}>
        <button
          disabled={unavailable}
          onClick={() => !unavailable && onTrain()}
          className={styles.button}
        >
          <GiArcheryTarget className={styles.buttonIcon} /> Train
        </button>
        <p className={styles.crafting}>{ordered}</p>
      </div>
    </div>
  );
}

//prettier-ignore
const LEVEL_DIR_STY = {
  ct: "flex mb-4 items-center",

  details: "flex grow mr-1",
  level: "w-3/12 shrink-0 text-xl flex justify-center items-center border-1 border-sky-600 border-opacity-80 text-sky-600 text-opacity-80 py-6px rounded-l-md || unv<text-slate-500'border-slate-400>",
  levelIcon: "text-2xl",
  stored: "grow pt-2 text-center border-y-1 border-r-1 border-slate-300 text-slate-500 text-light text-sm",
  storedAmount: "text-base text-default text-slate-700 mr-1",
  cost: "flex shrink-0 w-4/12 justify-center items-center text-yellow-600 border-slate-300 border-y-1 border-r-1 rounded-r-md",
  costIcon: "mr-1 text-xl mb-1px text-yellow-500",

  craft: "w-4/12 shrink-0 flex",
  button: "grow flex justify-center items-center bg-indigo-500 text-slate-100 rounded-l-md || unv<bg-slate-400>",
  buttonIcon: "mr-1 text-xl mb-1",
  crafting: "py-2 w-7/24 shrink-0 text-center border-1 text-indigo-700 text-lg border-slate-300 rounded-r-md",
  unavailable: "mt-1 text-xs text-slate-500 text-center text-light",
};

const LEVEL_INDICATORS = [
  { key: "unavailable", directive: "unv", condition: (p) => !!p.unavailable },
];

export default RecruitmentStage;
