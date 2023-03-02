import React from "react";
import { cloneDeep } from "lodash";
import { BiArrowBack } from "react-icons/bi";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { GiRibbonMedal, GiAxeSword, GiArmorVest } from "react-icons/gi";

import { useGeneralStateReader } from "@state/hooks";
import { CuteButton } from "@common/index";

import { armyOps } from "@static/contexts/army";

function UpdatedArmyPreview({ recruitsLevels, closePreview }) {
  const gs = useGeneralStateReader("army");

  const [sortingBy, setSortingBy] = React.useState("number");
  const [descendingSort, setDescendingSort] = React.useState(false);

  //prettier-ignore
  const allArmy = React.useMemo(() => {
    var newArmy = cloneDeep(gs.army);
    for (let level in recruitsLevels)
      newArmy.freeZone.force.push(
        ...Array(recruitsLevels[level]).fill(0).map(() => armyOps.createSoldier({ level }))
      );    

    return armyOps.getAllArmyForce(newArmy);
  }, [gs.army]);
  //prettier-ignore
  const sortedArmy = React.useMemo(() => [...allArmy].sort((s1, s2) => {
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
  }), [allArmy, sortingBy, descendingSort]);

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
    <>
      <CuteButton
        stylesBehavior="always-filled"
        customDirSty={STYLES.back}
        color="indigo"
        Icon={BiArrowBack}
        onClick={closePreview}
      >
        Go Back
      </CuteButton>

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
          {sortedArmy.map((soldier, index) => (
            <div key={index} className={STYLES.row}>
              <p className={STYLES.numberCell}>{soldier.number || "New"}</p>
              <p className={STYLES.cell}>{soldier.ce.level}</p>
              <p className={STYLES.cell}>{soldier.gear.weaponRank}</p>
              <p className={STYLES.cell}>{soldier.gear.armorRank}</p>
              <p className={STYLES.roleCell}>
                {armyOps.buildRoleDescription(soldier.roleCode)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

//prettier-ignore
const STYLES = {
  back: { button: "mb-4 mt-6" },
  tableCt: "select-none",

  allHeadersCt: "flex rounded-t-sm items-stretch text-gray-700 h-14 px-2",
  headerCt: "relative flex items-center justify-center hover:text-sky-600 ",

  numberHeaderCt: "w-10 mr-2 text-2xl ",
  headerIconCt: "flex-1 text-2xl",
  headerIcon: "w-full h-7", 
  roleHeaderCt: "w-42 text-light text-lg", 
  sortArrow: "absolute -bottom-2 left-0 w-full h-8 text-green-500",

  listCt: "flex flex-col h-screen-9/12 overflow-y-scroll border-indigo-400 border-1 rounded-md px-2",
  row: "flex text-gray-700 text-center items-center border-b-1 border-slate-300 py-3",
  numberCell: "w-10 mr-2 text-light text-base text-blue-500 ",
  cell: "flex-1 text-light text-lg",
  roleCell: "w-42 text-light text-sm",
};

export default UpdatedArmyPreview;
