import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../EventCard/EventCard";
import SearchEvents from "../SearchEvents/SearchEvents";
import "./EventList.css";
import { getEvents } from "../../../services/events";

function EventList() {
const [events, setEvents] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filteredEvents = events.filter((event) =>
    `${event.title ?? ""} ${event.venue ?? ""}`
      .toLowerCase()
      .includes(debouncedSearchTerm)
  );

  useEffect(() => {
    let isCurrent = true;

    async function loadEvents() {
      try {
        setLoading(true);
        setError("");
        const data = await getEvents();

    
        if (isCurrent) {
          setEvents(data);
        }
      } catch {
        if (isCurrent) {
          setError("Could not load events. Make sure the events API is running.");
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      isCurrent = false;
    };
  }, []);

  function handleAddEvent() {
    const newEvent = {
      id: Date.now(),
      title: "New Campus Event",
      category: "OTHERS",
      description: "Join us for an exciting campus event.",
      date: "Date to be announced",
      venue: "College Campus",
      initialRegistrationCount: 0,
      initiallyRegistered: false,
    };

    setEvents((currentEvents) => [...currentEvents, newEvent]);
  }

  function handleRemoveEvent(id) {
    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== id)
    );
  }

  return (
    <main>
        <section className="event-list" id="events">
          <div className="event-list-header">
            <span className="event-list-eyebrow">
              DISCOVER YOUR CAMPUS
            </span>

            <h2>Upcoming Events</h2>

            <p>
              Find opportunities to learn, connect, and participate.
            </p>

            {loading && <p role="status">Loading events...</p>}
            {error && <p role="alert">{error}</p>}

            <button
              type="button"
              className="add-sample-event-button"
              onClick={handleAddEvent}
            >
              Add Sample Event
            </button>
          </div>

          <SearchEvents onSearch={setDebouncedSearchTerm} />

          <div className="event-list-items">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                category={event.category}
                description={event.description}
                date={event.date}
                venue={event.venue}
                initialRegistrationCount={
                  event.initialRegistrationCount
                }
                initiallyRegistered={event.initiallyRegistered}
                onRemove={() => handleRemoveEvent(event.id)}
              />
            ))}
          </div>
          {!loading && !error && filteredEvents.length === 0 && (
            <div className="events-empty-state" role="status">
              <div className="events-empty-icon" aria-hidden="true">
                {events.length === 0 ? "✦" : "⌕"}
              </div>
              <p className="events-empty-eyebrow">
                {events.length === 0 ? "NOTHING ON THE CALENDAR" : "NO MATCHES FOUND"}
              </p>
              <h3>
                {events.length === 0
                  ? "Your next favorite event is on its way."
                  : "We couldn't find that event."}
              </h3>
              <p className="events-empty-copy">
                {events.length === 0
                  ? "Check back soon for new ways to learn, connect, and have fun on campus."
                  : "Try another event name or venue, or clear your search to see everything."}
              </p>
            </div>
          )}
         
        </section>
    </main>
  );
}

export default EventList;
