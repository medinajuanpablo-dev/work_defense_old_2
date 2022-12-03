import React from "react";

import { FiltersTopBar, AsyncMounter } from "@common/index";
import { useGeneralStateUpdator, useGeneralStateReader } from "@state/hooks";

import { ITK } from "@static/contexts/interface";

import GeneralSection from "./GeneralSection";
import CiviliansSection from "./CiviliansSection";
import ArmySection from "./ArmySection";

function PopulationMenuSummary({ closeMenu, openSubMenu }) {
  const updateGS = useGeneralStateUpdator("interface");
  const gs = useGeneralStateReader("interface.menusShownSummarySections");

  function changeSectionVisibility(filterKey, checked) {
    updateGS.interface.setSummarySectionVisibility(
      ITK.MENUS.POPULATION,
      filterKey,
      checked
    );
  }

  //prettier-ignore
  const sectionsVisibility = gs.interface.menusShownSummarySections[ITK.MENUS.POPULATION];

  return (
    <div className={STYLES.ct}>
      <FiltersTopBar
        closeMenu={closeMenu}
        filtersState={sectionsVisibility}
        filtersNames={{
          general: "General",
          army: "Army",
          civilians: "Civilians",
        }}
        onChange={changeSectionVisibility}
      />

      {sectionsVisibility.general && (
        <AsyncMounter mountDelay={20}>
          <GeneralSection />
        </AsyncMounter>
      )}
      {sectionsVisibility.army && (
        <AsyncMounter mountDelay={20}>
          <ArmySection openSubMenu={openSubMenu} />
        </AsyncMounter>
      )}
      {sectionsVisibility.civilians && (
        <AsyncMounter mountDelay={20}>
          <CiviliansSection />
        </AsyncMounter>
      )}
    </div>
  );
}

const STYLES = {
  ct: "select-none pb-8",
  loading: "mt-12 text-center text-xl text-indigo-500 text-light",
};

export default PopulationMenuSummary;
