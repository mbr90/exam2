import Nav from "../navigation/nav";

import { NavLink } from "react-router-dom";

export default function Header() {
    return(
        <header className="flex w-full gap-4 justify-center">
           <NavLink to="/"> <h1>Holidaze</h1></NavLink>
           <Nav />
        </header>
    )
}