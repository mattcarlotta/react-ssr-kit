import isEmpty from "lodash/isEmpty";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { renderRoutes, matchRoutes } from "react-router-config";
import { Provider } from "react-redux";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import { createMemoryHistory } from "history";
import Helmet from "react-helmet";
import chalk from "chalk";

import routes from "routes";
import configureStore from "store/configureStore";
import { inDevelopment } from "../../../envs";
import renderHtml from "./renderHtml";

//= =============================================================================//
// SERVER-SIDE ROUTING TO HANDLE ASSET CHUNKING AND DISPERSAL                     /
//= =============================================================================//

export default app => {
  app.get("*", async (req, res) => {
    const history = createMemoryHistory({ initialEntries: [req.url || ""] });
    const store = configureStore(history);

    const loadInitialState = () => {
      const branch = matchRoutes(routes, req.path);

      const promises = branch.map(async ({ route }) => {
        if (route.loadInitState) {
          const response = await Promise.all(route.loadInitState());
          return response.map(({ data }) => ({ ...data }));
        }
        return null;
      });

      return Promise.all(promises);
    };

    // The method for loading data from server-side
    const loadReduxData = () => {
      const branch = matchRoutes(routes, req.path);

      const promises = branch.map(({ route, match }) => {
        if (route.loadReduxStore) {
          return Promise.all(
            route
              .loadReduxStore({
                params: match.params,
                getState: store.getState
              })
              .map(item => store.dispatch(item))
          );
        }

        return Promise.resolve(null);
      });

      return promises;
    };

    const flattenToObject = arr => {
      const obj = {};
      arr.forEach(elem => {
        Object.assign(obj, elem);
      });
      return obj;
    };

    (async () => {
      try {
        // Load data from server-side first
        await loadReduxData();
        const [, data] = await loadInitialState();
        const initialState = !isEmpty(data) ? flattenToObject(data) : {};

        const modules = [];
        const staticContext = initialState;
        const AppComponent = (
          <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <Provider store={store}>
              <StaticRouter location={req.path} context={staticContext}>
                {renderRoutes(routes)}
              </StaticRouter>
            </Provider>
          </Loadable.Capture>
        );

        // Check if the render result contains a redirect, if so we need to set
        // the specific status and redirect header and end the response
        if (staticContext.url) {
          res.status(301).setHeader("Location", staticContext.url);
          res.end();

          return;
        }

        // Check page status
        const status = staticContext.status === "404" ? 404 : 200;

        const head = Helmet.renderStatic();
        const initialProps = store.getState();
        const htmlContent = renderToString(AppComponent);

        const loadableManifest = require("../../../public/loadable-assets.json");
        const bundles = getBundles(loadableManifest, modules);
        let assets = bundles
          .map(({ publicPath }) =>
            !publicPath.includes("main") ? publicPath : ""
          )
          // In development, main.css and main.js are webpack default file bundling name
          // we put these files into assets with publicPath
          .concat(["/assets/main.css", "/assets/main.js"]);

        if (!inDevelopment) {
          const webpackManifest = require("../../../public/webpack-assets.json");
          assets = bundles
            .map(({ publicPath }) => publicPath)
            .concat(
              Object.keys(webpackManifest)
                .map(key => webpackManifest[key])
                .reverse()
            );
        }

        // Pass the route and initial state into html template
        res
          .status(status)
          .send(
            renderHtml(head, assets, htmlContent, initialState, initialProps)
          );
      } catch (err) {
        res.status(404).send("Not Found :(");

        console.error(chalk.red(`Rendering routes error: ${err}`));
      }
    })();
  });
};
