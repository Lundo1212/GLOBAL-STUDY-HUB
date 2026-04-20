import { useState } from "react";

export default function AdminDashboard() {

  const [materials, setMaterials] = useState(
    JSON.parse(localStorage.getItem("materials")) || []
  );

  const [comments] = useState(
    JSON.parse(localStorage.getItem("comments")) || []
  );

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("MATHEMATICS AND PURE SCIENCES");
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);

  const categories = [
    "MATHEMATICS AND PURE SCIENCES",
    "ENGINEERING",
    "INFORMATION COMMUNICATION AND TECHNOLOGY",
    "TECHNICAL STUDIES",
    "HUMAN RESOURCE STUDIES",
    "HEALTH SCIENCES"
  ];

  const saveToStorage = (data) => {
    localStorage.setItem("materials", JSON.stringify(data));
    setMaterials(data);
  };

  // ================= FIXED UPLOAD =================
  const handleUpload = () => {
    if (!title || !file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const newItem = {
        id: Date.now(),
        title,
        category,
        fileURL: reader.result // ✅ IMPORTANT FIX
      };

      const updated = [...materials, newItem];
      saveToStorage(updated);

      setTitle("");
      setFile(null);
    };

    reader.readAsDataURL(file);
  };

  const handleDelete = (id) => {
    const updated = materials.filter(m => m.id !== id);
    saveToStorage(updated);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setTitle(item.title);
    setCategory(item.category);
  };

  const saveEdit = () => {
    const updated = materials.map(m =>
      m.id === editId ? { ...m, title, category } : m
    );

    saveToStorage(updated);
    setEditId(null);
    setTitle("");
  };

  const [search, setSearch] = useState("");

  const filtered = materials.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  // ================= OPEN FILE =================
  const openFile = (file) => {
    if (!file) return;
    window.open(file, "_blank");
  };

  return (
    <div style={{ padding: 20, background: "#000", color: "#fff", minHeight: "100vh" }}>

      <h1 style={{ color: "#1e90ff" }}>ADMIN DASHBOARD</h1>

      <input
        placeholder="Search materials..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 10, marginBottom: 20, width: "100%" }}
      />

      {/* UPLOAD */}
      <div style={{ border: "1px solid #1e90ff", padding: 15 }}>

        <h2>Upload Material</h2>

        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />

        <select value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>

        <input type="file" onChange={e => setFile(e.target.files[0])} />

        {editId ? (
          <button onClick={saveEdit}>Save Edit</button>
        ) : (
          <button onClick={handleUpload}>Upload</button>
        )}
      </div>

      {/* MATERIALS */}
      {filtered.map(item => (
        <div key={item.id} style={{ border: "1px solid gray", marginTop: 10, padding: 10 }}>

          <h3>{item.title}</h3>
          <p>{item.category}</p>

          {/* READ */}
          <button onClick={() => openFile(item.fileURL)}>
            Read
          </button>

          {/* DOWNLOAD */}
          <a href={item.fileURL} download>
            <button>Download</button>
          </a>

          <button onClick={() => handleEdit(item)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>

        </div>
      ))}

      {/* COMMENTS */}
      <h2>User Comments</h2>

      {comments.map(c => (
        <div key={c.id}>
          <b>{c.name}</b>
          <p>{c.text}</p>
        </div>
      ))}

    </div>
  );
}