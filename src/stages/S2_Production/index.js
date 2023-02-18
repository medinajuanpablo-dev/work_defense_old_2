import React from "react";

import { StageMainScreen } from "@common/index";

import { MIK } from "@static/contexts/miscellaneous";

function ProductionStage() {
  return (
    <StageMainScreen stageKey={MIK.STAGES.PRODUCTION}>
      <div className="h-screen" />
      <div className="h-screen" />
    </StageMainScreen>
  );
}

export default ProductionStage;
