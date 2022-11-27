import React from "react";
import { IoMenu, IoClose } from "react-icons/io5";

import { useIndicatedStyles } from "@static/tailwind";
import { useFocusSensor, useCustomizableStyles } from "@static/react";
import { typeOf } from "@static/functions";

/*
  Aquí TogglerIcon, toggleSideBar y useFocusSensor funcionan bien por un bug: Debería suceder el bug
  de utilizar el `sideBarFocus.focused` como estado controlado, pero no ocurre.
  
  Aparentemente al renderizar y asignar TogglerIcon de esa forma, el sensor de focus ya no considera 
  los íconos como elementos focuseables y, por lo tanto, no genera el bug del focus.

  En otras palabras, un bug esta compensando el otro bug.

  Funciona pero no es consistente. No obstante, no es urgente corregirlo. Esperar hasta que esté
  coregido el bug del sensor de focus primero.
 */

function MobileNavLayout({
  currentRoute,
  onLinkClick,
  onLogoClick,
  links,
  logo,
  customDirSty = {},
  sideBarTitle,
}) {
  const sideBarRef = React.useRef({});
  const sideBarFocus = useFocusSensor(sideBarRef, { unfocusOnEscape: true });

  const styles = useCustomizableStyles(STYLES, customDirSty.mainBar);

  function toggleSideBar() {
    sideBarFocus.setFocused((wasFocused) => !wasFocused);
  }

  function linkClicked(lk) {
    sideBarFocus.setFocused(false);
    onLinkClick(lk);
  }

  const TogglerIcon = sideBarFocus.focused ? IoClose : IoMenu;

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

        <TogglerIcon className={styles.togglerIcon} onClick={toggleSideBar} />
      </div>

      <SideBar
        linkClicked={linkClicked}
        currentRoute={currentRoute}
        opened={sideBarFocus.focused}
        upperRef={sideBarRef}
        links={links}
        customDirSty={customDirSty}
        title={sideBarTitle}
      />
    </>
  );
}

//prettier-ignore
/**
 * @typedef {Object} MainBarStylesObject
 * @property {string} ct **CWC**. Default Styles: `"fixed top-0 left-0 w-screen bg-slate-300 bg-opacity-70 flex justify-between items-center pl-3 pr-4 py-2 z-50"`
 * @property {string} logoCt **CWC**. Default Styles: `"flex items-center text-slate-500 text-light text-xl cursor-pointer"`
 * @property {string} logoImage **CS**. Default Styles: `"w-8 h-8 mr-1"`
 * @property {string} togglerIcon **CS**. Default Styles: `"w-8 h-8 text-slate-500 cursor-pointer"`
 */
const STYLES = {
  ct: "fixed top-0 left-0 w-screen bg-slate-300 bg-opacity-70 flex justify-between items-center pl-3 pr-4 py-2 z-50",
  logoCt: "flex items-center text-slate-500 text-light text-xl cursor-pointer",
  logoImage: "w-8 h-8 mr-1",
  togglerIcon: "w-8 h-8 text-slate-500 cursor-pointer",
};

function SideBar({
  opened,
  upperRef,
  linkClicked,
  currentRoute,
  links,
  customDirSty,
  title,
}) {
  const getActiveStyles = useIndicatedStyles(
    SIDEBAR_INDICATORS,
    SIDEBAR_DIRECTED_STYLES,
    { customDirSty: customDirSty.sideBar }
  );

  const styles = getActiveStyles({ opened });

  return (
    <div ref={upperRef} className={styles.ct}>
      {title && <p className={styles.title}>{title}</p>}

      {links.map((lk) => (
        <Link
          key={lk.to + lk.text}
          onClick={() => linkClicked(lk)}
          Icon={lk.Icon}
          text={lk.text}
          isSelected={lk.to == currentRoute}
          customDirSty={customDirSty}
          outstanding={lk.outstanding}
        />
      ))}
    </div>
  );
}

//prettier-ignore
/**
 * @typedef {Object} SideBarStylesObject
 * @property {string} ct **CWC**. Default Styles: `"fixed z-40 flex flex-col items-center pt-8 px-6 right-0 top-12 w-screen-7/12 bg-slate-100 h-screen border-gray-500 transition duration-500 translate-x-70 rounded-tl-lg || op<translate-x-0>"`
 * @property {string} title **CS**. Default Styles: `"inline mb-8 text-slate-500 text-xl rounded-lg border-purple-500 text-light"`
 */
const SIDEBAR_DIRECTED_STYLES = {
  ct: "fixed z-40 flex flex-col items-center pt-8 px-6 right-0 top-12 w-screen-7/12 bg-slate-100 h-screen border-gray-500 transition duration-500 translate-x-70 rounded-tl-lg || op<translate-x-0>",
  title: "inline mb-8 text-slate-500 text-xl rounded-lg border-purple-500 text-light",
};

const SIDEBAR_INDICATORS = [
  { key: "opened", directive: "op", condition: (p) => p.opened },
];

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
      <p className={styles.text}>{text}</p>
      <Icon className={styles.icon} />
    </div>
  );
}

/**
 * @typedef {Object} LinkStylesObject
 * @property {string} ct **CWC**. Default Styles: `"self-stretch flex mb-8 justify-between border-b-2 border-slate-300 pr-1 pb-1 leading-none text-light items-end text-lg cursor-pointer || ho<border-slate-500> se<border-sky-600> ot<border-2'justify-center'items-center'pb-2'pt-2'pr-0'rounded-md'text-xl'mb-10>"`
 * @property {string} icon **CS**. Default Styles: `"shrink-0 text-2xl text-slate-500 || ho<text-slate-700> se<text-sky-600> ot<text-4xl>"`
 * @property {string} text **CS**. Default Styles: `"text-slate-600"`
 */
const LINK_DIRECTED_STYLES = {
  ct: "self-stretch flex mb-8 justify-between border-b-2 border-slate-300 pr-1 pb-1 leading-none text-light items-end text-lg cursor-pointer || ho<border-slate-500> se<border-sky-600> ot<border-2'justify-center'items-center'pb-2'pt-2'pr-0'rounded-md'text-xl'mb-10>",
  icon: "shrink-0 text-2xl text-slate-500 || ho<text-slate-700> se<text-sky-600> ot<text-4xl>",
  text: "text-slate-600",
};

const LINK_INDICATORS = [
  { key: "hovered", directive: "ho", condition: (p) => p.hovered },
  { key: "selected", directive: "se", condition: (p) => p.isSelected },
  { key: "outstanding", directive: "ot", condition: (p) => p.outstanding },
];

export default MobileNavLayout;
