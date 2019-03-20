import { createBrowserHistory } from "history";
import Home from "pages/Home/Home";
import configureStore from "store/configureStore";
import { App } from "../App";

const history = createBrowserHistory();
const initialState = window.__INITIAL_STATE__;
const store = configureStore(history, initialState);

const route = {
  path: "/",
  exact: true,
  component: Home
};

const wrapper = mount(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App route={route} />
    </ConnectedRouter>
  </Provider>
);

describe("App", () => {
  it("renders without errors", () => {
    expect(wrapper.find(".appContainer")).toHaveLength(1);
  });
});
