import React from "react";
import { RiEditCircleFill } from "react-icons/ri";
import { GiBroadsword, GiChestArmor } from "react-icons/gi";

import { useIndicatedStyles } from "@static/tailwind";
import { SummaryRow, LineTitle, CuteButton } from "@common/index";
import { useGeneralStateReader } from "@state/hooks";
import { sumProperties } from "@static/functions";

import { EQK, equipmentOps } from "@static/contexts/equipment";
import { BDK } from "@static/contexts/buildings";
import { miscOps, MIK } from "@static/contexts/miscellaneous";

const { WEAPON: W, ARMOR: A } = EQK.TYPES;

function EquipmentSection({ openSubMenu }) {
  const gs = useGeneralStateReader(
    "equipment",
    `buildings.${BDK.NAMES.ARSENAL}`
  );

  const summary = React.useMemo(() => {
    var summary = {
      [W]: {
        stored: sumProperties(gs.equipment.stored[W]),
        ranksSum: equipmentOps.ranksSum(gs.equipment.stored[W]),
      },
      [A]: {
        stored: sumProperties(gs.equipment.stored[A]),
        ranksSum: equipmentOps.ranksSum(gs.equipment.stored[A]),
      },
    };

    const arsenalLevel = gs.buildings[BDK.NAMES.ARSENAL].level;

    summary.totalStored = summary[W].stored + summary[A].stored;
    summary.capacity = equipmentOps.storageCapacity(arsenalLevel);

    //prettier-ignore
    summary.capacityStatus = miscOps.capacityStatus(summary.totalStored, summary.capacity);

    return summary;
  }, [gs.equipment, gs.buildings]);

  return (
    <>
      <LineTitle>Equipment Summary</LineTitle>

      <CapacityBox summary={summary} />

      <div className={STYLES.columnsCt}>
        <div className={STYLES.leftColumn}>
          <div className={STYLES.columnTitle}>
            <GiBroadsword className={STYLES.titleIcon} />
            <p className={STYLES.titleText}>Weapons</p>
          </div>
          <div className={STYLES.columnStatsCt}>
            <SummaryRow
              size="smaller"
              Icon={RiEditCircleFill}
              text="<L>Stored: <A>"
              label=""
              amount={summary[EQK.TYPES.WEAPON].stored}
              color="blue"
              customDirSty={STYLES.stat}
            />
            <SummaryRow
              size="smaller"
              Icon={RiEditCircleFill}
              text="<L>Ranks Sum: <A>"
              label=""
              amount={summary[EQK.TYPES.WEAPON].ranksSum}
              color="blue"
              customDirSty={STYLES.stat}
            />
          </div>
          <CuteButton
            stylesBehavior="always-filled"
            color="indigo"
            colorStrength="lighter"
            size="smaller"
            onClick={() => openSubMenu(`storedAndOrders-${EQK.TYPES.WEAPON}`)}
            customDirSty={{ button: "mt-6" }}
          >
            Stored / Orders
          </CuteButton>
        </div>

        <div className={STYLES.rightColumn}>
          <div className={STYLES.columnTitle}>
            <GiChestArmor className={STYLES.titleIcon} />
            <p className={STYLES.titleText}>Armor</p>
          </div>
          <div className={STYLES.columnStatsCt}>
            <SummaryRow
              size="smaller"
              Icon={RiEditCircleFill}
              text="<L>Stored: <A>"
              label=""
              amount={summary[EQK.TYPES.ARMOR].stored}
              color="blue"
              customDirSty={STYLES.stat}
            />
            <SummaryRow
              size="smaller"
              Icon={RiEditCircleFill}
              text="<L>Ranks Sum: <A>"
              label=""
              amount={summary[EQK.TYPES.ARMOR].ranksSum}
              color="blue"
              customDirSty={STYLES.stat}
            />
          </div>
          <CuteButton
            stylesBehavior="always-filled"
            color="indigo"
            colorStrength="lighter"
            size="smaller"
            onClick={() => openSubMenu(`storedAndOrders-${EQK.TYPES.ARMOR}`)}
            customDirSty={{ button: "mt-6" }}
          >
            Stored / Orders
          </CuteButton>
        </div>
      </div>
    </>
  );
}

//prettier-ignore
const STYLES = {
  columnsCt: "mt-6 flex justify-between",
  leftColumn: "flex-1 text-center pr-3",
  rightColumn: "flex-1 text-center pl-3 border-l-1 border-gray-300",

  columnTitle: "flex items-center justify-center text-gray-700 text-lg",
  titleIcon: "mr-1 text-3xl",
  titleText: "",

  columnStatsCt: "mt-4",
  stat: { ct: "my-2", icon: "| xs:w-6 xs:h-6" },
};

function CapacityBox({ summary }) {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(CAPACITY_BOX_INDICATORS, CAPACITY_BOX_DIRECTED_STYLES);

  const styles = getActiveStyles({ status: summary.capacityStatus });

  return (
    <p className={styles.ct}>
      {summary.totalStored} Units Stored <br />
      <span className={styles.capacity}>
        Capacity for{" "}
        <span className={styles.capacityNumber}>{summary.capacity}</span>{" "}
      </span>
    </p>
  );
}

//prettier-ignore
const CAPACITY_BOX_DIRECTED_STYLES = {
  ct: "mt-4 w-2/3 mx-auto text-gray-700 rounded-md border-blue-300 border-1 border-dashed text-center py-3 text-xl leading-tight || mx<border-red-500> amx<border-yellow-700> nmx<border-indigo-500>",
  capacity: "text-light text-base text-green-500 || mx<text-red-500> amx<text-yellow-700> nmx<text-indigo-500>",
  capacityNumber: "text-lg",
}

//prettier-ignore
const CAPACITY_BOX_INDICATORS = [
  { key: "maxed", directive: "mx", condition: p => p.status == MIK.CAPACITY_STATUS.MAXED },
  { key: "almostMaxed", directive: "amx", condition: p => p.status == MIK.CAPACITY_STATUS.ALMOST_MAXED },
  { key: "nearMax", directive: "nmx", condition: p => p.status == MIK.CAPACITY_STATUS.NEAR_MAX },
]

export default EquipmentSection;
