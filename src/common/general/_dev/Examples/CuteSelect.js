import React from "react";
import { FaHamburger, FaCheese, FaHotdog } from "react-icons/fa";
import { GiWaterBottle } from "react-icons/gi";

import { CuteSelect } from "@common/index";

const OPTIONS = {
  hamburger: { text: "Hamburguesa", Icon: FaHamburger },
  cheese: { text: "Queso", Icon: FaCheese },
  hotdog: { text: "Panchito", Icon: FaHotdog },
  water: { text: "Agua", Icon: GiWaterBottle },
};

function CuteSelectExample() {
  const [selectedKey, setSelectedKey] = React.useState(null);
  const [listVisible, setListVisible] = React.useState(false);
  const [hoveredOption, setHoveredOption] = React.useState(null);

  return (
    <>
      <div className={STYLES.ct}>
        <CuteSelect
          label="Elija su Pedido"
          selectedKey={selectedKey}
          onSelection={(selectedKey) => setSelectedKey(selectedKey)}
          listVisible={listVisible}
          onToggle={(listVisible) => setListVisible(listVisible)}
          hoveredOption={hoveredOption}
          onHoveredOptionChange={(hoveredOption) =>
            setHoveredOption(hoveredOption)
          }
          customDirSty={SELECT_DIRECTED_STYLES.main}
          options={OPTIONS}
          // hideOnBlur={false}
        />

        <CuteSelect
          label="Otro más?"
          customDirSty={SELECT_DIRECTED_STYLES.main}
          options={OPTIONS}
          // hideOnBlur={false}
        />
      </div>
      <button
        className={STYLES.externalButton}
        onClick={() => setSelectedKey(selectedKey ? null : "cheese")}
      >
        Choose {selectedKey ? "Nothing" : "Cheese"} externally
      </button>
      <button
        className={STYLES.externalButton}
        onClick={() => setListVisible(!listVisible)}
      >
        {listVisible ? "Close" : "Open"} List externally
      </button>
      <button
        className={STYLES.externalButton}
        onClick={() => setHoveredOption(hoveredOption ? null : "water")}
      >
        {hoveredOption ? "Unhover" : "Hover Water"} externally
      </button>

      <button
        className={STYLES.externalButton}
        onClick={() => {
          setListVisible(true);
          setTimeout(() => setHoveredOption("hamburger"), 500);
          setTimeout(() => setSelectedKey("hamburger"), 1000);
          setTimeout(
            () => setListVisible(false) || setHoveredOption(null),
            1500
          );
        }}
      >
        Mark Hamburger
      </button>
    </>
  );
}

/**This component own styles. */
const STYLES = {
  ct: "h-screen-1/2 py-8 mt-4 md:px-32 lg:px-64 xl:px-96",
  externalButton: "border-1 border-gray-800 w-64 py-2 mr-2",
};

/**Styles for `CuteSelect`. */
const SELECT_DIRECTED_STYLES = {
  main: {
    // displayLabel: "hidden",
    ct: "mb-12 mx-auto",
    listCt: "bg-white",
  },
  option: {
    icon: "translate-x-0 opacity-100 ho,se<text-gray-800>",
  },
};

export default CuteSelectExample;
