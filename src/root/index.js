/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
// import { AppContainer } from 'react-hot-loader';
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { renderRoutes } from "react-router-config";

const App = ({ history, routes, store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>{renderRoutes(routes)}</ConnectedRouter>
  </Provider>
);

export default App;
/* eslint-enable */
