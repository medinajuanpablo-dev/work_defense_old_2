import React from "react";

import { StageMainScreen } from "@common/index";

import { MIK } from "@static/contexts/miscellaneous";

function DawnStage() {
  return (
    <StageMainScreen stageKey={MIK.STAGES.DAWN}>
      <div className="h-screen" />
      <div className="h-screen" />
    </StageMainScreen>
  );
}

export default DawnStage;
