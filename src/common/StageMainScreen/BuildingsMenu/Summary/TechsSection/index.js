import React from "react";
import { BsCapslockFill, BsQuestionCircle } from "react-icons/bs";

import { LineTitle, CuteActionNotice } from "@common/index";
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
        <div className={STYLES.pointsInfo}>
          <CuteActionNotice
            title="When can I research?"
            body="You can spend your research points into new techs only in the Research Stage."
            ButtonIcon={BsQuestionCircle}
            customDirSty={{
              buttonCt: STYLES.pointsInfoButton,
            }}
          />
        </div>
      </div>

      <div className={STYLES.techTreeCt}>
        {Object.keys(TECHS.TREE).map((categoryKey) => (
          <React.Fragment key={categoryKey}>
            <LineTitle margin="t-small" subtitle size="smaller">
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
  pointsCt: "relative flex justify-center items-center mt-4 border-1 border-dotted rounded-md p-2 w-3/4 border-indigo-500 mx-auto text-sm | xs:w-2/3 xs:text-base",
  pointsLabel: "text-gray-600 text-light text-sm | xs:text-base",
  pointsText: "text-indigo-500 text-strong leading-none ml-2 text-lg",
  pointsIcon: "mr-2 mb-2px text-xl text-gray-500",
  pointsInfo: "absolute -right-8",
  pointsInfoButton: "text-slate-500 || ho,sh<text-blue-600>",

  techTreeCt: "flex flex-col mt-2",
  categoryCt: "flex",

  columnTitle: "text-center text-light my-2 text-slate-600 text-sm",
  leftCol: "flex-1 flex flex-col text-gray-800 pr-2",
  rightCol: "flex-1 flex flex-col text-gray-800 pl-2",
};

/**Name of each technology category. */
const CATEGORIES_NAMES = {
  [TEK.CATEGORIES.ECONOMIC]: "Economic",
  [TEK.CATEGORIES.MILITARY]: "Military",
};

export default TechsSection;
