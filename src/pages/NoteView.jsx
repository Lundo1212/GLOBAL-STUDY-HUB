import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function NoteView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState("");

  // FETCH NOTE FROM SUPABASE
  useEffect(() => {
    const fetchNote = async () => {
      const { data, error } = await supabase
        .from("materials")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setFileUrl(data.file_url);
      }
    };

    fetchNote();
  }, [id]);

  if (!fileUrl) return <p>Loading...</p>;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>

      {/* TOP BUTTONS */}
      <div style={{ padding: 10, display: "flex", gap: 10 }}>
        
        <button onClick={() => navigate("/")}>
          🏠 Click here for more study materials
        </button>

        

        <a href={fileUrl} download>
          ⬇ Download
        </a>

        <button
          onClick={() =>
            navigator.share
              ? navigator.share({
                  title: "Study Material",
                  url: fileUrl
                })
              : navigator.clipboard.writeText(fileUrl)
          }
        >
          🔗 Share
        </button>
      </div>

      {/* DOCUMENT VIEWER */}
      <iframe
        src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`}
        style={{ width: "100%", flex: 1 }}
      />
    </div>
  );
}