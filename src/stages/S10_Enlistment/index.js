import React from "react";
import { RiEditCircleFill } from "react-icons/ri";
import { GiSpears } from "react-icons/gi";

import {
  StageMainScreen,
  ContinueButton,
  SummaryRow,
  CuteButton,
} from "@common/index";
import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";

import { MIK } from "@static/contexts/miscellaneous";
import { PPK } from "@static/contexts/population";
import { armyOps } from "@static/contexts/army";

import UpdatedArmyPreview from "./UpdatedArmyPreview";

function EnlistmentStage() {
  //prettier-ignore
  const updateGS = useGeneralStateUpdator("miscellaneous", "army", "interface");
  const gs = useGeneralStateReader("population");
  const [showArmyList, setShowArmyList] = React.useState(false);

  function endStage() {
    //Build fresh force.
    var freshSoldiers = [];
    for (let level in gs.population.recruitsLevels)
      freshSoldiers.push(
        ...Array(gs.population.recruitsLevels[level])
          .fill(0)
          .map(() => armyOps.createSoldier({ level }))
      );

    //Add fresh force.
    updateGS.army.addFreshSoldiers(freshSoldiers);

    updateGS.miscellaneous.stageForward();
  }

  const areNewSoldiers = gs.population.count[PPK.OCCS.RECRUIT] > 0;

  return (
    <StageMainScreen stageKey={MIK.STAGES.ENLISTMENT}>
      <p className={STYLES.stageName}>Enlistment Stage</p>

      {showArmyList ? (
        <UpdatedArmyPreview
          closePreview={() => setShowArmyList(false)}
          recruitsLevels={gs.population.recruitsLevels}
        />
      ) : (
        <>
          {areNewSoldiers ? (
            <>
              {" "}
              {Object.keys(gs.population.recruitsLevels).map((level) => (
                <SummaryRow
                  key={level}
                  Icon={RiEditCircleFill}
                  amount={`+${gs.population.recruitsLevels[level]}`}
                  label={level}
                  text="<A> soldiers of level <L> of CE."
                  color="blue"
                  customDirSty={{ ct: "mt-6" }}
                />
              ))}
              <CuteButton
                color="indigo"
                stylesBehavior="always-filled"
                Icon={GiSpears}
                customDirSty={STYLES.viewAll}
                onClick={() => setShowArmyList(true)}
              >
                Preview updated Army
              </CuteButton>
            </>
          ) : (
            <p className={STYLES.none}>
              No recruits were ordered last tempo, and so none were trained and
              no soldiers were added this tempo neither.
            </p>
          )}

          <ContinueButton
            subMessage={
              gs.population.count[PPK.OCCS.RECRUIT] > 0
                ? "Army will be updated as it looks in the Preview."
                : ""
            }
            onClick={endStage}
          />
        </>
      )}
    </StageMainScreen>
  );
}

//prettier-ignore
const STYLES = {
  stageName: "text-center text-xl text-slate-700 text-light pb-1 border-slate-400 border-b-1 w-9/12 mx-auto",
  viewAll: { button: "mt-8" },
  none: "mt-16 mb-8 text-center border-1 border-sky-400 rounded-md p-4 text-light text-slate-700",
};

export default EnlistmentStage;
