import React from "react";

import { animateScroll } from "react-scroll";

function Home() {
  React.useEffect(() => {
    animateScroll.scrollToTop();
  }, []);

  return <p className="h-200">Hello World</p>;
}

export default Home;
