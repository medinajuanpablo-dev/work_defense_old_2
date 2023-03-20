import React from "react";
import { RiEditCircleFill } from "react-icons/ri";
import { GiBroadsword, GiChestArmor } from "react-icons/gi";

import { useIndicatedStyles } from "@static/tailwind";
import { SummaryRow, LineTitle, CuteButton } from "@common/index";
import { useGeneralStateReader } from "@state/hooks";
import { sumProperties } from "@static/functions";

import { EQK, equipmentOps } from "@static/contexts/equipment";
import { BDK } from "@static/contexts/buildings";
import { INTERFACE, interfaceOps } from "@static/contexts/interface";

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
        get average() {
          return this.ranksSum / this.stored;
        },
      },
      [A]: {
        stored: sumProperties(gs.equipment.stored[A]),
        ranksSum: equipmentOps.ranksSum(gs.equipment.stored[A]),
        get average() {
          return this.ranksSum / this.stored;
        },
      },
    };

    const arsenalLevel = gs.buildings[BDK.NAMES.ARSENAL].level;

    summary.totalStored = summary[W].stored + summary[A].stored;
    summary.capacity = equipmentOps.storageCapacity(arsenalLevel);

    //prettier-ignore
    summary.capacityStatus = interfaceOps.capacityStatus(summary.totalStored, summary.capacity);

    return summary;
  }, [gs.equipment, gs.buildings]);

  return (
    <>
      <LineTitle>Equipment Summary</LineTitle>

      <CapacitySummary summary={summary} />

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
              text="Stored: <A>"
              amount={summary[EQK.TYPES.WEAPON].stored.toFixed(0)}
              color="blue"
              customDirSty={STYLES.stat}
            />
            <SummaryRow
              size="smaller"
              Icon={RiEditCircleFill}
              text="Ranks Sum: <A>"
              amount={summary[EQK.TYPES.WEAPON].ranksSum.toFixed(0)}
              color="blue"
              customDirSty={STYLES.stat}
            />
            <SummaryRow
              size="smaller"
              Icon={RiEditCircleFill}
              text="Avg. Rank: <A>"
              amount={summary[EQK.TYPES.ARMOR].average.toFixed(1)}
              color="blue"
              customDirSty={STYLES.stat}
            />
          </div>
          <CuteButton
            stylesBehavior="always-filled"
            color="indigo"
            colorStrength="lighter"
            size="smaller"
            onClick={() => openSubMenu(`details-${EQK.TYPES.WEAPON}`)}
            customDirSty={{ button: "mt-6" }}
          >
            See Details
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
              text="Stored: <A>"
              amount={summary[EQK.TYPES.ARMOR].stored.toFixed(0)}
              color="blue"
              customDirSty={STYLES.stat}
            />
            <SummaryRow
              size="smaller"
              Icon={RiEditCircleFill}
              text="Ranks Sum: <A>"
              amount={summary[EQK.TYPES.ARMOR].ranksSum.toFixed(0)}
              color="blue"
              customDirSty={STYLES.stat}
            />
            <SummaryRow
              size="smaller"
              Icon={RiEditCircleFill}
              text="Avg. Rank: <A>"
              amount={summary[EQK.TYPES.ARMOR].average.toFixed(1)}
              color="blue"
              customDirSty={STYLES.stat}
            />
          </div>
          <CuteButton
            stylesBehavior="always-filled"
            color="indigo"
            colorStrength="lighter"
            size="smaller"
            onClick={() => openSubMenu(`details-${EQK.TYPES.ARMOR}`)}
            customDirSty={{ button: "mt-6" }}
          >
            See Details
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

function CapacitySummary({ summary }) {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INTERFACE.CAPACITY_INDICATORS, CAPACITY_DIR_STY);

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
const CAPACITY_DIR_STY = {
  ct: "mt-4 w-2/3 mx-auto text-gray-700 rounded-md border-blue-300 border-1 border-dashed text-center py-3 text-xl leading-tight || mx<border-red-500> amx<border-yellow-700> nmx<border-indigo-500>",
  capacity: "text-light text-base text-green-600 || mx<text-red-500> amx<text-yellow-700> nmx<text-indigo-500>",
  capacityNumber: "text-lg",
}

export default EquipmentSection;
