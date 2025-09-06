import express from "express";
import {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder,
} from "../controllers/reminderController.js";
import auth from "../middleware/authentication.js";

const router = express.Router();

router.use(auth.authenticateUser);

router.route("/").get(getReminders).post(createReminder);

router.route("/:id").put(updateReminder).delete(deleteReminder);

export default router;
