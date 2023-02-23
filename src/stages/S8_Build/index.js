import React from "react";
import { GiClayBrick, GiTwoCoins, GiHammerNails } from "react-icons/gi";
import { mapValues } from "lodash";

import { StageMainScreen, ContinueButton, CuteCheckbox } from "@common/index";
import { useIndicatedStyles } from "@static/tailwind";
import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";
import { useObjectState } from "@static/react";

import { MIK } from "@static/contexts/miscellaneous";
import { BUILDINGS, BDK, buildingsOps } from "@static/contexts/buildings";
import { REK } from "@static/contexts/resources";

const RNK = REK.NAMES;

function BuildStage() {
  //prettier-ignore
  // const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES);
  const updateGS = useGeneralStateUpdator("buildings", "resources", "miscellaneous");
  const gs = useGeneralStateReader("buildings", "resources");

  const showing = useObjectState({ prevUpgrading: false });

  const tempState = useObjectState({
    buildings: mapValues(BUILDINGS.BY_BUILDING, () => false),
    resources: { [RNK.DLOGS]: 0, [RNK.MATERIALS]: 0 },
  });

  function setInitialValues() {
    tempState.replace((prev) => ({
      buildings: mapValues(
        prev.buildings,
        (_, buildingKey) => gs.buildings[buildingKey].upgrading
      ),
      resources: mapValues(
        prev.resources,
        (_, resKey) => gs.resources.stored[resKey]
      ),
    }));
  }

  React.useEffect(setInitialValues, []);

  function endStage() {
    //Save resources.
    Object.keys(tempState.get.resources).forEach((r) =>
      updateGS.resources.setResource(r, tempState.get.resources[r])
    );

    //Save buildings upgrading state.
    Object.keys(tempState.get.buildings).forEach((b) =>
      updateGS.buildings.setUpgrading(b, tempState.get.buildings[b])
    );

    updateGS.miscellaneous.stageForward();
  }

  function orderUpgrade(buildingKey, cost) {
    tempState.replace((prev) => {
      prev.buildings[buildingKey] = true;
      prev.resources[RNK.DLOGS] -= cost.dlogs;
      prev.resources[RNK.MATERIALS] -= cost.materials;

      return prev;
    });
  }

  const buildingsList = React.useMemo(() =>
    Object.values(BDK.NAMES).filter(
      (b) => showing.get.prevUpgrading || !gs.buildings[b].upgrading
    )
  );

  // const styles = getActiveStyles({});

  return (
    <StageMainScreen onUndo={setInitialValues} stageKey={MIK.STAGES.BUILD}>
      <p className={styles.stageName}>Build Stage</p>

      <div className={styles.resources}>
        <p className={styles.materials}>
          <GiClayBrick className={styles.materialsIcon} />
          {tempState.get.resources[RNK.MATERIALS]}
        </p>
        <p className={styles.dlogs}>
          <GiTwoCoins className={styles.dlogsIcon} />
          {tempState.get.resources[RNK.DLOGS]}
        </p>
      </div>

      <div className={styles.filters}>
        <p className={styles.filtersTitle}>Show...</p>

        <CuteCheckbox
          onChange={(c) => showing.merge({ prevUpgrading: c })}
          customDirSty={FILTER_DIRSTY}
          label="Previously Upgrading"
        />
      </div>

      <div className={styles.buildingsList}>
        {buildingsList.map((buildingKey) => (
          <Building
            key={buildingKey}
            buildingKey={buildingKey}
            level={gs.buildings[buildingKey].level}
            upgrading={tempState.get.buildings[buildingKey]}
            orderUpgrade={orderUpgrade}
            availableResources={tempState.get.resources}
            showing={showing.get}
          />
        ))}
      </div>

      <ContinueButton onClick={endStage} />
    </StageMainScreen>
  );
}

