import Loadable from "react-loadable";
import { createBrowserHistory } from "history";
import renderApp from "./utils/client/renderApp";
import routes from "./routes";
import configureStore from "./store/configureStore";
import "./styles/globals/globals.scss";

//= =============================================================================//
// CLIENT-SIDE RENDERING SETUP                                                    /
//= =============================================================================//

const history = createBrowserHistory(); // create browserhistory
const initialState = window.__INITIAL_PROPS__; // grabs redux state from server on load
delete window.__INITIAL_PROPS__;
const store = configureStore(history, initialState); // sets up redux store with history and initial state

Loadable.preloadReady().then(() => renderApp({ routes, history, store })); // react-loadable preloaded routes, history and store

// Enable webpack hot module replacement
if (module.hot) {
  module.hot.accept("./routes", () => {
    try {
      const nextRoutes = require("./routes").default;
      renderApp({ routes: nextRoutes, history, store });
    } catch (err) {
      console.error(`Routes hot reloading error: ${err}`);
    }
  });
}
