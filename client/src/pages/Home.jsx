import React from "react";
import { Link } from "react-router-dom";

function Home() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="container">
            <section className="hero">
                <h1>College Event Management System</h1>
                <p>Discover, manage and participate in exciting college events.</p>
                <Link to="/events" className="btn">Explore Events</Link>
            </section>

            {user && <h2>Welcome back, {user.name}! 👋</h2>}

            <div className="stats-grid">
                <div className="stat-card"><h2>🎭</h2><p>Cultural Events</p></div>
                <div className="stat-card"><h2>💻</h2><p>Technical Events</p></div>
                <div className="stat-card"><h2>🏆</h2><p>Competitions</p></div>
                <div className="stat-card"><h2>📚</h2><p>Workshops</p></div>
            </div>
        </div>
    );
}

export default Home;