import express from "express";
import reminderController from "../controllers/reminderController.js";
import auth from "../middleware/authentication.js";

const router = express.Router();

router.use(auth.authenticateUser);

router
  .route("/")
  .get(reminderController.getReminders)
  .post(reminderController.createReminder);

router
  .route("/:id")
  .put(reminderController.updateReminder)
  .delete(reminderController.deleteReminder);

export default router;
