import React from "react";
import { RiEditCircleFill } from "react-icons/ri";

import { LineTitle, SummaryRow } from "@common/index";
import { useGeneralStateReader } from "@state/hooks";

import { armyOps } from "@static/contexts/army";

function ArmySectionLayout({ openSubMenu }) {
  const gs = useGeneralStateReader("army");

  const summary = React.useMemo(() => {
    var soldiersAmount = 0,
      power = 0,
      mantainment = 0,
      levels = 0,
      weaponRanks = 0,
      armorRanks = 0;

    function processArmySection(armySection, isFreeZone) {
      soldiersAmount += armySection.force.length;
      power += armyOps.powerOf(armySection.force);
      mantainment += armyOps.forceMantainment(armySection.force, isFreeZone);

      for (let soldier of armySection.force) {
        levels += soldier.ce.level;
        armorRanks += soldier.gear.armorRank;
        weaponRanks += soldier.gear.weaponRank;
      }
    }

    Object.values(gs.army.zonesDefense).forEach((zf) => processArmySection(zf));
    Object.values(gs.army.liberationUnits).forEach((lu) =>
      processArmySection(lu)
    );
    processArmySection(gs.army.freeZone, true);

    return {
      totalPower: power,
      soldiersAmount,
      mantainment,
      avgPower: power / soldiersAmount || 0,
      avgMantainment: mantainment / soldiersAmount || 0,
      avgLevel: levels / soldiersAmount || 0,
      avgArmorRank: armorRanks / soldiersAmount || 0,
      avgWeaponRank: weaponRanks / soldiersAmount || 0,
    };
  }, [gs.army]);

  function viewAllArmy() {
    openSubMenu("armyList");
  }

  return (
    <>
      <LineTitle>Army Summary</LineTitle>
      <SummaryRow
        Icon={RiEditCircleFill}
        label="Power"
        amount={summary.totalPower.toPrecision(5)}
        text="Our army <L> is <A>."
        customDirSty={STYLES.power}
        outstand
        color="purple"
      />
      <SummaryRow
        Icon={RiEditCircleFill}
        text="Total <A> <L>."
        label="Army Mantainment"
        amount={Math.round(summary.mantainment)}
        outstand
        color="green"
        customDirSty={STYLES.mantainment}
      />
      <SummaryRow
        Icon={RiEditCircleFill}
        label="Power"
        text="Average <L> of <A>."
        amount={summary.avgPower.toFixed(2)}
        customDirSty={STYLES.row}
        color="blue"
        size="smaller"
      />
      <SummaryRow
        Icon={RiEditCircleFill}
        label="Level"
        text="Average <L> of <A>."
        amount={summary.avgLevel.toFixed(2)}
        customDirSty={STYLES.row}
        color="blue"
        size="smaller"
      />
      <SummaryRow
        Icon={RiEditCircleFill}
        label="Weapon Rank"
        text="Average <L> of <A>."
        amount={summary.avgWeaponRank.toFixed(2)}
        customDirSty={STYLES.row}
        color="blue"
        size="smaller"
      />
      <SummaryRow
        Icon={RiEditCircleFill}
        label="Armor Rank"
        text="Average <L> of <A>."
        amount={summary.avgArmorRank.toFixed(2)}
        customDirSty={STYLES.row}
        color="blue"
        size="smaller"
      />
      <SummaryRow
        Icon={RiEditCircleFill}
        label="Soldier Mantainment"
        text="Average <L> of <A>."
        amount={summary.avgMantainment.toFixed(2)}
        customDirSty={STYLES.row}
        color="blue"
        size="smaller"
      />
      <button onClick={viewAllArmy} className={STYLES.allButton}>
        View all the Army
      </button>
    </>
  );
}

//prettier-ignore
const STYLES = {
  power: { ct: "mt-4" },  
  mantainment: { ct: "mt-2" },

  row: { ct: "mt-4" },
  allButton: "block text-default mx-auto mt-4 text-sm px-4 py-2 rounded-md bg-indigo-500 text-gray-100 transition-color duration-300 bg-opacity-80 focus:bg-blue-400 hover:bg-blue-400 focus:outline-none | xs:mt-6 xs:px-6 xs:text-lg",
};

export default ArmySectionLayout;
