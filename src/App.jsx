import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home";
import Hotels from "./pages/hotels";
import Contact from "./pages/contact";
import Login from "./pages/login";
import AdminPage from "./pages/adminPage";
import ErrorPageNotFound from "./components/layout/ErrorPageNotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="result" element={<Hotels />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="*" element={<ErrorPageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
