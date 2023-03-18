import React from "react";
import {
  GiClayBrick,
  GiTwoCoins,
  GiAnvilImpact,
  GiAxeSword,
  GiArmorVest,
} from "react-icons/gi";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { MdOutlineArrowDropDown } from "react-icons/md";

import { StageMainScreen, ContinueButton } from "@common/index";
import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";
import { useObjectState } from "@static/react";
import { filterAndKeep, sumProperties } from "@static/functions";
import { useIndicatedStyles } from "@static/tailwind";

import { MIK } from "@static/contexts/miscellaneous";
import { EQUIPMENT, equipmentOps, EQK } from "@static/contexts/equipment";
import { BDK } from "@static/contexts/buildings";
import { REK } from "@static/contexts/resources";

const ETK = EQK.TYPES;
const BNK = BDK.NAMES;
const RNK = REK.NAMES;

function FabricationStage() {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES);

  const updateGS = useGeneralStateUpdator(
    "miscellaneous",
    "resources",
    "equipment"
  );
  const gs = useGeneralStateReader(
    "equipment",
    `buildings.${BNK.WEAPONSMITH}`,
    `buildings.${BNK.ARMORSMITH}`,
    "resources"
  );

  const craftingCapacity = useObjectState({ [ETK.WEAPON]: 0, [ETK.ARMOR]: 0 });
  const [mode, setMode] = React.useState(ETK.WEAPON);
  const [showNotAffordable, setShowNotAffordable] = React.useState(false);

  const tempState = useObjectState({
    orders: { [ETK.WEAPON]: {}, [ETK.ARMOR]: {} },
    resources: gs.resources.stored,
  });

  function setInitialValues() {
    tempState.replace((prev) => {
      for (let { number } of RANKS_VALUES) {
        prev.orders[ETK.WEAPON][number] = 0;
        prev.orders[ETK.ARMOR][number] = 0;
      }
      prev.resources = gs.resources.stored;
      return prev;
    });
    craftingCapacity.replace({ [ETK.WEAPON]: 0, [ETK.ARMOR]: 0 });
    setShowNotAffordable(false);
  }

  React.useEffect(setInitialValues, []);

  function endStage() {
    updateGS.equipment.setAllOrders(tempState.get.orders);
    for (let r in tempState.get.resources)
      updateGS.resources.setResource(r, tempState.get.resources[r]);

    updateGS.miscellaneous.stageForward();
  }

  function changeMode() {
    setMode((prev) => (prev == ETK.WEAPON ? ETK.ARMOR : ETK.WEAPON));
  }

  function orderCrafting(rankValues) {
    tempState.replace((prev) => {
      prev.orders[mode][rankValues.number] += 1;
      for (let r in rankValues.cost) prev.resources[r] -= rankValues.cost[r];
      return prev;
    });
    craftingCapacity.replace((prev) => {
      prev[mode] += rankValues.requiredCC;
      return prev;
    });
  }

  //Values for the current mode (mv = mode values).
  const mv = React.useMemo(
    () =>
      mode == ETK.WEAPON
        ? {
            SwitchIcon: GiArmorVest,
            switch: "Armor",
            ModeIcon: GiAxeSword,
            title: "Weapons",
            crafterName: "Weaponsmith",
            crafterBuilding: BNK.WEAPONSMITH,
            currentCC: craftingCapacity.get[ETK.WEAPON],
            maxCC: equipmentOps.maximumCraftingCapacity(
              gs.buildings[BNK.WEAPONSMITH].level
            ),
          }
        : {
            SwitchIcon: GiAxeSword,
            switch: "Weapons",
            ModeIcon: GiArmorVest,
            title: "Armor",
            crafterName: "Armorsmith",
            crafterBuilding: BNK.ARMORSMITH,
            currentCC: craftingCapacity.get[ETK.ARMOR],
            maxCC: equipmentOps.maximumCraftingCapacity(
              gs.buildings[BNK.ARMORSMITH].level
            ),
          },
    [mode, craftingCapacity.get, gs.buildings]
  );

  const ccPercentage = (mv.currentCC / mv.maxCC) * 100;

  //Map all rank values to include if they're affordable and crafteable.
  const ranksValues = React.useMemo(
    () =>
      RANKS_VALUES.map((rank) => ({
        ...rank,
        affordable: Object.keys(rank.cost).every(
          (r) => tempState.get.resources[r] >= rank.cost[r]
        ),
        crafteable: mv.currentCC + rank.requiredCC <= mv.maxCC,
      })),
    [tempState.get.resources, mv.currentCC, mv.maxCC]
  );

  //Filter ranks that are affordable and crafteable, or have one order at least.
  const { passed: affordableOrOrderedRanks, filtered } = filterAndKeep(
    ranksValues,
    (rank) =>
      tempState.get.orders[mode][rank.number] > 0 ||
      (rank.affordable && rank.crafteable)
  );

  var summary = {
    weapons: sumProperties(tempState.get.orders[ETK.WEAPON]),
    armor: sumProperties(tempState.get.orders[ETK.ARMOR]),
    get total() {
      return this.weapons + this.armor;
    },
  };

  const styles = getActiveStyles({ ccPercentage });

  return (
    <StageMainScreen
      onUndo={setInitialValues}
      stageKey={MIK.STAGES.FABRICATION}
    >
      <p className={styles.stageName}>Fabrication Stage</p>

      <button onClick={changeMode} className={styles.switch}>
        <HiOutlineSwitchHorizontal className={styles.switchIcon1} />{" "}
        <mv.SwitchIcon className={styles.switchIcon2} /> Switch to {mv.switch}
      </button>

      <p className={styles.title}>
        <mv.ModeIcon className={styles.titleIcon} /> Order {mv.title}
      </p>

      <div className={styles.resources}>
        <p className={styles.materials}>
          <GiClayBrick className={styles.materialsIcon} />
          {tempState.get.resources[RNK.MATERIALS].toFixed(0)}
        </p>
        <p className={styles.dlogs}>
          <GiTwoCoins className={styles.dlogsIcon} />
          {tempState.get.resources[RNK.DLOGS].toFixed(0)}
        </p>
      </div>

      <div className={styles.cc}>
        <p className={styles.ccLabel}>
          {mv.crafterName} Crafting Capacity (CC)
        </p>
        <div className={styles.ccEmpty}>
          <div
            style={{ width: `${ccPercentage}%` }}
            className={styles.ccFill}
          />
        </div>
        <p className={styles.ccAmount}>
          {mv.currentCC} / {mv.maxCC}
        </p>
      </div>

      {affordableOrOrderedRanks.map((rankValues) => (
        <Rank
          key={rankValues.number}
          {...rankValues}
          stored={gs.equipment.stored.weapon[rankValues.number]}
          ordered={tempState.get.orders[mode][rankValues.number]}
          onCraft={() => orderCrafting(rankValues)}
        />
      ))}

      {filtered.length > 0 && (
        <button
          onClick={() => setShowNotAffordable((prev) => !prev)}
          className={styles.seeMore}
        >
          {showNotAffordable ? "Hide" : "See"} unavailable and not ordered ranks{" "}
          <MdOutlineArrowDropDown className={styles.seeMoreIcon} />
        </button>
      )}

      {showNotAffordable &&
        filtered.map((rankValues) => (
          <Rank
            key={rankValues.number}
            {...rankValues}
            stored={gs.equipment.stored.weapon[rankValues.number]}
            ordered={tempState.get.orders[mode][rankValues.number]}
            onCraft={() => orderCrafting(rankValues)}
          />
        ))}

      <ContinueButton
        subMessage={
          summary.total > 0
            ? `The crafting of the ordered equipment of both types will start immediately. In total, ${summary.weapons} weapons and ${summary.armor} pieces of armor were ordered.`
            : "Nothing was ordered and no crafting will be started."
        }
        onClick={endStage}
      />
    </StageMainScreen>
  );
}

