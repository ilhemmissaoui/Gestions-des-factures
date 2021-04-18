import { Meteor } from "meteor/meteor";
import React from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import Login from "./pages/Auth/login";
import Authenticated from "./components/authenticated";
import Authorized from "./components/authorized";
import SignUp from "./pages/Auth/signup";
import DashboardAdmin from "./pages/Dashboard/AdminDashboard";
import Forgot from "./pages/Auth/ForgotPassword";
import NewReport from "./pages/Dashboard/NewReport";
import AdminLayout from "../ui/layouts/AdminLayout";
import Public from "../ui/layouts/Public";
import { SUPER_ADMIN } from "../api/roles";
import ClientsList from "./pages/Dashboard/Clients/ClientsList";
import AboutPage from "../ui/pages/AboutPage";
import Devis from "./pages/Dashboard/ventes/Devis";
import ClientComand from "./pages/Dashboard/ventes/ClientComand";

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
        <Public
          exact
          path="/login"
          component={Login}
          {...props}
          authenticated={authenticated}
        />
        <Public
          exact
          path="/signup"
          component={SignUp}
          {...props}
          authenticated={authenticated}
        />
        <Public
          exact
          path="/"
          component={Login}
          {...props}
          authenticated={authenticated}
        />
        <Public
          exact
          path="/forgot-password"
          component={Forgot}
          {...props}
          authenticated={authenticated}
        />
        <AdminLayout path="/super_admin" {...props}>
          <Switch>
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/dashboard"
              pathAfterFailure="/401"
              component={DashboardAdmin}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/newreport"
              pathAfterFailure="/401"
              component={NewReport}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/clients"
              pathAfterFailure="/401"
              component={ClientsList}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin"
              pathAfterFailure="/401"
              component={ClientsList}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/about"
              pathAfterFailure="/401"
              component={AboutPage}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/sells"
              pathAfterFailure="/401"
              component={Devis}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/clientcommand"
              pathAfterFailure="/401"
              component={ClientComand}
              {...props}
            />
          </Switch>
          <Route path="*" component={ClientComand} />
        </AdminLayout>
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
