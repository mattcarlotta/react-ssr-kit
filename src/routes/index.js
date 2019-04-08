import App from "components/App";
import Home from "views/Home";
import NotFound from "views/NotFound";
import ShowUsers from "views/ShowUsers";
import { fetchUsers } from "actions/users";
import { setPopMessage } from "actions/server";

const routes = [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home,
        loadReduxStore: () => [
          setPopMessage("Welcome to the React SSR Boilerplate!")
        ]
      },
      {
        path: "/users",
        exact: true,
        component: ShowUsers,
        loadInitState: () => [fetchUsers()]
      },
      {
        component: NotFound,
        path: "*"
      }
    ]
  }
];

export default routes;
