import React from "react";

import { useTwAnimation } from "@static/tailwind";

function AnimatedView() {
  const anims = useTwAnimation(ANIMATIONS_DEFINITIONS);

  return (
    <div
      onMouseEnter={() => anims.startAnimations("dissappear")}
      className={STYLES.ct + anims.transStyles.dissappear}
    >
      I dissappear
    </div>
  );
}

const STYLES = {
  ct: "p-2",
};

const ANIMATIONS_DEFINITIONS = {
  dissappear: {
    msTrans: 1000,
    stylesChain: ["opacity-100", "opacity-0"],
    // commonStyles: "",
    // finishedByDefault: false,
    // transitionType: "",
  },
};

export default AnimatedView;
