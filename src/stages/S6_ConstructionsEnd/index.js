import React from "react";
import { RiEditCircleFill } from "react-icons/ri";
import { BsQuestionCircle } from "react-icons/bs";

import { StageMainScreen, ContinueButton, SummaryRow } from "@common/index";
import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";

import { MIK } from "@static/contexts/miscellaneous";
import { BDK, BUILDINGS } from "@static/contexts/buildings";
import { REK, resourcesOps } from "@static/contexts/resources";
import { ITK } from "@static/contexts/interface";
import { armyOps } from "@static/contexts/army";
import { equipmentOps } from "@static/contexts/equipment";
import { populationOps } from "@static/contexts/population";
import { invasionOps } from "@static/contexts/invasion";

function ConstructionsEndStage() {
  const gs = useGeneralStateReader("buildings");
  const updateGS = useGeneralStateUpdator(
    "miscellaneous",
    "technologies",
    "buildings"
  );

  const upgradedBuildings = Object.keys(gs.buildings).filter(
    (b) => gs.buildings[b].upgrading
  );

  function endStage() {
    //Add one research point for the command center upgrade. This is the only upgrade with an immediate effect like this.
    if (upgradedBuildings.includes(BDK.NAMES.COMMAND_CENTER))
      updateGS.technologies.addPoints(1);

    //Set all buildings as not upgrading.
    updateGS.buildings.allNotUpgrading();

    updateGS.miscellaneous.stageForward();
  }

  return (
    <StageMainScreen stageKey={MIK.STAGES.CONSTRUCTIONS_END}>
      <p className={STYLES.stageName}>Constructions End Stage</p>

      <p className={STYLES.summary}>
        <span className={STYLES.summaryTitle}>Construction Foreman</span>
        We worked without issues and successfully completed the ordered
        projects.
      </p>

      {upgradedBuildings.map((b) => (
        <SummaryRow
          key={b}
          Icon={RiEditCircleFill}
          text="<L> upgraded to level<A>."
          label={BUILDINGS.BY_BUILDING[b].NAME}
          amount={gs.buildings[b].level + 1}
          color="blue"
          customDirSty={STYLES.row}
          size="smaller"
          notificationsConfig={[
            {
              ButtonIcon: BsQuestionCircle,
              body: buildNewEffectDescription(b, gs.buildings[b].level + 1),
              type: ITK.NOTIFICATION_TYPES.INFO,
            },
          ]}
        />
      ))}

      <ContinueButton
        subMessage="The upgraded buildings effects will apply immediately."
        onClick={endStage}
      />
    </StageMainScreen>
  );
}

//prettier-ignore
const STYLES = {
  stageName: "text-center text-xl text-slate-700 text-light pb-1 border-slate-400 border-b-1 w-9/12 mx-auto",

  summary: "relative mb-2 text-xs text-light px-3 pt-4 pb-3 border-1 border-sky-200 mt-8 text-slate-600",
  summaryTitle: "absolute -top-2 left-1 px-2 bg-slate-100 text-sky-600",

  row: {
    ct: "mt-4"
  }
};

function buildNewEffectDescription(buildingKey, newLevel) {
  switch (buildingKey) {
    case BDK.NAMES.COMMAND_CENTER:
      return `We got a new Research Point.`;

    case BDK.NAMES.ACADEMY:
      return `Now we can recruit soldiers with level ${armyOps.maxGraduationCE(
        newLevel
      )} of Combat Experience (or inferior).`;

    case BDK.NAMES.FARMS:
      return `The Food produced by each farmer improved to ${resourcesOps.production(
        REK.NAMES.FOOD,
        newLevel,
        1
      )} per tempo.`;

    case BDK.NAMES.WEAPONSMITH:
      return `Now we can order Weapons of up to Rank ${equipmentOps.maxCraftableRank(
        newLevel
      )}.`;

    case BDK.NAMES.ARMORSMITH:
      return `Now we can order Armor of up to Rank ${equipmentOps.maxCraftableRank(
        newLevel
      )}.`;

    case BDK.NAMES.MINES:
      return `The Materials produced by each miner improved to ${resourcesOps.production(
        REK.NAMES.MATERIALS,
        newLevel,
        1
      )} per tempo.`;

    case BDK.NAMES.HOUSES:
      return `The amount of people that can live in the Outpost now is ${populationOps.housingCapacity(
        newLevel
      )} maximum.`;

    case BDK.NAMES.IMMIGRATION_POST:
      return `We'll be receiving ${populationOps.immigrants(
        newLevel
      )} immigrants each tempo from now on.`;

    case BDK.NAMES.WAREHOUSE:
      return `We can now store up to ${resourcesOps.storageCapacity(
        REK.NAMES.FOOD,
        newLevel
      )} Food and ${resourcesOps.storageCapacity(
        REK.NAMES.MATERIALS,
        newLevel
      )} Materials.`;

    case BDK.NAMES.ARSENAL:
      return `We can now store up to ${equipmentOps.storageCapacity(
        newLevel
      )} units of equipment of any type in total.`;

    case BDK.NAMES.MARKET:
      return `The Dlogs produced improved to DEVELOPMENT per Sess.`;

    case BDK.NAMES.SCOUTS_GUILD:
      return `The base quality of every expedition improved to ${invasionOps.baseExpeditionQuality(
        newLevel
      )}`;
  }
}

export default ConstructionsEndStage;
