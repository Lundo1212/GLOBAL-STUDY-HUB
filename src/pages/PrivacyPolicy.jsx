import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Privacy Policy</h1>

      <p style={styles.text}>
        At <strong>Global Study Hub</strong>, we are committed to protecting your privacy and ensuring
        your personal data is handled in a safe and responsible manner.
      </p>

      <h2 style={styles.subtitle}>1. Information We Collect</h2>
      <p style={styles.text}>
        We may collect basic user information such as:
      </p>
      <ul style={styles.list}>
        <li>Email address (for login or contact purposes)</li>
        <li>Username or display name</li>
        <li>Uploaded learning materials and content</li>
        <li>Basic usage data (pages visited, actions performed)</li>
      </ul>

      <h2 style={styles.subtitle}>2. How We Use Your Data</h2>
      <ul style={styles.list}>
        <li>To provide access to learning materials and features</li>
        <li>To improve platform performance and user experience</li>
        <li>To allow uploads, comments, and interactions</li>
        <li>To maintain platform security and prevent misuse</li>
      </ul>

      <h2 style={styles.subtitle}>3. Data Sharing</h2>
      <p style={styles.text}>
        We do not sell, rent, or trade your personal data. Your information is only accessible
        within the platform for functional purposes. In some cases, trusted third-party services
        (such as database hosting like Supabase) may process data securely on our behalf.
      </p>

      <h2 style={styles.subtitle}>4. Cookies & Storage</h2>
      <p style={styles.text}>
        We may use local storage and cookies to improve user experience, such as remembering
        login sessions and saving preferences. You can clear this data at any time from your browser.
      </p>

      <h2 style={styles.subtitle}>5. User Content</h2>
      <p style={styles.text}>
        Users are responsible for the content they upload. Any inappropriate, illegal, or harmful
        content may be removed without notice. We reserve the right to moderate all submissions.
      </p>

      <h2 style={styles.subtitle}>6. Data Security</h2>
      <p style={styles.text}>
        We implement reasonable security measures to protect your data. However, no system is 100%
        secure, and users are encouraged to protect their login credentials.
      </p>

      <h2 style={styles.subtitle}>7. Third-Party Services</h2>
      <p style={styles.text}>
        This platform may use external services such as authentication providers, databases, or
        analytics tools. These services have their own privacy policies.
      </p>

      <h2 style={styles.subtitle}>8. Children's Privacy</h2>
      <p style={styles.text}>
        This platform is intended for educational use. We do not knowingly collect data from
        children under applicable age limits without parental consent.
      </p>

      <h2 style={styles.subtitle}>9. Changes to This Policy</h2>
      <p style={styles.text}>
        We may update this Privacy Policy from time to time. Changes will be posted on this page
        with an updated revision date.
      </p>

      <h2 style={styles.subtitle}>10. Contact Us</h2>
      <p style={styles.text}>
        If you have any questions about this Privacy Policy, please contact our support team
        through the Contact page.
      </p>

      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => navigate("/")}>
          Home
        </button>

        <button style={styles.button} onClick={() => navigate("/terms")}>
          Terms
        </button>

        <button style={styles.button} onClick={() => navigate("/contact")}>
          Contact
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
    marginBottom: "20px",
  },

  subtitle: {
    fontSize: "20px",
    marginTop: "25px",
    marginBottom: "10px",
    color: "#60a5fa",
  },

  text: {
    fontSize: "15px",
    lineHeight: "1.7",
    marginBottom: "10px",
    color: "#cbd5e1",
  },

  list: {
    paddingLeft: "20px",
    color: "#cbd5e1",
    lineHeight: "1.8",
    fontSize: "15px",
  },

  buttonGroup: {
    marginTop: "40px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  button: {
    padding: "10px 15px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};