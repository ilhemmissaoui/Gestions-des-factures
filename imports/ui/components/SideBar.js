import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { Clipboard, Users, ShoppingCart } from "react-feather";

const element = [
  {
    label: "Sales",
    icon: <ShoppingCart />,
    path: "pricing",
    role: ["COMPANY", "SUPER_ADMIN"],
  },
  {
    label: "Customers",
    icon: <Users />,
    path: "/customers",
    role: ["COMPANY", "SUPER_ADMIN"],
  },
  { label: "Sells", path: "sells", role: ["COMPANY,SUPER_ADMIN"] },

  {
    label: "Client Command",

    path: "/clientcommand",
    role: ["COMPANY", "SUPER_ADMIN"],
  },
  { label: "About company", path: "about", role: ["COMPANY"] },
];

const SideBar = (props) => {
  console.log(props);
  const role = Roles.getRolesForUser(Meteor.userId())[0].toLowerCase();
  console.log(role);

  $(document).ready(function () {
    $(".toggler").on("click", function () {
      $(".menu-container").toggleClass("active");
    });
    $(".nav-toggler").on("click", function () {
      $(".navbar-toggler").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

    function setMenuHeight() {
      var navbarHeight = $(".navbar").outerHeight();
      $(".menu-wrapper")
        .outerHeight(document.documentElement.clientHeight - navbarHeight)
        .niceScroll({
          emulatetouch: true,
        });
    }

    setMenuHeight();
    $(window).on("resize", function () {
      setMenuHeight();
    });
  });
  console.log("++++++++++++++++++++++++++++++++");
  var currentPath = props.location.pathname.split("/")[2];
  console.log(props.location.pathname);
  console.log(currentPath);

  return (
    <div className="columns is-variable is-0">
      <div>
        <div className="menu-container px-1 has-background-white">
          <div className="menu-wrapper py-1">
            <aside className="menu">
              <div>
                {" "}
                <Avatar className="table_avatar" src="" />{" "}
              </div>
              <p className="menu-label has-text-lighter">General</p>

              <ul className="menu-list">
                {element.map(
                  (e, i) =>
                    e.role.includes(role.toUpperCase()) && (
                      <li>
                        <Link
                          to={`/${role}/${e.path}`}
                          className={clsx("nav-link", {
                            active: e.path === `${currentPath}`,
                          })}
                        >
                          <span>{e.icon}</span>
                          <span className="nav-link">{e.label}</span>
                        </Link>
                      </li>
                    )
                )}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
