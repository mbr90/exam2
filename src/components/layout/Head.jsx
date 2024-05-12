import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoutButton from "../common/buttons/LogoutButton.jsx";
import BorderButton from "../common/buttons/BorderButton.jsx";
import { useToken } from "../../stores/useUserStore.jsx";

export default function Head() {
  const token = useToken();
  return (
    <div className=" hidden tablet:block pc:block bg-white shadow-md ">
      <header className="flex justify-between items-center py-4 px-8  max-w-[1636px] mx-auto w-full">
        <Link to="/">
          <img
            src="/logo/Holidaze.svg"
            alt="Holidae Logo"
            className="w-auto h-[74px]"
          />
        </Link>
        <nav className="flex justify-between items-center mx-auto">
          <ul className="flex space-x-4 mx-auto">
            <li className="text-ash hover:text-deepsea">
              <NavLink to="/">HOME</NavLink>{" "}
            </li>

            {!token ? (
              <li className="text-ash hover:text-deepsea">
                <NavLink to="/contact">CONTACT</NavLink>
              </li>
            ) : (
              <li className="text-ash hover:text-deepsea">
                <NavLink to="/admin">ADMIN</NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="text-ash hover:text-deepsea">
          {!token ? (
            <NavLink to="/login">
              <BorderButton text="LOGIN" />
            </NavLink>
          ) : (
            <LogoutButton />
          )}
        </div>
      </header>
    </div>
  );
}
