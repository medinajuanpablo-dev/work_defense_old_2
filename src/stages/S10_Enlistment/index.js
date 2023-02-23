import React from "react";

import { StageMainScreen, ContinueButton } from "@common/index";
import { useIndicatedStyles } from "@static/tailwind";
import { useGeneralStateUpdator } from "@state/hooks";

import { MIK } from "@static/contexts/miscellaneous";

function EnlistmentStage() {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES);
  const updateGS = useGeneralStateUpdator("population", "miscellaneous");

  function endStage() {
    updateGS.miscellaneous.stageForward();
  }

  const styles = getActiveStyles({});

  return (
    <StageMainScreen stageKey={MIK.STAGES.ENLISTMENT}>
      <p className={styles.stageName}>Enlistment Stage</p>

      <ContinueButton onClick={endStage} />
    </StageMainScreen>
  );
}

//prettier-ignore
const DIRECTED_STYLES = {
  stageName: "text-center text-xl text-slate-700 text-light pb-1 border-slate-400 border-b-1 w-9/12 mx-auto",
};

const INDICATORS = [];

export default EnlistmentStage;
