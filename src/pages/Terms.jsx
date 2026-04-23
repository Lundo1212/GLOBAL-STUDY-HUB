import { useNavigate } from "react-router-dom";

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>Terms & Conditions</h1>

      <p style={styles.text}>
        Welcome to Global Study Hub. By accessing or using this platform, you agree
        to be bound by the following Terms and Conditions. Please read them carefully.
        If you do not agree with any part of these terms, you should discontinue
        use of the platform immediately.
      </p>

      {/* ================= SECTION 1 ================= */}
      <h2 style={styles.subtitle}>1. Use of the Platform</h2>
      <p style={styles.text}>
        This platform is designed for educational purposes only. Users are expected
        to use it responsibly, respectfully, and in compliance with all applicable
        laws and regulations.
      </p>

      <ul style={styles.list}>
        <li>You must not misuse, disrupt, or damage the platform.</li>
        <li>You must not attempt unauthorized access to any system or data.</li>
        <li>You must use the platform only for lawful educational activities.</li>
        <li>You agree not to upload harmful, offensive, or illegal content.</li>
      </ul>

      {/* ================= SECTION 2 ================= */}
      <h2 style={styles.subtitle}>2. User Accounts</h2>
      <p style={styles.text}>
        If account creation is enabled, you are responsible for maintaining the
        confidentiality of your login credentials.
      </p>

      <ul style={styles.list}>
        <li>You are responsible for all activity under your account.</li>
        <li>You must provide accurate and truthful information.</li>
        <li>We reserve the right to suspend accounts suspected of abuse.</li>
      </ul>

      {/* ================= SECTION 3 ================= */}
      <h2 style={styles.subtitle}>3. Content Ownership</h2>
      <p style={styles.text}>
        All educational materials, documents, and resources available on this
        platform are either owned by Global Study Hub or shared by users.
      </p>

      <ul style={styles.list}>
        <li>Users retain ownership of content they upload.</li>
        <li>By uploading content, you grant us permission to display it on the platform.</li>
        <li>Unauthorized copying or redistribution is strictly prohibited.</li>
      </ul>

      {/* ================= SECTION 4 ================= */}
      <h2 style={styles.subtitle}>4. Prohibited Activities</h2>

      <ul style={styles.list}>
        <li>Hacking, data scraping, or reverse engineering the platform.</li>
        <li>Uploading viruses, malware, or harmful code.</li>
        <li>Posting offensive, abusive, or misleading content.</li>
        <li>Impersonating other users or administrators.</li>
        <li>Using the platform for commercial exploitation without permission.</li>
      </ul>

      {/* ================= SECTION 5 ================= */}
      <h2 style={styles.subtitle}>5. Privacy & Data</h2>
      <p style={styles.text}>
        We value your privacy. Any personal data collected is used solely for
        improving user experience and platform functionality.
      </p>

      <ul style={styles.list}>
        <li>We do not sell or share personal data with third parties.</li>
        <li>Data is stored securely using modern security practices.</li>
        <li>Users may request deletion of their data at any time.</li>
      </ul>

      {/* ================= SECTION 6 ================= */}
      <h2 style={styles.subtitle}>6. Limitation of Liability</h2>
      <p style={styles.text}>
        Global Study Hub is provided “as is” without warranties of any kind.
        We are not responsible for any damages, losses, or issues arising
        from the use of this platform.
      </p>

      {/* ================= SECTION 7 ================= */}
      <h2 style={styles.subtitle}>7. External Links</h2>
      <p style={styles.text}>
        Our platform may contain links to third-party websites. We are not
        responsible for the content, policies, or practices of external sites.
      </p>

      {/* ================= SECTION 8 ================= */}
      <h2 style={styles.subtitle}>8. Changes to Terms</h2>
      <p style={styles.text}>
        We reserve the right to update or modify these Terms at any time.
        Continued use of the platform means you accept any changes made.
      </p>

      {/* ================= SECTION 9 ================= */}
      <h2 style={styles.subtitle}>9. Termination</h2>
      <p style={styles.text}>
        We may suspend or terminate access to the platform if users violate
        these Terms or engage in harmful behavior.
      </p>

      {/* ================= BUTTONS ================= */}
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => navigate("/")}>
          Home
        </button>

        <button style={styles.button} onClick={() => navigate("/privacy-policy")}>
          Privacy Policy
        </button>

        <button style={styles.button} onClick={() => navigate("/contact")}>
          Support
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
    fontSize: "34px",
    marginBottom: "20px",
    color: "#f59e0b",
  },

  subtitle: {
    marginTop: "25px",
    fontSize: "20px",
    color: "#22c55e",
  },

  text: {
    fontSize: "15px",
    color: "#cbd5e1",
    lineHeight: "1.7",
    marginTop: "10px",
  },

  list: {
    marginTop: "10px",
    marginLeft: "20px",
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
    background: "#f59e0b",
    color: "black",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};