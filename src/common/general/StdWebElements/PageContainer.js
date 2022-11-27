import React from "react";
import { animateScroll } from "react-scroll";
import { useNavigate } from "react-router-dom";

import { useIndicatedStyles } from "@static/tailwind";
import { checkOptionalValues } from "@static/functions";

import { PAGES } from "@static/values/config";
import { PAGES as PGK } from "@static/values/keys";

/**
 * Page Wrapper with general page structure and header. Sub-navigation links can be specified for the Header.
 * The title can be specified or uses the name of the current page by default.
 *
 * **REQUIRES** standarized values of pages and their keys.
 * @param {Object} props
 * @param {string} props.pageTitle Title to show at the top of the page.
 * @param {Array<string | { variablePageKey: string, specificKey: string }>} props.subNavPages Keys of the pages to include in the sub-navigation. A specific instance of a variable page must be indicated as an object.
 * @param {"slow" | "default" | "fast" | "instant" | "none"} props.toTopScrollSpeed Speed of the scroll to the top when rendering the page.
 */
function PageContainer({
  subNavPages = [],
  pageTitle,
  toTopScrollSpeed = "none",
  children,
}) {
  checkOptionalValues([
    { pageTitle, type: "string" },
    { subNavPages, itemsType: ["string", "object"] },
    { toTopScrollSpeed, enmr: ["slow", "default", "fast", "instant", "none"] },
  ]);

  //Read keys subNavPages and map them to their values, including variable pages. Also always add home as the first option.
  const subNavPagesValues = React.useMemo(
    () => [
      PAGES[PGK.HOME],
      ...subNavPages.map((navOption) =>
        typeof navOption === "object"
          ? PAGES[navOption.variablePageKey].ofKey(navOption.specificKey)
          : PAGES[navOption]
      ),
    ],
    [subNavPages]
  );

  React.useEffect(() => {
    if (toTopScrollSpeed != "none")
      animateScroll.scrollToTop({
        duration: SCROLL_DURATIONS[toTopScrollSpeed],
      });
  }, []);

  const title =
    pageTitle || subNavPagesValues[subNavPagesValues.length - 1].name;

  return (
    <>
      <div className={STYLES.ct}>
        <h2 className={STYLES.title}>{title}</h2>

        {subNavPagesValues.map((option, index) => (
          <SubNavOption
            key={option.index}
            {...option}
            isLast={index === subNavPagesValues.length - 1}
          />
        ))}
      </div>

      {children}
    </>
  );
}

//prettier-ignore
const STYLES = {
  ct: "pt-24 pb-8 px-2 text-gray-100 bg-gradient-to-tr from-blue-700 to-blue-200 bg-opacity-80 shadow text-center shadowed-box | sm:pt-28",
  title: "text-strong text-center text-2xl text-gray-100 text-opacity-90 leading-snug mb-2 | md:text-4xl",  
};

const SCROLL_DURATIONS = { slow: 750, default: 500, fast: 250, instant: 0 };

function SubNavOption({ isLast, name, route }) {
  const navigateTo = useNavigate();

  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(OPTION_INDICATORS, OPTION_DIRECTED_STYLES);

  function onClick() {
    if (isLast) return;
    navigateTo(route);
  }

  const styles = getActiveStyles({ isLast });

  return (
    <>
      <span onClick={onClick} className={styles.ct}>
        {name}
      </span>
      {!isLast && <span className={styles.dash}>/</span>}
    </>
  );
}

const OPTION_DIRECTED_STYLES = {
  ct: "mx-1 cursor-pointer subtext-light border-b-2 border-gray-100 border-opacity-0 transition-all duration-250 hover:border-opacity-100 | sm:text-xl || la<select-none'border-opacity-0>",
  dash: "mx-1 cursor-default",
};

const OPTION_INDICATORS = [
  { key: "lastOption", directive: "la", condition: (p) => p.isLast },
];

/**
 * @typedef {string} SubNavPage
 *
 */

export default PageContainer;
