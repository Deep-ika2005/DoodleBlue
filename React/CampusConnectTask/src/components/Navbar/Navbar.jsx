import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">CampusConnect</div>
      <div className="navbar-links">
        <a href="#home">Home</a>
        <a href="#events">Events</a>
        <a href="#registration" className="navbar-register">
          Register
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
