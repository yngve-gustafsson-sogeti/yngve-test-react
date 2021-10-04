import { Route, Switch, BrowserRouter } from "react-router-dom";
import React from "react";
import localRoutes from "./routes";
import remoteRoutes from "hushalla/routes";

const routes = [...localRoutes, ...remoteRoutes];

const App = () => (
  <BrowserRouter>
      <React.Suspense fallback={<div>Loading projects...</div>}>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
        </Switch>
      </React.Suspense>
  </BrowserRouter>
);

export default App;
