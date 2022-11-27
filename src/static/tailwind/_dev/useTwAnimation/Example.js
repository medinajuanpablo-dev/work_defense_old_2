import React from "react";

import { useTwAnimation } from "@static/tailwind";

const ANIMATION_CONFIG = {
  glowing: {
    stylesChain: ["bg-white", "bg-yellow-300", "bg-indigo-300", "bg-red-300"],
    msTrans: 500,
  },
};

function Example() {
  const [forcedCancel, setForcedCancel] = React.useState(false);
  const anims = useTwAnimation(ANIMATION_CONFIG);

  const isGlowing = anims.isOngoing("glowing");

  function glow() {
    console.log("Starting Glowing");
    anims.startAnimations("glowing").then((cancelled) => {
      console.log("Glowing finished");
      if (!cancelled) restoreGlowing();
      else console.log("Not restored due to cancellation: ", cancelled);
    });
  }

  function restoreGlowing() {
    console.log("Restoring Glowing");
    anims
      .restoreAnimations("glowing")
      .then(() => console.log("Glowing restored"));
  }

  function forceCancel() {
    if (isGlowing) {
      if (anims.cancelAnimations("glowing")) {
        console.log("Glowing cancelled");
        setForcedCancel(true);
      }
    }
  }

  function restoreFromForced() {
    if (forcedCancel) {
      restoreGlowing();
      setForcedCancel(false);
    }
  }

  return (
    <div className={"p-32 text-center" + anims.transStyles.glowing}>
      <p className="mb-12 text-2xl">Trying useTwAnimation</p>

      <button
        onClick={
          isGlowing ? (forcedCancel ? restoreFromForced : forceCancel) : glow
        }
        className={
          "border-blue-800 text-xl border-2 py-2 px-8 rounded-xl transition-all duration-500 transform hover:scale-120 hover:text-red-500 hover:border-yellow-400 focus:outline-black focus:outline-2 focus:outline-offset-2"
        }
      >
        <strong>
          {isGlowing
            ? forcedCancel
              ? "Restore"
              : "Cancel"
            : "I make everything glow"}
        </strong>
      </button>
      <p className="mt-12 text-base">
        (The hover transition is made with pure tailwind)
      </p>
    </div>
  );
}

export default Example;
