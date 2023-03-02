import React from "react";
import { IoIosPeople } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import { RiArrowGoBackFill } from "react-icons/ri";
import { GiCastle, GiMetalBar } from "react-icons/gi";

import {
  GenericTopBar,
  TopBarButton,
  Screen,
  CuteModal,
  displayCuteAlert,
} from "@common/index";
import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";

import { ITK } from "@static/contexts/interface";

import BuildingsMenu from "./BuildingsMenu";
import PopulationMenu from "./PopulationMenu";
import ResourcesMenu from "./ResourcesMenu";
import Tutorial from "./Tutorial";

function StageMainScreen({ children, stageKey, onUndo }) {
  const [showTutorial, setShowTutorial] = React.useState(false);
  const gs = useGeneralStateReader("interface.visibleMenu");
  const updateGS = useGeneralStateUpdator("interface");

  function closeMenu() {
    updateGS.interface.setVisibleMenu(null);
  }

  function openMenu(menuKey) {
    updateGS.interface.setVisibleMenu(menuKey);
  }

  function undoAll() {
    if (onUndo)
      displayCuteAlert({
        Icon: IoWarning,
        title: "Undo Stage?",
        body: "This will undo all changes done this stage so far and start it again.",
        button: {
          text: "Undo Stage",
          onClick: (closeAlert) => {
            onUndo();
            closeAlert();
          },
        },
        secondButton: { text: "Cancel" },
        customStyles: {
          title: "text-red-600",
          icon: "text-red-600",
          leftButton: "border-red-600 text-red-600 hover:bg-red-600",
        },
      });
  }

  //If Menu selected, render it.
  if (gs.interface.visibleMenu.menu) {
    const Menu = MENUES[gs.interface.visibleMenu.menu];
    return <Menu closeMenu={closeMenu} />;
  }

  //Else show the Stage's Main Screen...
  return (
    <Screen className={STYLES.ct}>
      <GenericTopBar>
        <TopBarButton
          onClick={undoAll}
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
          onClick={() => setShowTutorial(true)}
          customStyles={STYLES.nextButton}
          Icon={BsInfoCircle}
        />
      </GenericTopBar>

      {children}

      <CuteModal
        visible={showTutorial}
        onClose={(finished) => finished && setShowTutorial(false)}
      >
        <Tutorial stageKey={stageKey} />
      </CuteModal>
    </Screen>
  );
}

const STYLES = {
  ct: "py-4 flex flex-col",
  middleButtonsCt: "w-1/2 flex",
  middleButton: { button: "flex-1 mx-auto" },
  revertButton: { button: "py-2 border-r-2 w-1/6", icon: "w-6" },
  nextButton: { button: "py-2 border-l-2 w-1/6", icon: "w-6" },
};

const MENUES = {
  [ITK.MENUS.BUILDINGS]: BuildingsMenu,
  [ITK.MENUS.POPULATION]: PopulationMenu,
  [ITK.MENUS.RESOURCES]: ResourcesMenu,
};

const ALERT_STYLES = {};

export default StageMainScreen;
