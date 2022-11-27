import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { PAGES, NAV_OPTIONS } from "@static/values/config";

function Navigation() {
  const routerRoute = useLocation().pathname;
  const redirectTo = useNavigate();

  return (
    <div style={{ marginBottom: "5rem" }}>
      {Object.values(NAV_OPTIONS).map((nav, index) => (
        <div
          key={index}
          style={{ display: "inline-block", marginLeft: "2rem" }}
        >
          <button
            onClick={() => redirectTo(PAGES[nav.toPage].route)}
            style={{
              borderBottom:
                routerRoute === PAGES[nav.toPage].route
                  ? "1px solid black"
                  : "",
            }}
          >
            {nav.text}
          </button>
          <nav.Icon style={{ display: "inline-block", marginLeft: "1rem" }} />
        </div>
      ))}
    </div>
  );
}

export default Navigation;
