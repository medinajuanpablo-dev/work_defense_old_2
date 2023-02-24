import React from "react";
import { mapValues } from "lodash";
import { RiEditCircleFill, RiAlarmWarningLine } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import { BsExclamationOctagon } from "react-icons/bs";
import { GiSwordBrandish } from "react-icons/gi";

import { LineTitle, SummaryRow } from "@common/index";
import { useGeneralStateReader } from "@state/hooks";

import { ITK } from "@static/contexts/interface";
import { BUILDINGS } from "@static/contexts/buildings";
import { MISC } from "@static/contexts/miscellaneous";

function BuildingsSection() {
  const [showingDescription, setShowingDescription] = React.useState(null);
  const gs = useGeneralStateReader("buildings");

  function buildingClick(key) {
    setShowingDescription((prev) => (prev == key ? null : key));
  }

  return (
    <>
      <LineTitle>Buildings</LineTitle>

      <p className={STYLES.message}>
        (Click a building to see it's description)
      </p>

      <div className={STYLES.buildingsListCt}>
        {Object.keys(BUILDINGS_KEYS_BY_ZONE).map((z) => (
          <React.Fragment key={z}>
            <p className={STYLES.zoneName}>{MISC.ACTIVE_ZONES[z]} Zone</p>

            {BUILDINGS_KEYS_BY_ZONE[z].map((b) => (
              <React.Fragment key={b}>
                <SummaryRow
                  Icon={RiEditCircleFill}
                  text="<L> [<A>]"
                  label={BUILDINGS.BY_BUILDING[b].NAME}
                  amount={gs.buildings[b].level}
                  notificationsConfig={[NOTIFICATIONS.FINE]}
                  customDirSty={STYLES.building}
                  color="blue"
                  onClick={() => buildingClick(b)}
                />
                {showingDescription == b && (
                  <p className={STYLES.buildingDescription}>
                    {BUILDINGS.BY_BUILDING[b].DESCRIPTION}
                  </p>
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

const STYLES = {
  message: "mt-2 text-center text-xs text-slate-500 text-light",

  buildingsListCt: "flex flex-col mt-2 text-sm | xs:text-base",

  zoneName: "text-light text-xs text-indigo-500 mt-3 | xs:text-sm",

  building: {
    ct: "my-1",
    label: "text-light mr-1",
    amount: "mx-1",
  },
  buildingDescription:
    "mt-1 mb-2 text-slate-600 text-sm p-3 border-1 border-slate-300 text-light",
};

/**An object of `zoneKey: [...buildingsPlacedThereKeys]` fields */
const BUILDINGS_KEYS_BY_ZONE = (() => {
  var result = mapValues(MISC.ACTIVE_ZONES, () => []);

  Object.keys(BUILDINGS.BY_BUILDING).forEach((b) =>
    result[BUILDINGS.BY_BUILDING[b].PLACEMENT_ZONE].push(b)
  );

  return result;
})();

const NOTIFICATIONS = {
  FINE: {
    ButtonIcon: FiCheck,
    Icon: FiCheck,
    title: "Everything is fine.",
    body: "This building is safe and operational.",
    type: ITK.NOTIFICATION_TYPES.FINE,
  },
  DANGER: {
    ButtonIcon: GiSwordBrandish,
    Icon: GiSwordBrandish,
    title: "Building Zone under attack!",
    body: "This building's zone will soon be attacked. If lost, the building will become not-operational.",
    type: ITK.NOTIFICATION_TYPES.DANGER,
  },
  NON_OPERATIONAL: {
    ButtonIcon: IoWarningOutline,
    Icon: IoWarningOutline,
    title: "Not Operational!",
    body: "Zone occupied. Building not operational until the bill is paid or the zone is liberated.",
    type: ITK.NOTIFICATION_TYPES.EMERGENCY,
  },
  DESTRUCTION: {
    ButtonIcon: BsExclamationOctagon,
    Icon: RiAlarmWarningLine,
    title: "Destruction!",
    body: "The zone's occupants are destroying the building and lowering it's level!",
    type: ITK.NOTIFICATION_TYPES.EMERGENCY,
  },
};

export default BuildingsSection;