//prettier-ignore
const DIRECTED_STYLES = {
  stageName: "text-center text-xl text-slate-700 text-light pb-1 border-slate-400 border-b-1 w-9/12 mx-auto",

  resources: "mt-6 flex justify-center",
  materials: "w-4/12 mx-2 flex items-center justify-center text-slate-700 border-1 border-slate-400 py-2 text-xl rounded-md",
  materialsIcon: "text-3xl mr-3",
  dlogs: "w-4/12 mx-2 flex items-center justify-center border-1 text-yellow-600 border-yellow-500 py-2 text-xl rounded-md",
  dlogsIcon: "text-3xl mr-3 text-yellow-500",

  switch: "flex justify-center items-center bg-indigo-500 border-1 text-slate-100 w-9/12 mx-auto mt-6 py-2 rounded-md",
  switchIcon1: "text-2xl mr-1 ",
  switchIcon2: "text-2xl mr-3 ",

  title: "flex justify-center items-center mt-6 text-center text-xl text-slate-600 w-8/12 mx-auto",
  titleIcon: "mr-2 text-3xl",

  cc: "relative flex justify-center items-center mt-8 mb-8 border-1 border-slate-300 pt-3 pb-2 px-4 || mcc<border-orange-300> fcc<border-red-300>",
  ccLabel: "absolute left-2 -top-3 text-sm text-slate-500 px-2 bg-slate-100 text-light",
  ccEmpty: "flex grow rounded-full h-3 border-sky-500 border-opacity-50 border-1 || mcc<border-orange-500> fcc<border-red-500>",
  ccFill: "h-full bg-sky-500 bg-opacity-50 rounded-full || mcc<bg-orange-500> fcc<bg-red-500>",
  ccAmount: "w-3/12 shrink-0 text-lg text-sky-600 text-right || mcc<text-orange-500> fcc<text-red-500>",

  seeMore: "flex justify-center items-center mt-4 mb-8 text-light text-indigo-500",
  seeMoreIcon: "text-2xl mb-1px",
};

