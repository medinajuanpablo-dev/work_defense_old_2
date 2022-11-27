import React from "react";

import { useIndicatedStyles } from "@static/tailwind";

//Interface with defined styles changes: elements styles will change with events and all default/event styles
//are statically defined.

function IndicatedView() {
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES);

  const styles = getActiveStyles({});

  return <div className={styles.ct}>Something</div>;
}

const DIRECTED_STYLES = {
  ct: "p-2",
};

const INDICATORS = [];

export default IndicatedView;
