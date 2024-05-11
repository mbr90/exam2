import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import MobileNav from "./MobileNav.jsx";

export default function Wrapper() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow pb-16">
        <Outlet />
      </div>
      <MobileNav />
      <Footer />
    </div>
  );
}
