import React from "react";
import { animateScroll } from "react-scroll";

/**General behavior for every different screen, considering a screen a screen-wide group of interfaces
 * completely different from the rest. Also Screens always have a Topbar declared in their markup.
 *
 * For example: Each Menu and Submenus are all Screens, but sections in them are not.  */
function Screen({ children, ...props }) {
  React.useEffect(() => {
    animateScroll.scrollToTop();
  }, []);

  return <div {...props}>{children}</div>;
}

export default Screen;
