import React from "react";

import { StageMainScreen } from "@common/index";

import { MIK } from "@static/contexts/miscellaneous";

function BuildStage() {
  return (
    <StageMainScreen stageKey={MIK.STAGES.BUILD}>
      <div className="h-screen" />
      <div className="h-screen" />
    </StageMainScreen>
  );
}

export default BuildStage;
