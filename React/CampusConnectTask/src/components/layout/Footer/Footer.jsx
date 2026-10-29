import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-about">
          <div className="footer-brand">CampusConnect</div>
          <p>Discover events, meet people, and make campus life memorable.</p>
        </div>


        <div className="footer-contact">
          <p>Email: campusconnect@example.com</p>
          <p>Campus Student Activities</p>
        </div>

        <p className="footer-copy">
          &copy; 2026 CampusConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
