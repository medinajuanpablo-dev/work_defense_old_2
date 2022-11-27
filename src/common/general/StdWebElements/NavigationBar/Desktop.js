import React from "react";

import { useIndicatedStyles } from "@static/tailwind";
import { useCustomizableStyles } from "@static/react";
import { typeOf } from "@static/functions";

function DesktopNavLayout({
  currentRoute,
  onLinkClick,
  onLogoClick,
  links,
  logo,
  customDirSty = {},
}) {
  const styles = useCustomizableStyles(STYLES, customDirSty.bar);

  return (
    <>
      <div className={styles.ct}>
        <div onClick={onLogoClick} className={styles.logoCt}>
          {typeOf(logo.Image, "string") ? (
            <img alt="logo" src={logo.Image} className={styles.logoImage} />
          ) : (
            <logo.Image className={styles.logoImage} />
          )}
          <p>{logo.text}</p>
        </div>

        <div className={styles.linksCt}>
          {links.map((lk) => (
            <Link
              key={lk.to + lk.text}
              onClick={() => onLinkClick(lk)}
              Icon={lk.Icon}
              text={lk.text}
              isSelected={lk.to == currentRoute}
              customDirSty={customDirSty}
              outstanding={lk.outstanding}
            />
          ))}
        </div>
      </div>
    </>
  );
}

//prettier-ignore
/**
 * @typedef {Object} BarStylesObject
 * @property {string} ct **CWC**. Default Styles: `"fixed top-0 left-0 w-screen bg-slate-300 bg-opacity-70 flex justify-between items-center pl-4 pr-6 py-2 z-50 | lg:py-3"`
 * @property {string} logoCt **CWC**. Default Styles: `"flex items-center text-slate-500 text-light text-xl cursor-pointer | lg:text-2xl"`
 * @property {string} logoImage **CS**. Default Styles: `"w-10 h-10 mr-1"`
 * @property {string} linksCt **CS**. Default Styles: `"  linksCt: "flex items-center"`
 */
const STYLES = {
  ct: "fixed top-0 left-0 w-screen bg-slate-300 bg-opacity-70 flex justify-between items-center pl-4 pr-6 py-2 z-50 | lg:py-3",
  logoCt: "flex items-center text-slate-500 text-light text-xl cursor-pointer | lg:text-2xl",
  logoImage: "w-10 h-10 mr-1",
  linksCt: "flex items-center",
};

function Link({ onClick, Icon, text, isSelected, customDirSty, outstanding }) {
  const getActiveStyles = useIndicatedStyles(
    LINK_INDICATORS,
    LINK_DIRECTED_STYLES,
    { customDirSty: customDirSty.link }
  );

  const [hovered, setHovered] = React.useState(false);

  const styles = getActiveStyles({ hovered, isSelected, outstanding });

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={styles.ct}
    >
      <p>{text}</p>
      <Icon className={styles.icon} />
    </div>
  );
}

/**
 * @typedef {Object} LinkStylesObject
 * @property {string} ct **CWC**. Default Styles: `"flex ml-6 border-b-2 border-transparent pr-1 pb-1 pt-2 text-slate-500 text-light leading-none items-end cursor-pointer | lg:ml-8 lg:text-xl || ho<text-sky-700> se<border-slate-500> ot<border-2'bg-slate-400'bg-opacity-80'text-slate-100'justify-center'items-center'pb-2'lg:pb-3'pt-2'lg:pt-3'pl-4'pr-4'rounded-md>"`
 * @property {string} icon **CS**. Default Styles: `"shrink-0 ml-2 text-lg || ot<text-2xl>"`
 */
const LINK_DIRECTED_STYLES = {
  ct: "flex ml-6 border-b-2 border-transparent pr-1 pb-1 pt-2 text-slate-500 text-light leading-none items-end cursor-pointer | lg:ml-8 lg:text-xl || ho<text-sky-700> se<border-slate-500> ot<border-2'bg-slate-400'bg-opacity-80'text-slate-100'justify-center'items-center'pb-2'lg:pb-3'pt-2'lg:pt-3'pl-4'pr-4'rounded-md>",
  icon: "shrink-0 ml-2 text-lg || ot<text-2xl>",
};

const LINK_INDICATORS = [
  { key: "hovered", directive: "ho", condition: (p) => p.hovered },
  { key: "selected", directive: "se", condition: (p) => p.isSelected },
  { key: "outstanding", directive: "ot", condition: (p) => p.outstanding },
];

export default DesktopNavLayout;
