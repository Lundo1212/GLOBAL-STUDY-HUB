import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function AdminDashboard() {

  // ================= STATES =================
  const [materials, setMaterials] = useState([]);
  const [comments, setComments] = useState([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("MATHEMATICS AND PURE SCIENCES");
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const categories = [
    "MATHEMATICS AND PURE SCIENCES",
    "ENGINEERING",
    "ICT",
    "TECHNICAL",
    "HUMAN RESOURCE",
    "HEALTH SCIENCES"
  ];

  // ================= FETCH MATERIALS =================
  const fetchMaterials = async () => {
    const { data, error } = await supabase
      .from("materials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.log("FETCH ERROR:", error);
    else setMaterials(data || []);
  };

  // ================= FETCH COMMENTS =================
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.log("COMMENTS ERROR:", error);
    else setComments(data || []);
  };

  // ================= TEST CONNECTION =================
  const testConnection = async () => {
    const { data, error } = await supabase.from("materials").select("*");
    console.log("TEST DATA:", data);
    console.log("TEST ERROR:", error);
  };

  useEffect(() => {
    fetchMaterials();
    fetchComments();
    testConnection();
  }, []);

  const handleUpload = async () => {
  try {
    console.log("UPLOAD STARTED");

    if (!title) {
      console.log("NO TITLE");
      return;
    }

    if (!file) {
      console.log("NO FILE SELECTED");
      return;
    }

    console.log("FILE:", file);

    const fileName = `${Date.now()}-${file.name}`;

    console.log("UPLOADING TO STORAGE...");

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("materials-files")
      .upload(fileName, file);

    console.log("UPLOAD RESPONSE:", uploadData);
    console.log("UPLOAD ERROR:", uploadError);

    if (uploadError) {
      console.log("STOPPED HERE (UPLOAD FAILED)");
      return;
    }

    const { data: urlData } = supabase.storage
      .from("materials-files")
      .getPublicUrl(fileName);

    console.log("URL DATA:", urlData);

    const fileUrl = urlData?.publicUrl;

    console.log("FINAL FILE URL:", fileUrl);

    console.log("INSERTING INTO DB...");

    const { data: insertData, error: dbError } = await supabase
      .from("materials")
      .insert([
        {
          title,
          category,
          file_url: fileUrl
        }
      ])
      .select();

    console.log("DB RESULT:", insertData, dbError);

    setTitle("");
    setFile(null);

    fetchMaterials();

  } catch (err) {
    console.log("CRASH ERROR:", err);
  }
  if (!title || !file) {
  
    console.log("Missing title or file");
    return;
  }

  const fileName = `${Date.now()}-${file.name}`;

  // 1. Upload file
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("materials-files")
    .upload(fileName, file);

  if (uploadError) {
    console.log("UPLOAD ERROR:", uploadError);
    return;
  }

  console.log("UPLOAD SUCCESS:", uploadData);

  // 2. Get public URL
  const { data: urlData } = supabase.storage
  .from("materials-files")
  .getPublicUrl(fileName);

const fileUrl = urlData.publicUrl;

if (!fileUrl) {
  console.log("FAILED TO GET PUBLIC URL");
  return;
}
  // 3. Insert into DB
  const { data: insertData, error: dbError } = await supabase
    .from("materials")
    .insert([
      {
        title,
        category,
        file_url: fileUrl
      }
    ])
    .select();

  console.log("DB INSERT:", { insertData, dbError });

  // 4. Reset
  setTitle("");
  setFile(null);

  fetchMaterials();
};

  // ================= DELETE =================
  const handleDelete = async (id) => {
    await supabase.from("materials").delete().eq("id", id);
    fetchMaterials();
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setEditId(item.id);
    setTitle(item.title);
    setCategory(item.category);
  };

  const saveEdit = async () => {
    await supabase
      .from("materials")
      .update({ title, category })
      .eq("id", editId);

    setEditId(null);
    setTitle("");
    fetchMaterials();
  };

  // ================= SEARCH =================
  const filtered = materials.filter(m =>
    (m.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (m.category || "").toLowerCase().includes(search.toLowerCase())
  );

  const openFile = (file) => {
    if (file) window.open(file, "_blank");
  };

  // ================= UI =================
  return (
    <div style={{
      padding: 20,
      background: "#000",
      color: "#fff",
      minHeight: "100vh"
    }}>

      {/* ================= TEST BUTTON ================= */}
      <button
        onClick={async () => {
          const { data, error } = await supabase
  .from("materials")
  .insert([
    {
      title: "Test File",
      category: "ICT",
      file_url: "https://example.com/test.pdf"
    }
  ])
  .select("*");

          console.log("TEST INSERT:", { data, error });
        }}
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 999999,
          padding: 10,
          background: "red",
          color: "white",
          border: "none"
        }}
      >
        TEST INSERT
      </button>

      <h1 style={{ textAlign: "center", color: "#1e90ff" }}>
        ADMIN DASHBOARD
      </h1>

      {/* SEARCH */}
      <input
        placeholder="Search materials..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 10,
          width: "100%",
          maxWidth: 600,
          margin: "20px auto",
          display: "block"
        }}
      />

      {/* UPLOAD */}
      <div style={{
        maxWidth: 800,
        margin: "auto",
        border: "1px solid #1e90ff",
        padding: 20
      }}>

        <h2>Upload Material</h2>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>

        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
        />

        <button onClick={editId ? saveEdit : handleUpload}>
          {editId ? "Save Edit" : "Upload"}
        </button>
      </div>

      {/* MATERIALS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 10,
        marginTop: 20
      }}>
        {filtered.map(item => (
          <div key={item.id} style={{
            background: "#111",
            padding: 10,
            borderRadius: 10
          }}>
            <h3>{item.title}</h3>
            <p>{item.category}</p>

            <button onClick={() => openFile(item.file_url)}>Read</button>

            <a href={item.file_url} download>
              <button>Download</button>
            </a>

            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* COMMENTS */}
      <h2>User Comments</h2>

      {comments.map(c => (
        <div key={c.id} style={{
          background: "#111",
          margin: 5,
          padding: 10
        }}>
          <b>{c.name}</b>
          <p>{c.text}</p>
        </div>
      ))}

    </div>
  );
}