import React from "react";

import { AsyncMounter, FiltersTopBar, Screen } from "@common/index";
import { useGeneralStateUpdator, useGeneralStateReader } from "@state/hooks";

import { ITK } from "@static/contexts/interface";

import BuildingsSection from "./BuildingsSection";
import TechsSection from "./TechsSection";

function BuildingsMenuSummary({ closeMenu }) {
  const updateGS = useGeneralStateUpdator("interface");
  const gs = useGeneralStateReader("interface.shownSummarySections");

  const [loading, setLoading] = React.useState(true);

  function changeSectionVisibility(sectionKey, checked) {
    updateGS.interface.setSummarySectionVisibility(
      ITK.MENUS.BUILDINGS,
      sectionKey,
      checked
    );
  }

  //prettier-ignore
  const sectionsVisibility = gs.interface.shownSummarySections[ITK.MENUS.BUILDINGS];

  return (
    <Screen className={STYLES.ct}>
      <FiltersTopBar
        closeMenu={closeMenu}
        filtersState={sectionsVisibility}
        filtersNames={{ buildings: "Buildings", techs: "Technologies" }}
        onChange={changeSectionVisibility}
      />

      {Object.values(sectionsVisibility).some((visible) => visible) &&
        loading && <p className={STYLES.loading}>Loading...</p>}

      {sectionsVisibility.buildings && (
        <AsyncMounter onFinish={() => setLoading(false)}>
          <BuildingsSection />
        </AsyncMounter>
      )}
      {sectionsVisibility.techs && (
        <AsyncMounter onFinish={() => setLoading(false)}>
          <TechsSection />
        </AsyncMounter>
      )}
    </Screen>
  );
}

const STYLES = {
  ct: "select-none",
  loading: "mt-12 text-center text-xl text-indigo-500 text-light",
};

export default BuildingsMenuSummary;
