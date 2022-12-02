import React from "react";

import { StageMainScreen } from "@common/index";

import { MIK } from "@static/contexts/miscellaneous";

function ImmigrationStage() {
  return (
    <StageMainScreen stageKey={MIK.STAGES.IMMIGRATION}>
      <div className="h-screen" />
      <div className="h-screen" />
    </StageMainScreen>
  );
}

export default ImmigrationStage;
