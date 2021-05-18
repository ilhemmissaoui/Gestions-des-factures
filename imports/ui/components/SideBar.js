import React from "react";
import { Clipboard, Users } from "react-feather";
import { Link } from "react-router-dom";
import cslx from "classnames";



const element = [
  {
    label: "Dashboard",
    icon: <Clipboard />,
    path: "clientslist",
    role: ["COMPANY,SUPER_ADMIN"],
  },
  {
    label: "Customers",
    icon: <Users />,
    path: "customers",
    role: ["COMPANY,SUPER_ADMIN"],
  },
  { label: "Sells", path: "sells", role: ["COMPANY,SUPER_ADMIN"] },

  {
    label: "Client Command",

    path: "clientcommand",
    role: ["COMPANY,SUPER_ADMIN"],
  },
  { label: "About company", path: "about", role: ["COMPANY"] },
];

const SideBar = (props) => {

  $(document).ready(function () {
    $('.toggler').on('click', function () {
      $('.menu-container').toggleClass('active');
    });
    $('.nav-toggler').on('click', function () {
      $('.navbar-toggler').toggleClass('is-active');
      $('.navbar-menu').toggleClass('is-active');
    });
  
    function setMenuHeight() {
      var navbarHeight = $('.navbar').outerHeight();
      $('.menu-wrapper').outerHeight(document.documentElement.clientHeight - navbarHeight).niceScroll({
        emulatetouch: true
      });
    }
  
    setMenuHeight();
    $(window).on('resize', function () {
      setMenuHeight();
    });
  });
  console.log(props.location.pathname);
  return (
    <div>
    <div className="columns is-variable is-0">
      <div>
        <div className="menu-container px-1 has-background-white">
          <div className="menu-wrapper py-1">
            <aside className="menu">
              <p className="menu-label has-text-lighter">General</p>
              <ul  className="menu-list">
              
              {elements.map((e, i) => (
                <li className="nav-item">
                  <Link
                    to={e.route}
                    className={clsx("nav-link", {
                      active: i === selectedIndex,
                    })}
                  >
               <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {e.icon}
                    </span>
                    <span className="fas fa-tachometer-alt icon" >{e.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
                   
        </aside>  
        </div>
      </div>
    </div> 
    </div></div>
  );
};
export default SideBar;
