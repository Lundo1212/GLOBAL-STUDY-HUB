import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Mathematics from "../pages/Mathematics";
import Health from "../pages/Health";
import Engineering from "../pages/Engineering";
import Technical from "../pages/Technical";
import HumanResource from "../pages/HumanResource";
import ICT from "../pages/ICT";
import Others from "../pages/Others";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/mathematics" element={<Mathematics />} />
      <Route path="/health" element={<Health />} />
      <Route path="/engineering" element={<Engineering />} />
      <Route path="/technical" element={<Technical />} />
      <Route path="/hr" element={<HumanResource />} />
      <Route path="/ict" element={<ICT />} />
      <Route path="/others" element={<Others />} />

      <Route path="*" element={
        <div style={{ color: "white", padding: "20px" }}>
          Page Not Found
        </div>
      } />

    </Routes>
  );
}