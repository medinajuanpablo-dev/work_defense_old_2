import React from "react";

import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";

import { ITK } from "@static/contexts/interface";

import Summary from "./Summary";
import EquipmentDetails from "./EquipmentDetails";

function ResourcesMenu({ closeMenu }) {
  const gs = useGeneralStateReader("interface.visibleMenu");
  const updateGS = useGeneralStateUpdator("interface");

  function closeSubMenu() {
    updateGS.interface.setVisibleSubMenu(null);
  }

  function openSubMenu(subMenuKey) {
    updateGS.interface.setVisibleSubMenu(subMenuKey);
  }

  if (
    [ITK.SUB_MENUS.ARMOR_DETAILS, ITK.SUB_MENUS.WEAPONS_DETAILS].includes(
      gs.interface.visibleMenu.subMenu
    )
  )
    return (
      <EquipmentDetails
        type={gs.interface.visibleMenu.subMenu.split("-")[1]}
        {...{ closeMenu, closeSubMenu }}
      />
    );

  return <Summary {...{ closeMenu, openSubMenu }} />;
}

export default ResourcesMenu;
