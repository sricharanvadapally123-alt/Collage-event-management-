const express = require("express");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();

        res.status(201).json({
            message: "Event created successfully",
            event
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create event" });
    }
});

router.get("/", async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });

        const eventsWithParticipants = await Promise.all(
            events.map(async (event) => {
                const participantCount = await Registration.countDocuments({
                    eventId: event._id
                });

                return {
                    ...event.toObject(),
                    participantCount,
                    availableSeats: event.maxParticipants - participantCount
                };
            })
        );

        res.json(eventsWithParticipants);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch events" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const participantCount = await Registration.countDocuments({
            eventId: event._id
        });

        res.json({
            ...event.toObject(),
            participantCount,
            availableSeats: event.maxParticipants - participantCount
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch event" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json({
            message: "Event updated successfully",
            event
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update event" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        await Registration.deleteMany({ eventId: req.params.id });

        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete event" });
    }
});

module.exports = router;