import React from "react";

import { CuteModal } from "@common/index";

function ModalBoxExample() {
  const [showingList, setShowingList] = React.useState(false);
  const [listEnabled, setListEnabled] = React.useState(true);

  const { current: cv } = React.useRef({ xd: 0 });

  //The listEnabled behavior is just an example of use of the 'finished' param of onClose.
  function onListClose(finished) {
    if (!finished) {
      setShowingList(false);
      setListEnabled(false);
      console.log("List disabled, wait a moment...");
    } else
      setTimeout(() => {
        setListEnabled(true);
        console.log("List enabled again!");
      }, 2000);
  }

  return (
    <>
      <div className="text-center mt-16">
        <div className="flex flex-col md:flex-row justify-around">
          <button
            disabled={!listEnabled}
            onClick={() => setShowingList(true)}
            className={
              "mt-8 mb-8 text-xl px-8 py-2 rounded-md border-1 text-slate-700 border-orange-500 hover:bg-orange-500 hover:text-gray-100"
            }
          >
            View Multiverse List
          </button>
        </div>
      </div>
      {Array(5)
        .fill(0)
        .map((x, i) => (
          <div key={i} className="h-64"></div>
        ))}

      {/* This is the only part with a StylesObject just for example. */}

      <CuteModal
        visible={showingList}
        onClose={onListClose}
        customDirSty={STYLES.listModal}
        fadeSpeed="slow"
      >
        <p className={STYLES.title}>List of Universes [{cv.xd++}]</p>

        {UNIVERSES_LIST.map((u) => (
          <div key={u.name} className={STYLES.universe}>
            <p className={STYLES.universeName}>{u.name}</p>
            <p className={STYLES.universeDescription}>{u.description}</p>
          </div>
        ))}
      </CuteModal>
    </>
  );
}

const STYLES = {
  listModal: {
    ct: "border-blue-500",
  },

  title: "text-center text-xl text-slate-700 mb-4",

  universe: "my-3",
  universeName: "text-purple-500",
  universeDescription: "text-slate-700 text-light",
};

const UNIVERSES_LIST = [
  { name: "Alpha Universe", description: "This universe commands the rest." },
  { name: "Tree Universe", description: "This universe is full of trees." },
  {
    name: "Octopus Universe",
    description: "This universe is full of octopuses.",
  },
];

export default ModalBoxExample;
