import mongoose from "mongoose";
import Event from "../models/event.model.js";
import Registration from "../models/registration.model.js";

export const createEventRegistration = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;

    if (!eventId)
      return res.status(400).json({ message: "Event ID is required" });

    if (!mongoose.Types.ObjectId.isValid(eventId))
      return res.status(400).json({ message: "Invalid Event ID format" });

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const existingUserEvent = await Registration.findOne({ userId, eventId });
    if (existingUserEvent)
      return res
        .status(400)
        .json({ message: "Already registered for the event" });

    const updatedEvent = await Event.findOneAndUpdate(
      { _id: eventId, availableSeats: { $gt: 0 } },
      { $inc: { availableSeats: -1 } },
      { new: true },
    );

    if (!updatedEvent)
      return res.status(400).json({ message: "Event is full" });

    await Registration.create({ userId, eventId });

    res
      .status(201)
      .json({
        message: "Successfully registered for the event",
        event: updatedEvent,
      });
  } catch (error) {
    console.log("Error occurred while register for event", error);
    res.status(500).json({ message: error.message });
  }
};

export const cancelEventRegistration = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;

    if (!eventId)
      return res.status(400).json({ message: "Event ID is required" });

    if (!mongoose.Types.ObjectId.isValid(eventId))
      return res.status(400).json({ message: "Invalid Event ID format" });

    const deleted = await Registration.findOneAndDelete({ userId, eventId });

    if (!deleted)
      return res.status(400).json({ message: "No registered event found" });

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $inc: { availableSeats: 1 } },
      { new: true },
    );

    res.json({ message: "Event cancelled Successfully", event: updatedEvent });
  } catch (error) {
    console.log("Error occurred while cancelling event", error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyRegistrations = async (req, res) => {
  try {
    const userId = req.user._id;
    const registeredEvents = await Registration.find({ userId }).populate(
      "eventId",
    );

    const myEvents = registeredEvents.map((event) => event.eventId);

    res.json(myEvents);
  } catch (error) {
    console.log("Error occurred while retrieving all registered events", error);
    res.status(500).json({ message: error.message });
  }
};
