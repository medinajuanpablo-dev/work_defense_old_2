import React from "react";

import { FiltersTopBar, AsyncMounter } from "@common/index";
import { useObjectState } from "@static/react";

import BuildingsSection from "./BuildingsSection";
import TechsSection from "./TechsSection";

function BuildingsMenuSummary({ closeMenu }) {
  const [loading, setLoading] = React.useState(0);
  const filters = useObjectState({ buildings: true, technologies: true });

  return (
    <div className={STYLES.ct}>
      <FiltersTopBar
        closeMenu={closeMenu}
        filtersState={filters}
        filtersNames={{ buildings: "Buildings", technologies: "Technologies" }}
      />

      {loading < 2 && <p className={STYLES.loading}>Loading...</p>}

      {filters.get.buildings && (
        <AsyncMounter onFinish={() => setLoading((prev) => prev + 1)}>
          <BuildingsSection />
        </AsyncMounter>
      )}
      {filters.get.technologies && (
        <AsyncMounter onFinish={() => setLoading((prev) => prev + 1)}>
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
