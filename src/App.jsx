import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/home.jsx";
import Hotels from "./pages/hotels.jsx";
import Hotel from "./pages/hotel.jsx";
import Contact from "./pages/contact.jsx";
import Login from "./pages/login.jsx";
import AdminPage from "./pages/adminPage.jsx";
import ErrorPageNotFound from "./components/layout/ErrorPageNotFound.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="result" element={<Hotels />} />
        <Route path="venue/:id" element={<Hotel />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="*" element={<ErrorPageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
