import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* NEW PAGES */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}