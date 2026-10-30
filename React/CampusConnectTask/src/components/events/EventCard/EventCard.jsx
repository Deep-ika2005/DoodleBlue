import { useState } from "react";
import { Link } from "react-router-dom";
import heartOutline from "../../../assets/heart-outline.svg";
import heartFilled from "../../../assets/heart-filled.svg";
import registerIcon from "../../../assets/register.svg";
import "./EventCard.css";
import { Badge } from "../../ui";

function EventCard({
  id,
  title = "Campus Event",
  category = "GENERAL",
  description = "Join us for an exciting campus event.",
  date = "Date to be announced",
  venue = "Campus",
  initialRegistrationCount = 0,
  initiallyRegistered = false,
  isFavorite = false,
  onToggleFavorite,
  onRemove,
  onEdit,
}) {
  const [isRegistered, setIsRegistered] = useState(initiallyRegistered);
  const [registrationCount, setRegistrationCount] = useState(
    initialRegistrationCount
  );

  function handleRegistration() {
    if (isRegistered) {
      setIsRegistered(false);
      setRegistrationCount((count) => Math.max(0, count - 1));
    } else {
      setIsRegistered(true);
      setRegistrationCount((count) => count + 1);
    }
  }

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
          <strong>Registrations:</strong> {registrationCount}
        </p>

        <div className="event-card-actions">
          <button
            type="button"
            className="register-button"
            onClick={handleRegistration}
          >
            <img src={registerIcon} alt="" />
            {isRegistered ? "Cancel Registration" : "Register"}
          </button>

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
          <Link className="details-button" to={`/events/${id}`}>View Details</Link>
          <button type="button" className="edit-event-button" onClick={onEdit}>Edit Event</button>
          <button type="button" className="remove-event-button" onClick={onRemove}>Delete Event</button>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
