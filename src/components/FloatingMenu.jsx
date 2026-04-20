import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (user === "admin" && pass === "1234") {
      setLogin(false);
      setUser("");
      setPass("");
      navigate("/admin-dashboard");
    } else {
      alert("Wrong credentials");
    }
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <div className="fixed bottom-5 right-5 z-50">

        {open && (
          <div className="mb-3 bg-black/90 text-white p-3 rounded space-y-2 w-44">

            <button onClick={() => navigate("/upload")}>
              Upload
            </button>

            <button onClick={() => navigate("/universities")}>
              Universities
            </button>

            <button onClick={() => navigate("/comments")}>
              Comments
            </button>

            <button
              className="text-red-400"
              onClick={() => setLogin(true)}
            >
              Admin
            </button>

          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="w-12 h-12 bg-black text-white rounded-full text-2xl shadow-lg"
        >
          ⋮
        </button>
      </div>

      {/* LOGIN MODAL */}
      {login && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="bg-white text-black p-5 rounded w-80">

            <h2 className="text-lg font-bold mb-3">
              Admin Login
            </h2>

            <input
              className="w-full p-2 border mb-2"
              placeholder="Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />

            <input
              className="w-full p-2 border mb-3"
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full bg-black text-white p-2"
            >
              Login
            </button>

            <button
              onClick={() => setLogin(false)}
              className="mt-2 text-sm text-gray-500"
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </>
  );
}