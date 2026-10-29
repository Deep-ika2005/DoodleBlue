import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <section className="not-found-card" aria-labelledby="not-found-title">
        <div className="not-found-art" aria-hidden="true">
          <span className="not-found-orbit not-found-orbit-one" />
          <span className="not-found-orbit not-found-orbit-two" />
          <span className="not-found-cap">*</span>
          <span className="not-found-code">404</span>
        </div>
        <p className="not-found-eyebrow">CAMPUS CONNECT</p>
        <h1 id="not-found-title">Looks like you took a wrong turn.</h1>
        <p className="not-found-copy">
          This page is not on the campus map. Let us get you back to something
          happening.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-home-button">Back to Home</Link>
          <Link to="/events" className="not-found-events-link">
            Explore events <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
