import React from "react";

import { StageMainScreen } from "@common/index";

import { MIK } from "@static/contexts/miscellaneous";

function EmploymentStage() {
  return (
    <StageMainScreen stageKey={MIK.STAGES.EMPLOYMENT}>
      <div className="h-screen" />
      <div className="h-screen" />
    </StageMainScreen>
  );
}

export default EmploymentStage;
