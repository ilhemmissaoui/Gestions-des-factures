import React from "react";
import { Users } from "react-feather";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar is-fixed-top box-shadow-y">
        <div className="navbar-brand">
          <a
            role="button"
            className="navbar-burger toggler"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>

          <Link
            to="/super_admin"
            className="navbar-item has-text-weight-bold has-text-black"
          >
            {Meteor.userId() && Roles.getRolesForUser(Meteor.userId())[0]}{" "}
            Dashboard
          </Link>
          <a
            role="button"
            className="navbar-burger nav-toggler"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div className="navbar-menu has-background-white">
          <div className="navbar-start">
            <div className="navbar-item">
              <Link
                to={`/${Meteor.userId() &&
                  Roles.getRolesForUser(Meteor.userId())[0]?.toLowerCase()
                  }/contact_us`}
                className="fnavbar-item"
              >
                Home
              </Link>

              <Link to="/contact_us" className="navbar-item">
                About
              </Link>
              <Link to="/super_admin/print" className="navbar-item">
                Payment
              </Link>
            </div>
          </div>
          <div className="navbar-end">
            <Link to="/super_admin/notification" className="navbar-item">
              Notification
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <a href="#" className="navbar-link">
                {Meteor.userId() && Roles.getRolesForUser(Meteor.userId())[0]}{" "}
              </a>
              <div className="navbar-dropdown is-right">
                <Link to="/super_admin/profile" className="navbar-item">
                  Profile
                </Link>
                {(Roles.getRolesForUser(Meteor.userId())[0])?.toLowerCase() === "company" &&
                  <Link to={`/${(Roles.getRolesForUser(Meteor.userId())[0])?.toLowerCase()}/users`} className="navbar-item">
                    <Users className="mr-2" /> Manage Users
                </Link>}
                <hr className="navbar-divider" />
                <a onClick={(_) => Meteor.logout()} className="navbar-item">
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
