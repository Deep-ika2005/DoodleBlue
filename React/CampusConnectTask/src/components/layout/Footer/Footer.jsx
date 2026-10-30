import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-about">
          <div className="footer-brand">CampusConnect</div>
          <p>Your campus, your community.</p>
        </div>

        <div className="footer-meta">
          <span className="footer-contact-label">Get in touch</span>
          <a href="mailto:campusconnect@example.com">campusconnect@example.com</a>
        </div>

        <p className="footer-copy">
          &copy; 2026 CampusConnect
        </p>
      </div>
    </footer>
  );
}

export default Footer;