//prettier-ignore
const styles = {
  stageName: "text-center text-xl text-slate-700 text-light pb-1 border-slate-400 border-b-1 w-9/12 mx-auto",

  resources: "mt-8 flex justify-center",
  materials: "w-4/12 mx-2 flex items-center justify-center text-slate-700 border-1 border-slate-400 py-2 text-xl rounded-md",
  materialsIcon: "text-3xl mr-3",
  dlogs: "w-4/12 mx-2 flex items-center justify-center border-1 text-yellow-600 border-yellow-500 py-2 text-xl rounded-md",
  dlogsIcon: "text-3xl mr-3 text-yellow-500",

  filters: "mt-10 flex relative justify-center items-center border-y-1 border-indigo-300 pb-3 pt-4",
  filtersTitle: "absolute -top-2 tracking-wide text-indigo-500 text-xs px-2 bg-slate-100",

  buildingsList: "mt-2",
};

const FILTER_DIRSTY = { ct: "mx-3", label: "text-sm" };

// const INDICATORS = [];

function Building({
  buildingKey,
  level,
  upgrading,
  orderUpgrade,
  availableResources,
}) {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(BUILDING_INDICATORS, BUILDING_DIR_STY);

  const values = BUILDINGS.BY_BUILDING[buildingKey];
  const cost = buildingsOps.upgradeCost(buildingKey, level);

  const affordable = [RNK.DLOGS, RNK.MATERIALS].every(
    (r) => availableResources[r] >= cost[r]
  );

  var status = "Can be upgraded.";
  if (upgrading) status = "Currently working.";
  else if (!affordable) status = "Not affordable.";

  function onUpgradeClick() {
    if (!upgrading && affordable) orderUpgrade(buildingKey, cost);
  }

  const styles = getActiveStyles({ upgrading, affordable });

  return (
    <div className={styles.ct}>
      <div className={styles.left}>
        <p className={styles.name}>
          {values.NAME} [{level}]
        </p>
        <p className={styles.status}>{status}</p>
      </div>
      <div className={styles.right}>
        {!upgrading && (
          <div className={styles.cost}>
            <p className={styles.materials}>
              <GiClayBrick className={styles.materialsIcon} />
              {cost.materials}
            </p>
            <p className={styles.dlogs}>
              <GiTwoCoins className={styles.dlogsIcon} />
              {cost.dlogs}
            </p>
          </div>
        )}

        <button
          onClick={onUpgradeClick}
          disabled={upgrading}
          className={styles.button}
        >
          <GiHammerNails className={styles.buttonIcon} />{" "}
          {upgrading ? "Upgrading..." : "Upgrade"}
        </button>
      </div>
    </div>
  );
}

//prettier-ignore
const BUILDING_DIR_STY = {
  ct: "border-b-1 border-slate-300 pt-4 pb-6 flex text-light",
  left: "grow flex flex-col justify-around",
  name: "text-default text-lg text-sky-700 || naf<text-slate-400> ug<text-emerald-700'text-opacity-80>",
  status: "text-sm text-slate-500 mt-1 || naf<text-slate-400> ug<text-emerald-700'text-opacity-80>",
  right: "shrink-0 w-9/24 flex flex-col items-center justify-center",
  cost: "flex justify-center mb-1",
  materials: "flex text-slate-700 items-center mr-2",
  materialsIcon: "mr-1 text-slate-500 ",
  dlogs: "flex text-yellow-600 items-center",
  dlogsIcon: "mr-1 text-yellow-500",
  button: "py-1 px-4 text-sm text-indigo-600 border-1 border-indigo-300 rounded-md flex justify-center items-center || naf<text-slate-400'border-slate-300> ug<text-emerald-700'text-opacity-80'border-emerald-500'border-opacity-50>",
  buttonIcon: "text-lg mr-2",
};

//prettier-ignore
const BUILDING_INDICATORS = [
  { key: "upgrading", directive: "ug", condition: (p) => p.upgrading },
  { key: "notAffordable", directive: "naf", condition: (p) => !p.upgrading && !p.affordable },
];

export default BuildStage;
