import React from "react";

import { StageMainScreen, ContinueButton } from "@common/index";
import { useGeneralStateUpdator } from "@state/hooks";

import { MIK } from "@static/contexts/miscellaneous";

function LiberationStage() {
  //prettier-ignore
  const updateGS = useGeneralStateUpdator("population", "miscellaneous");

  function endStage() {
    updateGS.miscellaneous.stageForward();
  }

  return (
    <StageMainScreen stageKey={MIK.STAGES.LIBERATION}>
      <p className={STYLES.stageName}>Liberation Stage</p>

      <ContinueButton onClick={endStage} />
    </StageMainScreen>
  );
}

//prettier-ignore
const STYLES = {
  stageName: "text-center text-xl text-slate-700 text-light pb-1 border-slate-400 border-b-1 w-9/12 mx-auto",
};

export default LiberationStage;
