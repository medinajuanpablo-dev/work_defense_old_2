import React from "react";
import { useRoutes } from "react-router-dom";

import { Navigation } from "@common/index";

import PAGES_ROUTES_CONFIG from "./pages";

//Top Manager.
function App() {
  const currentPage = useRoutes(PAGES_ROUTES_CONFIG);

  // React.useEffect(() => {
  //   //Initial and whole-app context processes.
  // }, []);

  return (
    <>
      <Navigation />
      {currentPage}
      {/* <Footer /> */}
    </>
  );
}

export default App;
