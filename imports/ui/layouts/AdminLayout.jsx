import React from "react";

import { withRouter } from "react-router-dom";
import SideBar from "../components/SideBar";

const AdminLayout = ({ children, location, store, ...props }) => (
  <div className="page-wrapper">
    {Meteor.userId() ? (
      <>
        <SideBar location={location} {...props} />
        <main>{children}</main>
      </>
    ) : (
      props.history.push("/login")
    )}
  </div>
);

export default withRouter(AdminLayout);
