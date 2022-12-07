import React from "react";
import { IoIosPeople } from "react-icons/io";
import { BiRightArrow } from "react-icons/bi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { GiCastle, GiMetalBar } from "react-icons/gi";

import { GenericTopBar, TopBarButton } from "@common/index";

import { MISC } from "@static/contexts/miscellaneous";
import { ITK } from "@static/contexts/interface";

import BuildingsMenu from "./BuildingsMenu";
import PopulationMenu from "./PopulationMenu";
import ResourcesMenu from "./ResourcesMenu";

function StageMainScreen({ children, stageKey }) {
  const [menu, setMenu] = React.useState(null);

  function closeMenu() {
    setMenu(null);
  }

  function openMenu(menuKey) {
    setMenu(menuKey);
  }

  function revert() {
    console.log("Clicked Revert");
  }

  function forward() {
    console.log("Clicked Forward");
  }

  //If Menu selected, render it.
  if (menu) {
    const Menu = MENUES[menu];
    return <Menu closeMenu={closeMenu} />;
  }

  //Else show the Stage's Main Screen...
  return (
    <div className={STYLES.ct}>
      <GenericTopBar>
        <TopBarButton
          onClick={revert}
          customStyles={STYLES.revertButton}
          Icon={RiArrowGoBackFill}
        />
        <div className={STYLES.middleButtonsCt}>
          <TopBarButton
            onClick={() => openMenu(ITK.MENUS.POPULATION)}
            customStyles={STYLES.middleButton}
            Icon={IoIosPeople}
          />
          <TopBarButton
            onClick={() => openMenu(ITK.MENUS.BUILDINGS)}
            customStyles={STYLES.middleButton}
            Icon={GiCastle}
          />
          <TopBarButton
            onClick={() => openMenu(ITK.MENUS.RESOURCES)}
            customStyles={STYLES.middleButton}
            Icon={GiMetalBar}
          />
        </div>
        <TopBarButton
          onClick={forward}
          customStyles={STYLES.nextButton}
          Icon={BiRightArrow}
        />
      </GenericTopBar>

      <p className={STYLES.title}>{MISC.ORDERED_STAGES[stageKey]}</p>

      {children}
    </div>
  );
}

const STYLES = {
  ct: "p-2",
  middleButtonsCt: "w-1/2 flex",
  middleButton: { button: "flex-1 mx-auto" },
  revertButton: { button: "py-2 border-r-2 w-1/6" },
  nextButton: { button: "py-2 border-l-2 w-1/6" },
};

const MENUES = {
  [ITK.MENUS.BUILDINGS]: BuildingsMenu,
  [ITK.MENUS.POPULATION]: PopulationMenu,
  [ITK.MENUS.RESOURCES]: ResourcesMenu,
};

export default StageMainScreen;
