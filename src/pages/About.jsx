import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Us</h1>

      <p style={styles.text}>
        This platform is built to help students access learning materials,
        quizzes, and educational resources in one place.
      </p>

      <p style={styles.text}>
        We aim to make learning easier, faster, and more interactive.
      </p>

      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => navigate("/")}>
          Start Learning
        </button>

        <button style={styles.button} onClick={() => navigate("/contact")}>
          Contact Us
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    color: "white",
    minHeight: "100vh",
    background: "#0f172a",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "15px",
    color: "#cbd5e1",
  },
  buttonGroup: {
    marginTop: "30px",
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "10px 15px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};