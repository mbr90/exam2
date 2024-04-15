import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout/layout";
import Hotels from "./pages/hotels"
import Contact from "./pages/contact"
import Login from "./pages/login"

function App() {
  return (
 
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="result" element={<Hotels />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
  
  );
}

export default App;
