import React from "react";
import { useEffect, useState } from "react";

function Dashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalEvents: 0,
        totalRegistrations: 0,
        upcomingEvents: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/dashboard");
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return <div className="container"><h2>Loading dashboard...</h2></div>;
    }

    return (
        <div className="container">
            <h1>📊 Event Dashboard</h1>
            <p>Overview of the College Event Management System</p>

            <div className="stats-grid">
                <div className="stat-card">
                    <h2>{stats.totalUsers}</h2>
                    <p>👥 Total Students</p>
                </div>

                <div className="stat-card">
                    <h2>{stats.totalEvents}</h2>
                    <p>📅 Total Events</p>
                </div>

                <div className="stat-card">
                    <h2>{stats.totalRegistrations}</h2>
                    <p>📝 Registrations</p>
                </div>

                <div className="stat-card">
                    <h2>{stats.upcomingEvents}</h2>
                    <p>🔜 Upcoming Events</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;