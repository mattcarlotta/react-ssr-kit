import React from "react";
import ReactDOM from "react-dom";
import App from "root";

//= =============================================================================//
// CLIENT-SIDE HOT LOADING, REDUX STATE, AND ROUTE SETUP                          /
//= =============================================================================//

/**
 * Factory function to hydrate the client-side DOM
 * @function renderApp
 */
const renderApp = props => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  renderMethod(<App {...props} />, document.getElementById("root"));
};

export default renderApp;
