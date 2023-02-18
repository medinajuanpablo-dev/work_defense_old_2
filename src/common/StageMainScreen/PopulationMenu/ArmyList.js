import React from "react";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { BsArrow90DegLeft } from "react-icons/bs";
import { CgEnter } from "react-icons/cg";
import { GiRibbonMedal, GiAxeSword, GiArmorVest } from "react-icons/gi";

import { useGeneralStateReader } from "@state/hooks";
import { TwoButtonsTopBar, LineTitle, Screen } from "@common/index";

import { MISC } from "@static/contexts/miscellaneous";

function ArmyList({ closeMenu, closeSubMenu }) {
  const gs = useGeneralStateReader("army");

  const [sortingBy, setSortingBy] = React.useState("number");
  const [descendingSort, setDescendingSort] = React.useState(false);

  //prettier-ignore
  const soldiersSummary = React.useMemo(() => {
    var ss = gs.army.freeZone.force.map((s) => getSoldierSummary(s, "free"));

    for (let z in gs.army.zonesDefense)
      ss = ss.concat(
        gs.army.zonesDefense[z].force.map((s) => getSoldierSummary(s, `def-${z}`))
      );

    for (let unitKey in gs.army.liberationUnits)
      ss = ss.concat(
        gs.army.liberationUnits[unitKey].force.map((s) =>
          getSoldierSummary(s, `unit-${gs.army.liberationUnits[unitKey].name}`)
        )
      );

    return ss;
  }, [gs.army]);

  //prettier-ignore
  const sortedSummary = React.useMemo(() => {
    return soldiersSummary.sort((s1, s2) => {
      switch (sortingBy) {
        case "number":
          return descendingSort ? s2.number - s1.number : s1.number - s2.number;
        case "level":
          return descendingSort ? s2.level - s1.level : s1.level - s2.level;
        case "armorRank":
          return descendingSort ? s2.armorRank - s1.armorRank : s1.armorRank - s2.armorRank;
        case "weaponRank":
          return descendingSort ? s2.weaponRank - s1.weaponRank : s1.weaponRank - s2.weaponRank;
        case "role":
          return descendingSort ? (s2.roleCode > s1.roleCode ? 1 : -1) : s1.roleCode > s2.roleCode ? 1 : -1;
        default:
          return 0;
      }
    });
  }, [soldiersSummary, sortingBy, descendingSort]);

  function changeSortingCriteria(sortKey) {
    if (sortingBy === sortKey) setDescendingSort(!descendingSort);
    else setSortingBy(sortKey);
  }

  const sortArrow = descendingSort ? (
    <RiArrowDropDownFill className={STYLES.sortArrow} />
  ) : (
    <RiArrowDropUpFill className={STYLES.sortArrow} />
  );

  return (
    <Screen className={STYLES.ct}>
      <TwoButtonsTopBar
        leftButton={{
          Icon: CgEnter,
          text: "Back to Stage",
          onClick: closeMenu,
        }}
        rightButton={{
          Icon: BsArrow90DegLeft,
          text: "To Summary",
          customStyles: { icon: "w-6 ml-2" },
          onClick: closeSubMenu,
        }}
      />

      <LineTitle margin="t-large">Army List</LineTitle>

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
          {sortedSummary.map((soldierSummary) => (
            <div key={soldierSummary.number} className={STYLES.row}>
              <p className={STYLES.numberCell}>{soldierSummary.number}</p>
              <p className={STYLES.cell}>{soldierSummary.level}</p>
              <p className={STYLES.cell}>{soldierSummary.weaponRank}</p>
              <p className={STYLES.cell}>{soldierSummary.armorRank}</p>
              <p className={STYLES.roleCell}>
                {buildRoleDescription(soldierSummary.roleCode)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

//prettier-ignore
const STYLES = {
  title: { ct: "mt-2" },
  exitButton: { button: "border-r-2 w-1/6" },
  exitButtonIcon: "mx-auto w-full h-full transform flip text-gray-100",
  
  tableCt: "select-none",

  allHeadersCt: "flex rounded-t-sm items-stretch text-gray-700 border-b-1 border-indigo-500 h-14",
  headerCt: "relative flex items-center justify-center hover:text-sky-600 ",

  numberHeaderCt: "w-10 mr-2 text-2xl ",
  headerIconCt: "flex-1 text-2xl",
  headerIcon: "w-full h-7", 
  roleHeaderCt: "w-46 text-light text-lg", 
  sortArrow: "absolute -bottom-2 left-0 w-full h-8 text-green-500",

  listCt: "flex flex-col h-screen-9/12 overflow-y-scroll mt-2 border-indigo-500",
  row: "flex text-gray-700 text-center items-center border-b-1 border-slate-300 py-3",
  numberCell: "w-10 mr-2 text-light text-base text-blue-500 ",
  cell: "flex-1 text-light text-lg",
  roleCell: "w-46 text-light text-sm",
};

function buildRoleDescription(roleCode) {
  if (roleCode == "free") return "Resting";

  const [doing, at] = roleCode.split("-");

  if (doing == "def") return `${MISC.ACTIVE_ZONES[at]} Zone`;

  if (doing == "unit") return `'${at}' Lib. Unit`;
}

/**@param {import("@static/values/army").SoldierState} soldier*/
function getSoldierSummary(soldier, roleCode) {
  return {
    number: soldier.number,
    level: soldier.ce.level,
    weaponRank: soldier.gear.weaponRank,
    armorRank: soldier.gear.armorRank,
    roleCode,
  };
}

export default ArmyList;
