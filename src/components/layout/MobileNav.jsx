import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToken } from "../../stores/useUserStore";

import { MdLogin, MdOutlineHome, MdOutlinePhone } from "react-icons/md";
import LogoutButton from "../common/buttons/LogoutButton";

export default function MobileNav() {
  const [activeRoute, setActiveRoute] = useState("/");
  const location = useLocation();
  const token = useToken();

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  let navItems = [{ name: "HOME", path: "/", icon: MdOutlineHome }];

  if (token) {
    navItems = [
      ...navItems,
      { name: "LOGOUT", path: "/logout", icon: LogoutButton, isButton: true },
      { name: "ADMIN", path: "/admin", icon: MdOutlinePhone },
    ];
  } else {
    navItems = [
      ...navItems,
      { name: "LOGIN", path: "/login", icon: MdLogin },
      { name: "CONTACT", path: "/contact", icon: MdOutlinePhone },
    ];
  }
  return (
    <div className="block tablet:hidden pc:hidden fixed inset-x-0 bottom-0 bg-deepsea shadow-lg h-24 z-50">
      <nav className="flex justify-around items-center py-2 h-full relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.path;

          if (item.isButton) {
            return (
              <Icon
                key={item.name}
                onClick={() => console.log("Logging out...")}
              />
            );
          }

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex flex-col items-center space-y-1 text-white"
            >
              {isActive && (
                <div className="absolute top-[-30px] bg-white rounded-full p-2 shadow-lg">
                  <div className="bg-tigerlily rounded-full p-2">
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
              )}
              {!isActive}
              <span className={`${isActive ? "text-white " : ""}`}>
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
