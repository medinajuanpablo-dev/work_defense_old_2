import React from "react";
import { RiEditCircleFill } from "react-icons/ri";

import { SummaryRow, LineTitle } from "@common/index";
import { useGeneralStateReader } from "@state/hooks";

import { armyOps } from "@static/contexts/army";
import { populationOps, POPULATION } from "@static/contexts/population";
import { BDK } from "@static/contexts/buildings";

function GeneralSection() {
  const gs = useGeneralStateReader(
    "army",
    "population",
    `buildings.${BDK.NAMES.HOUSES}`
  );

  const summary = React.useMemo(() => {
    var armyMantainment = 0;
    var civMantainment = 0;

    const unifiedArmySections = [
      ...Object.values(gs.army.zonesDefense),
      ...Object.values(gs.army.liberationUnits),
      gs.army.freeZone,
    ];

    for (let armySection of unifiedArmySections)
      armyMantainment += armyOps.forceMantainment(armySection.force);

    //prettier-ignore
    for (let occKey of POPULATION.CIVILIAN_OCCS_KEYS)
      civMantainment += populationOps.civiliansMantainment(occKey, gs.population.count[occKey]);

    return {
      totalMantainment: armyMantainment + civMantainment,
      totalPeople: gs.population.count.total,
      housingCapacity: populationOps.housingCapacity(
        gs.buildings[BDK.NAMES.HOUSES].level
      ),
    };
  }, [gs]);

  return (
    <>
      <LineTitle>General Summary</LineTitle>
      <SummaryRow
        Icon={RiEditCircleFill}
        amount={summary.totalPeople + " / " + summary.housingCapacity}
        text="People Capacity: <A>."
        customDirSty={STYLES.amount}
        outstand
        color="purple"
      />
      <SummaryRow
        Icon={RiEditCircleFill}
        text="With a <L> of <A>."
        label="Total Mantainment"
        amount={Math.round(summary.totalMantainment)}
        color="green"
        customDirSty={STYLES.mantainment}
      />
    </>
  );
}

const STYLES = {
  amount: { ct: "mt-4" },
  mantainment: { ct: "mt-4" },

  capacity: { ct: "mt-4" },
};

export default GeneralSection;
