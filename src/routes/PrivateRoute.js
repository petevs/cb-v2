import React, { useContext } from "react";
import { GlobalContext } from "state/contexts/GlobalContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { state } = useContext(GlobalContext);
  const { user } = state

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        user.uid ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/welcome"} />
        )
      }
    />
  );
};

export default PrivateRoute;
