const express = require("express");
const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalEvents = await Event.countDocuments();
        const totalRegistrations = await Registration.countDocuments();

        const today = new Date().toISOString().split("T")[0];

        const upcomingEvents = await Event.countDocuments({
            date: { $gte: today }
        });

        res.json({
            totalUsers,
            totalEvents,
            totalRegistrations,
            upcomingEvents
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to load dashboard"
        });
    }
});

module.exports = router;