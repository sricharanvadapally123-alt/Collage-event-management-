import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Events() {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");

    const fetchEvents = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/events");
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            alert("Unable to fetch events");
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const registerForEvent = async (eventId) => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Please login first");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/registrations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    eventId
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Successfully registered for event!");
                fetchEvents();
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Unable to register for event");
        }
    };

    const deleteEvent = async (eventId) => {
        if (!window.confirm("Delete this event?")) return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/events/${eventId}`,
                { method: "DELETE" }
            );

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                fetchEvents();
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Unable to delete event");
        }
    };

    const filteredEvents = events.filter((event) => {
        const text = `${event.title} ${event.category} ${event.venue}`.toLowerCase();
        return text.includes(search.toLowerCase());
    });

    return (
        <div className="container">
            <h1>College Events</h1>

            <input
                className="search-box"
                type="text"
                placeholder="🔍 Search by event, category or venue..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="event-grid">
                {filteredEvents.map((event) => (
                    <div className="event-card" key={event._id}>
                        <h2>{event.title}</h2>
                        <span className="event-category">{event.category}</span>

                        <p>{event.description}</p>
                        <p>📅 <strong>Date:</strong> {event.date}</p>
                        <p>⏰ <strong>Time:</strong> {event.time}</p>
                        <p>📍 <strong>Venue:</strong> {event.venue}</p>

                        <p>
                            👥 <strong>Participants:</strong>{" "}
                            {event.participantCount} / {event.maxParticipants}
                        </p>

                        <p>
                            {event.availableSeats > 0
                                ? <>🟢 <strong>Seats Available:</strong> {event.availableSeats}</>
                                : <>🔴 <strong>Event Full</strong></>}
                        </p>

                        <div className="event-actions">
                            <Link to={`/event/${event._id}`} className="btn">
                                View Details
                            </Link>

                            <button
                                className="btn btn-success"
                                disabled={event.availableSeats <= 0}
                                onClick={() => registerForEvent(event._id)}
                            >
                                {event.availableSeats <= 0 ? "Event Full" : "Register"}
                            </button>

                            <Link to={`/edit-event/${event._id}`} className="btn">
                                Edit
                            </Link>

                            <button
                                className="btn btn-danger"
                                onClick={() => deleteEvent(event._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Events;