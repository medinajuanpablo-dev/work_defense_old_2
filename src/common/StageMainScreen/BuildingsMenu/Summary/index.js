import React from "react";

import { AsyncMounter, FiltersTopBar } from "@common/index";
import { useGeneralStateUpdator, useGeneralStateReader } from "@state/hooks";

import { ITK } from "@static/contexts/interface";

import BuildingsSection from "./BuildingsSection";
import TechsSection from "./TechsSection";

function BuildingsMenuSummary({ closeMenu }) {
  const updateGS = useGeneralStateUpdator("interface");
  const gs = useGeneralStateReader("interface.menusShownSummarySections");

  function changeSectionVisibility(filterKey, checked) {
    updateGS.interface.setSummarySectionVisibility(
      ITK.MENUS.BUILDINGS,
      filterKey,
      checked
    );
  }

  //prettier-ignore
  const sectionsVisibility = gs.interface.menusShownSummarySections[ITK.MENUS.BUILDINGS];

  return (
    <div className={STYLES.ct}>
      <FiltersTopBar
        closeMenu={closeMenu}
        filtersState={sectionsVisibility}
        filtersNames={{ buildings: "Buildings", techs: "Technologies" }}
        onChange={changeSectionVisibility}
      />

      {sectionsVisibility.buildings && (
        <AsyncMounter>
          <BuildingsSection />
        </AsyncMounter>
      )}
      {sectionsVisibility.techs && (
        <AsyncMounter>
          <TechsSection />
        </AsyncMounter>
      )}
    </div>
  );
}

const STYLES = {
  ct: "select-none",
  loading: "mt-12 text-center text-xl text-indigo-500 text-light",
};

export default BuildingsMenuSummary;
