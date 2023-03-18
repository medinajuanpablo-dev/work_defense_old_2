import React from "react";
import { chunk, mapValues } from "lodash";

import { RiEditCircleFill } from "react-icons/ri";

import { LineTitle, SummaryRow } from "@common/index";
import { useGeneralStateReader } from "@state/hooks";
import { sumProperties } from "@static/functions";

import { PPK, POPULATION, populationOps } from "@static/contexts/population";

function CiviliansSectionLayout() {
  const gs = useGeneralStateReader("population");

  const summary = React.useMemo(() => {
    var byOcc = mapValues(gs.population.count, (occCount, occ) => ({
      count: occCount,
      mantainment: 0,
    }));
    var totalMantainment = 0;

    //prettier-ignore
    for (let occ of POPULATION.CIVILIAN_OCCS_KEYS) {
      const result = populationOps.civiliansMantainment(occ, gs.population.count[occ]);
      byOcc[occ].mantainment += result;
      totalMantainment += result;
    }

    const amount = sumProperties(
      gs.population.count,
      POPULATION.CIVILIAN_OCCS_KEYS
    );

    return {
      byOcc,
      amount,
      totalMantainment,
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
        amount={Math.round(summary.totalMantainment)}
        customDirSty={STYLES.mantainment}
        color="green"
      />

      {Object.keys(POPULATION.WORKER_OCCS).map((occ) => (
        <div key={occ} className={STYLES.occRow}>
          <SummaryRow
            Icon={RiEditCircleFill}
            label={POPULATION.WORKER_OCCS[occ].PLURAL}
            amount={summary.byOcc[occ].count}
            text="<L>: <A>"
            customDirSty={STYLES.occCell}
            color="blue"
            size="smaller"
          />
          <SummaryRow
            Icon={RiEditCircleFill}
            amount={summary.byOcc[occ].mantainment}
            text="Consuming: <A>"
            customDirSty={STYLES.occCell}
            color="blue"
            size="smaller"
          />
        </div>
      ))}

      {Object.keys(POPULATION.PROCESS_OCCS).map((occ) => (
        <div key={occ} className={STYLES.occRow}>
          <SummaryRow
            Icon={RiEditCircleFill}
            label={POPULATION.PROCESS_OCCS[occ].PLURAL}
            amount={summary.byOcc[occ].count}
            text="<L>: <A>"
            customDirSty={STYLES.occCell}
            color="blue"
            size="smaller"
          />
          <SummaryRow
            Icon={RiEditCircleFill}
            amount={summary.byOcc[occ].mantainment}
            text="Consuming: <A>"
            customDirSty={STYLES.occCell}
            color="blue"
            size="smaller"
          />
        </div>
      ))}

      <div className={STYLES.occRow}>
        <SummaryRow
          Icon={RiEditCircleFill}
          label={POPULATION.FREE_OCC.PLURAL}
          amount={summary.byOcc[PPK.OCCS.FREE].count}
          text="<L>: <A>"
          customDirSty={STYLES.occCell}
          color="blue"
          size="smaller"
        />
        <SummaryRow
          Icon={RiEditCircleFill}
          amount={summary.byOcc[PPK.OCCS.FREE].mantainment}
          text="Consuming: <A>"
          customDirSty={STYLES.occCell}
          color="blue"
          size="smaller"
        />
      </div>
    </>
  );
}

const STYLES = {
  title: { ct: "mt-6" },
  totalCivilians: { ct: "mt-4" },
  mantainment: { ct: "my-4" },

  occRow: "flex border-t-1 border-slate-300 py-2 items-center",
  occCell: {
    ct: "flex-1 shrink-0 ",
    label: "text-default",
    icon: "w-4 h-4 | xs:w-6 xs:h-6",
  },
};

export default CiviliansSectionLayout;
