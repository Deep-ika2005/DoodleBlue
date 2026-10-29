const API_URL = "http://localhost:3000/events";

export async function getEvents() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch events (${response.status})`);
    }
    return response.json();
}
