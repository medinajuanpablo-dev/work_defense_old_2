import React from "react";
import { chunk } from "lodash";

import { RiEditCircleFill } from "react-icons/ri";

import { LineTitle, SummaryRow } from "@common/index";
import { useGeneralStateReader } from "@state/hooks";
import { sumProperties } from "@static/functions";

import { PPK, POPULATION, populationOps } from "@static/contexts/population";

function CiviliansSectionLayout() {
  const gs = useGeneralStateReader("population");

  const summary = React.useMemo(() => {
    const byOcc = gs.population.count;

    const amount = sumProperties(
      gs.population.count,
      POPULATION.CIVILIAN_OCCS_KEYS
    );

    var mantainment = 0;

    //prettier-ignore
    for (let occKey of POPULATION.CIVILIAN_OCCS_KEYS)
      mantainment += populationOps.civiliansMantainment(occKey, gs.population.count[occKey]);

    return {
      byOcc,
      amount,
      mantainment,
    };
  }, [gs.population]);

  return (
    <>
      <LineTitle customDirSty={STYLES.title}>Civilians Summary</LineTitle>

      <SummaryRow
        Icon={RiEditCircleFill}
        label="Civilians"
        amount={summary.amount}
        text="Currently <A> <L> live here."
        customDirSty={STYLES.totalCivilians}
        outstand
        color="purple"
      />

      <SummaryRow
        Icon={RiEditCircleFill}
        label="Civilian Mantainment"
        text="Total <A> <L>."
        amount={Math.round(summary.mantainment)}
        customDirSty={STYLES.mantainment}
        outstand
        color="green"
      />

      <LineTitle customDirSty={STYLES.byOccTitle} subtitle smallerFont>
        By Occupation
      </LineTitle>

      <div className={STYLES.occsRow}>
        {Object.keys(POPULATION.WORKER_OCCS).map((occ) => (
          <SummaryRow
            key={occ}
            Icon={RiEditCircleFill}
            label={POPULATION.WORKER_OCCS[occ].PLURAL}
            amount={summary.byOcc[occ]}
            text="<L>: <A>"
            customDirSty={STYLES.occupation}
            color="blue"
          />
        ))}
      </div>
      <div className={STYLES.occsRow}>
        {Object.keys(POPULATION.PROCESS_OCCS).map((occ) => (
          <SummaryRow
            key={occ}
            Icon={RiEditCircleFill}
            label={POPULATION.PROCESS_OCCS[occ].PLURAL}
            amount={summary.byOcc[occ]}
            text="<L>: <A>"
            customDirSty={STYLES.occupation}
            color="blue"
          />
        ))}
      </div>
      <SummaryRow
        Icon={RiEditCircleFill}
        label={POPULATION.FREE_OCC.PLURAL}
        amount={summary.byOcc[PPK.OCCS.FREE]}
        text="<L>: <A>"
        customDirSty={STYLES.occupation}
        color="blue"
      />
    </>
  );
}

const STYLES = {
  title: { ct: "mt-6" },
  totalCivilians: { ct: "mt-6" },
  mantainment: { ct: "mt-2" },

  byOccTitle: { ct: "mt-4 text-light" },
  occsRow: "flex",
  occupation: {
    ct: "flex-1 mt-4",
    label: "text-default",
    icon: "w-4 h-4 | xs:w-6 xs:h-6",
  },
};

export default CiviliansSectionLayout;
