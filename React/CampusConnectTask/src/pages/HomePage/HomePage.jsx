import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <main className="home-page">
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="hero-eyebrow">
            <span aria-hidden="true">✦</span> YOUR CAMPUS, YOUR COMMUNITY
          </p>
          <h1>
            Make your campus
            <br />
            <span>experience count.</span>
          </h1>
          <p className="hero-description">
            Find your people, try something new, and make memories that last.
            Your next favorite campus moment starts here.
          </p>
          <div className="hero-actions">
            <Link to="/events" className="explore-button">
              Explore events <span aria-hidden="true">↗</span>
            </Link>
            <span className="hero-note">There’s something for everyone.</span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="/campus-community.svg"
            alt="Students meeting on campus beside a university building"
          />
          <div className="hero-floating-card">
            <span className="hero-card-icon" aria-hidden="true">✦</span>
            <span>
              <strong>Find your next thing</strong>
              <small>Good people. Great moments.</small>
            </span>
          </div>
        </div>
      </section>
      <div className="home-highlights" aria-label="Campus event highlights">
        <span><strong>Discover</strong> events that inspire you</span>
        <span><strong>Connect</strong> with your campus community</span>
        <span><strong>Make</strong> every moment count</span>
      </div>
    </main>
  );
}

export default HomePage;
