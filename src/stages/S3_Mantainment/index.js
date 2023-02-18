import React from "react";

import { StageMainScreen } from "@common/index";

import { MIK } from "@static/contexts/miscellaneous";

function MantainmentStage() {
  return (
    <StageMainScreen stageKey={MIK.STAGES.MANTAINMENT}>
      <div className="h-screen" />
      <div className="h-screen" />
    </StageMainScreen>
  );
}

export default MantainmentStage;
