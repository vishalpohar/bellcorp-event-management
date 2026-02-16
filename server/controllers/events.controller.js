import Event from "../models/event.model.js";

/**
 * @desc    Get events
 * @route   GET /api/events/
 * @access  Public
 */
export const getEvents = async (req, res) => {
  try {
    const { search_q, date, location, category, page, limit = 10 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    let query = {};
    if (search_q) {
      query.$or = [
        { name: { $regex: search_q, $options: "i" } },
        { description: { $regex: search_q, $options: "i" } },
        { category: { $regex: search_q, $options: "i" } },
      ];
    }

    if (date) {
      let start = new Date(date);
      let end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.date = { $gte: start, $lte: end };
    }
    if (location) query.location = { $regex: location, $options: "i" };
    if (category) query.category = { $regex: category, $options: "i" };

    const totalEvents = await Event.countDocuments(query);

    const events = await Event.find(query)
      .sort({ date: 1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    res.json({
      events,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalEvents / limitNumber),
      totalEvents,
    });
  } catch (error) {
    console.log("Error while retrieving events", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get events by id
 * @route   GET /api/events/:id
 * @access  Public
 */
export const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const eventDetails = await Event.findById(eventId);
    res.send(eventDetails);
  } catch (error) {
    console.log("Error while retrieving event details", error);
    res.status(500).json({ message: error.message });
  }
};
