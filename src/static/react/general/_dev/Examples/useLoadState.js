import React from "react";

import { wait } from "@static/functions";

import { useLoadState } from "@static/react";

function UseLoadStateExample() {
  const loadState = useLoadState({
    initialMessage: "Submit",
    loadingStyles: LOADING_STYLES,
  });

  async function submit() {
    if (!loadState.is("holding")) return;

    loadState.set("loading", "Submitting...");

    await wait(1500);

    if (Math.random() < 0.34) loadState.set("error", "Error!");
    else loadState.set("success", "Done!");

    setTimeout(() => loadState.set("holding", "Submit"), 1500);
  }

  return (
    <div className="text-center">
      <button
        disabled={!loadState.is("holding")}
        onClick={submit}
        className={loadState.styles.button}
      >
        {loadState.message}
      </button>
    </div>
  );
}

//prettier-ignore
const LOADING_STYLES = {
  button: "w-48 text-xl mt-8 py-2 rounded-xl bg-gray-600 text-gray-200 shadowed-box || ldHo<hover:bg-gray-500> ldGo<bg-gray-600'cursor-not-allowed> ldSu<bg-green-600'cursor-not-allowed> ldEr<bg-red-600'cursor-not-allowed>",
};

export default UseLoadStateExample;
