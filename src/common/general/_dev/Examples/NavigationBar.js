import React from "react";

import { NavigationBar } from "@common/index";
import { FaHome, FaInfoCircle, FaMoneyBill } from "react-icons/fa";
import { BsPlayFill } from "react-icons/bs";

function NavigationBarExample() {
  return (
    <>
      <NavigationBar
        others={{ sideBarTitle: "Go to" }}
        links={[
          { Icon: FaHome, text: "Home", to: "/" },
          { Icon: FaInfoCircle, text: "About", to: "/about" },
          { Icon: FaMoneyBill, text: "Pricing", to: "/pricing" },
          {
            Icon: BsPlayFill,
            text: "Get Started",
            to: "/get_started",
            outstanding: true,
          },
        ]}
        customDirSty={{
          mobile: {
            link: { ct: "|| ot<pl-2>" },
          },
          desktop: {
            bar: { ct: "bg-purple-200" },
            link: { icon: "|| ot<ml-1>" },
          },
        }}
      />
    </>
  );
}

export default NavigationBarExample;
