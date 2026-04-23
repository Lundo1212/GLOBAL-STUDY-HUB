import { useNavigate } from "react-router-dom";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaGlobe 
} from "react-icons/fa";

export default function Footer() {
  const navigate = useNavigate();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Terms", path: "/terms" },
  ];

  const supportLinks = [
    { name: "Help Center", path: "/contact" },
    { name: "FAQs", path: "/contact" },
  ];

  return (
    <footer style={styles.footer}>

      {/* TOP */}
      <div style={styles.quoteSection}>
        <h2 style={styles.quoteTitle}>🌍 Empowering Global Learning</h2>
        <p style={styles.quoteText}>
          “Education is the most powerful weapon which you can use to change the world.”
          We believe in breaking barriers by making knowledge accessible globally.
        </p>
      </div>

      {/* GRID */}
      <div style={styles.grid}>

        {/* BRAND */}
        <div style={styles.col}>
          <h3 style={styles.heading}>GLOBAL STUDY HUB</h3>
          <p style={styles.text}>
            A modern learning platform for sharing resources and growing academically worldwide.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div style={styles.col}>
          <h4 style={styles.heading}>Quick Links</h4>
          {quickLinks.map((link, i) => (
            <p key={i} style={styles.link} onClick={() => navigate(link.path)}>
              {link.name}
            </p>
          ))}
        </div>

        {/* SUPPORT */}
        <div style={styles.col}>
          <h4 style={styles.heading}>Support</h4>
          {supportLinks.map((link, i) => (
            <p key={i} style={styles.link} onClick={() => navigate(link.path)}>
              {link.name}
            </p>
          ))}
          <p style={styles.smallText}>Response time: 24–48 hours</p>
        </div>

        {/* CONTACT */}
        <div style={styles.col}>
          <h4 style={styles.heading}>Contact</h4>
          <p style={styles.text}>
            📧 support@studyhub.com <br />
            📞 +254 797 742 966 <br />
            🌍 Nairobi, Kenya
          </p>
        </div>

        
        {/* SOCIAL */}
<div style={styles.col}>
  <h4 style={styles.heading}>Connect With Us</h4>

  <div style={styles.socials}>
    
    <a href="https://yourwebsite.com" target="_blank" rel="noreferrer">
      <FaGlobe style={styles.icon} />
    </a>

    <a href="https://facebook.com" target="_blank" rel="noreferrer">
      <FaFacebook style={styles.icon} />
    </a>

    <a href="https://twitter.com" target="_blank" rel="noreferrer">
      <FaTwitter style={styles.icon} />
    </a>

    <a href="https://instagram.com" target="_blank" rel="noreferrer">
      <FaInstagram style={styles.icon} />
    </a>

    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
      <FaLinkedin style={styles.icon} />
    </a>

  </div>

  <p style={styles.smallText}>
    Follow us for updates, new materials, and global opportunities.
  </p>
</div>

      </div> {/* ✅ FIXED: properly closed grid */}

      {/* DIVIDER */}
      <div style={styles.divider} />

      {/* BOTTOM */}
      <div style={styles.bottom}>
        © {new Date().getFullYear()} Global Study Hub — All Rights Reserved <br />
        Designed & Developed by <span style={{ color: "#00d4ff" }}>David Kivinda</span>
      </div>

    </footer>
  );
}

/* STYLES */
const styles = {
  footer: {
    background: "linear-gradient(135deg, #000, #0f2027, #203a43)",
    color: "white",
    padding: "70px 20px",
    marginTop: "60px",
  },

  quoteSection: {
    textAlign: "center",
    marginBottom: "50px",
  },

  quoteTitle: {
    color: "#00d4ff",
    fontSize: "22px",
  },

  quoteText: {
    maxWidth: "800px",
    margin: "auto",
    fontSize: "15px",
    opacity: 0.85,
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "30px",
    maxWidth: "1100px",
    margin: "auto",
  },

  col: {
    flex: "1 1 200px",
  },

  heading: {
    color: "#00d4ff",
    marginBottom: "10px",
  },

  text: {
    fontSize: "14px",
    opacity: 0.8,
  },

  link: {
    fontSize: "14px",
    marginBottom: "6px",
    cursor: "pointer",
  },

  socials: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },

  icon: {
    fontSize: "20px",
    color: "#cbd5e1",
    cursor: "pointer",
  },

  smallText: {
    fontSize: "12px",
    marginTop: "10px",
    opacity: 0.7,
  },

  divider: {
    borderTop: "1px solid rgba(255,255,255,0.2)",
    margin: "40px 0",
  },

  bottom: {
    textAlign: "center",
    fontSize: "13px",
    opacity: 0.7,
  },
};