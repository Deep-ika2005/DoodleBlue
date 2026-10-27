import { useState } from "react";
import "./EventCard.css";

function EventCard({
  title = "Campus Event",
  category = "GENERAL",
  description = "Join us for an exciting campus event.",
  date = "Date to be announced",
  venue = "Campus",
  initialRegistrationCount = 0,
  initiallyRegistered = false,
  onRemove,
}) {
  const [isRegistered, setIsRegistered] = useState(initiallyRegistered);
  const [registrationCount, setRegistrationCount] = useState(
    initialRegistrationCount
  );
  const [isFavorite, setIsFavorite] = useState(false);

  function handleRegistration() {
    if (isRegistered) {
      setIsRegistered(false);
      setRegistrationCount((count) => Math.max(0, count - 1));
    } else {
      setIsRegistered(true);
      setRegistrationCount((count) => count + 1);
    }
  }

  function handleFavorite() {
    setIsFavorite((favorite) => !favorite);
  }

  return (
    <article className="event-card">
      <div className="event-card-image">
        <span>{category}</span>
      </div>

      <div className="event-card-content">
        <span className="event-category">{category}</span>

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
            {isRegistered ? "Cancel Registration" : "Register"}
          </button>

          <button
            type="button"
            className={`favorite-button ${
              isFavorite ? "is-favorite" : ""
            }`}
            onClick={handleFavorite}
          >
            {isFavorite ? "Remove Favorite" : "Add Favorite"}
          </button>
        </div>

        <button
          type="button"
          className="remove-event-button"
          onClick={onRemove}
        >
          Remove Event
        </button>
      </div>
    </article>
  );
}

export default EventCard;