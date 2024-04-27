import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoutButton from "../buttons/LogoutButton";
import { useToken } from "../../stores/useUserStore";

export default function Header() {
  const token = useToken();
  return (
    <div className=" bg-white shadow-md ">
      <header className="flex justify-between items-center py-4 px-8  max-w-[1042px] mx-auto w-full">
        <Link to="/">
          <h1 className="font-bold text-xl text-red-600">Holidaze</h1>
        </Link>
        <nav className="flex justify-between items-center mx-auto">
          <ul className="flex space-x-4 mx-auto">
            <li className="text-gray-600 hover:text-gray-800">
              <NavLink to="/">Home</NavLink>{" "}
            </li>
            <li className="text-gray-600 hover:text-gray-800">
              <NavLink to="/result">Venues</NavLink>{" "}
            </li>
            {!token ? (
              <li className="text-gray-600 hover:text-gray-800">
                <NavLink to="/contact">Contact</NavLink>
              </li>
            ) : (
              <li className="text-gray-600 hover:text-gray-800">
                <NavLink to="/admin">Admin</NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="text-gray-600 hover:text-gray-800">
          {!token ? <NavLink to="/login">Login</NavLink> : <LogoutButton />}
        </div>
      </header>
    </div>
  );
}
