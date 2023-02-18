import React from "react";

import { FiltersTopBar, AsyncMounter, Screen } from "@common/index";
import { useGeneralStateUpdator, useGeneralStateReader } from "@state/hooks";

import { ITK } from "@static/contexts/interface";

import GeneralSection from "./GeneralSection";
import CiviliansSection from "./CiviliansSection";
import ArmySection from "./ArmySection";

function PopulationMenuSummary({ closeMenu, openSubMenu }) {
  const updateGS = useGeneralStateUpdator("interface");
  const gs = useGeneralStateReader("interface.shownSummarySections");

  const [loading, setLoading] = React.useState(true);

  function changeSectionVisibility(sectionKey, checked) {
    updateGS.interface.setSummarySectionVisibility(
      ITK.MENUS.POPULATION,
      sectionKey,
      checked
    );
  }

  //prettier-ignore
  const sectionsVisibility = gs.interface.shownSummarySections[ITK.MENUS.POPULATION];

  return (
    <Screen className={STYLES.ct}>
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

      {Object.values(sectionsVisibility).some((visible) => visible) &&
        loading && <p className={STYLES.loading}>Loading...</p>}

      {sectionsVisibility.general && (
        <AsyncMounter mountDelay={20} onFinish={() => setLoading(false)}>
          <GeneralSection />
        </AsyncMounter>
      )}
      {sectionsVisibility.army && (
        <AsyncMounter mountDelay={20} onFinish={() => setLoading(false)}>
          <ArmySection openSubMenu={openSubMenu} />
        </AsyncMounter>
      )}
      {sectionsVisibility.civilians && (
        <AsyncMounter mountDelay={20} onFinish={() => setLoading(false)}>
          <CiviliansSection />
        </AsyncMounter>
      )}
    </Screen>
  );
}

const STYLES = {
  ct: "select-none pb-8",
  loading: "mt-12 text-center text-xl text-indigo-500 text-light",
};

export default PopulationMenuSummary;
