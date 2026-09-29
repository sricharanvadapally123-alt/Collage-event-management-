const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        if (!userId || !eventId) {
            return res.status(400).json({
                message: "User and event are required"
            });
        }

        const existingRegistration = await Registration.findOne({
            userId,
            eventId
        });

        if (existingRegistration) {
            return res.status(400).json({
                message: "You are already registered for this event"
            });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const registrationCount = await Registration.countDocuments({
            eventId
        });

        if (registrationCount >= event.maxParticipants) {
            return res.status(400).json({ message: "Event is full" });
        }

        const registration = new Registration({ userId, eventId });
        await registration.save();

        res.status(201).json({
            message: "Event registration successful",
            registration
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to register for event" });
    }
});

router.get("/user/:userId", async (req, res) => {
    try {
        const registrations = await Registration.find({
            userId: req.params.userId
        }).populate("eventId");

        res.json(registrations);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch registered events"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const registration = await Registration.findByIdAndDelete(req.params.id);

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        res.json({ message: "Event registration cancelled" });
    } catch (error) {
        res.status(500).json({
            message: "Failed to cancel registration"
        });
    }
});

module.exports = router;