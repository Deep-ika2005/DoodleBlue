import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <main>
      <section className="hero" id="home">
        <p className="hero-eyebrow">YOUR CAMPUS. YOUR COMMUNITY</p>
        <h1>
          Make Your Campus
          <br />
          <span>Experience Count.</span>
        </h1>
        <p className="hero-description">
          Discover exciting events, meet new people, and make the most of your
          <br className="hero-line-break" />
          college life.
        </p>
        <Link to="/events" className="explore-button">
          Explore Events
        </Link>
      </section>
    </main>
  );
}

export default HomePage;
