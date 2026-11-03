import { Link } from "react-router-dom";
import heartOutline from "../../../assets/heart-outline.svg";
import heartFilled from "../../../assets/heart-filled.svg";
import "./EventCard.css";
import { Badge } from "../../common";


function EventCard({
  id,
  title = "Campus Event",
  category = "GENERAL",
  description = "Join us for an exciting campus event.",
  date = "Date to be announced",
  venue = "Campus",
  initialRegistrationCount = 0,
  isFavorite = false,
  onToggleFavorite,
  onRemove,
  onEdit,
}) {
  return (
    <article className="event-card">
      <div className="event-card-image">
        <span>{category}</span>
      </div>

      <div className="event-card-content">
        <Badge className="event-category" tone="brand">{category}</Badge>

        <h3>{title}</h3>

        <p className="event-description">{description}</p>

        <p className="event-detail">
          <strong>Date:</strong> {date}
        </p>

        <p className="event-detail">
          <strong>Venue:</strong> {venue}
        </p>

        <p className="event-detail">
          <strong>Registrations:</strong> {initialRegistrationCount}
        </p>

        <div className="event-card-actions">
          <button
            type="button"
            className={`favorite-button ${
              isFavorite ? "is-favorite" : ""
            }`}
            onClick={onToggleFavorite}
            aria-pressed={isFavorite}
          >
            <img src={isFavorite ? heartFilled : heartOutline} alt="" />
            {isFavorite ? "Favorited" : "Add Favorite"}
          </button>
          <Link className="details-button" to={`/events/${id}`}>
            <svg className="action-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
              <circle cx="12" cy="12" r="2.5" />
            </svg>
            View Details
          </Link>
          <button type="button" className="edit-event-button" onClick={onEdit}>
            <svg className="action-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m4 16.5-.8 4.3 4.3-.8L19.8 7.7a2.1 2.1 0 0 0-3-3L4 16.5Z" />
              <path d="m14.8 6.7 3 3" />
            </svg>
            Edit Event
          </button>
          <button type="button" className="remove-event-button" onClick={onRemove}>
            <svg className="action-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M9 7V4h6v3m3 0-.8 13H6.8L6 7m4 4v5m4-5v5" />
            </svg>
            Delete Event
          </button>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