const INDICATORS = [
  { key: "mostCC", directive: "mcc", condition: (p) => p.ccPercentage >= 70 },
  { key: "fullCC", directive: "fcc", condition: (p) => p.ccPercentage >= 100 },
];

const RANKS_VALUES = Array(EQUIPMENT.MAX_RANK)
  .fill(0)
  .map((_, index) => {
    const rank = index + 1;
    const { cost, cc } = equipmentOps.craftRequirements(rank, 1);
    return { number: rank, cost, requiredCC: cc };
  });

function Rank({
  number,
  cost,
  requiredCC,
  affordable,
  crafteable,
  stored,
  ordered,
  onCraft,
}) {
  const getActiveStyles = useIndicatedStyles(RANK_INDICATORS, RANK_DIR_STY);

  var unavailable;
  if (!affordable) {
    if (ordered > 0) unavailable = "Can't afford more.";
    else unavailable = "Not affordable";
  } else if (!crafteable) {
    if (ordered > 0) unavailable = "Can't craft more.";
    else unavailable = "Not crafteable";
  }

  const styles = getActiveStyles({ unavailable });

  return (
    <div className={styles.ct}>
      <div className={styles.details}>
        <div className={styles.top}>
          <p className={styles.rank}>
            Rank <span className={styles.rankNumber}>{number}</span>
          </p>
          <p className={styles.stored}>
            <span className={styles.storedAmount}>{stored}</span> in storage
          </p>
        </div>
        <div className={styles.cost}>
          <p className={styles.costLabel}>Cost: </p>
          <p className={styles.materials}>
            <GiClayBrick className={styles.materialsIcon} />{" "}
            {cost.materials.toFixed(1)}
          </p>
          <p className={styles.dlogs}>
            <GiTwoCoins className={styles.dlogsIcon} /> {cost.dlogs.toFixed(1)}
          </p>
          <p className={styles.cc}>
            <span className={styles.ccIcon}>CC</span> {requiredCC}
          </p>
        </div>
      </div>

      <div className={styles.craft}>
        <div className={styles.craftTop}>
          <button
            disabled={unavailable}
            onClick={() => !unavailable && onCraft()}
            className={styles.button}
          >
            <GiAnvilImpact className={styles.buttonIcon} /> Craft
          </button>
          <p className={styles.crafting}>{ordered}</p>
        </div>
        {unavailable && <p className={styles.unavailable}>{unavailable}</p>}
      </div>
    </div>
  );
}

//prettier-ignore
const RANK_DIR_STY = {
  ct: "flex mb-4 items-center",

  details: "grow mr-1",
  top: "flex",
  rank: "w-6/12 shrink-0 text-center border-1 border-yellow-600 border-opacity-80 text-yellow-600 py-6px rounded-tl-md || unv<text-slate-500'border-slate-400>",
  rankNumber: "text-lg ml-1",
  stored: "grow pt-2 text-center border-y-1 border-r-1 border-slate-300 text-slate-500 text-light text-sm rounded-tr-md",
  storedAmount: "text-base text-default text-slate-700 mr-1",
  cost: "flex justify-center py-6px border-x-1 border-b-1 border-slate-300 rounded-b-md",
  costLabel: "mr-4 text-sm text-slate-500 mt-2px",
  materials: "flex justify-center items-center mr-1 text-slate-600",
  materialsIcon: "mr-1 text-xl mb-1px",
  dlogs: "flex justify-center items-center text-yellow-600 mx-1",
  dlogsIcon: "mr-1 text-xl mb-1px",
  cc: "flex justify-center items-center mr-1 text-sky-600 ml-1",
  ccIcon: "mr-1 text-sm",

  craft: "w-4/12 shrink-0 flex flex-col ml-1",
  craftTop: "flex",
  button: "grow flex justify-center items-center bg-indigo-500 text-slate-100 rounded-l-md || unv<bg-slate-400>",
  buttonIcon: "mr-1 text-xl mb-1",
  crafting: "py-2 w-7/24 shrink-0 text-center border-1 text-indigo-700 text-lg border-slate-300 rounded-r-md",
  unavailable: "mt-1 text-xs text-slate-500 text-center text-light",
};

const RANK_INDICATORS = [
  { key: "unavailable", directive: "unv", condition: (p) => !!p.unavailable },
];

export default FabricationStage;
