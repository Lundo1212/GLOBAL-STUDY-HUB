import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function NoteView() {
  const { id } = useParams();
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchFile();
  }, []);

  const fetchFile = async () => {
    const { data, error } = await supabase
      .from("materials")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) setFile(data);
  };

  if (!file) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{file.title}</h2>

      <iframe
        src={file.file_url + "#toolbar=0"}
        width="100%"
        height="600px"
      ></iframe>

      <br /><br />

      <a href={file.file_url} download>
        <button>⬇ Download</button>
      </a>

      <button onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
      }}>
        🔗 Share
      </button>
    </div>
  );
}