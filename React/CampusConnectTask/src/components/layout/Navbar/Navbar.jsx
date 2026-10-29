import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">CampusConnect</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link
          to="/register"
          state={{ focusStudentName: true }}
          className="navbar-register"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
