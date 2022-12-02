import React from "react";

import Summary from "./Summary";
import StoredAndOrders from "./StoredAndOrders";

function ResourcesMenu({ closeMenu }) {
  const [subMenu, setSubMenu] = React.useState(null);

  function closeSubMenu() {
    setSubMenu(null);
  }

  function openSubMenu(subMenuKey) {
    setSubMenu(subMenuKey);
  }

  if (subMenu?.includes("storedAndOrders"))
    return (
      <StoredAndOrders
        type={subMenu.split("-")[1]}
        {...{ closeMenu, closeSubMenu }}
      />
    );

  return <Summary {...{ closeMenu, openSubMenu }} />;
}

export default ResourcesMenu;
