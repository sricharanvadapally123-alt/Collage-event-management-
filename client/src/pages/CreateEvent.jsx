import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        category: "",
        maxParticipants: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    maxParticipants: Number(form.maxParticipants)
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Event created successfully!");
                navigate("/events");
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Unable to create event");
        }
    };

    return (
        <div className="form-container">
            <h1>Create Event</h1>

            <form onSubmit={handleSubmit}>
                {[
                    ["title", "Event Title"],
                    ["description", "Description"],
                    ["date", "Date"],
                    ["time", "Time"],
                    ["venue", "Venue"],
                    ["category", "Category"],
                    ["maxParticipants", "Maximum Participants"]
                ].map(([key, label]) => (
                    <div className="form-group" key={key}>
                        <label>{label}</label>
                        {key === "description" ? (
                            <textarea
                                value={form[key]}
                                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                required
                            />
                        ) : (
                            <input
                                type={key === "date" ? "date" : key === "maxParticipants" ? "number" : "text"}
                                value={form[key]}
                                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                required
                            />
                        )}
                    </div>
                ))}

                <button className="btn" type="submit">Create Event</button>
            </form>
        </div>
    );
}

export default CreateEvent;