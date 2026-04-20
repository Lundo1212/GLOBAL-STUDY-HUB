import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";

export default function PureSciences() {
  const navigate = useNavigate();

  const materials = JSON.parse(localStorage.getItem("materials")) || [];

  const filtered = materials.filter(
    (m) => m.category === "Pure Sciences"
  );

  return (
    <PageLayout title="Pure Sciences Revision Hub">

      <div className="grid gap-4">

        {filtered.length === 0 ? (
          <p className="text-gray-300">No pure sciences materials yet.</p>
        ) : (
          filtered.map((m, i) => (
            <div key={i} className="bg-black/60 border border-blue-600 p-4 rounded-lg">
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

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-gray-700 px-4 py-2"
      >
        Back Home
      </button>

    </PageLayout>
  );
}