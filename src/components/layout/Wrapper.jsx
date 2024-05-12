import { Outlet } from "react-router-dom";
import Head from "./Head.jsx";
import MobileNav from "./MobileNav.jsx";
import Foot from "./Foot.jsx";

export default function Wrapper() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head />
      <div className="flex-grow pb-16 pc:pb-0">
        <Outlet />
      </div>
      <MobileNav />
      <Foot />
    </div>
  );
}
