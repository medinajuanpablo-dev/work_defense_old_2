import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoNavigateCircleOutline } from "react-icons/io5";

import { useBreakpoint } from "@static/react";

import { BREAKPOINTS as BPK } from "@static/values/keys";

import DesktopNavLayout from "./Desktop";
import MobileNavLayout from "./Mobile";

/** A ready-to-use Navigation Bar with default styles applied and very easy to customize.
 * @param {Object} props
 * @param {Logo} props.logo The combination of image-text to appear at the left side of the Navigation Bar.
 * @param {Array<Link>} props.links The list of links that will be displayed at the right side of the Navigation Bar.
 * @param {CustomDirSty} props.customDirSty Custom styles (directed or not) for every element.
 * @param {Object} props.others Other properties
 * @param {string} props.others.sideBarTitle Title for the Side Bar when in Mobile.
 */
function NavigationBar({
  logo = LOGO_DEFAULT,
  links = [],
  customDirSty = {},
  others = {},
}) {
  const routerRoute = useLocation().pathname;
  const navigateTo = useNavigate();

  const bp = useBreakpoint();

  function onLinkClick(lk) {
    navigateTo(lk.to);
  } //Redundant now, but might be useful later.

  function onLogoClick() {
    navigateTo(logo.to);
  }

  const currentRoute = routerRoute; //Redundant now, but might be useful later.
  //prettier-ignore
  const props = { currentRoute, onLinkClick, onLogoClick, links, logo };

  return bp.isWiderThan(BPK.VERTICAL_TABLET) ? (
    <DesktopNavLayout customDirSty={customDirSty.desktop} {...props} />
  ) : (
    <MobileNavLayout
      customDirSty={customDirSty.mobile}
      sideBarTitle={others.sideBarTitle}
      {...props}
    />
  );
}

const LOGO_DEFAULT = {
  Image: IoNavigateCircleOutline,
  text: "Navigate",
  to: "/",
};

/**
 * @typedef {Object} Logo
 * @property {string | React.Component} Image The image source string or Component to appear in the Navigation Bar.
 * @property {string} text The text to appear aside the logo's image.
 * @property {string} to Route to navigate to when clicking the logo. By default, navigates to "/" (home).
 *
 * @typedef {Object} Link
 * @property {string} to Route to which this link will navigate to.
 * @property {React.Component} Icon The link's visible icon Component.
 * @property {string} text The link's visible text.
 * @property {boolean} outstanding If `true`, the link will be outstanding.
 *
 * @typedef {Object} CustomDirSty
 * @property {Object} mobile Styles for the Mobile Navigation Bar.
 * @property {import("./Mobile").MainBarStylesObject} mobile.mainBar Styles for the Mobile Main Bar at the top.
 * @property {import("./Mobile").SideBarStylesObject} mobile.sideBar Styles for the Mobile Side Bar appearing at clicking the burger icon.
 * @property {import("./Mobile").LinkStylesObject} mobile.link Styles for every Mobile Link in the Side Bar.
 * @property {Object} desktop Styles for the Desktop Navigation Bar.
 * @property {import("./Desktop").BarStylesObject} desktop.bar Styles for the Desktop Top Bar.
 * @property {import("./Desktop").LinkStylesObject} desktop.link Styles for every Desktop Link in the Top Bar.
 */

export default NavigationBar;
