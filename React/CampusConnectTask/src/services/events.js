const API_URL = "http://localhost:3000/events";

export async function getEvents() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch events (${response.status})`);
    }
    return response.json();
}

export async function createEvent(event) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
    });
    if (!response.ok) {
        throw new Error(`Failed to create event (${response.status})`);
    }
    return response.json();
}

export async function updateEvent(id, event) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
    });
    if (!response.ok) {
        throw new Error(`Failed to update event (${response.status})`);
    }
    return response.json();
}

export async function deleteEvent(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
        throw new Error(`Failed to delete event (${response.status})`);
    }
}
