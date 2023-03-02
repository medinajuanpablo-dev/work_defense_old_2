import React from "react";
import { cloneDeep } from "lodash";
import { BsCapslockFill } from "react-icons/bs";

import { StageMainScreen, ContinueButton, LineTitle } from "@common/index";
import { useIndicatedStyles } from "@static/tailwind";
import { useObjectState } from "@static/react";
import { useGeneralStateUpdator, useGeneralStateReader } from "@state/hooks";

import { TECHS, TEK } from "@static/contexts/technologies";
import { MIK } from "@static/contexts/miscellaneous";

import TechBox from "./TechBox";

function ResearchStage() {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES);
  const updateGS = useGeneralStateUpdator("miscellaneous", "technologies");
  const gs = useGeneralStateReader("technologies");

  const tempState = useObjectState({
    tree: cloneDeep(gs.technologies.tree),
    points: 0,
  });

  function setInitialValues() {
    tempState.replace({
      tree: cloneDeep(gs.technologies.tree),
      points: gs.technologies.researchPoints,
    });
  }

  React.useEffect(setInitialValues, []);

  const canResearch = tempState.get.points >= TECHS.RESEARCH_COST;

  function endStage() {
    updateGS.technologies.setPoints(tempState.get.points);
    updateGS.technologies.setTree(tempState.get.tree);

    updateGS.miscellaneous.stageForward();
  }

  function onResearch(categoryKey, columnKey, techIndex) {
    if (!canResearch) return;

    tempState.replace((prev) => {
      prev.tree[categoryKey][columnKey][techIndex].researched = true;
      prev.points -= TECHS.RESEARCH_COST;
      return prev;
    });
  }

  const styles = getActiveStyles({});

  return (
    <StageMainScreen onUndo={setInitialValues} stageKey={MIK.STAGES.RESEARCH}>
      <p className={styles.stageName}>Research Stage</p>

      <div className={styles.pointsCt}>
        <BsCapslockFill className={styles.pointsIcon} />
        <p className={styles.pointsLabel}>Research Points:</p>
        <p className={styles.pointsText}>{tempState.get.points}</p>
      </div>

      <div className={styles.techTreeCt}>
        {Object.keys(TECHS.TREE).map((categoryKey) => (
          <React.Fragment key={categoryKey}>
            <LineTitle margin="t-small" subtitle size="smaller">
              {TECHS.CATEGORIES_NAMES[categoryKey]}
            </LineTitle>
            <div className={styles.categoryCt}>
              {Object.keys(TECHS.TREE[categoryKey]).map((columnKey, index) => (
                <div
                  key={columnKey}
                  className={index == 0 ? styles.leftCol : styles.rightCol}
                >
                  <p className={styles.columnTitle}>
                    {TECHS.COLUMNS[columnKey].NAME} Column
                  </p>
                  {TECHS.TREE[categoryKey][columnKey].map((_, index) => (
                    <TechBox
                      key={index}
                      tempState={tempState.get.tree}
                      onResearch={() =>
                        onResearch(categoryKey, columnKey, index)
                      }
                      {...{ categoryKey, columnKey, index, canResearch }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>

      <ContinueButton
        subMessage="New techs will have immediate effect."
        onClick={endStage}
      />
    </StageMainScreen>
  );
}

//prettier-ignore
const DIRECTED_STYLES = {
  stageName: "text-center text-xl text-slate-700 text-light pb-1 border-slate-400 border-b-1 w-9/12 mx-auto",

  pointsCt: "relative flex justify-center items-center mt-8 border-1 border-dotted rounded-md p-2 w-3/4 border-indigo-500 mx-auto text-sm | xs:w-2/3 xs:text-base",
  pointsLabel: "text-gray-600 text-light text-sm | xs:text-base",
  pointsText: "text-indigo-500 text-strong leading-none ml-2 text-lg",
  pointsIcon: "mr-2 mb-2px text-xl text-gray-500",
  pointsInfo: "absolute -right-8",
  pointsInfoButton: "text-slate-500 || ho,sh<text-blue-600>",

  techTreeCt: "flex flex-col mt-2",
  categoryCt: "flex",

  columnTitle: "text-center text-light my-2 text-slate-600 text-sm",
  leftCol: "flex-1 flex flex-col text-gray-800 pr-2",
  rightCol: "flex-1 flex flex-col text-gray-800 pl-2",
};

const INDICATORS = [];

export default ResearchStage;
