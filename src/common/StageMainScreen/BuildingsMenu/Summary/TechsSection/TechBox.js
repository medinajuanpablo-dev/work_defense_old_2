import React from "react";
import { FiCheckCircle, FiLock, FiUnlock } from "react-icons/fi";

import { useIndicatedStyles } from "@static/tailwind";
import { useGeneralStateReader } from "@state/hooks";

import { TECHS, techsOps, TEK } from "@static/contexts/technologies";

function TechBox({ categoryKey, columnKey, index }) {
  const gs = useGeneralStateReader("technologies.tree");
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES);

  const [hovered, setHovered] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "-") setExpanded(false);
      else if (e.key === "+") setExpanded(true);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function toggleExpansion() {
    setExpanded(!expanded);
    setHovered(!expanded);
  }

  const statusKey = React.useMemo(() => {
    const gsTechsColumn = gs.technologies.tree[categoryKey][columnKey];
    return techsOps.getStatus(gsTechsColumn, index);
  }, [categoryKey, columnKey, index]);

  const tech = TECHS.TREE[categoryKey][columnKey][index];
  const status = STATUS_DISPLAY[statusKey];

  const styles = getActiveStyles({ statusKey, hovered });

  return (
    <div
      className={styles.ct}
      onClick={toggleExpansion}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.header}>
        <p className={styles.title}>{tech.NAME}</p>
        <status.Icon className={styles.statusIcon} />
      </div>

      {expanded && (
        <>
          <p className={styles.description}>{tech.DESCRIPTION}</p>
          <p className={styles.statusName}>{status.name}</p>
        </>
      )}
    </div>
  );
}

//prettier-ignore
const DIRECTED_STYLES = {
  ct: "my-1 border-1 rounded py-1 px-2 text-xs text-gray-800 cursor-pointer | xs:text-sm xs:my-2 || re<border-green-500> av<border-blue-500> lo<border-gray-400> ho<border-purple-700>",
  header: "flex justify-between items-center",
  title: "text-ss text-light | xs:text-sm || lo<text-gray-500> ho<text-purple-700>",
  description: "mt-2 text-light",
  statusIcon: "flex-none stroke-3 ml-1 || re<text-green-500> av<text-blue-500> lo<text-gray-400>",
  statusName: "mt-3 border-t-1 pt-1 text-center text-light || re<border-green-400'text-green-500> av<border-blue-400'text-blue-500> lo<border-gray-400'text-gray-500>",
};

//prettier-ignore
const INDICATORS = [
  { key: "researched", directive: "re", condition: (p) => p.statusKey === TEK.STATUS.RESEARCHED },
  { key: "available", directive: "av", condition: (p) => p.statusKey === TEK.STATUS.AVAILABLE },
  { key: "locked", directive: "lo", condition: (p) => p.statusKey === TEK.STATUS.LOCKED },
  { key: "hovered", directive: "ho", condition: (p) => p.hovered },
];

export const STATUS_DISPLAY = {
  [TEK.STATUS.RESEARCHED]: { name: "Researched", Icon: FiCheckCircle },
  [TEK.STATUS.LOCKED]: { name: "Locked", Icon: FiLock },
  [TEK.STATUS.AVAILABLE]: { name: "Available", Icon: FiUnlock },
};

export default TechBox;
