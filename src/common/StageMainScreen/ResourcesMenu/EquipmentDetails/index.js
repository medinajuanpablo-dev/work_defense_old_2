import React from "react";
import { CgEnter } from "react-icons/cg";
import { BsArrow90DegLeft } from "react-icons/bs";

import { TwoButtonsTopBar, Screen } from "@common/index";

import StoredAndOrdersSection from "./StoredAndOrdersSection";
import CapacitySection from "./CapacitySection";

function EquipmentDetails({ type, closeMenu, closeSubMenu }) {
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
          customStyles: { icon: "w-6" },
          onClick: closeSubMenu,
        }}
      />

      <CapacitySection type={type} />

      <StoredAndOrdersSection type={type} />
    </Screen>
  );
}

const STYLES = {
  ct: "pb-12",
};

export default EquipmentDetails;
