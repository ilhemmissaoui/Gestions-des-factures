import React from "react";
import { Home, Image } from "react-feather";
import { Link } from "react-router-dom";
import cslx from "classnames";

const element = [
  { label: "Home", icon: <Home />, path: "/super_admin/about" },
  { label: "documentation", icon: <Image />, path: "/dashboard" },
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
    </div>
  );
};

export default SideBar;
