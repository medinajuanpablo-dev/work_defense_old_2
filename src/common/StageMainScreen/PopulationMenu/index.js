import React from "react";

import Summary from "./Summary";
import ArmyList from "./ArmyList";

function PopulationMenu({ closeMenu }) {
  const [subMenu, setSubMenu] = React.useState(null);

  function closeSubMenu() {
    setSubMenu(null);
  }

  function openSubMenu(subMenuKey) {
    setSubMenu(subMenuKey);
  }

  if (subMenu === "armyList")
    return <ArmyList {...{ closeMenu, closeSubMenu }} />;

  return <Summary {...{ closeMenu, openSubMenu }} />;
}

export default PopulationMenu;
