import { useState } from "react";
import EventCard from "../EventCard/EventCard";
import Navbar from "../Navbar/Navbar";
import "./EventList.css";

function EventList() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Campus Tech Fest 2026",
      category: "TECH",
      description:
        "Explore technology, discover new ideas, and connect with fellow students.",
      date: "November 5, 2026",
      venue: "Main Auditorium",
      initialRegistrationCount: 0,
      initiallyRegistered: false,
    },
    {
      id: 2,
      title: "Cultural Day",
      category: "CULTURE",
      description:
        "Celebrate music, dance, art, and cultures from across campus.",
      date: "November 12, 2026",
      venue: "College Campus",
      initialRegistrationCount: 0,
      initiallyRegistered: false,
    },
  ]);

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
    <div className="campus-connect">
      <Navbar />

      <main>
        <section className="hero" id="home">
          <p className="hero-eyebrow">
            YOUR CAMPUS. YOUR COMMUNITY
          </p>

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

          <a href="#events" className="explore-button">
            Explore Events
          </a>
        </section>

        <section className="event-list" id="events">
          <div className="event-list-header">
            <span className="event-list-eyebrow">
              DISCOVER YOUR CAMPUS
            </span>

            <h2>Upcoming Events</h2>

            <p>
              Find opportunities to learn, connect, and participate.
            </p>

            <button
              type="button"
              className="add-sample-event-button"
              onClick={handleAddEvent}
            >
              Add Sample Event
            </button>
          </div>

          <div className="event-list-items">
            {events.map((event) => (
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
        </section>

       
      </main>

     
    </div>
  );
}

export default EventList;
