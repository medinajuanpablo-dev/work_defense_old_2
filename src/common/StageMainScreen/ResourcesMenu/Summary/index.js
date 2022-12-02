import React from "react";

import { useObjectState } from "@static/react";
import { AsyncMounter, FiltersTopBar } from "@common/index";

import ResourcesSection from "./ResourcesSection";
import EquipmentSection from "./EquipmentSection";

function PopulationMenuSummary({ closeMenu, openSubMenu }) {
  const [loading, setLoading] = React.useState(0);
  const filters = useObjectState({ resources: true, equipment: true });

  return (
    <div className={STYLES.ct}>
      <FiltersTopBar
        closeMenu={closeMenu}
        filtersState={filters}
        filtersNames={{ resources: "Resources", equipment: "Equipment" }}
      />

      {loading < 2 && <p className={STYLES.loading}>Loading...</p>}

      {filters.get.resources && (
        <AsyncMounter onFinish={() => setLoading((prev) => prev + 1)}>
          <ResourcesSection />
        </AsyncMounter>
      )}
      {filters.get.equipment && (
        <AsyncMounter onFinish={() => setLoading((prev) => prev + 1)}>
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
