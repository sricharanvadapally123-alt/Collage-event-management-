import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <h2>🎓 College Events</h2>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/events">Events</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/create-event">Create Event</Link>
                <Link to="/my-events">My Events</Link>

                {user ? (
                    <>
                        <span>👋 {user.name}</span>
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;