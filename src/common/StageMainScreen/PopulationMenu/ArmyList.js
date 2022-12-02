import React from "react";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { BsArrow90DegLeft } from "react-icons/bs";
import { CgEnter } from "react-icons/cg";
import { GiMedal, GiBroadsword, GiChestArmor } from "react-icons/gi";

import { useGeneralStateReader } from "@state/hooks";
import { TwoButtonsTopBar, LineTitle } from "@common/index";

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
          return descendingSort ? s2.roleId - s1.roleId : s1.roleId - s2.roleId;
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
    <div className={STYLES.ct}>
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

      <LineTitle>All Army List</LineTitle>

      <div className={STYLES.tableCt}>
        <div className={STYLES.allHeadersCt}>
          <div
            onClick={() => changeSortingCriteria("number")}
            className={STYLES.headerCt + STYLES.numberHeaderCt}
          >
            <p>#</p>
            {sortingBy == "number" && sortArrow}
          </div>

          <div
            onClick={() => changeSortingCriteria("level")}
            className={STYLES.headerCt + STYLES.headerIconCt}
          >
            <GiMedal className={STYLES.headerIcon} />
            {sortingBy == "level" && sortArrow}
          </div>
          <div
            onClick={() => changeSortingCriteria("weaponRank")}
            className={STYLES.headerCt + STYLES.headerIconCt}
          >
            <GiBroadsword className={STYLES.headerIcon} />
            {sortingBy == "weaponRank" && sortArrow}
          </div>
          <div
            onClick={() => changeSortingCriteria("armorRank")}
            className={STYLES.headerCt + STYLES.headerIconCt}
          >
            <GiChestArmor className={STYLES.headerIcon} />
            {sortingBy == "armorRank" && sortArrow}
          </div>

          <div
            onClick={() => changeSortingCriteria("role")}
            className={STYLES.headerCt + STYLES.roleHeaderCt}
          >
            <p>Role</p>
            {sortingBy == "role" && sortArrow}
          </div>
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
    </div>
  );
}

//prettier-ignore
const STYLES = {
  title: { ct: "mt-2" },
  exitButton: { button: "border-r-2 w-1/6" },
  exitButtonIcon: "mx-auto w-full h-full transform flip text-gray-100",
  
  tableCt: "flex-1 select-none mt-4",

  allHeadersCt: "flex rounded-t-md items-stretch text-gray-800 border-2 border-indigo-500 h-14",
  headerCt: "relative flex items-center justify-center cursor-pointer hover:text-blue-500 ",

  numberHeaderCt: "w-10 mr-2 text-2xl border-r-2 border-indigo-500",
  headerIconCt: "flex-1 text-2xl",
  headerIcon: "w-full h-7", 
  roleHeaderCt: "w-52 text-light text-lg", 
  sortArrow: "absolute -bottom-2 left-0 w-full h-8 text-green-500",

  listCt: "flex flex-col h-screen-2/3 overflow-y-scroll mt-2 border-2 border-indigo-500",
  row: "flex text-gray-700 text-center items-center",
  numberCell: "w-10 mr-2 text-light text-base text-blue-500 py-2 border-r-2 border-indigo-500",
  cell: "flex-1 text-light text-lg",
  roleCell: "w-52 text-light text-sm pr-2",
};

function buildRoleDescription(roleCode) {
  if (roleCode == "free") return "Resting.";

  const [doing, at] = roleCode.split("-");

  if (doing == "def") return `Def. ${MISC.ACTIVE_ZONES[at]} Zone.`;

  if (doing == "unit") return `'${at}' Unit Member.`;
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
