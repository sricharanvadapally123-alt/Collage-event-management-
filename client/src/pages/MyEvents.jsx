import React from "react";
import { useEffect, useState } from "react";

function MyEvents() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [registrations, setRegistrations] = useState([]);

    const fetchRegistrations = async () => {
        if (!user) return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/registrations/user/${user.id}`
            );

            const data = await response.json();
            setRegistrations(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const cancelRegistration = async (id) => {
        if (!window.confirm("Cancel this registration?")) return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/registrations/${id}`,
                { method: "DELETE" }
            );

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                fetchRegistrations();
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Unable to cancel registration");
        }
    };

    if (!user) {
        return (
            <div className="container">
                <h2>Please login to view your registered events.</h2>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>📋 My Registered Events</h1>

            {registrations.length === 0 ? (
                <p>You have not registered for any events.</p>
            ) : (
                <div className="event-grid">
                    {registrations.map((registration) => (
                        <div className="event-card" key={registration._id}>
                            <h2>{registration.eventId?.title}</h2>
                            <span className="event-category">
                                {registration.eventId?.category}
                            </span>
                            <p>{registration.eventId?.description}</p>
                            <p>📅 {registration.eventId?.date}</p>
                            <p>⏰ {registration.eventId?.time}</p>
                            <p>📍 {registration.eventId?.venue}</p>

                            <button
                                className="btn btn-danger"
                                onClick={() => cancelRegistration(registration._id)}
                            >
                                Cancel Registration
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyEvents;