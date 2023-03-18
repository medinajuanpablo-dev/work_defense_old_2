import React from "react";
import { chunk } from "lodash";
import { RiEditCircleFill } from "react-icons/ri";
import { GiSpears, GiMedal, GiArcheryTarget } from "react-icons/gi";

import { LineTitle, SummaryRow, CuteButton, CuteModal } from "@common/index";
import { useGeneralStateReader } from "@state/hooks";
import { sumProperties } from "@static/functions";

import { armyOps } from "@static/contexts/army";

function ArmySectionLayout({ openSubMenu }) {
  const gs = useGeneralStateReader("army", "population");

  const [showRecruits, setShowRecruits] = React.useState(false);

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

      <CuteButton
        onClick={() => openSubMenu("armyList")}
        Icon={GiSpears}
        color="indigo"
        transitionSpeed="faster"
        stylesBehavior="always-filled"
        customDirSty={{ button: STYLES.button }}
      >
        View all the Army
      </CuteButton>

      <button
        className={STYLES.seeRecruits}
        onClick={() => setShowRecruits(true)}
      >
        <GiArcheryTarget className={STYLES.seeRecruitsIcon} />
        See Recruits levels
      </button>

      <CuteModal
        visible={showRecruits}
        onClose={(f) => f && setShowRecruits(false)}
      >
        <p className={STYLES.recruitsTitle}>Training Recruits</p>

        {sumProperties(gs.population.recruitsLevels) > 0 ? (
          chunk(Object.keys(gs.population.recruitsLevels), 2).map(
            (levelsPair, index) => (
              <div key={index} className={STYLES.recruitsRow}>
                {levelsPair.map((lvl) => (
                  <div key={lvl} className={STYLES.recruitBox}>
                    <p className={STYLES.recruitLevel}>
                      {lvl} <GiMedal className={STYLES.recruitIcon} />
                    </p>
                    <p className={STYLES.recruitAmount}>
                      <span className={STYLES.recruitAmountNumber}>
                        {gs.population.recruitsLevels[lvl]}
                      </span>{" "}
                      training
                    </p>
                  </div>
                ))}
              </div>
            )
          )
        ) : (
          <p className={STYLES.recruitsEmpty}>
            We are currently training no recruits.
          </p>
        )}
      </CuteModal>
    </>
  );
}

//prettier-ignore
const STYLES = {
  power: { ct: "mt-4" },  
  mantainment: { ct: "mt-4" },

  row: { ct: "mt-4" },
  button: "mt-8",

  seeRecruits: "flex w-6/12 mx-auto justify-center items-center text-sm text-indigo-500 py-2 mt-2 rounded-md",
  seeRecruitsIcon: "text-lg mb-1px mr-1",

  recruitsTitle: "text-center text-light text-sky-700 text-lg",

  recruitsRow: "mt-4 flex justify-center",
  recruitBox: "flex justify-center mx-2",
  recruitLevel: "flex justify-center items-center py-1 pl-3 pr-2 bg-yellow-700 bg-opacity-70 text-slate-100 rounded-l-md text-lg",
  recruitIcon: "text-xl mb-1px",
  recruitAmount: "py-1 text-xs text-light border-slate-300 text-slate-500 rounded-r-md border-1 px-2 ",
  recruitAmountNumber: "text-lg text-default mr-1 text-slate-700",

  recruitsEmpty: "text-center text-slate-500 text-light mt-4"
};

export default ArmySectionLayout;
