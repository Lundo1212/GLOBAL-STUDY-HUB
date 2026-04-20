import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "../components/PageLayout";

export default function Mathematics() {
  const navigate = useNavigate();
  const location = useLocation();

  const materials = JSON.parse(localStorage.getItem("materials")) || [];

  const filtered = materials.filter(
    (m) => m.category === "Mathematics"
  );

  // AUTO SCROLL WHEN COMING FROM HOME (#materials etc.)
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView();
    }
  }, [location]);

  return (
    <PageLayout title="Mathematics Revision Hub">

      {/* ===== NAV BUTTONS ===== */}
      <div className="flex gap-3 mb-6">

        <button
          onClick={() =>
            document.getElementById("materials").scrollIntoView()
          }
          className="bg-blue-500 text-black px-3 py-1 font-bold"
        >
          Materials
        </button>

        <button
          onClick={() =>
            document.getElementById("resources").scrollIntoView()
          }
          className="bg-red-500 text-black px-3 py-1 font-bold"
        >
          Resources
        </button>

      </div>

      {/* ===== TOP SECTION ===== */}
      <section id="top"></section>

      {/* ===== MATERIALS ===== */}
      <section id="materials">

        <div className="grid gap-4">

          {filtered.length === 0 ? (
            <p className="text-gray-300">
              No mathematics materials yet.
            </p>
          ) : (
            filtered.map((m, i) => (
              <div
                key={i}
                className="bg-black/60 border border-blue-600 p-4 rounded-lg"
              >
                <h2 className="text-red-400 font-bold text-lg">
                  {m.title}
                </h2>

                <p className="text-gray-200 mt-2">
                  {m.content}
                </p>

                <button className="mt-3 text-blue-400 underline">
                  View More Resources →
                </button>
              </div>
            ))
          )}

        </div>

      </section>

      {/* ===== RESOURCES ===== */}
      <section id="resources" className="mt-10 border-t border-gray-600 pt-5">

        <h2 className="text-blue-400 font-bold mb-3">
          More Mathematics Resources
        </h2>

        <ul className="space-y-2 text-sm text-gray-200">
          <li>📘 Past Papers</li>
          <li>📗 Formula Sheets</li>
          <li>📙 Revision Notes</li>
          <li>📊 Video Tutorials</li>
        </ul>

      </section>

      {/* ===== BACK BUTTON ===== */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-gray-700 px-4 py-2"
      >
        Back Home
      </button>

    </PageLayout>
  );
}