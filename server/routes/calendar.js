import express from "express";
import calendarController from "../controllers/calendarController.js";
import auth from "../middleware/authentication.js";

const router = express.Router();

router.use(auth.authenticateUser);

// Routes for all calendar events
router
  .route("/")
  .get(calendarController.getCalendarEvents)
  .post(calendarController.createCalendarEvent);

// Routes for specific calendar events
router
  .route("/:id")
  .get(calendarController.getCalendarEvent)
  .put(calendarController.updateCalendarEvent)
  .delete(calendarController.deleteCalendarEvent);

export default router;
