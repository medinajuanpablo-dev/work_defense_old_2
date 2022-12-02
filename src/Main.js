import React from "react";

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
  ct: "pt-10 pb-4 px-2 bg-gray-100 min-h-screen | xs:pt-12 xs:px-4",
};

export default Main;
