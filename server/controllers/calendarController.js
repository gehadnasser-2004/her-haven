import CalendarEvent from "../models/Calendar.js";
import { errors } from "../errors/index.js";

const calendarController = {
  // Create a new calendar event
  createCalendarEvent: async (req, res) => {
    if (!req.user || !req.user.userId) {
      throw new errors.UnauthenticatedError("Authentication required");
    }
    try {
      const calendarEvent = await CalendarEvent.create({
        ...req.body,
        user: req.user.userId,
      });
      res.status(201).json({ calendarEvent });
    } catch (err) {
      throw new errors.BadRequestError(err.message);
    }
  },

  // Get all calendar events for the logged-in user
  getCalendarEvents: async (req, res) => {
    if (!req.user || !req.user.userId) {
      throw new errors.UnauthenticatedError("Authentication required");
    }

    // Parse date filters if provided
    const { startDate, endDate } = req.query;
    let dateFilter = { user: req.user.userId };

    if (startDate || endDate) {
      dateFilter.date = {};
      if (startDate) {
        dateFilter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        dateFilter.date.$lte = new Date(endDate);
      }
    }

    try {
      const calendarEvents = await CalendarEvent.find(dateFilter).sort({
        date: 1,
      });
      res.status(200).json({ calendarEvents });
    } catch (err) {
      throw new errors.BadRequestError(err.message);
    }
  },

  // Get a single calendar event
  getCalendarEvent: async (req, res) => {
    if (!req.user || !req.user.userId) {
      throw new errors.UnauthenticatedError("Authentication required");
    }
    try {
      const calendarEvent = await CalendarEvent.findOne({
        _id: req.params.id,
        user: req.user.userId,
      });
      if (!calendarEvent)
        throw new errors.NotFoundError("Calendar event not found");
      res.status(200).json({ calendarEvent });
    } catch (err) {
      if (
        err instanceof errors.NotFoundError ||
        err instanceof errors.UnauthenticatedError
      )
        throw err;
      throw new errors.BadRequestError(err.message);
    }
  },

  // Update a calendar event
  updateCalendarEvent: async (req, res) => {
    if (!req.user || !req.user.userId) {
      throw new errors.UnauthenticatedError("Authentication required");
    }
    try {
      const calendarEvent = await CalendarEvent.findOneAndUpdate(
        { _id: req.params.id, user: req.user.userId },
        req.body,
        { new: true }
      );
      if (!calendarEvent)
        throw new errors.NotFoundError("Calendar event not found");
      res.status(200).json({ calendarEvent });
    } catch (err) {
      if (
        err instanceof errors.NotFoundError ||
        err instanceof errors.UnauthenticatedError
      )
        throw err;
      throw new errors.BadRequestError(err.message);
    }
  },

  // Delete a calendar event
  deleteCalendarEvent: async (req, res) => {
    if (!req.user || !req.user.userId) {
      throw new errors.UnauthenticatedError("Authentication required");
    }
    try {
      const calendarEvent = await CalendarEvent.findOneAndDelete({
        _id: req.params.id,
        user: req.user.userId,
      });
      if (!calendarEvent)
        throw new errors.NotFoundError("Calendar event not found");
      res.status(200).json({ msg: "Calendar event deleted" });
    } catch (err) {
      if (
        err instanceof errors.NotFoundError ||
        err instanceof errors.UnauthenticatedError
      )
        throw err;
      throw new errors.BadRequestError(err.message);
    }
  },
};

export default calendarController;
