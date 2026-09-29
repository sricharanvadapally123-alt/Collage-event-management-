import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/events/${id}`
                );
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) return <div className="container"><h2>Loading event...</h2></div>;
    if (!event) return <div className="container"><h2>Event not found</h2></div>;

    return (
        <div className="container">
            <div className="event-card details-card">
                <h1>{event.title}</h1>
                <span className="event-category">{event.category}</span>

                <p>{event.description}</p>
                <p>📅 <strong>Date:</strong> {event.date}</p>
                <p>⏰ <strong>Time:</strong> {event.time}</p>
                <p>📍 <strong>Venue:</strong> {event.venue}</p>
                <p>👥 <strong>Participants:</strong> {event.participantCount} / {event.maxParticipants}</p>

                <p>
                    {event.availableSeats > 0
                        ? `🟢 ${event.availableSeats} seats available`
                        : "🔴 Event Full"}
                </p>
            </div>
        </div>
    );
}

export default EventDetails;