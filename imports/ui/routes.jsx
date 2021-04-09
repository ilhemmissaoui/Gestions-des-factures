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
      <AdminLayout path="/admin" {...props}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgot-password" component={Forgot} />
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
    </BrowserRouter>
  );
};
export default Routes;
