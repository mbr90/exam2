import { NavLink } from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <ul>
                <li className="flex gap-2">
                    <NavLink to="/result">Hotels</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </li>
            </ul>
        </nav>
    )
}