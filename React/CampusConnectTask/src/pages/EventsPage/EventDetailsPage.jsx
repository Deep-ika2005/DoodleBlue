import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEvents } from "../../services/events";
import { useFavorites } from "../../contexts/FavoritesContext";
import "./EventDetailsPage.css";
import { Badge, Card } from "../../components/ui";

function EventDetailsPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);
  const [registrationCount, setRegistrationCount] = useState(0);
  const { favoriteIds, toggleFavorite } = useFavorites();

  function handleRegistration() {
    setRegistered((current) => !current);
    setRegistrationCount((count) => Math.max(0, count + (registered ? -1 : 1)));
  }

  useEffect(() => {
    let active = true;
    getEvents()
      .then((events) => {
        if (active) {
          const foundEvent = events.find((item) => String(item.id) === eventId) ?? null;
          setEvent(foundEvent);
          setRegistrationCount(foundEvent?.initialRegistrationCount ?? 0);
        }
      })
      .catch(() => {
        if (active) setError("Could not load this event. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [eventId]);

  if (loading) return <main className="event-details-page"><p role="status">Loading event...</p></main>;
  if (error || !event) return (
    <main className="event-details-page">
      <Link className="event-back-link" to="/events">← Back to events</Link>
      <p role="alert">{error || "This event could not be found."}</p>
    </main>
  );

  const isFavorite = favoriteIds.includes(String(event.id));
  return (
    <main className="event-details-page">
      <Link className="event-back-link" to="/events">← Back to events</Link>
      <Card as="article" className="event-details-card">
        <div className="event-details-topline">
          <Badge className="event-details-category" tone="brand">{event.category}</Badge>
          <span className="event-details-id">EVENT #{event.id}</span>
        </div>
        <h1>{event.title}</h1>
        <p className="event-details-description">{event.description}</p>
        <div className="event-details-facts">
          <div><span>Date</span><strong>{event.date}</strong></div>
          <div><span>Venue</span><strong>{event.venue}</strong></div>
          <div><span>Registrations</span><strong>{registrationCount}</strong></div>
        </div>
        <div className="event-details-actions">
          <button className="event-details-primary" type="button" onClick={handleRegistration}>
            {registered ? "Registration confirmed ✓" : "Register for this event"}
          </button>
          <button className="event-details-secondary" type="button" aria-pressed={isFavorite} onClick={() => toggleFavorite(event.id)}>
            {isFavorite ? "♥ Remove favorite" : "♡ Add favorite"}
          </button>
        </div>
      </Card>
    </main>
  );
}

export default EventDetailsPage;
