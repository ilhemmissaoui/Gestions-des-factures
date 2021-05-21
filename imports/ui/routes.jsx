import { Meteor } from "meteor/meteor";
import React from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import Login from "./pages/Auth/login";
import Authorized from "./components/authorized";
import SignUp from "./pages/Auth/signup";
import DashboardAdmin from "./pages/Dashboard/AdminDashboard";
import Forgot from "./pages/Auth/ForgotPassword";
import AdminLayout from "../ui/layouts/AdminLayout";
import Public from "../ui/layouts/Public";
import { SUPER_ADMIN, COMPANY } from "../api/roles";
import AboutPage from "../ui/pages/AboutPage";
import Devis from "./pages/Dashboard/ventes/Devis";
import CompanyLayout from "../ui/layouts/CompanyLayout";
import ClientsList from "../ui/pages/Dashboard/Clients/ClientsList";
import Print from "./pages/Print";
import Profile from "./pages/Dashboard/ventes/Profile";
import Setting from "./pages/Dashboard/ventes/Setting";
import Home from "../ui/pages/Dashboard/Clients/Home";
import Notification from "./pages/Dashboard/ventes/Notification";
import ContactUs from "./ContactUs";
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
        <CompanyLayout path="/company" {...props}>
          <Switch>
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/about"
              pathAfterFailure="/401"
              component={AboutPage}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/home"
              pathAfterFailure="/401"
              component={Home}
              {...props}
            />

            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/dashboard"
              pathAfterFailure="/401"
              component={DashboardAdmin}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/home"
              pathAfterFailure="/401"
              component={Home}
              {...props}
            />

            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/sells"
              pathAfterFailure="/401"
              component={Devis}
              {...props}
            />
          </Switch>
        </CompanyLayout>
        <AdminLayout path="/super_admin" {...props}>
          <Switch>
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin"
              pathAfterFailure="/401"
              component={DashboardAdmin}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/clientslist"
              pathAfterFailure="/401"
              component={ClientsList}
              {...props}
            />

            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/contact_us"
              pathAfterFailure="/401"
              component={ContactUs}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/print"
              pathAfterFailure="/401"
              component={Print}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/profile"
              pathAfterFailure="/401"
              component={Profile}
              {...props}
            />

            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/notification"
              pathAfterFailure="/401"
              component={Notification}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/setting"
              pathAfterFailure="/401"
              component={Setting}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/pricing"
              pathAfterFailure="/401"
              component={Devis}
              {...props}
            />
          </Switch>
        </AdminLayout>
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
