import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../components/router/router";
import Loader from "./UI/Loader/Loader";
import { AuthContext } from "../context";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <Loader />;
  }

  return isAuth ? (
    <Switch>
      {privateRoutes.map((route) => {
        return (
          <Route
            key={route.path}
            component={route.component}
            path={route.path}
            exact={route.exact}
          ></Route>
        );
      })}
      <Redirect to="/posts"></Redirect>
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map((route) => {
        return (
          <Route
            key={route.path}
            component={route.component}
            path={route.path}
            exact={route.exact}
          ></Route>
        );
      })}
      <Redirect to="/login"></Redirect>
    </Switch>
  );
};

export default AppRouter;
