import React from "react";

import Summary from "./Summary";

function BuildingsMenu({ closeMenu }) {
  return <Summary {...{ closeMenu }} />;
}

export default BuildingsMenu;
