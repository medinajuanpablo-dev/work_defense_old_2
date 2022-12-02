import React from "react";

import { useCustomizableStyles } from "@static/react";

function GenericTopBar({ customStyles, children }) {
  const styles = useCustomizableStyles(STYLES, customStyles);

  return <div className={styles.ct}>{children}</div>;
}

const STYLES = {
  ct: "fixed top-0 bg-indigo-500 bg-opacity-90 w-full left-0 flex z-40 justify-between items-center",
};

export default GenericTopBar;
