import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contact & Support Center</h1>

      <p style={styles.text}>
        Need help? We are here to support students and users across the platform.
        You can reach us using any of the methods below.
      </p>

      {/* ================= CONTACT INFO ================= */}
      <div style={styles.card}>
        <h2 style={styles.subtitle}>📩 Email Support</h2>
        <p style={styles.text}>support@yourwebsite.com</p>
        <p style={styles.text}>We typically respond within 24–48 hours.</p>

        <button
          style={styles.primaryButton}
          onClick={() =>
            (window.location = "mailto:support@yourwebsite.com")
          }
        >
          Send Email
        </button>
      </div>

      {/* ================= GENERAL HELP ================= */}
      <div style={styles.card}>
        <h2 style={styles.subtitle}>❓ Common Help Topics</h2>

        <ul style={styles.list}>
          <li>Account login or password issues</li>
          <li>Uploading or accessing study materials</li>
          <li>Quiz or learning system problems</li>
          <li>Reporting incorrect or harmful content</li>
        </ul>
      </div>

      {/* ================= BUSINESS INFO ================= */}
      <div style={styles.card}>
        <h2 style={styles.subtitle}>🌍 Platform Info</h2>
        <p style={styles.text}>
          Global Study Hub is a student-driven learning platform designed to
          make education accessible worldwide. We support collaboration,
          resource sharing, and interactive learning.
        </p>
      </div>

      {/* ================= BUTTONS ================= */}
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => navigate("/")}>
          Home
        </button>

        <button style={styles.button} onClick={() => navigate("/privacy-policy")}>
          Privacy Policy
        </button>

        <button style={styles.button} onClick={() => navigate("/terms")}>
          Terms
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  container: {
    padding: "40px",
    color: "white",
    minHeight: "100vh",
    background: "#0f172a",
  },

  title: {
    fontSize: "32px",
    marginBottom: "15px",
  },

  text: {
    fontSize: "15px",
    color: "#cbd5e1",
    lineHeight: "1.6",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "18px",
    color: "#60a5fa",
    marginBottom: "10px",
  },

  card: {
    background: "#111827",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
    border: "1px solid #1f2937",
  },

  list: {
    paddingLeft: "20px",
    color: "#cbd5e1",
    lineHeight: "1.8",
  },

  buttonGroup: {
    marginTop: "40px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  button: {
    padding: "10px 15px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  primaryButton: {
    marginTop: "10px",
    padding: "10px 15px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};