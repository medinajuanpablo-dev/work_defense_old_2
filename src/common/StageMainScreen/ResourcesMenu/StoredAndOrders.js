import React from "react";
import { CgEnter } from "react-icons/cg";
import { BsArrow90DegLeft } from "react-icons/bs";
import { RiEditCircleFill } from "react-icons/ri";

import { TwoButtonsTopBar, LineTitle } from "@common/index";

import { EQK } from "@static/contexts/equipment";

function StoredAndOrders({ type, closeMenu, closeSubMenu }) {
  return (
    <div className={STYLES.ct}>
      <TwoButtonsTopBar
        leftButtonConfig={{ Icon: CgEnter, text: "Back to Stage" }}
        rightButtonConfig={{
          Icon: BsArrow90DegLeft,
          text: "To Summary",
          customStyles: { icon: "w-6" },
        }}
        onLeftClick={closeMenu}
        onRightClick={closeSubMenu}
      />

      <LineTitle>
        {`Stored/Ordered ${EQK.TYPES.ARMOR == type ? "Armor" : "Weapons"}`}
      </LineTitle>

      <div className={STYLES.sortersRow}></div>

      <div className={STYLES.columns}>
        <div className={STYLES.stored}>
          <div className={STYLES.columnTitle}>
            <RiEditCircleFill className={STYLES.columnTitleIcon} />
            Stored
          </div>
          <div className={STYLES.storedRow}>
            <p className={STYLES.storedRow}>
              <span className={STYLES.storedRowAmount}>3</span>
              of Rank
              <span className={STYLES.storedRowRank}>8</span>
            </p>
          </div>
        </div>
        <div className={STYLES.orders}>
          <div className={STYLES.columnTitle}>
            <RiEditCircleFill className={STYLES.columnTitleIcon} />
            Orders
          </div>
          <div className={STYLES.ordersRow}></div>
        </div>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className={STYLES.row}>
      <p className={STYLES.rowText}>
        <span className={STYLES.rowAmount}>3</span>
        of Rank
        <span className={STYLES.rowRank}>8</span>
      </p>

      <button className={STYLES.rowButton}>
        <RiEditCircleFill className={STYLES.rowButtonIcon} />
      </button>
    </div>
  );
}

const STYLES = {
  ct: "p-2",
};

export default StoredAndOrders;
