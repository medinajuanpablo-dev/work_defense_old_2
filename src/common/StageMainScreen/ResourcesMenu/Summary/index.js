import React from "react";

import { AsyncMounter, FiltersTopBar } from "@common/index";
import { useGeneralStateUpdator, useGeneralStateReader } from "@state/hooks";

import { ITK } from "@static/contexts/interface";

import ResourcesSection from "./ResourcesSection";
import EquipmentSection from "./EquipmentSection";

function PopulationMenuSummary({ closeMenu, openSubMenu }) {
  const updateGS = useGeneralStateUpdator("interface");
  const gs = useGeneralStateReader("interface.menusShownSummarySections");

  function changeSectionVisibility(filterKey, checked) {
    updateGS.interface.setSummarySectionVisibility(
      ITK.MENUS.RESOURCES,
      filterKey,
      checked
    );
  }

  //prettier-ignore
  const sectionsVisibility = gs.interface.menusShownSummarySections[ITK.MENUS.RESOURCES];

  return (
    <div className={STYLES.ct}>
      <FiltersTopBar
        closeMenu={closeMenu}
        filtersState={sectionsVisibility}
        filtersNames={{ resources: "Resources", equipment: "Equipment" }}
        onChange={changeSectionVisibility}
      />

      {sectionsVisibility.resources && (
        <AsyncMounter>
          <ResourcesSection />
        </AsyncMounter>
      )}
      {sectionsVisibility.equipment && (
        <AsyncMounter>
          <EquipmentSection openSubMenu={openSubMenu} />
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
