import React from "react";

import { StageMainScreen } from "@common/index";

import { MIK } from "@static/contexts/miscellaneous";

function ConstructionsEndStage() {
  return (
    <StageMainScreen stageKey={MIK.STAGES.CONSTRUCTIONS_END}>
      <div className="h-screen" />
      <div className="h-screen" />
    </StageMainScreen>
  );
}

export default ConstructionsEndStage;
