import React from "react";

import { useObjectState } from "@static/react";
import { FiltersTopBar, AsyncMounter } from "@common/index";

import GeneralSection from "./GeneralSection";
import CiviliansSection from "./CiviliansSection";
import ArmySection from "./ArmySection";

function PopulationMenuSummary({ closeMenu, openSubMenu }) {
  const [loading, setLoading] = React.useState(0);
  const filters = useObjectState({
    general: true,
    army: true,
    civilians: true,
  });

  return (
    <div className={STYLES.ct}>
      <FiltersTopBar
        closeMenu={closeMenu}
        filtersState={filters}
        filtersNames={{
          general: "General",
          army: "Army",
          civilians: "Civilians",
        }}
      />

      {loading < 3 && <p className={STYLES.loading}>Loading...</p>}

      {filters.get.general && (
        <AsyncMounter
          onFinish={() => setLoading((prev) => prev + 1)}
          mountDelay={20}
        >
          <GeneralSection />
        </AsyncMounter>
      )}
      {filters.get.army && (
        <AsyncMounter
          onFinish={() => setLoading((prev) => prev + 1)}
          mountDelay={20}
        >
          <ArmySection openSubMenu={openSubMenu} />
        </AsyncMounter>
      )}
      {filters.get.civilians && (
        <AsyncMounter
          onFinish={() => setLoading((prev) => prev + 1)}
          mountDelay={20}
        >
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
