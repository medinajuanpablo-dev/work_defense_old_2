import React from "react";

import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";

import { ITK } from "@static/contexts/interface";

import Summary from "./Summary";
import ArmyList from "./ArmyList";

function PopulationMenu({ closeMenu }) {
  const gs = useGeneralStateReader("interface.visibleMenu");
  const updateGS = useGeneralStateUpdator("interface");

  function closeSubMenu() {
    updateGS.interface.setVisibleSubMenu(null);
  }

  function openSubMenu(subMenuKey) {
    updateGS.interface.setVisibleSubMenu(subMenuKey);
  }

  if (gs.interface.visibleMenu.subMenu === ITK.SUB_MENUS.ARMY_LIST)
    return <ArmyList {...{ closeMenu, closeSubMenu }} />;

  return <Summary {...{ closeMenu, openSubMenu }} />;
}

export default PopulationMenu;
