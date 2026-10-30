import "./Navbar.css";
import { Link } from "react-router-dom";
import { useFavorites } from "../../../contexts/FavoritesContext";
import logo from "../../../assets/campus-connect-logo.svg";
import favoriteIcon from "../../../assets/heart-outline.svg";
import registerIcon from "../../../assets/register.svg";

function Navbar() {
  const { favoriteCount } = useFavorites();
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" aria-label="CampusConnect home">
        <img src={logo} alt="" />
        <span className="navbar-logo">CampusConnect</span>
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link className="navbar-favorites" to="/favorites">
          <img src={favoriteIcon} alt="" />
          Favorites <span>{favoriteCount}</span>
        </Link>
        <Link
          to="/register"
          state={{ focusStudentName: true }}
          className="navbar-register"
        >
          <img src={registerIcon} alt="" />
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
