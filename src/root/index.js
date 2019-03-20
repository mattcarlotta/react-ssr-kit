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

App.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.oneOf(["object", "undefined"])
    }),
    push: PropTypes.func,
    replace: PropTypes.func
  }),
  store: PropTypes.shape({
    dispatch: PropTypes.func,
    getState: PropTypes.func,
    liftedStore: PropTypes.shape({
      dispatch: PropTypes.func,
      subscribe: PropTypes.func,
      getState: PropTypes.func,
      replaceReducer: PropTypes.func,
      Symbol: PropTypes.func
    }),
    replaceReducer: PropTypes.func,
    subscribe: PropTypes.func,
    Symbol: PropTypes.func
  }),
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.func,
      routes: PropTypes.arrayOf(
        PropTypes.shape({
          path: PropTypes.string,
          exact: PropTypes.bool,
          component: PropTypes.func,
          loadReduxStore: PropTypes.func,
          loadInitState: PropTypes.func
        })
      )
    })
  )
};

export default App;
