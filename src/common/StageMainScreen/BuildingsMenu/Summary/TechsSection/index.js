import React from "react";
import { BsCapslockFill } from "react-icons/bs";

import { LineTitle } from "@common/index";
import { useGeneralStateReader } from "@state/hooks";

import { TECHS, TEK } from "@static/contexts/technologies";

import TechBox from "./TechBox";

function TechsSection() {
  const gs = useGeneralStateReader("technologies.researchPoints");

  return (
    <>
      <LineTitle>Technologies</LineTitle>

      <div className={STYLES.pointsCt}>
        <BsCapslockFill className={STYLES.pointsIcon} />
        <p className={STYLES.pointsLabel}>Research Points:</p>
        <p className={STYLES.pointsText}>{gs.technologies.researchPoints}</p>
      </div>

      <div className={STYLES.techTreeCt}>
        {Object.keys(TECHS.TREE).map((categoryKey) => (
          <React.Fragment key={categoryKey}>
            <LineTitle subtitle size="smaller">
              {CATEGORIES_NAMES[categoryKey]}
            </LineTitle>
            <div className={STYLES.categoryCt}>
              {Object.keys(TECHS.TREE[categoryKey]).map((columnKey, index) => (
                <div
                  key={columnKey}
                  className={index == 0 ? STYLES.leftCol : STYLES.rightCol}
                >
                  <p className={STYLES.columnTitle}>
                    {TECHS.COLUMNS[columnKey].NAME} Column
                  </p>
                  {TECHS.TREE[categoryKey][columnKey].map((_, index) => (
                    <TechBox
                      key={index}
                      {...{ categoryKey, columnKey, index }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

//prettier-ignore
const STYLES = {
  pointsCt: "flex justify-center items-center mt-4 border-1 rounded-md p-2 w-3/4 border-indigo-500 mx-auto text-sm | xs:w-2/3 xs:text-base",
  pointsLabel: "text-gray-700 text-sm | xs:text-base",
  pointsText: "text-indigo-500 text-strong leading-none ml-2 text-base | xs:text-lg",
  pointsIcon: "mr-2 h-5 w-5 text-gray-700",

  techTreeCt: "flex flex-col mt-2",
  categoryCt: "flex",

  columnTitle: "text-center text-light my-1 text-sm",
  leftCol: "flex-1 flex flex-col text-gray-800 pr-2",
  rightCol: "flex-1 flex flex-col text-gray-800 pl-2",
};

/**Name of each technology category. */
const CATEGORIES_NAMES = {
  [TEK.CATEGORIES.ECONOMIC]: "Economic",
  [TEK.CATEGORIES.MILITARY]: "Military",
};

export default TechsSection;
