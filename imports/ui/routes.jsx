import { Meteor } from "meteor/meteor";
import React from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import Login from "./pages/Auth/login";
import Authenticated from "./components/authenticated";
import SignUp from "./pages/Auth/signup";
import DashboardAdmin from "./pages/Dashboard/AdminDashboard";
import Forgot from "./pages/Auth/ForgotPassword";
import NewReport from "./pages/Dashboard/NewReport";
import AdminLayout from "../ui/layouts/AdminLayout";
import Public from "../ui/layouts/Public";

const Routes = (props) => {
  let loggingIn = true;
  let user;
  if (Meteor.isClient) {
    loggingIn = useTracker(() => Meteor.loggingIn());
    user = useTracker(() => Meteor.user());
  }
  const authenticated = !loggingIn && !!user;
  return loggingIn || Meteor.isServer ? (
    <></>
  ) : (
    <BrowserRouter>
      <Switch>
        <Public exact path="/login" component={Login} {...props} />
        <Public exact path="/signup" component={SignUp} {...props} />
        <Public exact path="/forgot-password" component={Forgot} {...props} />
        <AdminLayout path="/admin" {...props}>
          <Switch>
            <Authenticated
              path="/dashboard"
              exact
              component={DashboardAdmin}
              authenticated={authenticated}
              loggingIn={loggingIn}
            />
            <Authenticated
              path="/newreport"
              exact
              component={NewReport}
              authenticated={authenticated}
              loggingIn={loggingIn}
            />
          </Switch>
        </AdminLayout>
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
