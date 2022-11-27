import { PAGES as PGK } from "@static/values/keys";
import { PAGES } from "@static/values/config";

import Home from "./Home";
import NotFound from "./NotFound";
import ReduxExample from "./ReduxExample";

const PAGES_ROUTES_CONFIG = [
  { path: PAGES[PGK.HOME].route, element: <Home /> },
  { path: PAGES[PGK.REDUX_EXAMPLE].route, element: <ReduxExample /> },

  { path: "*", element: <NotFound /> },
];

export default PAGES_ROUTES_CONFIG;
