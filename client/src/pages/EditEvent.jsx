import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditEvent() {
    const { id } = useParams();
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

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await fetch(`http://localhost:5000/api/events/${id}`);
            const data = await response.json();

            setForm({
                title: data.title,
                description: data.description,
                date: data.date,
                time: data.time,
                venue: data.venue,
                category: data.category,
                maxParticipants: data.maxParticipants
            });
        };

        fetchEvent();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/events/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    maxParticipants: Number(form.maxParticipants)
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Event updated successfully!");
                navigate("/events");
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Unable to update event");
        }
    };

    return (
        <div className="form-container">
            <h1>Edit Event</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Event Title</label>
                    <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                </div>

                <div className="form-group">
                    <label>Time</label>
                    <input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
                </div>

                <div className="form-group">
                    <label>Venue</label>
                    <input value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} required />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
                </div>

                <div className="form-group">
                    <label>Maximum Participants</label>
                    <input type="number" value={form.maxParticipants} onChange={(e) => setForm({ ...form, maxParticipants: e.target.value })} required />
                </div>

                <button className="btn" type="submit">Update Event</button>
            </form>
        </div>
    );
}

export default EditEvent;