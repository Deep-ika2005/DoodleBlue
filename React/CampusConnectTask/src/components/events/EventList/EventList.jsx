import { useEffect, useRef, useState } from "react";
import EventCard from "../EventCard/EventCard";
import SearchEvents from "../SearchEvents/SearchEvents";
import "./EventList.css";
import { createEvent, deleteEvent, getEvents, updateEvent } from "../../../services/events";
import { useFavorites } from "../../../contexts/FavoritesContext";

function toDateInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function EventList({ favoritesOnly = false }) {
const [events, setEvents] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [creatingEvent, setCreatingEvent] = useState(false);
  const addEventFormRef = useRef(null);
  const { favoriteIds, toggleFavorite, removeFavorite } = useFavorites();

  const categories = [...new Set(events.map((event) => event.category).filter(Boolean))]
    .sort((first, second) => first.localeCompare(second));
  const filteredEvents = events.filter((event) => {
    if (favoritesOnly && !favoriteIds.includes(String(event.id))) return false;
    const matchesSearch = `${event.title ?? ""} ${event.venue ?? ""}`
      .toLowerCase()
      .includes(debouncedSearchTerm);
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  useEffect(() => {
    if (editingEvent) {
      addEventFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [editingEvent]);

  async function handleAddEvent(formEvent) {
    formEvent.preventDefault();
    const form = formEvent.currentTarget;
    const formData = new FormData(form);
    const newEvent = {
      ...Object.fromEntries(formData.entries()),
      initialRegistrationCount: 0,
      initiallyRegistered: false,
    };

    try {
      setCreatingEvent(true);
      if (editingEvent) {
        const updatedEvent = { ...editingEvent, ...Object.fromEntries(formData.entries()) };
        const savedEvent = await updateEvent(editingEvent.id, updatedEvent);
        setEvents((currentEvents) => currentEvents.map((current) =>
          String(current.id) === String(savedEvent.id) ? savedEvent : current
        ));
        setEditingEvent(null);
      } else {
        const createdEvent = await createEvent(newEvent);
        setEvents((currentEvents) => [...currentEvents, createdEvent]);
      }
      form.reset();
      setError("");
    } catch {
      setError(editingEvent
        ? "Could not update this event. Please try again."
        : "Could not add this event. Make sure the events API is running.");
    } finally {
      setCreatingEvent(false);
    }
  }

  async function handleRemoveEvent(id) {
    try {
      await deleteEvent(id);
      setEvents((currentEvents) => currentEvents.filter((event) => String(event.id) !== String(id)));
      removeFavorite(id);
      setError("");
    } catch {
      setError("Could not delete this event. Please try again.");
    }
  }

  return (
    <main>
        <section className="event-list" id="events">
          <div className="event-list-header">
            <span className="event-list-eyebrow">
              DISCOVER YOUR CAMPUS
            </span>

            <h2>{favoritesOnly ? "Your Favorite Events" : "Upcoming Events"}</h2>

            <p>
              Find opportunities to learn, connect, and participate.
            </p>

            {loading && <p role="status">Loading events...</p>}
            {error && <p role="alert">{error}</p>}

          </div>

          {!favoritesOnly && (
            <form
              className={`add-event-card ${editingEvent ? "is-editing-event" : ""}`}
              onSubmit={handleAddEvent}
              ref={addEventFormRef}
              key={editingEvent?.id ?? "new-event"}
            >
              <div className="add-event-heading">
                <div>
                  <span className="add-event-icon" aria-hidden="true">{editingEvent ? "E" : "+"}</span>
                  <h3>{editingEvent ? "Update event details" : "Add a new event"}</h3>
                </div>
                <p>{editingEvent ? "Make changes and save the updated event." : "Share something exciting with your campus community."}</p>
              </div>
              <div className="add-event-fields">
                <label>
                  <span className="add-event-label">Event title <b>*</b></span>
                  <input name="title" type="text" defaultValue={editingEvent?.title ?? ""} placeholder="e.g. React Workshop" required />
                </label>
                <label>
                  <span className="add-event-label">Category <b>*</b></span>
                  <select name="category" defaultValue={editingEvent?.category ?? "TECH"} required>
                    <option value="TECH">Technology</option>
                    <option value="CULTURE">Culture</option>
                    <option value="SPORTS">Sports</option>
                    <option value="CAREER">Career</option>
                    <option value="DESIGN">Design</option>
                    <option value="OTHERS">Other</option>
                  </select>
                </label>
                <label>
                  <span className="add-event-label">Date <b>*</b></span>
                  <input name="date" type="date" defaultValue={toDateInputValue(editingEvent?.date)} required />
                </label>
                <label>
                  <span className="add-event-label">Venue <b>*</b></span>
                  <input name="venue" type="text" defaultValue={editingEvent?.venue ?? ""} placeholder="e.g. Seminar Hall" required />
                </label>
                <label className="add-event-description">
                  <span className="add-event-label">Description <b>*</b></span>
                  <textarea name="description" rows="3" defaultValue={editingEvent?.description ?? ""} placeholder="Describe the event and what attendees can expect" required />
                </label>
              </div>
              <div className="add-event-footer">
                <span>All fields are required</span>
                <div className="add-event-actions">
                  {editingEvent && (
                    <button className="add-event-cancel" type="button" onClick={() => setEditingEvent(null)}>
                      Cancel
                    </button>
                  )}
                  <button type="submit" disabled={creatingEvent}>
                    {creatingEvent ? "Saving..." : editingEvent ? "Update Event" : "Add Event"}
                  </button>
                </div>
              </div>
            </form>
          )}

          <SearchEvents
            onSearch={setDebouncedSearchTerm}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onReset={() => {
              setSelectedCategory("all");
              setDebouncedSearchTerm("");
            }}
          />

          <div className="event-list-items">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                category={event.category}
                description={event.description}
                date={event.date}
                venue={event.venue}
                initialRegistrationCount={
                  event.initialRegistrationCount
                }
                initiallyRegistered={event.initiallyRegistered}
                isFavorite={favoriteIds.includes(String(event.id))}
                onToggleFavorite={() => toggleFavorite(event.id)}
                onEdit={() => setEditingEvent(event)}
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
                    : favoritesOnly && favoriteIds.length === 0
                      ? "Save an event to find it here."
                      : "We couldn't find that event."}
              </h3>
              <p className="events-empty-copy">
                {events.length === 0
                  ? "Check back soon for new ways to learn, connect, and have fun on campus."
                  : favoritesOnly && favoriteIds.length === 0
                    ? "Tap Add Favorite on any event and it will appear in this collection."
                    : "Try another event name or venue, or reset your filters to see everything."}
              </p>
            </div>
          )}

         
        </section>
    </main>
  );
}

export default EventList;
