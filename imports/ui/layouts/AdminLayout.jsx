import React from "react";

import { withRouter } from "react-router-dom";
import SideBar from "../components/SideBar";

const AdminLayout = ({ children, location, store, ...props }) => (
  <div className="page-wrapper">
    <SideBar location={location} {...props} />
    <main>{children}</main>
  </div>
);

export default withRouter(AdminLayout);
