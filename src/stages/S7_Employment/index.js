import React from "react";

import { StageMainScreen, ContinueButton } from "@common/index";
import { useIndicatedStyles } from "@static/tailwind";
import { useGeneralStateUpdator } from "@state/hooks";

import { MIK } from "@static/contexts/miscellaneous";

function EmploymentStage() {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES);
  const updateGS = useGeneralStateUpdator("population", "miscellaneous");

  function endStage() {
    updateGS.miscellaneous.stageForward();
  }

  const styles = getActiveStyles({});

  return (
    <StageMainScreen stageKey={MIK.STAGES.EMPLOYMENT}>
      <p className={styles.stageName}>Employment Stage</p>

      <ContinueButton onClick={endStage} />

      {/* <p className={styles.subMessage}>
        {status.accepted > 0 ? (
          <>
            The{" "}
            {status.isNegativeStatus
              ? `${status.accepted} accepted persons`
              : "new people"}{" "}
            will be shown the way to their new houses and then'll be available
            for work.
          </>
        ) : (
          "We can't accomodate none of the immigrants."
        )}
      </p> */}
    </StageMainScreen>
  );
}

//prettier-ignore
const DIRECTED_STYLES = {
  stageName: "text-center text-xl text-slate-700 text-light pb-1 border-slate-400 border-b-1 w-9/12 mx-auto",
};

const INDICATORS = [];

export default EmploymentStage;
