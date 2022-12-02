import React from "react";
import { CgEnter } from "react-icons/cg";

import { CuteCheckbox } from "@common/index";
import { checkRequiredValues } from "@static/functions";

import GenericTopBar from "./Generic";
import TopBarButton from "./Button";

function FiltersTopBar({
  closeMenu,
  filtersNames,
  filtersState,
  customStyles,
}) {
  return (
    <GenericTopBar customStyles={customStyles}>
      <TopBarButton
        onClick={closeMenu}
        customStyles={STYLES.exitButton}
        Icon={CgEnter}
      />
      <div className={STYLES.showCt}>
        {Object.keys(filtersNames).map((f) => (
          <CuteCheckbox
            customDirSty={STYLES.showCheckbox}
            key={f}
            checked={filtersState.get[f]}
            onChange={(checked) => filtersState.merge({ [f]: checked })}
            label={filtersNames[f]}
          />
        ))}
      </div>
    </GenericTopBar>
  );
}

//prettier-ignore
const STYLES = {
  exitButton: { button: "border-r-2 w-1/6", icon: "transform flip" },

  showCt: "flex-1 px-2 flex | xs:px-4",
  showCheckbox: {
    ct: "mr-3",
    label: "text-light text-gray-100 text-sm mx-1 | xs:text-base || ho<text-blue-300>",
    box: "border-gray-100 w-4 h-4 | xs:w-5 xs:h-5 || ho<border-blue-300>",
    check: "text-gray-100 stroke-3 || ho<text-gray-100>",
  },
};

export default FiltersTopBar;
