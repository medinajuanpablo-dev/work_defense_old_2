import React from "react";
import { GiRibbonMedal, GiAxeSword, GiArmorVest } from "react-icons/gi";
import { BsQuestionCircle } from "react-icons/bs";

import { CuteButton, CuteActionNotice } from "@common/index";

import { EQK } from "@static/contexts/equipment";
import { armyOps } from "@static/contexts/army";

const ETK = EQK.TYPES;

function EquippingModal({
  storedEquipment,
  onSelectGear,
  onClose,
  number,
  ce,
  gear,
  roleCode,
}) {
  const existingRanks = React.useMemo(
    () => ({
      weapons: Object.keys(storedEquipment[ETK.WEAPON]).filter(
        (rank) => storedEquipment[ETK.WEAPON][rank] > 0
      ),
      armor: Object.keys(storedEquipment[ETK.ARMOR]).filter(
        (rank) => storedEquipment[ETK.ARMOR][rank] > 0
      ),
    }),
    [storedEquipment]
  );

  return (
    <div className={STYLES.ct}>
      <p className={STYLES.title}>Equip Soldier #{number}</p>

      <p className={STYLES.role}>
        {armyOps.buildRoleDescription(roleCode, true)}
      </p>

      <div className={STYLES.stats}>
        <p className={STYLES.statBox}>
          <span className={STYLES.statLabel}>CE Level</span>
          <GiRibbonMedal className={STYLES.statIcon} /> {ce.level}
        </p>
        <p className={STYLES.statBox}>
          <span className={STYLES.statLabel}>W. Rank</span>
          <GiAxeSword className={STYLES.statIcon} /> {gear.weaponRank}
        </p>
        <p className={STYLES.statBox}>
          <span className={STYLES.statLabel}>A. Rank</span>
          <GiArmorVest className={STYLES.statIcon} /> {gear.armorRank}
        </p>
      </div>

      <div className={STYLES.stored}>
        <p className={STYLES.storedTitle}>Stored Gear</p>

        <div className={STYLES.column}>
          <p className={STYLES.columnTitle}>
            <GiAxeSword className={STYLES.columnIcon} /> Weapons
          </p>
          <div className={STYLES.columnList}>
            {existingRanks.weapons.length > 0 ? (
              existingRanks.weapons.map((rank) => (
                <div
                  key={`${ETK.WEAPON}-${rank}`}
                  onClick={() => onSelectGear(ETK.WEAPON, rank)}
                  className={STYLES.columnRow}
                >
                  <p className={STYLES.rank}>Rank {rank}</p>
                  <p className={STYLES.amount}>
                    {storedEquipment[ETK.WEAPON][rank]}
                  </p>
                </div>
              ))
            ) : (
              <p className={STYLES.columnEmpty}>Empty</p>
            )}
          </div>
        </div>
        <div className={STYLES.column}>
          <p className={STYLES.columnTitle}>
            <GiArmorVest className={STYLES.columnIcon} />
            Armor
          </p>
          <div className={STYLES.columnList}>
            {existingRanks.armor.length > 0 ? (
              existingRanks.armor.map((rank) => (
                <div
                  key={`${ETK.WEAPON}-${rank}`}
                  onClick={() => onSelectGear(ETK.ARMOR, rank)}
                  className={STYLES.columnRow}
                >
                  <p className={STYLES.rank}>Rank {rank}</p>
                  <p className={STYLES.amount}>
                    {storedEquipment[ETK.ARMOR][rank]}
                  </p>
                </div>
              ))
            ) : (
              <p className={STYLES.columnEmpty}>Empty</p>
            )}
          </div>
        </div>
      </div>

      <CuteButton
        onClick={onClose}
        color="indigo"
        colorStrength="lighter"
        customDirSty={SAVE_BUTTON_STYLES}
      >
        Save and Close
      </CuteButton>

      <div className={STYLES.instructions}>
        <CuteActionNotice
          ButtonIcon={BsQuestionCircle}
          title="Instructions"
          body="Click a Rank of weapons/armor to assign one unit of it to the soldier."
          customDirSty={INSTRUCTIONS_STYLES}
        />
      </div>
    </div>
  );
}

//prettier-ignore
const STYLES = {
  ct: "relative",
  title: "text-center text-slate-700 text-light text-xl border-b-1 pb-1 border-slate-300",
  role: "text-center text-slate-600 text-light text-sm mt-4",

  stats: "mt-4 flex justify-center",
  statBox: "relative mx-6px flex items-center justify-center border-1 text-slate-700 border-sky-300 pt-3 pb-2 w-9/24 text-xl rounded-md",
  statLabel: "absolute px-2 bg-slate-100 -top-2 text-xs text-sky-600",
  statIcon: "mr-2 text-2xl text-slate-500",

  stored: "mt-8 border-t-1 relative border-slate-400 text-slate-600 flex justify-center pt-6",
  storedTitle: "absolute -top-12px bg-slate-100 px-3 text-light",
  column: "flex-1 border-slate-300 w-5/12",
  columnTitle: "flex justify-center items-center text-light text-slate-600",
  columnIcon: "mr-2 text-2xl",
  columnList: "mt-4 flex flex-col h-50 overflow-y-scroll px-2",
  columnRow: "flex border-indigo-500 border-1 mb-2 rounded-md border-opacity-80 hover:bg-slate-300",
  rank: "grow bg-indigo-500 bg-opacity-80 text-slate-100 rounded-l-md text-center py-1",
  amount: "w-5/12 shrink-0 text-lg text-center pt-3px",
  columnEmpty: "text-center text-light text-slate-500 mt-1 border-b-1 border-slate-300 pb-1",
  
  instructions: "absolute right-1 -bottom-1",
};

const SAVE_BUTTON_STYLES = {
  button: "mt-8",
};
const INSTRUCTIONS_STYLES = {
  buttonCt: "text-slate-500",
};

export default EquippingModal;
