import React from "react";
import { Home, Image } from "react-feather";
import { Link } from "react-router-dom";
import cslx from "classnames";

const element = [
  { label: "Home", icon: <Home />, path: "/super_admin" },
  { label: "Sells", path: "/super_admin/sells" },

  {
    label: "Client Command",

    path: "/super_admin/clientcommand",
  },
  { label: "About company", path: "/super_admin/about" },
];

const SideBar = (props) => {
  console.log(props.location.pathname);
  return (
    <div className="navbar-expand-md">
      <div className="collapse navbar-collapse" id="navbar-menu">
        <div className="navbar navbar-light">
          <div className="container-xl">
            <ul className="navbar-nav">
              {element.map((e) => (
                <li
                  className={cslx("nav-item", {
                    active: e.path === props.location.pathname,
                  })}
                >
                  <Link to={e.path} className="nav-link">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/home */}
                    </span>
                    {e.icon}
                    <span className="nav-link-title">{e.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="nav-item dropdown">
        <a
          href="#"
          className="nav-link d-flex lh-1 text-reset p-0 show"
          data-bs-toggle="dropdown"
          aria-label="Open user menu"
          aria-expanded="true"
        >
          <span
            className="avatar avatar-sm"
            style={{ backgroundImage: "url(./static/avatars/000m.jpg)" }}
          />
          <div className="d-none d-xl-block ps-2">
            <div>Paweł Kuna</div>
            <div className="mt-1 small text-muted">UI Designer</div>
          </div>
        </a>
        <div
          className="dropdown-menu dropdown-menu-end dropdown-menu-arrow show"
          data-bs-popper="none"
        >
          <a href="#" className="dropdown-item">
            Set status
          </a>
          <a href="#" className="dropdown-item">
            Profile &amp; account
          </a>
          <a href="#" className="dropdown-item">
            Feedback
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            Settings
          </a>
          <a href="#" className="dropdown-item">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
