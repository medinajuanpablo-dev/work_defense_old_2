import React from "react";

import { StageMainScreen } from "@common/index";

import { MIK } from "@static/contexts/miscellaneous";

function OccupationsStage() {
  return (
    <StageMainScreen stageKey={MIK.STAGES.OCCUPATIONS}>
      <div className="h-screen" />
      <div className="h-screen" />
    </StageMainScreen>
  );
}

export default OccupationsStage;
