import React from "react";
import { cloneDeep } from "lodash";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { GiRibbonMedal, GiAxeSword, GiArmorVest } from "react-icons/gi";
import { BsInfoCircle } from "react-icons/bs";

import { StageMainScreen, ContinueButton, CuteModal } from "@common/index";
import { useArrayState, useObjectState } from "@static/react";
import { useGeneralStateUpdator, useGeneralStateReader } from "@state/hooks";

import { MIK } from "@static/contexts/miscellaneous";
import { armyOps } from "@static/contexts/army";

import EquippingModal from "./EquippingModal";

function EquipmentStage() {
  const updateGS = useGeneralStateUpdator("army", "equipment", "miscellaneous");
  const gs = useGeneralStateReader("army", "equipment");

  const [sortingBy, setSortingBy] = React.useState("number");
  const [descendingSort, setDescendingSort] = React.useState(false);
  const equipping = useObjectState({ soldierIndex: undefined, opened: false });
  const changedIndexes = useArrayState([]);

  const tempState = useObjectState({ allArmy: [], storedEquipment: {} });

  function setInitialValues() {
    tempState.replace({
      allArmy: armyOps.getAllArmyForce(gs.army),
      storedEquipment: cloneDeep(gs.equipment.stored),
    });
    changedIndexes.wholeArray.replace([]);
  }

  function endStage() {
    updateGS.army.setSoldiers(tempState.get.allArmy);
    updateGS.equipment.setAllStored(tempState.get.storedEquipment);

    updateGS.miscellaneous.stageForward();
  }

  React.useEffect(setInitialValues, []);

  function changeSortingCriteria(sortKey) {
    if (sortingBy === sortKey) setDescendingSort(!descendingSort);
    else setSortingBy(sortKey);
  }

  function openEquipping(soldierIndex) {
    equipping.merge({ soldierIndex, opened: true });
  }
  function closeEquipping() {
    equipping.merge({ opened: false });
  }

  //prettier-ignore
  function equipSoldier(eqKey, rank) {
    tempState.replace((prev) => {
      const equippingSoldier = prev.allArmy[equipping.get.soldierIndex];
      const gearKey = `${eqKey}Rank`; //For equipment "weapon", the gear equivalent is "weaponRank".
      const storedSpecific = prev.storedEquipment[eqKey];

      storedSpecific[equippingSoldier.gear[gearKey]] = (storedSpecific[equippingSoldier.gear[gearKey]] || 0) + 1; //Save the current gear of the soldier as stored equipment.

      if(storedSpecific[rank] > 0) storedSpecific[rank] -= 1; //Remove the selected equipment from storage.

      equippingSoldier.gear[gearKey] = Number.parseInt(rank); //Set selected equipment to selected soldier gear. (The rank is a string, convert it to number)

      return prev;
    });

    changedIndexes.perItem.push(equipping.get.soldierIndex); //Save the soldier index as changed.
  }

  //Save the original index because it's lost when sorting.
  const indexedSoldiers = React.useMemo(
    () =>
      tempState.get.allArmy.map((s, index) => ({ ...s, soldierIndex: index })),
    [tempState.get.allArmy]
  );

  //prettier-ignore
  const sortedSoldiers = React.useMemo(() => {   
    return indexedSoldiers.sort((s1, s2) => {
      switch (sortingBy) {
        case "number":
          return descendingSort ? s2.number - s1.number : s1.number - s2.number;
        case "level":
          return descendingSort ? s2.ce.level - s1.ce.level : s1.ce.level - s2.ce.level;
        case "armorRank":
          return descendingSort ? s2.gear.armorRank - s1.gear.armorRank : s1.gear.armorRank - s2.gear.armorRank;
        case "weaponRank":
          return descendingSort ? s2.gear.weaponRank - s1.gear.weaponRank : s1.gear.weaponRank - s2.gear.weaponRank;
        case "role":
          return descendingSort ? (s2.roleCode > s1.roleCode ? 1 : -1) : s1.roleCode > s2.roleCode ? 1 : -1;
        default:
          return 0;
      }
    });
  }, [tempState.get.allArmy, sortingBy, descendingSort]);

  const sortArrow = descendingSort ? (
    <RiArrowDropDownFill className={STYLES.sortArrow} />
  ) : (
    <RiArrowDropUpFill className={STYLES.sortArrow} />
  );

  return (
    <StageMainScreen onUndo={setInitialValues} stageKey={MIK.STAGES.EQUIPMENT}>
      <p className={STYLES.stageName}>Equipment Stage</p>

      <div className={STYLES.tableCt}>
        <div className={STYLES.allHeadersCt}>
          <button
            onClick={() => changeSortingCriteria("number")}
            className={STYLES.headerCt + STYLES.numberHeaderCt}
          >
            <p>#</p>
            {sortingBy == "number" && sortArrow}
          </button>

          <button
            onClick={() => changeSortingCriteria("level")}
            className={STYLES.headerCt + STYLES.headerIconCt}
          >
            <GiRibbonMedal className={STYLES.headerIcon} />
            {sortingBy == "level" && sortArrow}
          </button>
          <button
            onClick={() => changeSortingCriteria("weaponRank")}
            className={STYLES.headerCt + STYLES.headerIconCt}
          >
            <GiAxeSword className={STYLES.headerIcon} />
            {sortingBy == "weaponRank" && sortArrow}
          </button>
          <button
            onClick={() => changeSortingCriteria("armorRank")}
            className={STYLES.headerCt + STYLES.headerIconCt}
          >
            <GiArmorVest className={STYLES.headerIcon} />
            {sortingBy == "armorRank" && sortArrow}
          </button>

          <button
            onClick={() => changeSortingCriteria("role")}
            className={STYLES.headerCt + STYLES.roleHeaderCt}
          >
            <p>Current Role</p>
            {sortingBy == "role" && sortArrow}
          </button>
        </div>

        <div className={STYLES.listCt}>
          {sortedSoldiers.map((s) => (
            <div
              onClick={() => openEquipping(s.soldierIndex)}
              key={s.number}
              className={
                STYLES.row +
                (changedIndexes.get.includes(s.soldierIndex)
                  ? changedIndexes.get.at(-1) == s.soldierIndex
                    ? STYLES.lastChangedRow
                    : STYLES.changedRow
                  : "")
              }
            >
              <p className={STYLES.numberCell}>{s.number}</p>
              <p className={STYLES.cell}>{s.ce.level}</p>
              <p className={STYLES.cell}>{s.gear.weaponRank}</p>
              <p className={STYLES.cell}>{s.gear.armorRank}</p>
              <p className={STYLES.roleCell}>
                {armyOps.buildRoleDescription(s.roleCode)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className={STYLES.instruction}>
        <BsInfoCircle className={STYLES.instructionIcon} /> Click a Soldier Row
        to equip it. <br /> Changed soldiers are marked blue and the last
        changed soldier is marked green.
      </p>

      <CuteModal
        visible={equipping.get.opened}
        onClose={(f) => f && closeEquipping()}
      >
        <EquippingModal
          onClose={closeEquipping}
          storedEquipment={tempState.get.storedEquipment}
          onSelectGear={equipSoldier}
          {...tempState.get.allArmy[equipping.get.soldierIndex]}
        />
      </CuteModal>

      <ContinueButton onClick={endStage} />
    </StageMainScreen>
  );
}

//prettier-ignore
const STYLES = {
  stageName: "text-center text-xl text-slate-700 text-light pb-1 border-slate-400 border-b-1 w-9/12 mx-auto",
  instruction: "flex justify-center items-center text-light text-sm px-2 text-slate-500 border-1 border-slate-300 py-3 mt-6 rounded-md",
  instructionIcon: "mr-3 text-2xl shrink-0",
  
  tableCt: "select-none mt-2",

  allHeadersCt: "flex rounded-t-sm items-stretch text-gray-700 h-14",
  headerCt: "relative flex items-center justify-center hover:text-sky-600 ",

  numberHeaderCt: "w-10 mr-2 text-2xl ",
  headerIconCt: "flex-1 text-2xl",
  headerIcon: "w-full h-7", 
  roleHeaderCt: "w-46 text-light text-lg", 
  sortArrow: "absolute -bottom-2 left-0 w-full h-8 text-green-500",

  listCt: "flex flex-col rounded-md h-screen-8/12 overflow-y-scroll border-indigo-400 border-1",
  row: "flex text-gray-700 text-center items-center border-b-1 border-slate-300 py-3 cursor-pointer hover:bg-slate-200",
  numberCell: "w-10 mr-2 text-light text-base text-blue-500 ",
  cell: "flex-1 text-light text-lg",
  roleCell: "w-46 text-light text-sm",

  changedRow: " bg-indigo-100 hover:bg-indigo-200",
  lastChangedRow: " bg-emerald-100 hover:bg-emerald-200",
};

export default EquipmentStage;
