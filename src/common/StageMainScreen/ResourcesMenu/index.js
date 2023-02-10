import React from "react";

import Summary from "./Summary";
import EquipmentDetails from "./EquipmentDetails";

function ResourcesMenu({ closeMenu }) {
  const [subMenu, setSubMenu] = React.useState(null);

  function closeSubMenu() {
    setSubMenu(null);
  }

  function openSubMenu(subMenuKey) {
    setSubMenu(subMenuKey);
  }

  if (subMenu?.includes("details"))
    return (
      <EquipmentDetails
        type={subMenu.split("-")[1]}
        {...{ closeMenu, closeSubMenu }}
      />
    );

  return <Summary {...{ closeMenu, openSubMenu }} />;
}

export default ResourcesMenu;
