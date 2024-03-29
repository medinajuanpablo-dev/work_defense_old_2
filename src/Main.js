import React from "react";

import { usgMessagesList } from "@common/index";
import { useGeneralStateReader } from "@state/hooks";

import STAGES from "./stages";

function Main() {
  const gs = useGeneralStateReader("miscellaneous.stage");

  React.useEffect(() => {
    //Initial and whole-app context processes.
  }, []);

  const Stage = STAGES[gs.miscellaneous.stage];

  return (
    <div className={STYLES.ct}>
      <Stage />
    </div>
  );
}

const STYLES = {
  ct: "pt-12 pb-4 px-4 bg-gray-100 min-h-screen",
};

export default Main;
