import Reminder from "../models/Reminder.js";
import { errors } from "../errors/index.js";

// Create a new reminder
export const createReminder = async (req, res) => {
  if (!req.user || !req.user.userId) {
    throw new errors.UnauthenticatedError("Authentication required");
  }
  try {
    const reminder = await Reminder.create({
      ...req.body,
      user: req.user.userId,
    });
    res.status(201).json({ reminder });
  } catch (err) {
    throw new errors.BadRequestError(err.message);
  }
};

// Get all reminders for the logged-in user
export const getReminders = async (req, res) => {
  if (!req.user || !req.user.userId) {
    throw new errors.UnauthenticatedError("Authentication required");
  }
  try {
    const reminders = await Reminder.find({ user: req.user.userId });
    res.status(200).json({ reminders });
  } catch (err) {
    throw new errors.BadRequestError(err.message);
  }
};

// Update a reminder
export const updateReminder = async (req, res) => {
  if (!req.user || !req.user.userId) {
    throw new errors.UnauthenticatedError("Authentication required");
  }
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!reminder) throw new errors.NotFoundError("Reminder not found");
    res.status(200).json({ reminder });
  } catch (err) {
    if (
      err instanceof errors.NotFoundError ||
      err instanceof errors.UnauthenticatedError
    )
      throw err;
    throw new errors.BadRequestError(err.message);
  }
};

// Delete a reminder
export const deleteReminder = async (req, res) => {
  if (!req.user || !req.user.userId) {
    throw new errors.UnauthenticatedError("Authentication required");
  }
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!reminder) throw new errors.NotFoundError("Reminder not found");
    res.status(200).json({ msg: "Reminder deleted" });
  } catch (err) {
    if (
      err instanceof errors.NotFoundError ||
      err instanceof errors.UnauthenticatedError
    )
      throw err;
    throw new errors.BadRequestError(err.message);
  }
};
