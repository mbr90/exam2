import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoutButton from "../common/buttons/LogoutButton";
import BorderButton from "../common/buttons/BorderButton";
import { useToken } from "../../stores/useUserStore";

export default function Header() {
  const token = useToken();
  return (
    <div className=" bg-white shadow-md ">
      <header className="flex justify-between items-center py-4 px-8  max-w-[1042px] mx-auto w-full">
        <Link to="/">
          <h1 className="font-bold text-xl text-tigerlily">Holidaze</h1>
        </Link>
        <nav className="flex justify-between items-center mx-auto">
          <ul className="flex space-x-4 mx-auto">
            <li className="text-ash hover:text-deepsea">
              <NavLink to="/">HOME</NavLink>{" "}
            </li>
            <li className="text-ash hover:text-deepsea">
              <NavLink to="/result">VENUES</NavLink>{" "}
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
