import { FaHome, FaBeer } from "react-icons/fa";

import { BREAKPOINTS as BPK, PAGES as PGK } from "./keys";

export const BREAKPOINTS_WIDTHS = {
  [BPK.MONITOR]: 1500,
  [BPK.WIDE_LAPTOP]: 1280,
  [BPK.LAPTOP]: 1024,
  [BPK.HORIZONTAL_TABLET]: 768,
  [BPK.VERTICAL_TABLET]: 500,
  [BPK.PHONE]: 350,
  [BPK.SMALL_PHONE]: 0,
};

export const PAGES = {
  [PGK.HOME]: { name: "Home", route: "/" },
  [PGK.REDUX_EXAMPLE]: { name: "Redux Example", route: "/redux" },

  [PGK.NOT_FOUND]: { name: "Not Found", route: "" },
};

export const NAV_OPTIONS = [
  { toPage: PGK.HOME, text: "Home", Icon: FaHome },
  { toPage: PGK.REDUX_EXAMPLE, text: "Redux Example", Icon: FaBeer },
];

export const MISCELLANEOUS = {
  PAGE_CHANGE_SCROLL_TO_TOP_DURATION: 700,
};
