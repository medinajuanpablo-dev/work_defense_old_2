import React from "react";
import { RiEditCircleFill } from "react-icons/ri";
import { GiWheat, GiClayBrick, GiTwoCoins } from "react-icons/gi";

import { SummaryRow, LineTitle } from "@common/index";
import { useIndicatedStyles } from "@static/tailwind";
import { useGeneralStateReader } from "@state/hooks";
import { exists as e } from "@static/functions";

import { resourcesOps, REK, RESOURCES } from "@static/contexts/resources";
import { MIK, miscOps } from "@static/contexts/miscellaneous";
import { BDK } from "@static/contexts/buildings";
import { armyOps } from "@static/contexts/army";
import { POPULATION, PPK, populationOps } from "@static/contexts/population";

function ResourcesSection() {
  const gs = useGeneralStateReader(
    "buildings",
    "population",
    "resources",
    "army"
  );

  const summary = React.useMemo(() => {
    var summary = {};

    //Calculate summary of each resource
    const warehouseLevel = gs.buildings[BDK.NAMES.WAREHOUSE].level;

    function processResource(key, producerBuildingKey, workersKey) {
      const producerBuildingLevel = gs.buildings[producerBuildingKey].level;
      const workersAmount = gs.population.count[workersKey];
      const capacity = resourcesOps.storageCapacity(key, warehouseLevel);

      summary[key] = {
        stored: gs.resources.stored[key],
        capacity,
        production: resourcesOps.production(
          key,
          producerBuildingLevel,
          workersAmount
        ),
        status: miscOps.capacityStatus(gs.resources.stored[key], capacity),
      };
    }

    processResource(REK.NAMES.FOOD, BDK.NAMES.FARMS, PPK.OCCS.FARMER);
    processResource(REK.NAMES.MATERIALS, BDK.NAMES.MINES, PPK.OCCS.MINER);
    summary[REK.NAMES.DLOGS] = { stored: gs.resources.stored[REK.NAMES.DLOGS] };

    //Calculate remaining tempos of food
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
    for (let occ of POPULATION.CIVILIAN_OCCS_KEYS)
      civMantainment += populationOps.civiliansMantainment(occ, gs.population.count[occ]);

    summary.temposOfFood =
      gs.resources.stored[REK.NAMES.FOOD] / (armyMantainment + civMantainment);

    //Spent dlogs.
    summary.spentDlogs =
      gs.resources.storedPrevTempo[REK.NAMES.DLOGS] -
      gs.resources.stored[REK.NAMES.DLOGS];

    return summary;
  }, [gs.resources, gs.population, gs.buildings]);

  return (
    <>
      <LineTitle>Resources Summary</LineTitle>

      <div className={STYLES.resourcesCt}>
        <ResourceBox
          resKey={REK.NAMES.FOOD}
          summary={summary}
          customDirSty={STYLES.food}
        />
        <ResourceBox
          resKey={REK.NAMES.DLOGS}
          summary={summary}
          customDirSty={STYLES.dlogs}
        />
        <ResourceBox
          resKey={REK.NAMES.MATERIALS}
          summary={summary}
          customDirSty={STYLES.materials}
        />
      </div>

      <div className={STYLES.statsCt}>
        {Object.keys(RESOURCES.NAMES).map((resKey) => (
          <ResourceWarning
            key={resKey}
            resKey={resKey}
            status={summary[resKey].status}
          />
        ))}

        <SummaryRow
          smaller
          Icon={RiEditCircleFill}
          text="We have Food for <A> <L>."
          label="Tempos"
          amount={summary.temposOfFood.toFixed(1)}
          color={summary.temposOfFood >= 1 ? "blue" : "red"}
          customDirSty={STYLES.stat}
        />
        <SummaryRow
          smaller
          Icon={RiEditCircleFill}
          text={
            summary.spentDlogs == 0
              ? "<L> this tempo so far.<A>"
              : `We <L> <A> Dlogs this tempo so far`
          }
          amount={summary.spentDlogs != 0 ? Math.abs(summary.spentDlogs) : ""}
          label={
            summary.spentDlogs > 0
              ? "spent"
              : summary.spentDlogs < 0
              ? "earned"
              : "No Dlogs movements"
          }
          color="blue"
          customDirSty={STYLES.stat}
        />
      </div>
    </>
  );
}

const STYLES = {
  resourcesCt: "flex mt-4 justify-between items-start",

  food: { icon: "text-green-700 " },
  dlogs: { icon: "text-yellow-500 " },
  materials: { icon: "text-gray-600 " },

  statsCt: "my-6",
  stat: { ct: "mt-2" },
};

//prettier-ignore
function ResourceWarning({ resKey, status }) {

  var text, color;

  switch (status) {
    case MIK.CAPACITY_STATUS.MAXED:
      text = "URGENT: We can't store any more <L>!!.<A>";
      color = "red";
      break;
    case MIK.CAPACITY_STATUS.ALMOST_MAXED:
      text = `We are at almost full capacity of <L>!<A>`;
      color = "yellow";
      break;
    case MIK.CAPACITY_STATUS.NEAR_MAX:
      text = `We are getting close to our <L> capacity.<A>`;
      color = "blue";
      break;
    default:
      return null;
  }

  return (
    <SummaryRow
      smaller
      Icon={RiEditCircleFill}
      label={RESOURCES.NAMES[resKey].PLURAL}
      text={text}
      amount=""
      color={color}
      customDirSty={STYLES.stat}
    />
  );
}

//prettier-ignore
function ResourceBox({ resKey, summary, customDirSty }) {
  const getActiveStyles = useIndicatedStyles(RESOURCE_INDICATORS, RESOURCE_DIRECTED_STYLES, { customDirSty });

  const { stored, capacity, production, status } = summary[resKey];
  const Icon = RESOURCE_ICON[resKey];

  const styles = getActiveStyles({ status });

  return (
    <div className={styles.ct}>
      <div className={styles.amountLine}>
        <Icon className={styles.icon} />
        <p className={styles.amounts}>
          {stored} {e(capacity) && <span className={styles.capacity}>/{capacity}</span>}
        </p>
      </div>
      {e(production) && <p className={styles.productionLine}>
        <span className={styles.production}>+{production}</span> per tempo
      </p>}
    </div>
  );
}

const RESOURCE_DIRECTED_STYLES = {
  ct: "w-28 border-1 rounded-md border-gray-400 py-2 text-xl || amx<border-yellow-500> mx<border-red-500>",
  amountLine: "flex justify-center items-center text-xl",
  icon: "mr-3 text-2xl",
  amounts: "text-gray-700",
  capacity: "text-base text-light || mx<text-red-500> amx,nmx<text-yellow-600>",
  productionLine: "text-center text-xs text-gray-700",
  production: "text-xl",
};

//prettier-ignore
const RESOURCE_INDICATORS = [
  { key: "nearMax", directive: "nmx", condition: p => p.status == MIK.CAPACITY_STATUS.NEAR_MAX },
  { key: "almostMaxed", directive: "amx", condition: p => p.status == MIK.CAPACITY_STATUS.ALMOST_MAXED }, 
  { key: "maxed", directive: "mx", condition: p => p.status == MIK.CAPACITY_STATUS.MAXED },
]

const RESOURCE_ICON = {
  [REK.NAMES.DLOGS]: GiTwoCoins,
  [REK.NAMES.FOOD]: GiWheat,
  [REK.NAMES.MATERIALS]: GiClayBrick,
};

export default ResourcesSection;
