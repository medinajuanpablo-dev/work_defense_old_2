import React from "react";
import { animateScroll } from "react-scroll";

/**General behavior for every different screen, considering a screen a
 * screen-wide group of interfaces completely different from the rest. */
function Screen({ children }) {
  React.useEffect(() => {
    animateScroll.scrollToTop();
  }, []);

  return <>{children}</>;
}

export default Screen;
